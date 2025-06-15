import base64

import numpy as np
import face_recognition
from rest_framework.views import APIView
from rest_framework.response import Response
from accounts.models import FaceUser, Partner
from PIL import Image

from recognition.utils import generate_authorization_code


class FaceLoginView(APIView):
    def post(self, request):
        image_file = request.FILES.get('image')
        client_id = request.data.get('client_id')
        user_name = request.data.get('user_name')


        if not image_file:
            return Response({"error": "No image provided"}, status=400)
        if not client_id or not user_name:
            return Response({"error": "client_id and user_id are required"}, status=400)

        # Przetwórz obraz do numpy
        image = Image.open(image_file).convert('RGB')
        np_image = np.array(image)
        encodings = face_recognition.face_encodings(np_image)

        if not encodings:
            return Response({"error": "No face found"}, status=400)

        input_encoding = encodings[0]

        # Znajdź partnera
        try:
            partner = Partner.objects.get(client_id=client_id)
        except Partner.DoesNotExist:
            return Response({"error": "Partner not found"}, status=404)

        # Znajdź użytkownika partnera po emailu
        try:
            user = FaceUser.objects.get(partner=partner, name=user_name)
        except FaceUser.DoesNotExist:
            return Response({"error": "This user doesn't exists!"}, status=404)

        # Dekoduj face_embedding z base64 do numpy array
        try:
            decoded = base64.b64decode(user.face_embedding)
            known_encoding = np.frombuffer(decoded, dtype=np.float64)
        except Exception as e:
            return Response({"error": "Invalid face embedding format"}, status=500)

        # Porównaj twarze
        match = face_recognition.compare_faces([known_encoding], input_encoding, tolerance=0.45)

        if match[0]:
            return Response({ "code": generate_authorization_code(user, partner).code}, status=200)
        else:
            return Response({ "error": "Face does not match the user"}, status=401)


class FaceRegisterView(APIView):
    def post(self, request):
        client_id = request.data.get("client_id")
        user_name = request.data.get("user_name")
        image_file = request.FILES.get("image")

        if not client_id or not user_name or not image_file:
            return Response({"error": "Missing client_id, user_name or image"}, status=400)

        # Znajdź partnera
        try:
            partner = Partner.objects.get(client_id=client_id)
        except Partner.DoesNotExist:
            return Response({"error": "Partner not found"}, status=404)

        # Sprawdź czy użytkownik już istnieje dla tego partnera
        if FaceUser.objects.filter(partner=partner, name=user_name).exists():
            return Response({"error": "User already registered for this partner"}, status=400)

        # Przetwórz obraz
        image = Image.open(image_file).convert('RGB')
        np_image = np.array(image)
        encodings = face_recognition.face_encodings(np_image)

        if not encodings:
            return Response({"error": "No face found in image"}, status=400)

        encoding = encodings[0]

        # Zakoduj embedding jako base64
        encoding_bytes = encoding.tobytes()
        encoding_b64 = base64.b64encode(encoding_bytes).decode('utf-8')

        # Stwórz nowego użytkownika z twarzą
        FaceUser.objects.create(
            partner=partner,
            # email=email,
            name=user_name,
            face_embedding=encoding_b64
        )

        return Response({ "user_name": user_name,
                         "client_id": client_id}, status=201)

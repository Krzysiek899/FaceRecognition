import base64

import numpy as np
import face_recognition
from rest_framework.views import APIView
from rest_framework.response import Response
from accounts.models import FaceUser, Partner
from PIL import Image


class FaceLoginView(APIView):
    def post(self, request):
        image_file = request.FILES.get('image')
        client_id = request.data.get('client_id')
        user_email = request.data.get('user_email')

        if not image_file:
            return Response({"error": "No image provided"}, status=400)
        if not client_id or not user_email:
            return Response({"error": "client_id and user_email are required"}, status=400)

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
            return Response({"status": "fail", "message": "Partner not found"}, status=404)

        # Znajdź użytkownika partnera po emailu
        try:
            user = FaceUser.objects.get(partner=partner, email=user_email)
        except FaceUser.DoesNotExist:
            return Response({"status": "fail", "message": "User not found for this partner"}, status=404)

        # Dekoduj face_embedding z base64 do numpy array
        try:
            decoded = base64.b64decode(user.face_embedding)
            known_encoding = np.frombuffer(decoded, dtype=np.float64)
        except Exception as e:
            return Response({"error": "Invalid face embedding format"}, status=500)

        # Porównaj twarze
        match = face_recognition.compare_faces([known_encoding], input_encoding, tolerance=0.45)

        if match[0]:
            return Response({"status": "success", "message": "Face matches the user"})
        else:
            return Response({"status": "fail", "message": "Face does not match the user"}, status=401)


class FaceRegisterView(APIView):
    def post(self, request):
        client_id = request.data.get("client_id")
        email = request.data.get("email")
        image_file = request.FILES.get("image")

        if not client_id or not email or not image_file:
            return Response({"error": "Missing client_id, email or image"}, status=400)

        # Znajdź partnera
        try:
            partner = Partner.objects.get(client_id=client_id)
        except Partner.DoesNotExist:
            return Response({"error": "Partner not found"}, status=404)

        # Sprawdź czy użytkownik już istnieje dla tego partnera
        if FaceUser.objects.filter(partner=partner, email=email).exists():
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
            email=email,
            face_embedding=encoding_b64
        )

        return Response({"status": "registered", "email": email, "client_id": client_id})

from django.shortcuts import render
import numpy as np
import face_recognition
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import FaceProfile
from django.core.files.uploadedfile import InMemoryUploadedFile
from PIL import Image
import io

# Create your views here.


class FaceLoginView(APIView):
    def post(self, request):
        image_file = request.FILES.get('image')

        if not image_file:
            return Response({"error": "No image provided"}, status=400)

        # Przetwórz obraz do numpy
        image = Image.open(image_file).convert('RGB')
        np_image = np.array(image)
        encodings = face_recognition.face_encodings(np_image)

        if not encodings:
            return Response({"error": "No face found"}, status=400)

        input_encoding = encodings[0]

        # Szukamy użytkownika
        for profile in FaceProfile.objects.all():
            known = np.frombuffer(profile.face_encoding, dtype=np.float64)
            match = face_recognition.compare_faces([known], input_encoding, tolerance=0.45)
            if match[0]:
                return Response({"status": "success", "user_id": profile.user_id})

        return Response({"status": "fail", "message": "Face not recognized"}, status=401)

class FaceRegisterView(APIView):
    def post(self, request):
        user_id = request.data.get("user_id")
        image_file = request.FILES.get("image")

        if not user_id or not image_file:
            return Response({"error": "Missing user_id or image"}, status=400)

        # Sprawdź czy użytkownik już istnieje
        if FaceProfile.objects.filter(user_id=user_id).exists():
            return Response({"error": "User already registered"}, status=400)

        # Odczytaj obraz
        image = Image.open(image_file).convert('RGB')
        np_image = np.array(image)
        encodings = face_recognition.face_encodings(np_image)

        if not encodings:
            return Response({"error": "No face found in image"}, status=400)

        encoding = encodings[0]
        FaceProfile.objects.create(
            user_id=user_id,
            face_encoding=encoding.tobytes()
        )

        return Response({"status": "registered", "user_id": user_id})
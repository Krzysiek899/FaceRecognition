# recognition/management/commands/add_face.py
from django.core.management.base import BaseCommand
from backend.recognition.models  import FaceProfile
import face_recognition
import numpy as np
from PIL import Image

class Command(BaseCommand):
    help = "Add face to database"

    def add_arguments(self, parser):
        parser.add_argument("user_id", type=str)
        parser.add_argument("image_path", type=str)

    def handle(self, *args, **options):
        image = face_recognition.load_image_file(options["image_path"])
        encodings = face_recognition.face_encodings(image)

        if not encodings:
            self.stdout.write(self.style.ERROR("No face found!"))
            return

        FaceProfile.objects.create(
            user_id=options["user_id"],
            face_encoding=encodings[0].tobytes()
        )
        self.stdout.write(self.style.SUCCESS("User added!"))

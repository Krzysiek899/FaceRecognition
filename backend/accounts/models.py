import uuid
from django.db import models
from django.utils import timezone
# Create your models here.

class Partner(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    client_id = models.CharField(max_length=100, unique=True)
    client_secret = models.CharField(max_length=255)

class FaceUser(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    partner = models.ForeignKey(Partner, on_delete=models.CASCADE, related_name='users')
    name = models.CharField(max_length=100)
    email = models.EmailField()
    face_embedding = models.TextField()

    class Meta:
        unique_together = ('partner', 'name')

class AuthorizationCode(models.Model):
    code = models.CharField(max_length=100, unique=True)
    user = models.ForeignKey('FaceUser', on_delete=models.CASCADE)
    partner = models.ForeignKey('Partner', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    def is_expired(self):
        return timezone.now() > self.expires_at


class AccessToken(models.Model):
    token = models.CharField(max_length=255, unique=True)
    user = models.ForeignKey('FaceUser', on_delete=models.CASCADE)
    partner = models.ForeignKey('Partner', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    def is_expired(self):
        return timezone.now() > self.expires_at

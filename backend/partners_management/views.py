from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from accounts.models import Partner
import uuid
import secrets

class AppsManagementView(APIView):
    def get(self, request):
        partners = Partner.objects.all()
        data = [{"id": str(p.id), "name": p.name, "client_id": p.client_id} for p in partners]
        return Response(data)

    def post(self, request):
        name = request.data.get("name")
        if not name:
            return Response({"error": "Name is required"}, status=status.HTTP_400_BAD_REQUEST)

        client_id = str(uuid.uuid4())
        client_secret = secrets.token_urlsafe(32)

        partner = Partner.objects.create(
            name=name,
            client_id=client_id,
            client_secret=client_secret,
        )

        data = {
            "id": str(partner.id),
            "name": partner.name,
            "client_id": partner.client_id,
            "client_secret": partner.client_secret,
        }
        return Response(data, status=status.HTTP_201_CREATED)

from urllib.parse import urlencode

from django.shortcuts import render, redirect
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import Partner, FaceUser
from backend.settings import FRONTEND_URL


# Create your views here.

class PartnerRegistrationView(APIView):
    def post(self, request):
        client_id = request.data.get('clientId')
        user_id = request.data.get('userId')
        callback_url = request.data.get('callback_url')

        if not all([client_id, user_id, callback_url]):
            return Response({"error": "clientId, userId and callback_url are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            partner = Partner.objects.get(client_id=client_id)
        except Partner.DoesNotExist:
            return Response({"error": "Invalid clientId"}, status=status.HTTP_400_BAD_REQUEST)

        frontend_path = "/face-register"
        params = {
            "clientId": client_id,
            "userId": user_id,
            "callback_url": callback_url,
        }

        url = f"{FRONTEND_URL}{frontend_path}?{urlencode(params)}"

        return redirect(url)

class PartnerLoginView(APIView):
    def get(self, request):
        client_id = request.query_params.get('clientId')
        user_id = request.query_params.get('userId')
        callback_url = request.query_params.get('callback_url')

        if not all([client_id, user_id, callback_url]):
            return Response({"error": "clientId, userId and callback_url are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            partner = Partner.objects.get(client_id=client_id)
        except Partner.DoesNotExist:
            return Response({"error": "Invalid clientId"}, status=status.HTTP_400_BAD_REQUEST)

        user_exists = FaceUser.objects.filter(partner=partner, email=user_id).exists()
        if not user_exists:
            return Response({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)

        frontend_path = "/face-login"
        params = {
            "clientId": client_id,
            "userId": user_id,
            "callback_url": callback_url,
        }
        url = f"{FRONTEND_URL}{frontend_path}?{urlencode(params)}"
        return redirect(url)


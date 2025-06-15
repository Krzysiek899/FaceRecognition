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
    def get(self, request):
        client_id = request.GET.get('clientId')
        user_name = request.GET.get('userName')
        callback_url = request.GET.get('callbackUrl')

        if not all([client_id, user_name, callback_url]):
            return Response({"error": "clientId, userName and callbackUrl are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            partner = Partner.objects.get(client_id=client_id)
        except Partner.DoesNotExist:
            return Response({"error": "Invalid clientId"}, status=status.HTTP_400_BAD_REQUEST)

        frontend_path = "face-register"
        params = {
            "clientId": client_id,
            "userName": user_name,
            "callbackUrl": callback_url,
        }

        url = f"{FRONTEND_URL}{frontend_path}?{urlencode(params)}"

        return redirect(url)

class PartnerLoginView(APIView):
    def get(self, request):
        client_id = request.query_params.get('clientId')
        user_name = request.query_params.get('userName')
        callback_url = request.query_params.get('callbackUrl')

        if not all([client_id, user_name, callback_url]):
            return Response({"error": "clientId, userName and callbackUrl are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            partner = Partner.objects.get(client_id=client_id)
        except Partner.DoesNotExist:
            return Response({"error": "Invalid clientId"}, status=status.HTTP_400_BAD_REQUEST)

        user_exists = FaceUser.objects.filter(partner=partner, name=user_name).exists()
        if not user_exists:
            return Response({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)

        frontend_path = "face-login"
        params = {
            "clientId": client_id,
            "userName": user_name,
            "callback_url": callback_url,
        }
        url = f"{FRONTEND_URL}{frontend_path}?{urlencode(params)}"
        return redirect(url)


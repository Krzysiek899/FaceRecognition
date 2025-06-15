from urllib.parse import urlencode
from django.utils import timezone
from django.shortcuts import render, redirect
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import Partner, FaceUser, AuthorizationCode
from backend.settings import FRONTEND_URL
from recognition.utils import exchange_code_for_token


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


class TokenExchangeView(APIView):
    def post(self, request):
        client_id = request.data.get('clientId')
        client_secret = request.data.get('clientSecret')
        code = request.data.get('code')

        if not all([client_id, client_secret, code]):
            return Response({"error": "clientId, clientSecret and code are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            partner = Partner.objects.get(client_id=client_id)
        except Partner.DoesNotExist:
            return Response({"error": "Invalid clientId"}, status=status.HTTP_400_BAD_REQUEST)

        if partner.client_secret != client_secret:
            return Response({"error": "Invalid clientSecret"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            auth_code = AuthorizationCode.objects.get(code=code, partner=partner)
        except AuthorizationCode.DoesNotExist:
            return Response({"error": "Invalid or expired code"}, status=status.HTTP_400_BAD_REQUEST)

        if auth_code.expires_at < timezone.now():
            auth_code.delete()
            return Response({"error": "Authorization code expired"}, status=status.HTTP_400_BAD_REQUEST)

        jwt = exchange_code_for_token(code, client_id, client_secret)

        return Response({"user_name": auth_code.user.name,"jwt": jwt}, status=status.HTTP_200_OK)
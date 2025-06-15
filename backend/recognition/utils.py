import secrets
import uuid
from datetime import timedelta

from jwt import encode
from django.utils import timezone
from accounts.models import AuthorizationCode, AccessToken


def generate_authorization_code(user, partner):
    code = secrets.token_urlsafe(32)
    expires_at = timezone.now() + timedelta(minutes=10)

    return AuthorizationCode.objects.create(
        code=code,
        user=user,
        partner=partner,
        expires_at=expires_at
    )


JWT_SECRET = 'super-secret-key'
JWT_ALGORITHM = 'HS256'
JWT_EXPIRATION_HOURS = 1

def generate_jwt(user_id, user_name, partner_id, expires_at):
    payload = {
        'sub': str(user_id),
        'partner_id': str(partner_id),
        'user_name': str(user_name),
        'exp': int(expires_at.timestamp()),
        'iat': int(timezone.now().timestamp()),
        'jti': str(uuid.uuid4())
    }
    return encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def exchange_code_for_token(code_str, client_id, client_secret):
    try:
        auth_code = AuthorizationCode.objects.get(code=code_str, partner__client_id=client_id)

        if auth_code.partner.client_secret != client_secret:
            raise PermissionError("Invalid client secret")

        if auth_code.is_expired():
            raise ValueError("Authorization code expired")

        expires_at = timezone.now() + timedelta(hours=JWT_EXPIRATION_HOURS)
        jwt_token = generate_jwt(auth_code.user.id, auth_code.user.name, auth_code.partner.id, expires_at)

        AccessToken.objects.create(
            token=jwt_token,
            user=auth_code.user,
            partner=auth_code.partner,
            expires_at=expires_at
        )

        auth_code.delete()

        return jwt_token

    except AuthorizationCode.DoesNotExist:
        raise ValueError("Invalid authorization code")


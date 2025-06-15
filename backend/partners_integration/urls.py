from django.urls import path

from partners_integration.views import (PartnerRegistrationView, PartnerLoginView, TokenExchangeView)
#UserInfoView

urlpatterns = [
    path('login/', PartnerLoginView.as_view(), name='login'),
    path('register/', PartnerRegistrationView.as_view(), name='register'),
    path('get-token/', TokenExchangeView.as_view(), name='get_token'),
]
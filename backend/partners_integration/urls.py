from django.urls import path

from partners_integration.views import (PartnerRegistrationView, PartnerLoginView)
#UserInfoView

urlpatterns = [
    path('login/', PartnerLoginView.as_view(), name='login'),
    path('register/', PartnerRegistrationView.as_view(), name='register'),
    #path('info', UserInfoView.as_view(), name='info'),
]
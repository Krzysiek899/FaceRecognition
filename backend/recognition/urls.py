from django.urls import path
from .views import FaceLoginView, FaceRegisterView

urlpatterns = [
    path('login/', FaceLoginView.as_view(), name='face-login'),
    path('register/', FaceRegisterView.as_view(), name='face-register'),

]

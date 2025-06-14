from django.urls import path
from .views import FaceLoginView, FaceRegisterView

urlpatterns = [
    path('face-login/', FaceLoginView.as_view(), name='face-login'),
    path('face-register/', FaceRegisterView.as_view(), name='face-register'),

]

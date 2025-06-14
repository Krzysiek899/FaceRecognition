from django.urls import path

from partners_management.views import AppsManagementView

urlpatterns = [
    path('', AppsManagementView.as_view(), name='partners'),
]
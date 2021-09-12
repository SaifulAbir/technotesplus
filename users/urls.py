from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from users.api import UserCreateAPI

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('signup/', UserCreateAPI.as_view(), name='create_user'),
]
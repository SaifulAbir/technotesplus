from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from users.api import UserCreateAPI, UserProfileAPI, UserUpdateAPI, change_password, UserListAPI

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('signup/', UserCreateAPI.as_view(), name='create_user'),
    path('profile/', UserProfileAPI.as_view(), name='user_profile'),
    path('user-list/', UserListAPI.as_view(), name='user-list'),
    path('update_profile/', UserUpdateAPI.as_view(), name='user_update'),
    path('change_password/', change_password, name='change_password'),
]
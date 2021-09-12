from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework.generics import CreateAPIView, RetrieveAPIView, UpdateAPIView, get_object_or_404
from users.serializers import UserSerializer, UserUpdateSerializer


class UserCreateAPI(CreateAPIView):
    permission_classes = ()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        hash_password = make_password(request.data["password"])
        request.data["password"] = hash_password
        return super(UserCreateAPI, self).post(request, *args, **kwargs)


class UserUpdateAPI(UpdateAPIView):
    serializer_class = UserUpdateSerializer

    def get_object(self):
        return self.request.user


class UserProfileAPI(RetrieveAPIView):
    serializer_class = UserUpdateSerializer

    def get_object(self):
        return self.request.user
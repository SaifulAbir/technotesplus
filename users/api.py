from django.contrib.auth.hashers import make_password
from rest_framework.generics import CreateAPIView
from users.serializers import UserSerializer


class UserCreateAPI(CreateAPIView):
    permission_classes = ()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        hash_password = make_password(request.data["password"])
        request.data["password"] = hash_password
        return super(UserCreateAPI, self).post(request, *args, **kwargs)
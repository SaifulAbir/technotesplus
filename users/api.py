from rest_framework.generics import CreateAPIView
from users.serializers import UserSerializer


class UserCreateAPI(CreateAPIView):
    permission_classes = ()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        return super(UserCreateAPI, self).post(request, *args, **kwargs)
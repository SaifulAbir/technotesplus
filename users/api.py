from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.generics import CreateAPIView, RetrieveAPIView, UpdateAPIView, get_object_or_404
from rest_framework.response import Response
from rest_framework.status import HTTP_401_UNAUTHORIZED, HTTP_200_OK
from rest_framework.utils import json

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


@api_view(["POST"])
def change_password(request):
    received_json_data = json.loads(request.body)
    user = request.user.id
    old_password = received_json_data["old_password"]
    new_password = received_json_data["new_password"]

    try:
        user_obj = User.objects.get(id=user)
    except User.DoesNotExist:
        data = {
            'status': 'failed',
            'code': HTTP_401_UNAUTHORIZED,
            "message": "User Not Exists",
            "result": ''
        }
        return Response(data, HTTP_401_UNAUTHORIZED)
    status = check_password(old_password, user_obj.password)

    if not status :
        data = {
            'status': 'failed',
            'code': HTTP_401_UNAUTHORIZED,
            "message": "Old Password is Wrong",
            "result": ''
        }
        return Response(data, HTTP_401_UNAUTHORIZED)
    else:
        new_password = make_password(new_password)
        user_obj.password = new_password
        user_obj.save()

        data = {
            'status': 'success',
            'code': HTTP_200_OK,
            "message": "Password Changed",
            "result": {
                "user": {
                    "username": user_obj.username,
                    'user_id': user_obj.id
                }
            }
        }
    return Response(data, HTTP_200_OK)

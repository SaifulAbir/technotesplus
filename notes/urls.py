from django.urls import path
from notes.api import NoteListAPI

urlpatterns = [
    path('note-list/', NoteListAPI.as_view(), name='note_list'),
    path('signup/', UserCreateAPI.as_view(), name='create_user'),
    path('profile/', UserProfileAPI.as_view(), name='user_profile'),
    path('update_profile/', UserUpdateAPI.as_view(), name='user_update'),
    path('change_password/', change_password, name='change_password'),
]
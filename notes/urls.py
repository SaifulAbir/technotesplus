from django.urls import path
from notes.api import NoteListAPI, TagListAPI, NoteCreateAPI, NoteUpdateDeleteAPI

urlpatterns = [
    path('note-list/', NoteListAPI.as_view(), name='note_list'),
    path('tag-list/', TagListAPI.as_view(), name='tag_list'),
    path('create-note/', NoteCreateAPI.as_view(), name='create-note'),
    path('update-note/<str:pk>/', NoteUpdateDeleteAPI.as_view(), name='update_note'),
    path('delete-note/<str:pk>/', NoteUpdateDeleteAPI.as_view(), name='delete_note'),
]
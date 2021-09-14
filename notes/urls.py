from django.urls import path
from notes.api import TagListAPI, NoteCreateAPI, NoteUpdateDeleteAPI, NoteSearchAPI

urlpatterns = [
    path('note-search/', NoteSearchAPI.as_view(), name='note_search'),
    path('tag-list/', TagListAPI.as_view(), name='tag_list'),
    path('create-note/', NoteCreateAPI.as_view(), name='create-note'),
    path('update-note/<str:pk>/', NoteUpdateDeleteAPI.as_view(), name='update_note'),
    path('delete-note/<str:pk>/', NoteUpdateDeleteAPI.as_view(), name='delete_note'),
]
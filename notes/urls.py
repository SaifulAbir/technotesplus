from django.urls import path
from notes.api import TagListAPI, NoteCreateAPI, NoteUpdateDeleteAPI, NoteSearchAPI, NoteShareAPI

urlpatterns = [
    path('note-search/', NoteSearchAPI.as_view(), name='note_search'),
    path('tag-list/', TagListAPI.as_view(), name='tag_list'),
    path('share-note/', NoteShareAPI.as_view(), name='share_note'),
    path('create-note/', NoteCreateAPI.as_view(), name='create_note'),
    path('update-note/<str:pk>/', NoteUpdateDeleteAPI.as_view(), name='update_note'),
    path('delete-note/<str:pk>/', NoteUpdateDeleteAPI.as_view(), name='delete_note'),
]
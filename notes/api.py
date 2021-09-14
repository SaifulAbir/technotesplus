from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView
from notes.models import Note, Tag, SharedNote
from notes.serializers import NoteSerializer, NoteCreateUpdateDeleteSerializer, TagSerializer, NoteShareSerializer, \
    SharedNoteSerializer
from notes.utils import update_shared_note_view


class NoteSearchAPI(ListAPIView):
    serializer_class = NoteSerializer

    def get_queryset(self):
        request = self.request
        tag = request.GET.get('tag')
        print(self.request.user)
        queryset = Note.objects.prefetch_related('note_tag').filter(is_archived=False, created_by=self.request.user)
        if tag:
            queryset = queryset.filter(note_tag__tag__name=tag)
        return queryset


class NoteCreateAPI(CreateAPIView):
    serializer_class = NoteCreateUpdateDeleteSerializer


class NoteUpdateDeleteAPI(UpdateAPIView):
    serializer_class = NoteCreateUpdateDeleteSerializer

    def get_queryset(self):
        return Note.objects.filter(created_by=self.request.user)


class TagListAPI(ListAPIView):
    permission_classes = ()
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class NoteShareAPI(CreateAPIView):
    serializer_class = NoteShareSerializer


class SharedNoteListAPI(ListAPIView):
    serializer_class = SharedNoteSerializer

    def get_queryset(self):
        queryset = SharedNote.objects.filter(shared_with=self.request.user)
        update_shared_note_view(queryset)
        return queryset
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView
from notes.models import Note, Tag
from notes.serializers import NoteSerializer, NoteCreateUpdateSerializer, TagSerializer


class NoteListAPI(ListAPIView):
    serializer_class = NoteSerializer

    def get_queryset(self):
        return Note.objects.prefetch_related('note_tag').filter(is_archived=False, created_by=self.request.user)


class NoteCreateAPI(CreateAPIView):
    serializer_class = NoteCreateUpdateSerializer


class NoteUpdateAPI(UpdateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteCreateUpdateSerializer


class TagListAPI(ListAPIView):
    permission_classes = ()
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
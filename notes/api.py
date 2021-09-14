from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView
from notes.models import Note, Tag
from notes.serializers import NoteSerializer, NoteCreateUpdateDeleteSerializer, TagSerializer, NoteShareSerializer


class NoteSearchAPI(ListAPIView):
    serializer_class = NoteSerializer

    def get_queryset(self):
        request = self.request
        tag = request.GET.get('tag')
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
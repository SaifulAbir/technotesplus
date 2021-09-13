from rest_framework.generics import ListAPIView, CreateAPIView
from notes.models import Note
from notes.serializers import NoteSerializer, NoteCreateSerializer


class NoteListAPI(ListAPIView):
    serializer_class = NoteSerializer

    def get_queryset(self):
        return Note.objects.filter(is_archived=False, created_by=self.request.user)


class NoteCreateAPI(CreateAPIView):
    serializer_class = NoteCreateSerializer

    def post(self, request, *args, **kwargs):
        print(request.data)
        return super(NoteCreateAPI, self).post(request, *args, **kwargs)
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from notes.models import Note, NoteTag


class NoteTagSerializer(ModelSerializer):
    class Meta:
        model = NoteTag
        fields = ('tag', )


class NoteSerializer(ModelSerializer):
    tag_note = NoteTagSerializer(many=True)
    class Meta:
        model = Note
        fields = ['text', 'tag_note']


class NoteCreateSerializer(ModelSerializer):
    tags = serializers.CharField(write_only=True)
    class Meta:
        model = Note
        fields = ['text', 'tags']
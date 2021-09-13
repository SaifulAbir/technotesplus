from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from notes.models import Note, NoteTag, Tag


class NoteTagSerializer(ModelSerializer):
    tag = serializers.CharField(source="tag.name")
    class Meta:
        model = NoteTag
        fields = ('tag', )


class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = ('name', )


class NoteSerializer(ModelSerializer):
    note_tag = NoteTagSerializer(many=True)
    class Meta:
        model = Note
        fields = ['text', 'note_tag']


class NoteCreateSerializer(ModelSerializer):
    tags = serializers.ListField(child=serializers.CharField(), write_only=True)

    class Meta:
        model = Note
        fields = ['text', 'tags']

    def create(self, validated_data):
        tags = validated_data.pop('tags')
        print(tags)
        print(validated_data)
        note_instance = Note.objects.create(**validated_data, created_by=self.context['request'].user)
        if tags:
            for tag in tags:
                tag_obj_exist = Tag.objects.filter(name=tag).exists()
                if tag_obj_exist:
                    NoteTag.objects.create(tag=Tag.objects.get(name=tag), note=note_instance, created_by=self.context['request'].user)
                if not tag_obj_exist:
                    tag_obj = Tag.objects.create(name=tag)
                    NoteTag.objects.create(tag=tag_obj, note=note_instance,
                                           created_by=self.context['request'].user)
        return note_instance
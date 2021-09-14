from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from notes.models import Note, NoteTag, Tag


class NoteTagSerializer(ModelSerializer):
    name = serializers.CharField(source="tag.name")
    class Meta:
        model = NoteTag
        fields = ('name', )


class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = ('name', )


class NoteSerializer(ModelSerializer):
    note_tag = NoteTagSerializer(many=True)
    created_by = serializers.CharField(source='created_by.username')
    class Meta:
        model = Note
        fields = ['id', 'text', 'note_tag', 'created_at', 'created_by']


class NoteCreateUpdateDeleteSerializer(ModelSerializer):
    tags = serializers.ListField(child=serializers.CharField(), write_only=True, required=False)

    class Meta:
        model = Note
        fields = ['text', 'tags', 'is_archived']

    def create(self, validated_data):
        tags = validated_data.pop('tags')
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

    def update(self, instance, validated_data):

        if validated_data.get('is_archived') == False:
            NoteTag.objects.filter(created_by=instance.created_by, note=instance ).delete()
            tags = validated_data.pop('tags')
            if tags:
                for tag in tags:
                    tag_obj_exist = Tag.objects.filter(name=tag).exists()
                    if tag_obj_exist:
                        NoteTag.objects.create(tag=Tag.objects.get(name=tag), note=instance, created_by=self.context['request'].user)
                    if not tag_obj_exist:
                        tag_obj = Tag.objects.create(name=tag)
                        NoteTag.objects.create(tag=tag_obj, note=instance,
                                               created_by=self.context['request'].user)
            validated_data.update({"created_by": self.context['request'].user})
        return super().update(instance, validated_data)
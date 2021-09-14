from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import ugettext_lazy as _

# Create your models here.


class Note(models.Model):
    text = models.TextField(_('Text'), max_length=1000, null=False, blank=False)
    is_archived = models.BooleanField(_('Archived'), null=True, blank=True, default=False)
    created_by = models.ForeignKey(
            User,
            on_delete=models.SET_NULL,
            null=True, blank=True,
            verbose_name='Created by'
        )
    created_at = models.DateTimeField(_('Created'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Updated'), auto_now=True)

    class Meta:
        db_table = 'notes'

    def __str__(self):
        return self.text


class Tag(models.Model):
    name = models.CharField(_('Name'), max_length=255, null=False, blank=False)
    created_at = models.DateTimeField(_('Created'), auto_now_add=True)

    class Meta:
        db_table = 'tags'

    def __str__(self):
        return self.name


class NoteTag(models.Model):
    """
        tag: one to many relation
    """
    tag = models.ForeignKey(
        Tag, related_name='tag_note',
        on_delete=models.SET_NULL,
        null=True, blank=True,
        verbose_name='Tag'
    )
    note = models.ForeignKey(
        Note, related_name='note_tag',
        on_delete=models.SET_NULL,
        null=True, blank=True,
        verbose_name='Note'
    )
    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        verbose_name='Created by'
    )
    created_at = models.DateTimeField(_('Created'), auto_now_add=True)

    class Meta:
        db_table = 'note_tags'

    def __str__(self):
        return self.tag.name


class SharedNote(models.Model):
    note = models.ForeignKey(
        Note, related_name='shared_note',
        on_delete=models.SET_NULL,
        null=True, blank=True,
        verbose_name='Note'
    )
    shared_by = models.ForeignKey(
        User, related_name='note_shared_by',
        on_delete=models.SET_NULL,
        null=True, blank=True,
        verbose_name='Shared by'
    )
    shared_with = models.ForeignKey(
        User, related_name='note_shared_with',
        on_delete=models.SET_NULL,
        null=True, blank=True,
        verbose_name='Shared with'
    )
    is_viewed = models.BooleanField(_('Viewed'), null=True, blank=True, default=False)
    created_at = models.DateTimeField(_('Created'), auto_now_add=True)

    class Meta:
        db_table = 'shared_notes'

    def __str__(self):
        return self.note.text

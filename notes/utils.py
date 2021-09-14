

def update_shared_note_view(queryset):
    if queryset:
        queryset.update(is_viewed=True)
import time
import logging
from apscheduler.schedulers.background import BackgroundScheduler
from django.core.mail import send_mail
from django_apscheduler.jobstores import DjangoJobStore, register_job
from notes.models import SharedNote
from technotesplus.settings import DEFAULT_FROM_EMAIL

logger = logging.getLogger(__name__)
scheduler = BackgroundScheduler()
scheduler.add_jobstore(DjangoJobStore(), "default")


@register_job(scheduler, "interval", minutes=10, id='send_notification', replace_existing=True)
def send_notification():
    shared_note = SharedNote.objects.filter(is_viewed=False)
    for note in shared_note:
        try:
            send_mail(
                'A new note is shared with you by '+note.shared_by.username,
                'Please read it from tech notes plus',
                DEFAULT_FROM_EMAIL,
                [note.shared_with.email],
                fail_silently=False,
                )
        except Exception as e:
            logger.error(e)

scheduler.start()

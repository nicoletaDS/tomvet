from django.db import models

from users.models import User

class Pet(models.Model):
    user = models.ForeignKey(User,related_name='pets', on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=255)
    birthday = models.DateField(null=True, blank=True)
    cipNr = models.CharField(max_length=255)
    image = models.ImageField(upload_to='pets/', default='pet_img.png')
    passport = models.BooleanField(default=False)
    weight = models.CharField(max_length=255, blank=True, null=True)
    owner = models.CharField(max_length=255, blank=True)

    def save(self, *args, **kwargs):
        if not self.owner:
            self.owner = self.user.get_full_name() if self.user else ''
        super(Pet, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class Task(models.Model): 
    pet = models.ForeignKey(Pet,related_name='tasks', on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=255)
    details = models.TextField(null=True, blank=True)
    startDate = models.DateField()
    endDate = models.DateField()
    repeat = models.CharField(max_length=255, null=True, blank=True)
    done = models.BooleanField(default=False)
    isTreatment = models.BooleanField(default=False)
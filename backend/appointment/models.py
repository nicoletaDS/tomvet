from django.db import models

from pets.models import Pet
from users.models import User


class Holiday(models.Model):
    day = models.DateField()

    class Meta:
        ordering = ["day"]


class Doctor(models.Model): 
    title = models.CharField(max_length=255)
    name = models.TextField(null=True, blank=True)
    email = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    holidays = models.ManyToManyField(Holiday, blank=True)

    class Meta:
        ordering = ["name"]
    
    def __str__(self):
        return self.title + " " + self.name


class Service(models.Model): 
    title = models.CharField(max_length=255)
    details = models.TextField(null=True, blank=True)
    time = models.IntegerField() # in minutes
    doctors = models.ManyToManyField(Doctor, blank=True)

    class Meta:
        ordering = ["title"]
    
    def __str__(self):
        return self.title


# appointment status: 'done', 'canceled', 'pending', 
class Appointment(models.Model): 
    user = models.ForeignKey(User,related_name='appointments', on_delete=models.DO_NOTHING, null=True, blank=True)
    pet = models.ForeignKey(Pet,related_name='pets', on_delete=models.CASCADE, null=True, blank=True)
    service = models.ForeignKey(Service,related_name='services', on_delete=models.CASCADE, null=True, blank=True)
    doctor = models.ForeignKey(Doctor,related_name='doctors', on_delete=models.DO_NOTHING, null=True, blank=True)
    details = models.TextField(null=True, blank=True)
    date = models.DateField()
    time = models.CharField(max_length=50, default='00:00')
    
    status = models.CharField(max_length=255, default='pending')

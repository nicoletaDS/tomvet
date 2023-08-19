from django.contrib import admin
from appointment.models import Appointment, Service, Doctor

admin.site.register(Appointment)
admin.site.register(Service)
admin.site.register(Doctor)
from django.urls import path

from . import views

urlpatterns=[
    path('', views.get_all_appointments, name='apointments'),
    path('add/', views.add_appointment, name='add_apointment'),
    path('<int:id>/', views.get_appointment, name='apointment'),

    path('doctors/', views.get_all_doctors, name='doctors'),
    path('services/', views.get_all_services, name='services'),
]
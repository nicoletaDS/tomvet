from django.shortcuts import get_object_or_404
import requests
from django.http import HttpResponseRedirect
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from datetime import date, time

from pets.models import Pet

from . import models, serializers

User = get_user_model()

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_appointments(request):
    appointments = models.Appointment.objects.filter(user=request.user)
    serializer = serializers.AppointmentSerializer(appointments, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_appointment(request, id):
    appointment = models.Appointment.objects.get(pk=id)
    if appointment.user != request.user:
            return Response({'message': 'Unauthorized'}, status=status.HTTP_400_BAD_REQUEST) 

    serializer = serializers.AppointmentSerializer(appointment, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_appointment(request):
    user = request.user
    data = request.data
    pet = get_object_or_404(Pet, pk=data['pet'])
    # returns the service or null if there is no service
    service = models.Service.objects.filter(pk=data['service']).first() 
    doctor = models.Doctor.objects.filter(pk=data['doctor']).first()
    appointment_date = date.fromisoformat(data['date']) # '2019-12-04'
    appointment_time = time.fromisoformat(data['time']) # '04:23:01'

    appointment = models.Appointment.objects.create(
        user=user,
        pet=pet,
        service=service,
        doctor=doctor,
        details=data['details'],
        date=appointment_date,
        time = appointment_time
    )

    serializer = serializers.AppointmentSerializer(appointment, many=False)
    return Response(serializer.data)

   
@api_view(['GET'])
def get_all_doctors(request):
    doctors = models.Doctor.objects.all()
    serializer = serializers.DoctorSerializer(doctors, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_all_services(request):
    services = models.Service.objects.all()
    serializer = serializers.ServiceSerializer(services, many=True)
    return Response(serializer.data)
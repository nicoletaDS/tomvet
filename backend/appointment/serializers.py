from rest_framework import serializers
from pets.serializers import PetSerializer
from users.serializers import UserSerializer

from users.serializers import AddressSerializer
from . import models


class HolidaySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Holiday
        fields = '__all__'


class DoctorSerializer(serializers.ModelSerializer):
    holidays = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = models.Doctor
        fields = '__all__'

    def get_holidays(self, obj):
        days = obj.holidays.all()
        serializer = HolidaySerializer(days, many=True)
        return serializer.data


class ServiceSerializer(serializers.ModelSerializer):
    doctors = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = models.Service
        fields = '__all__'

    def get_doctors(self, obj):
        items = obj.doctors.all()
        serializer = DoctorSerializer(items, many=True)
        return serializer.data


class AppointmentSerializer(serializers.ModelSerializer):
    service = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    doctor = serializers.SerializerMethodField(read_only=True)
    pet = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = models.Appointment
        fields = '__all__'


    def get_service(self, obj):
        try:
            service = ServiceSerializer(obj.service, many=False).data     
        except:
            service = False
            
        return service
    
    def get_doctor(self, obj):
        try:
            doctor = DoctorSerializer(obj.doctor, many=False).data     
        except:
            doctor = False
            
        return doctor
        
    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data
    
    def get_pet(self, obj):
        try:
            pet = PetSerializer(obj.pet, many=False).data     
        except:
            pet = False
            
        return pet
  
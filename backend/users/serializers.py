from djoser.serializers import UserCreateSerializer
from django.contrib.auth import  get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

from . import models

# retrieve the user model
User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id','first_name', 'last_name', 'email', 'phone', 'image_profile', 'is_active')


class  MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserCreateSerializer(self.user).data
        for key, value in serializer.items():
            data[key] = value
        return data
    

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Address
        fields = '__all__'
    

class UserSerializer(serializers.ModelSerializer):
    addresses = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    
    class Meta:
        model = User
        fields = ('id','first_name', 'last_name', 'email', 'phone', 'image_profile', 'is_active', 'addresses')
    

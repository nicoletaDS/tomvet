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

from . import models, serializers

User = get_user_model()

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = serializers.MyTokenObtainPairSerializer

class UserActivationView(APIView):
    def get (self, request, uid, token):
        protocol = 'https://' if request.is_secure() else 'http://'
        web_url = protocol + request.get_host()
        post_url = web_url + "/api/users/activation/"
        post_data = {'uid': uid, 'token': token}
        result = requests.post(post_url, data = post_data)
        return HttpResponseRedirect(redirect_to='http://localhost:3000/conectare/')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    user = request.user
    serializer = serializers.UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_addresses(request):
    addresses = models.Address.objects.filter(user=request.user)
    serializer = serializers.AddressSerializer(addresses, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_address(request):
    user = request.user
    data = request.data
    address = models.Address.objects.create(
        user=user,
        county=data['county'],
        city=data['city'],
        str=data['str'],
        nr=data['nr'],
        apartment=data['apartment']
    )
    serializer = serializers.AddressSerializer(address, many=False)
    return Response(serializer.data)


@api_view(['DELETE', 'GET'])
@permission_classes([IsAuthenticated])
def address(request, id):
    address = get_object_or_404(models.Address, pk=id) 
    
    if request.method == 'GET': 
        serializer = serializers.AddressSerializer(address, many=False)
        return Response(serializer.data)
    else:
         if address.user != request.user:
            return Response({'message': 'Unauthorized'}, status=status.HTTP_400_BAD_REQUEST) 
         address.delete()
         return Response({'message': 'Address was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
   
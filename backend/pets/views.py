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

from . import models, serializers


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_pets(request):
    pets = models.Pet.objects.filter(user=request.user)
    serializer = serializers.PetSerializer(pets, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_pet(request, id):
    pet = models.Pet.objects.get(pk=id)
    if pet.user != request.user:
            return Response({'message': 'Unauthorized'}, status=status.HTTP_400_BAD_REQUEST) 

    serializer = serializers.PetSerializer(pet, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_pet(request):
    user = request.user
    data = request.data
    hasPassport = True if data['passport'] == 'true' else False

    pet = models.Pet.objects.create(
        user=user,
        name=data['name'],
        birthday=data['birthday'],
        cipNr=data['cipNr'],
        passport=hasPassport,
        weight = data['weight'],
        owner = data.get('owner', None),
    )

    serializer = serializers.PetSerializer(pet, many=False)
    return Response(serializer.data)

   
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_tasks(request):
    # return all tasks from all pets of the registered user
    pets = models.Pet.objects.filter(user=request.user)
    response = []
    for p in pets:
        tasks = models.Task.objects.filter(pet=p)
        serializer = serializers.TaskSerializer(tasks, many=True)
        response.extend(serializer.data)

    return Response(response)


@api_view(['GET', 'PATCH'])
def get_update_task(request, id):
    # get/update the task, if the owner of the pet assigned to the task
    # is the registered user else 400
    task = get_object_or_404(models.Task, pk=id)
    if request.user != task.pet.user:
        return Response({'message': 'Unauthorized'}, status=status.HTTP_400_BAD_REQUEST)
    
    if (request.method == "PATCH"):
        data = request.data
        if data['done'] == "True":
            task.done = True
        else:
            task.done = False
        task.save()

    serializer = serializers.TaskSerializer(task, many=False)
    return Response(serializer.data)
        

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_task(request, id):
    user = request.user
    data = request.data
    pet = get_object_or_404(models.Pet, pk=id)
    if pet.user != user:
         return Response({'message': 'Unauthorized'}, status=status.HTTP_400_BAD_REQUEST)
    
    start_date = date.fromisoformat(data['startDate'])
    if data['endDate']:
        end_date = date.fromisoformat(data['endDate'])
    else:
        end_date = None

    task = models.Task.objects.create(
        pet=pet,
        title=data['title'],
        details=data['details'],
        startDate=start_date,
        endDate=end_date,
        repeat = data['repeat'],
        isTreatment = data['isTreatment'],
    )

    serializer = serializers.TaskSerializer(task, many=False)
    return Response(serializer.data)
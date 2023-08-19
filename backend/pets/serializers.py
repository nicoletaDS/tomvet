from rest_framework import serializers

from . import models


class TaskSerializer(serializers.ModelSerializer):
    pet = serializers.PrimaryKeyRelatedField(read_only=True, many=False)
    
    class Meta:
        model = models.Task
        fields = '__all__'
    

class PetSerializer(serializers.ModelSerializer):
    tasks = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = models.Pet
        fields = '__all__'

    def get_tasks(self, obj):
        tasks = obj.tasks.all()
        serializer = TaskSerializer(tasks, many=True)
        return serializer.data
  
    


    

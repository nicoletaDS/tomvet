from rest_framework import serializers
from users.serializers import UserSerializer

from users.serializers import AddressSerializer
from . import models


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OrderItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    deliveryAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = models.Order
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderItems.all() # Returns all OrderItem objects related to obj(order).
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_deliveryAddress(self, obj):
        try:
            address = AddressSerializer(obj.delivery_address, many=False).data     
        except:
            address = False
            
        return address
        
    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data
  
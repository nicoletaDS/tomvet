from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from users.models import User

from . import models, serializers


@api_view(['GET'])
def get_all_products(request):
    products = models.Product.objects.all()
    serializer = serializers.ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_product(request, id):
    product = get_object_or_404(models.Product, pk=id)
    serializer = serializers.ProductSerializer(product, many=False)
    return Response(serializer.data)

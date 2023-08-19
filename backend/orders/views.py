
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import datetime
import stripe
from django.conf import settings
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

from users.models import User, Address
from products.models import Product
from . import models, serializers


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_orders(request):
    user = request.user
    orders = models.Order.objects.filter(user=user)
    serializer = serializers.OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_order_detail(request, id):
    order = get_object_or_404(models.Order, pk=id)
    if order.user != request.user:
        return Response({'message': 'Unauthorized'}, status=status.HTTP_400_BAD_REQUEST) 
    
    serializer = serializers.OrderSerializer(order, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_order(request):
    data = request.data
    orderItems = data['orderItems']
    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    
    delivery_address = Address.objects.create(
        user=request.user,
        county=data["delivery_address"]["county"],
        city=data["delivery_address"]["city"],
        str=data["delivery_address"]["str"],
        nr=data["delivery_address"]["nr"],
        apartment=data["delivery_address"]["apartment"]
    )
    # set delivery date in one week. Kann be changed based on delivery address
    delivery_date = datetime.datetime.now().date() + datetime.timedelta(days=7)

    order = models.Order.objects.create(
        user=request.user,
        delivery_address=delivery_address,
        delivery_date=delivery_date
    )

    # Create order items and set orderItem relationship
    # in OrderSerializer, all orderItems are retrieved

    total_price = 0

    for item in orderItems:
        product = Product.objects.get(pk=item['product'])
        price = product.price * item['qty']
        total_price += price

        models.OrderItem.objects.create(
            product=product,
            order=order,
            qty=item['qty'],
            price=price
        )

    # Update product count_in_stock
    product.count_in_stock -= item['qty']
    product.save()

    # Add order price (it should be calculated and not read from request)
    order.price = total_price
    order.save()

    serializer = serializers.OrderSerializer(order, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def set_paid_order(request, id):
    order = get_object_or_404(models.Order, pk=id)
    order.is_paid = True
    order.is_paid = datetime.now()
    order.save()
    serializer = serializers.OrderSerializer(order, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def createCheckoutSession(request, id):

    order = models.Order.objects.get(pk=id)
    orderItems = order.orderItems.all()
    items = []

    for orderItem in orderItems:
        element = {
            "price_data": {
                "currency": "ron",
                "product_data": {
                    "name": orderItem.product.title,
                    },
                "unit_amount": int(orderItem.price * 100),
            },
            "quantity": orderItem.qty,
        }
        items.append(element)

    stripe.api_key = settings.STRIPE_SECRET_KEY

    try:
        checkout_session = stripe.checkout.Session.create(
                line_items = items,
                payment_method_types=['card',],
                mode='payment',
                success_url=f"{settings.SITE_URL}/orders/{id}?success=true",
                cancel_url=f"{settings.SITE_URL}/orders/{id}?canceled=true",
            )
        return redirect(checkout_session.url)

    except:
        return Response(
            {'error': 'Something went wrong when creating stripe checkout session'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@csrf_exempt
def stripe_webhook_view(request):
    # TODO: update order to isPaid
    payload = request.body
    event = None
    stripe.api_key = settings.STRIPE_SECRET_KEY

    try:
        event = stripe.Event.construct_from(
        payload, stripe.api_key
        )
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400)

    # Handle the event
    if event.type == 'payment_intent.succeeded':
        payment_intent = event.data.object # contains a stripe.PaymentIntent
        # Then define and call a method to handle the successful payment intent.
        # handle_payment_intent_succeeded(payment_intent)
    elif event.type == 'payment_method.attached':
        payment_method = event.data.object # contains a stripe.PaymentMethod
        # Then define and call a method to handle the successful attachment of a PaymentMethod.
        # handle_payment_method_attached(payment_method)
    # ... handle other event types
    else:
        print('Unhandled event type {}'.format(event.type))

    return HttpResponse(status=200)
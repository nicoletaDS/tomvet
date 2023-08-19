from django.urls import path

from . import views

urlpatterns=[
    path('', views.get_all_orders, name='all_orders'),
    path('<int:id>/', views.get_order_detail, name='order_detail'),
    path('add/', views.add_order, name='add_order'),
    path('<int:id>/update/', views.set_paid_order, name='update_order'),
    path('<str:id>/stripe/create-checkout-session', views.createCheckoutSession, name='checkout-session'),
    path('webhook/', views.stripe_webhook_view, name='webhook-pay'),
]
from django.urls import path

from products import views

urlpatterns=[
    path('', views.get_all_products, name='products'),
    path('<int:id>/', views.get_product, name='product'),
]
from django.urls import path, re_path
from users import views
from users.views import MyTokenObtainPairView, UserActivationView


urlpatterns=[
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    re_path(r'activate/(?P<uid>[\w-]+)/(?P<token>[\w-]+)/$', UserActivationView.as_view()),
    path('profile/', views.get_profile, name='profile'),

    path('address/', views.get_my_addresses, name='my_addresses'),
    path('address/add/', views.add_address, name='add_address'),
    path('address/<int:id>/', views.address, name='get_delete_address'),
]
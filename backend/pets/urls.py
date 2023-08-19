from django.urls import path

from . import views

urlpatterns=[
    path('', views.get_all_pets, name='pets'),
    path('add/', views.add_pet, name='add_pet'),
    path('<int:id>/', views.get_pet, name='pet'),

    path('tasks/', views.get_all_tasks, name='tasks'),
    path('tasks/add/', views.add_task, name='add_task'),
    path('tasks/<int:id>/', views.get_update_task, name='task'),
]
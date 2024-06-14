from django.urls import path
from web import views


app_name = 'webapp'

urlpatterns = [
    path('', views.home),
]
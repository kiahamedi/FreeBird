from django.urls import path
from account import views as account_views
from django.contrib.auth import views


app_name = 'account'

urlpatterns = [
    path("login/", views.LoginView.as_view(), name="login"),
]

urlpatterns += [
    path('', account_views.home, name="home"),
    path('profile/', account_views.profile, name="profile"),
]
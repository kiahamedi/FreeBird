from django.urls import path
from account import views as account_views
from django.contrib.auth import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

app_name = 'account'

urlpatterns = [
    path("login/", views.LoginView.as_view(), name="login"),
    path("logout/", views.LogoutView.as_view(), name="logout"),
]

urlpatterns += [
    path('', account_views.home_or_trash, name="home"),
    path('trash/', account_views.home_or_trash, name="trash"),
    path('profile/', account_views.profile, name="profile"),
    path('api/upload/', account_views.UploadFile.as_view()),
    path('api/createfolder/', account_views.CreateFolder.as_view()),
    path('api/ourobjects/', account_views.OurObjects.as_view()),
    path('api/information/', account_views.InformationObject.as_view()),
    path('api/rename/', account_views.RenameObject.as_view()),
    path('api/movetotrash/', account_views.MoveToTrashObject.as_view()),
    path('api/removeforever/', account_views.RemoveItemForEver.as_view()),
    path('api/moveorcopyobject/', account_views.MoveOrCopyObject.as_view()),
    
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
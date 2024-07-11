from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from account.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken


# Create your views here.

@login_required
def home(request):
    context = {
        
    }
    response = render(request, 'account/home.html', context)
    refresh = RefreshToken.for_user(request.user)
    response.set_cookie("jr" , str(refresh))
    response.set_cookie("ja" , str(refresh.access_token))
    return response


@login_required
def profile(request):
    context = {
        'state' : 'profile'
    }
    return render(request, 'account/profile.html', context)


class UploadFile(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        content = {
            'msg' : "Your file successfully uploaded",
            'data' : None
        }
        return Response(content, status=status.HTTP_201_CREATED)

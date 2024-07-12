from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from account.models import User, Object
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from extensions.utils import convert_size


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

    def post(self, request):
        userFile = request.FILES.get('user-file')
        userFilePath = request.POST.get('user-file-path')
        userFileType = request.POST.get('user-file-type')
        
        owner = request.user
        userFileName = userFile.name
        userFileSize = convert_size(userFile.size)

        newFile = Object()
        newFile.owner = owner
        newFile.name = userFileName
        newFile.iFile = True
        newFile.iFolder = False
        newFile.uploadFile = userFile
        newFile.iformat = userFileType
        newFile.size = userFileSize
        newFile.path = userFilePath
        newFile.save()
        
        content = {
            'msg' : "Your file successfully uploaded",
            'data' : None
        }
        
        return Response(content, status=status.HTTP_201_CREATED)

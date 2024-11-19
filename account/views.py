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
import os


# Create your views here.

@login_required
def home_or_trash(request):
    
    page = 'My Drive'
    
    isTrash = False
    if "trash" in request.path:
        isTrash = True
        page = 'Trash'

    context = {
        'page' : page
    }
    
    response = render(request, 'account/home.html', context)
    refresh = RefreshToken.for_user(request.user)
    response.set_cookie("pwd" , '/root')
    response.set_cookie("pwd_id" , '/root')
    response.set_cookie("jr" , str(refresh))
    response.set_cookie("ja" , str(refresh.access_token))
    
    if isTrash:
        response.set_cookie("is_trash" , 1)
    else:
        response.set_cookie("is_trash" , 0)
        
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



class CreateFolder(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        pwd = request.POST.get('pwd')
        pwd = pwd.replace('"','')
        userFolderName = request.POST.get('folder-name')
        
        owner = request.user
        
        targetFolderName = userFolderName
        index = 1
        while True:
            try:
                existFolder = Object.objects.get(owner=owner, iFolder=True, name=targetFolderName)
                if f"({index + 1})" in targetFolderName:
                    index += 1
                else:
                    targetFolderName = f"{userFolderName} ({index + 1})"
            except:
                break

        newFile = Object()
        newFile.owner = owner
        newFile.name = targetFolderName
        newFile.iFile = False
        newFile.iFolder = True
        newFile.iformat = 'folder'
        newFile.path = pwd
        newFile.save()
        
        content = {
            'msg' : "Your folder created successfully",
            'data' : None
        }
        
        return Response(content, status=status.HTTP_201_CREATED)



class OurObjects(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        pwd = request.POST.get('pwd')
        folderId = request.POST.get('folderId')
        folderName = request.POST.get('folderName')
        isTrash = request.POST.get('isTrash')
        owner = request.user
        
        if isTrash == 0 or isTrash == '0':
            if folderName == 'null':
                objects = Object.objects.filter(owner=owner, path=pwd).exclude(trash=True).order_by('-iFolder')
            else:
                targetPWD = f"{pwd}/{folderName}"
                objects = Object.objects.filter(owner=owner, path=targetPWD).exclude(trash=True).order_by('-iFolder')
        else:
            if folderName == 'null':
                objects = Object.objects.filter(owner=owner, path=pwd).exclude(trash=False).order_by('-iFolder')
            else:
                targetPWD = f"{pwd}/{folderName}"
                objects = Object.objects.filter(owner=owner, path=targetPWD).exclude(trash=False).order_by('-iFolder')
                
        alldata=[]
        
        for data in objects:
            if data.iFile:
                dataurl = data.uploadFile.url
            else:
                dataurl = None
            alldata.append({
                'id': data.id,
                'owner': data.owner.username,
                'name': data.name,
                'ifile': data.iFile,
                'ifolder': data.iFolder,
                'uploadfile': dataurl,
                'iformat': data.iformat,
                'size': data.size,
                'pwd': data.path,
                'stared': data.stared,
                'created': data.created.strftime('%Y-%m-%d %H:%M'),
                'updated': data.updated.strftime('%Y-%m-%d %H:%M')
            })
        
        content = {
            'msg' : "Your objects",
            'data' : alldata,
            
        }
        
        return Response(content, status=status.HTTP_200_OK)



class InformationObject(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        objectId = request.POST.get('objectId')
        
        target_object = Object.objects.get(id=objectId)
        
        target_type = 'File'
        if target_object.iFile: 
            target_type = "File" 
        else: 
            target_type = "Folder"
        
        imageUrl = None
        if "image/" in target_object.iformat:
            imageUrl = target_object.uploadFile.url
        
        shared = target_object.sharedTo.all().count()
        if shared == 0:
            shared = False
        else:
            shared = True
            
        data = {
            'name' : target_object.name,
            'owner' : target_object.owner.get_full_name(),
            'type' : target_type,
            'size' :  target_object.size,
            'path' : target_object.path,
            'shared' : shared,
            'imageUrl' : imageUrl,
            'created': target_object.created.strftime('%a %H:%M  %d/%m/%y'),
            'updated' : target_object.updated.strftime('%a %H:%M  %d/%m/%y')
        }
        
        content = {
            'msg' : "Information object",
            'data' : data,
        }
        
        return Response(content, status=status.HTTP_200_OK)



class RenameObject(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        objectId = request.POST.get('objectId')
        objectNewName = request.POST.get('objectNewName')
        
        try:
            target_object = Object.objects.get(id=int(objectId), owner=request.user)
        except:
            content = {
                'msg' : "404 Not Found",
                'data' : None,
            }
            return Response(content, status=status.HTTP_404_NOT_FOUND)
        
        if objectNewName == "" or objectNewName is None:
            content = {
                'msg' : "400 Bad Request",
                'data' : None,
            }
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        
        targetName = objectNewName
        index = 1
        while True:
            try:
                existFolder = Object.objects.get(owner=request.user, iFolder=True, name=targetName)
                if f"({index + 1})" in targetName:
                    index += 1
                else:
                    targetName = f"{objectNewName} ({index + 1})"
            except:
                break

        target_object.name = targetName
        target_object.save()
        
        data = {
            'id': target_object.id,
            'name': target_object.name
        }
        
        content = {
            'msg' : "Renamed was successfull!",
            'data' : data,
        }
        
        return Response(content, status=status.HTTP_200_OK)






class MoveToTrashObject(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        objectId = request.POST.get('objectId')
        objectRestoreStatus = request.POST.get('objectRestoreStatus')
        
        if objectRestoreStatus == '1' or objectRestoreStatus == 1:
            isTrashStatus = False
        elif objectRestoreStatus == '0' or objectRestoreStatus == 0:
            isTrashStatus = True
        
        try:
            target_object = Object.objects.get(id=int(objectId), owner=request.user)
        except:
            content = {
                'msg' : "404 Not Found",
                'data' : None,
            }
            return Response(content, status=status.HTTP_404_NOT_FOUND)
        

        target_object.trash = isTrashStatus
        target_object.save()
        
        data = {
            'id': target_object.id
        }
        
        content = {
            'msg' : "Removed was successfull!",
            'data' : data,
        }
        
        return Response(content, status=status.HTTP_200_OK)



class RemoveItemForEver(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        objectId = request.POST.get('objectId')
        
        print(objectId)
        try:
            target_object = Object.objects.get(id=int(objectId), owner=request.user, trash=True)
        except:
            content = {
                'msg' : "404 Not Found",
                'data' : None,
            }
            return Response(content, status=status.HTTP_404_NOT_FOUND)
        
        targetID = target_object.id
        
        try:
            os.remove(target_object.uploadFile.path)
        except:
            pass
        
        target_object.delete()
        
        data = {
            'id': targetID
        }
        
        content = {
            'msg' : "Removed was successfull!",
            'data' : data,
        }
        
        return Response(content, status=status.HTTP_201_CREATED)



class MoveOrCopyObject(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        objectIds = request.POST.get('objectIds').split(",")
        mode = request.POST.get('mode')
        pwd = request.POST.get('pwd')
    
        
        if mode == "move":
             
            for items in objectIds:
                try:
                    target_object = Object.objects.get(id=int(items), owner=request.user)
                except:
                    content = {
                        'msg' : "404 Not Found",
                        'data' : None,
                    }
                    return Response(content, status=status.HTTP_404_NOT_FOUND)
                
                if target_object.iFolder == False:
                    target_object.path = pwd
                    target_object.save()
                    
                elif target_object.iFolder == True:
                    foldePWD =target_object.path +"/"+ target_object.name
                    objects = Object.objects.filter(owner=request.user, path__startswith=foldePWD , trash=False)
                    for f in objects:
                        f.path = f.path.replace(target_object.path, pwd)
                        f.save()
                    target_object.path = pwd
                    target_object.save()
                        
                    
            content = {
                'msg' : "Moved was successfull!",
                'data' : None,
            }
            return Response(content, status=status.HTTP_200_OK)
        elif mode == "copy":
            content = {
                'msg' : "Copied was successfull!",
                'data' : None,
            }
            
            return Response(content, status=status.HTTP_200_OK)
        else:
            content = {
                'msg' : "404 Not Found",
                'data' : None,
            }
            return Response(content, status=status.HTTP_404_NOT_FOUND)

        

        # target_object.trash = isTrashStatus
        # target_object.save()
        
        # data = {
           
        # }
        
        # content = {
        #     'msg' : "Copied was successfull!",
        #     'data' : data,
        # }
        
        # return Response(content, status=status.HTTP_200_OK)
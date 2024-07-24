from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

def upload_to(instance, filename):
    print(instance.owner)
    return f'drive/{instance.owner.username}/{filename}'


class User(AbstractUser):
    phone = models.CharField(null=True, blank=True ,max_length=20 ,verbose_name="Phone")


class Object(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="owner" ,verbose_name="Owner")
    name = models.CharField(null=False, blank=False, max_length=150 ,verbose_name="Name")
    iFile = models.BooleanField(default=False, verbose_name="Is File")
    iFolder = models.BooleanField(default=False, verbose_name="Is Folder")
    uploadFile = models.FileField(null=True, blank=True, upload_to=upload_to , verbose_name="File")
    iformat = models.CharField(null=True, blank=True, max_length=150 ,verbose_name="Format")
    size = models.CharField(null=True, blank=True, max_length=150 ,verbose_name="Size")
    path = models.TextField(null=False, blank=False ,verbose_name="Path")
    trash = models.BooleanField(default=False, verbose_name="Is Trash")
    stared = models.BooleanField(default=False, verbose_name="Is Stared")
    sharedTo = models.ManyToManyField(User, related_name="sharedTo" ,verbose_name="Shared To")
    sharedLink = models.CharField(null=True, blank=True, max_length=200 ,verbose_name="Shared Link")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        if self.iFile:
            return self.name + " | File"
        else:
            return self.name + " | Folder"
        

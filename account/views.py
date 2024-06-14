from django.shortcuts import render
from django.contrib.auth.decorators import login_required


# Create your views here.

@login_required
def home(request):
    context = {
        
    }
    return render(request, 'account/home.html', context)


@login_required
def profile(request):
    context = {
        'state' : 'profile'
    }
    return render(request, 'account/profile.html', context)
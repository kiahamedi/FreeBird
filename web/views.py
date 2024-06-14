from django.shortcuts import render



# Create your views here.
def home(request):
    context = {
        'version' : 1.02
    }
    return render(request, 'home.html', context)

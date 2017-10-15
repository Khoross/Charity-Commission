from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from api.models import LACount

# Create your views here.


def index(request):
    return(HttpResponse("Main index test page"))


def cloud(request):
    context = {'area_names': LACount.objects
                                    .filter(aootype='B')
                                    .order_by('aooname')
                                    .values_list('aooname', flat=True)}
    return render(request, 'clouds/wordcloud.html', context)

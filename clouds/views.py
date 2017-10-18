from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from api.models import WordData

# Create your views here.


def index(request):
    return(HttpResponse("Main index test page"))


def cloud(request):
    context = {'areanames': WordData.objects
                                    .filter(aootype='B')
                                    .order_by('aooname')
                                    .values('aooname', 'aookey')
                                    .distinct()
               'algs':      WordData.objects
                                    .order_by('calc_type')
                                    .values('calc_type', 'calc_name')
                                    .distinct()
    return render(request, 'clouds/wordcloud.html', context)

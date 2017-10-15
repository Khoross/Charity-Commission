from tastypie.resources import ModelResource
from .models import *


class LACountResource(ModelResource):
    class Meta:
        queryset = LACount.objects.all()
        resource_name = 'LACount'


class AreaCountResource(ModelResource):
    class Meta:
        queryset = AreaCount.objects.all()
        resource_name = 'AreaCount'


class LAWordsResource(ModelResource):
    class Meta:
        queryset = LAWords.objects.all()
        resource_name = 'LAWords'


class AreaWordsResource(ModelResource):
    class Meta:
        queryset = AreaWords.objects.all()
        resource_name = 'AreaWords'

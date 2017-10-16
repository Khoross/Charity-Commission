from tastypie import fields
from tastypie.resources import ModelResource
from .models import *


class WordDataResource(ModelResource):
    class Meta:
        queryset = WordData.objects.all()
        limit = 0
        filtering = {'aootype': ALL,
                     'aookey': ALL,
                     'aooname': ALL,
                     'calc_type': ALL, }
        ordering = ['expend', 'income', 'charity_count', 'subsidiary_count']

    def dehydrate_calc_type(self, bundle):
        return(WordData.calc_type_strings[bundle.data['calc_type']])

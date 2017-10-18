from tastypie import fields
from tastypie.resources import ModelResource
from .models import *


class WordDataResource(ModelResource):
    hidden = fields.BooleanField(readonly=True)
    class Meta:
        queryset = WordData.objects.all()
        limit = 0
        filtering = {'aootype': ALL,
                     'aookey': ALL,
                     'aooname': ALL,
                     'calc_type': ALL,
                     'word': ALL}
        ordering = ['expend', 'income', 'charity_count', 'subsidiary_count']

    def dehydrate_calc_type(self, bundle):
        return(WordData.calc_type_strings[bundle.data['calc_type']])
    
    def dehydrate_hidden(self, bundle):
        return(bundle.request
                     .session
                     .get(bundle.data['aootype'], {})
                     .get(bundle.data['aookey'], {})
                     .get(bundle.data['word'], False))
    
    def dehydrate(self, bundle):
        if hasattr(bundle.request, 'GET'):
            if bundle.request.GET.get('weight', None) is not None and 
               bundle.request.GET.get('weight', '') in bundle.data.keys():
                bundle.data['weight'] = bundle.data[bundle.request.GET.get('weight')]
                del bundle.data['income']
                del bundle.data['expend']
                del bundle.data['charity_count']
                del bundle.data['subsidiary_count']
        return(bundle)

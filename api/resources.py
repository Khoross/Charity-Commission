from tastypie import fields
from tastypie.resources import ModelResource
from .models import *


class WordDataResource(ModelResource):
    hidden = fields.BooleanField(readonly=True)
    idx = fields.IntegerField(readonly=True)
    class Meta:
        queryset = WordData.objects.all()
        limit = 0
        filtering = {'aootype': ALL,
                     'aookey': ALL,
                     'aooname': ALL,
                     'calc_type': ALL,
                     'calc_name': ALL,
                     'word': ALL}
        ordering = ['expend', 'income', 'charity_count', 'subsidiary_count']
    
    def dehydrate_hidden(self, bundle):
        return([bundle.request
                      .session
                      .get(aootype, {})
                      .get(aookey, {})
                      .get(word, False)
               for aootype, aookey, word in 
                zip(bundle.data['aootype'],
                    bundle.data['aookey'],
                    bundle.data['word'])])
    
    def dehydrate_idx(self, bundle):
        return([*range(length(bundle.data['word']))])
    
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

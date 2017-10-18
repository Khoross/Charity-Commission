from django.shortcuts import render

# Create your views here.
def toggle_session(request):
    if not request.is_ajax() or not request.method=='POST':
        return HttpResponseNotAllowed(['POST'])
    try:
        data = request.POST
        if request.session[data['aootype']] is None:
            request.session[data['aootype']] = {data['word']: True}
        else:
            request.session[data['aootype']]\
                   .update({data['word']: not request.session[data['aootype']]
                                                     .get(data['word'], False)}
            request.session.modified = True
    return HttpResponse('ok')

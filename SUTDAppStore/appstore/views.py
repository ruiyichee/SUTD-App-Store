from django.shortcuts import render

# Create your views here.
from django.http import HttpResponseRedirect, HttpResponse
from django.template import loader
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic
from .models import App



# Create your views here.
# def index(request):
#     template = loader.get_template('appstore/index.html')
#     context = {
#         # 'latest_question_list': latest_question_list,
#     }
#     return HttpResponse(template.render(context, request))

class IndexView(generic.ListView):
    template_name = 'appstore/index.html'
    context_object_name = 'latest_app_list'
    def get_queryset(self):
        """Return the last five published apps."""
        return App.objects.order_by('-pub_date')[:5]

def index(request):
    latest_app_list = App.objects.order_by('-pub_date')[:5]
    context = {'latest_app_list': latest_app_list}
    return render(request, 'appstore/index.html', context)

def detail(request, app_id):
    app = get_object_or_404(App, pk=app_id)
    return render(request, 'appstore/detail.html', {'app': app})

class DetailView(generic.DetailView):
    model = App
    template_name = 'appstore/detail.html'
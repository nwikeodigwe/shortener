from django.shortcuts import render
from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist
from shorten.models import Url

# Create your views here.
def say_hello(request):
    # try:
    #     product = Url.objects.get(pk=1)
    # except ObjectDoesNotExist:
    #     pass
    product = Url.objects.filter(pk=0).first()
    print(product)
    
    return render(request, 'hello.html', {'name': 'Nwike'})

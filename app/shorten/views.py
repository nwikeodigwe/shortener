from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UrlSerializer
from .models import Url

@api_view()
def index(request):
    return Response('OK')

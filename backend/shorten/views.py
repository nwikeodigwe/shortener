from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import ListModelMixin, CreateModelMixin, RetrieveModelMixin
from rest_framework.response import Response
from rest_framework import status
from .serializers import UrlSerializer, VisitSerializer
from .models import Url, Visit

class UrlViewSet(CreateModelMixin, RetrieveModelMixin, GenericViewSet):
    serializer_class = UrlSerializer
    lookup_field = 'url_code'

    def get_queryset(self):
        return Url.objects.filter(url_code=self.kwargs['url_code'])   

class UrlVisitsViewSet(ListModelMixin, CreateModelMixin, GenericViewSet):
    serializer_class = VisitSerializer
    
    def get_serializer_context(self):
        return {'url_code': self.kwargs['url_url_code']}
    
    def get_queryset(self):
        return Visit.objects.filter(url__url_code=self.kwargs['url_url_code'])

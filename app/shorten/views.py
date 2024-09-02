from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from .serializers import UrlSerializer, VisitSerializer
from .models import Url, Visit

class UrlViewSet(ModelViewSet):
    queryset = Url.objects.all()
    serializer_class = UrlSerializer

    def destroy(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
    

class UrlVisitsViewSet(ModelViewSet):
    queryset = Visit.objects.select_related('url').all()
    serializer_class = VisitSerializer

    def destroy(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    def get_serializer_context(self):
        return {'url_id': self.kwargs['url_pk']}

from rest_framework import serializers
from .models import Url, Visit

class UrlSerializer(serializers.ModelSerializer):
    visit_count = serializers.SerializerMethodField(method_name='get_visit_count')
    url_code = serializers.CharField(required=False, allow_blank=True)
    expiration = serializers.DateTimeField(required=False)

    def get_visit_count(self, obj):
        return obj.visit_url.count()

    class Meta:
        model = Url
        fields = ['id', 'long_url', 'url_code', 'expiration', 'status', 'visit_count', 'created_at']

class VisitSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField(method_name='get_url_address')

    def get_url_address(self, obj):
        return obj.url.long_url
    
    def create(self, validated_data):
        url_code = self.context.get('url_code')
        url = Url.objects.get(url_code=url_code)
        print('Validated Data', validated_data)
        return Visit.objects.create(url=url, **validated_data)

    class Meta:
        model = Visit
        fields = ['id', 'payload', 'browser_client', 'url', 'created_at']
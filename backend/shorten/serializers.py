from rest_framework import serializers
from .models import Url, Visit

class UrlSerializer(serializers.ModelSerializer):
    visit_count = serializers.SerializerMethodField(method_name='get_visit_count')

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
        url_id = self.context['url_id']
        return Visit.objects.create(url_id=url_id, **validated_data)

    class Meta:
        model = Visit
        fields = ['id', 'ip_address', 'browser_client', 'url', 'created_at']
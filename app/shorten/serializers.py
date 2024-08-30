from rest_framework import serializers

class UrlSerializer(serializers.Serializer):
    ACTIVE = 'a'
    INACTIVE = 'i'
    SUSPENDED = 's'
    URL_STATUS = {
        ACTIVE: "ACTIVE",
        INACTIVE: "INACTIVE",
        SUSPENDED: "SUSPENDED"
    }  
    id = serializers.IntegerField()
    long_url = serializers.URLField()
    url_code = serializers.CharField(max_length=7)
    expiration = serializers.DateTimeField()
    status = serializers.CharField(max_length=1, choices=URL_STATUS)
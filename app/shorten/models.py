from django.db import models

class Url(models.Model):
    ACTIVE = 'a'
    INACTIVE = 'i'
    SUSPENDED = 's'
    URL_STATUS = {
        ACTIVE: "ACTIVE",
        INACTIVE: "INACTIVE",
        SUSPENDED: "SUSPENDED"
    }  

    long_url = models.URLField()
    url_code = models.CharField(max_length=7)
    expiration = models.DateTimeField(null=False)
    status = models.CharField(max_length=1, choices=URL_STATUS, default=ACTIVE)
    created_at = models.DateTimeField(auto_now_add=True )
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.long_url

    class Meta:
        ordering = ['created_at']

class Visit(models.Model):
    url = models.ForeignKey(Url, on_delete=models.CASCADE, related_name='url_visit')
    ip_address = models.GenericIPAddressField()
    browser_client = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.ip_address
    
    class Meta:
        ordering = ['created_at']
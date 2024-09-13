from django.db import models
from datetime import timedelta, datetime
import random
import string


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

    def generate_url_code(self):
        characters = string.ascii_letters + string.digits
        while True:
            code = ''.join(random.choice(characters) for _ in range(7))
            if not Url.objects.filter(url_code=code).exists():
                self.url_code = code
                break

    def generate_expiration(self):
        if not self.expiration:
            self.expiration = datetime.now() + timedelta(days=30)

    def save(self, *args, **kwargs):
        if not self.url_code:
            self.generate_url_code()
        if not self.expiration:
            self.generate_expiration()
        super(Url, self).save(*args, **kwargs)
        

    def __str__(self) -> str:
        return self.long_url

    class Meta:
        ordering = ['created_at']

class Visit(models.Model):
    url = models.ForeignKey(Url, on_delete=models.CASCADE, related_name='visit_url')
    payload = models.JSONField(null=True)
    browser_client = models.JSONField(null=True)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.ip_address
    
    class Meta:
        ordering = ['created_at']
from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register('urls', views.UrlViewSet, basename='urls')

url_router = routers.NestedDefaultRouter(router, 'urls', lookup='url')
url_router.register('visits', views.UrlVisitsViewSet, basename="url-visits")

urlpatterns = router.urls + url_router.urls

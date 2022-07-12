from django.urls import include, path
from rest_framework import routers

from .views import TruckViewSet

from .views import SimpleAPIView

router = routers.DefaultRouter()
router.register(r'trucks', TruckViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('test', SimpleAPIView.as_view(), name='test_api_view'),
]

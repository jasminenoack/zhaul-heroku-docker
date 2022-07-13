from django.urls import include, path
from rest_framework import routers

from .views import TruckViewSet, SimpleAPIView, LoginAPIView, LogoutAPIView, UserInfo

router = routers.DefaultRouter()
router.register(r'trucks', TruckViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('test/', SimpleAPIView.as_view(), name='test_api_view'),
    path('auth/login/', LoginAPIView.as_view(), name="api-auth-login"),
    path('auth/logout/', LogoutAPIView.as_view(), name="api-auth-logout"),
    path('current_user/', UserInfo.as_view())
]

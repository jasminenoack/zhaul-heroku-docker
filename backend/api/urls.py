from django.urls import include, path
from rest_framework import routers

from .views import (
    TruckViewSet,
    LoginAPIView,
    LogoutAPIView,
    UserInfo,
    RegisterUserView,
    ViewReservations,
)

router = routers.DefaultRouter()
router.register(r'trucks', TruckViewSet, basename='trucks')
router.register(r'reservations', ViewReservations, basename='reservations')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', RegisterUserView.as_view(), name='create_user'),
    path('auth/login/', LoginAPIView.as_view(), name="api-auth-login"),
    path('auth/logout/', LogoutAPIView.as_view(), name="api-auth-logout"),
    path('current_user/', UserInfo.as_view(), name='current_user'),
]



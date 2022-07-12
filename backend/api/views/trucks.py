from rest_framework import viewsets
from rest_framework import permissions
from ..models import Truck
from ..serializers import TruckSerializer


class TruckViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Truck.objects.all().order_by('price_per_hour')
    serializer_class = TruckSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

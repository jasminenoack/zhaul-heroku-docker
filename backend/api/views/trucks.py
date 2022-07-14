from rest_framework import viewsets
from rest_framework import permissions
from ..models.helpers import get_available_trucks
from ..serializers import TruckSerializer
from dateutil.parser import parse


class TruckViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    serializer_class = TruckSerializer
    permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]

    def get_queryset(self):
        start_time = parse(self.request.GET['start_time'])
        end_time = parse(self.request.GET['end_time'])
        truck_type = self.request.GET['truck_type']
        return get_available_trucks(start_time, end_time, truck_type)

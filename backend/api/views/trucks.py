from rest_framework import viewsets
from rest_framework import permissions
from ..models.helpers import get_available_trucks
from ..serializers import TruckSerializer
from dateutil.parser import parse


class TruckViewSet(viewsets.ModelViewSet):
    """
    This uses a model viewset
    At the moment this means that this is actually providing more endpoints than the app actually uses.
    Right now we only use
    - GET on the list endpoint

    We could cut out the extra endpoints by doing:

    `class TruckViewSet(mixins.ListModelMixin):`

    This uses a permission set that is relatively restrictive to hopefully avoid people actually being able to
    make edits through it, but I didn't actually test the permissions very much.
    """
    serializer_class = TruckSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        start_time = parse(self.request.GET['start_time'])
        end_time = parse(self.request.GET['end_time'])
        truck_type = self.request.GET['truck_type']
        return get_available_trucks(start_time, end_time, truck_type)

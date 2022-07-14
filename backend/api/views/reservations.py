import json

from django.http import JsonResponse
from rest_framework import permissions, viewsets
from dateutil.parser import parse

from ..models import Reservation
from ..models.helpers import get_available_trucks
from ..serializers.reservation import ReservationSerializer


class ViewReservations(viewsets.ModelViewSet):
    """
    This uses a model viewset
    At the moment this means that this is actually providing more endpoints than the app actually uses.
    Right now we only use
    - POST, GET on the list endpoint
    - DELETE on the detail endpoint

    We could cut out the extra endpoints by doing:

    `class ViewReservations(mixins.ListModelMixin, mixins.DestroyModelMixin, GenericViewSet):`

    This would ensure that uses couldn't use the other endpoints in unexpected ways given we haven't tested them.
    We don't actually need the CreateMixin because we fully implemented create
    """
    serializer_class = ReservationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        This returns the default queryset for these endpoints.

        It ends up being used by the list and destroy endpoints, the create endpoint is already fully implemented.

        This returns only reservations that belong to the user that called the api which helps to ensure they
        never see anyone else's accidentally

        """
        return Reservation.objects.filter(user=self.request.user).order_by(
            'start_datetime'
        ).select_related('truck')

    def create(self, request):
        """
        This is the create endpoint. It fully overwrites all of the magic of the ModelViewset to ensure that it handles
        everything correctly.

        It currently doesn't include any error handling but probably should include
        - error for reservations that have an end <= start
        - meaningful errors for missing fields

        It does currently error if you try to request a truck that isn't available.
        """
        data = request.data
        start_time = parse(data['start_time'])
        end_time = parse(data['end_time'])
        truck_id = data['truck_id']
        truck_query = get_available_trucks(start_time, end_time)
        truck_query = truck_query.filter(id=truck_id)
        if not truck_query:
            return JsonResponse({
                "errors": {
                    "detail": "Truck is no longer available please choose another truck"
                }
            }, status=400)
        Reservation.objects.create(
            user=request.user,
            truck_id=truck_id,
            start_datetime=start_time,
            end_datetime=end_time,
        )
        return JsonResponse({})

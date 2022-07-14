import json

from django.http import JsonResponse
from rest_framework import permissions, viewsets
from dateutil.parser import parse

from ..models import Reservation
from ..models.helpers import get_available_trucks
from ..serializers.reservation import ReservationSerializer


class ViewReservations(viewsets.ModelViewSet):
    serializer_class = ReservationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Reservation.objects.filter(user=self.request.user).order_by(
            'start_datetime'
        ).select_related('truck')

    def create(self, request):
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

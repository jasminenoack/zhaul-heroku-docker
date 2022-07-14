from ..models import Reservation
from rest_framework import serializers


class ReservationSerializer(serializers.HyperlinkedModelSerializer):
    start_time = serializers.DateTimeField(source='start_datetime')
    end_time = serializers.DateTimeField(source='end_datetime')
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2)
    truck_name = serializers.CharField(source='truck.name')
    truck_type = serializers.CharField(source='truck.truck_type')

    class Meta:
        fields = ['start_time', 'end_time', 'total_price', 'truck_name', 'truck_type', 'id']
        model = Reservation

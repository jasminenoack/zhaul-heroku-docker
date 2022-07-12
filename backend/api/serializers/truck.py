from ..models import Truck
from rest_framework import serializers


class TruckSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Truck
        fields = ['name', 'truck_type', 'price_per_hour', 'id']

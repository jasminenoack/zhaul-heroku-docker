from decimal import Decimal
from django.test import TestCase

from ...models import Truck
from ..truck import TruckSerializer


class TrucksSerializerTestCase(TestCase):
    def test_serializes_object(self):
        truck = Truck(
            name='john',
            truck_type='van',
            price_per_hour=Decimal(5),
            id=9,
        )
        serializer = TruckSerializer(truck)
        assert serializer.data == {
            'name': 'john',
            'truck_type': 'van',
            'price_per_hour': '5.00',
            'id': 9,
        }

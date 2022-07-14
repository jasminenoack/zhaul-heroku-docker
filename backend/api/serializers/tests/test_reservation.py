from datetime import datetime
from decimal import Decimal

import pytz
from django.test import TestCase

from ..reservation import ReservationSerializer
from ...models import Truck, Reservation


class ReservationSerializerTestCase(TestCase):
    def test_serializes_object(self):
        truck = Truck(
            name='john',
            truck_type='van',
            price_per_hour=Decimal(5),
            id=9,
        )
        reservation = Reservation(
            start_datetime=datetime(2020, 1, 1, 12, tzinfo=pytz.UTC),
            end_datetime=datetime(2020, 1, 3, 3, tzinfo=pytz.UTC),
            truck=truck,
            id=5,
        )
        serializer = ReservationSerializer(reservation)
        assert serializer.data == {
            'start_time': '2020-01-01T13:00:00+01:00',
            'end_time': '2020-01-03T04:00:00+01:00',
            'total_price': '195.00',
            'truck_name': 'john',
            'truck_type': 'van',
            'id': 5,
        }

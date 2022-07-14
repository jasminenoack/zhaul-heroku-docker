from datetime import datetime
from decimal import Decimal
from unittest import TestCase

import pytz

from .. import Truck, Reservation


class TestTotalPrice(TestCase):
    def test_returns_the_total_price_rounded_to_the_hour(self):
        start_datetime = datetime(2020, 1, 1, 12, tzinfo=pytz.UTC)
        end_datetime = datetime(2020, 1, 1, 16, 15, tzinfo=pytz.UTC)
        truck = Truck(
            price_per_hour=Decimal(5)
        )
        reservation = Reservation(
            start_datetime=start_datetime,
            end_datetime=end_datetime,
            truck=truck
        )
        assert reservation.total_price() == Decimal(21.25)

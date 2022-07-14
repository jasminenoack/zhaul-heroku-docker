import json
from datetime import datetime

import pytz
from django.test import TestCase

from django.contrib.auth.models import User

from .. import Truck, Reservation
from ..helpers import get_available_trucks


class GetAvailableTrucksTestCase(TestCase):
    def test_returns_truck_with_no_reservations(self):
        truck = Truck.objects.create(name='Ringo', price_per_hour='10.50', truck_type='van')
        start_datetime = datetime(2020, 1, 1, 5, tzinfo=pytz.UTC)
        end_datetime = datetime(2020, 1, 3, 5, tzinfo=pytz.UTC)
        assert list(get_available_trucks(start_datetime, end_datetime)) == [
            truck
        ]

    def test_returns_a_truck_with_a_reservation_before(self):
        truck = Truck.objects.create(name='Ringo', price_per_hour='10.50', truck_type='van')
        start_datetime = datetime(2020, 1, 1, 5, tzinfo=pytz.UTC)
        end_datetime = datetime(2020, 1, 3, 5, tzinfo=pytz.UTC)
        user = User.objects.create(username='john')
        Reservation.objects.create(
            truck=truck,
            user=user,
            start_datetime=datetime(2019, 1, 1, 5, tzinfo=pytz.UTC),
            end_datetime=datetime(2019, 3, 4, 5, tzinfo=pytz.UTC)
        )

        assert list(get_available_trucks(start_datetime, end_datetime)) == [
            truck
        ]

    def test_returns_a_truck_with_a_reservation_after(self):
        truck = Truck.objects.create(name='Ringo', price_per_hour='10.50', truck_type='van')
        start_datetime = datetime(2020, 1, 1, 5, tzinfo=pytz.UTC)
        end_datetime = datetime(2020, 1, 3, 5, tzinfo=pytz.UTC)
        user = User.objects.create(username='john')
        Reservation.objects.create(
            truck=truck,
            user=user,
            start_datetime=datetime(2022, 1, 1, 5, tzinfo=pytz.UTC),
            end_datetime=datetime(2022, 3, 4, 5, tzinfo=pytz.UTC)
        )

        assert list(get_available_trucks(start_datetime, end_datetime)) == [
            truck
        ]

    def test_only_returns_trucks_that_match_the_type(self):
        truck = Truck.objects.create(name='Ringo', price_per_hour='10.50', truck_type='van')
        Truck.objects.create(name='George', price_per_hour='10.50', truck_type='pick_up')
        start_datetime = datetime(2020, 1, 1, 5, tzinfo=pytz.UTC)
        end_datetime = datetime(2020, 1, 3, 5, tzinfo=pytz.UTC)

        assert list(get_available_trucks(start_datetime, end_datetime, truck_type='van')) == [
            truck
        ]

    def test_does_not_return_trucks_with_a_reservation_that_starts_before_and_ends_during(self):
        truck = Truck.objects.create(name='Ringo', price_per_hour='10.50', truck_type='van')
        start_datetime = datetime(2020, 1, 1, 5, tzinfo=pytz.UTC)
        end_datetime = datetime(2020, 1, 3, 5, tzinfo=pytz.UTC)
        user = User.objects.create(username='john')
        Reservation.objects.create(
            truck=truck,
            user=user,
            start_datetime=datetime(2019, 12, 31, 5, tzinfo=pytz.UTC),
            end_datetime=datetime(2021, 2, 4, 5, tzinfo=pytz.UTC)
        )

        assert list(get_available_trucks(start_datetime, end_datetime)) == []

    def test_does_not_return_trucks_with_a_reservation_that_starts_during_and_ends_after(self):
        truck = Truck.objects.create(name='Ringo', price_per_hour='10.50', truck_type='van')
        start_datetime = datetime(2020, 1, 1, 5, tzinfo=pytz.UTC)
        end_datetime = datetime(2020, 1, 3, 5, tzinfo=pytz.UTC)
        user = User.objects.create(username='john')
        Reservation.objects.create(
            truck=truck,
            user=user,
            start_datetime=datetime(2020, 1, 2, 5, tzinfo=pytz.UTC),
            end_datetime=datetime(2020, 2, 4, 5, tzinfo=pytz.UTC)
        )

        assert list(get_available_trucks(start_datetime, end_datetime)) == []


    def test_does_not_return_trucks_with_a_reservation_that_encompases_the_new_one(self):
        truck = Truck.objects.create(name='Ringo', price_per_hour='10.50', truck_type='van')
        start_datetime = datetime(2020, 1, 1, 5, tzinfo=pytz.UTC)
        end_datetime = datetime(2020, 1, 3, 5, tzinfo=pytz.UTC)
        user = User.objects.create(username='john')
        Reservation.objects.create(
            truck=truck,
            user=user,
            start_datetime=datetime(2019, 12, 30, 5, tzinfo=pytz.UTC),
            end_datetime=datetime(2020, 2, 4, 5, tzinfo=pytz.UTC)
        )

        assert list(get_available_trucks(start_datetime, end_datetime)) == []


    def test_works_with_multiple_reservations(self):
        """
        this is confirming that we aren't procesisng every reservation as it's own row and causing
        duplicates of trucks to come back and only filtering out the row with the bad reservation
        """
        truck = Truck.objects.create(name='Ringo', price_per_hour='10.50', truck_type='van')
        other_truck = Truck.objects.create(name='George', price_per_hour='10.50', truck_type='pick_up')
        start_datetime = datetime(2020, 1, 1, 5, tzinfo=pytz.UTC)
        end_datetime = datetime(2020, 1, 3, 5, tzinfo=pytz.UTC)
        user = User.objects.create(username='john')
        Reservation.objects.create(
            truck=truck,
            user=user,
            start_datetime=datetime(2020, 1, 2, 5, tzinfo=pytz.UTC),
            end_datetime=datetime(2020, 2, 4, 5, tzinfo=pytz.UTC)
        )
        Reservation.objects.create(
            truck=truck,
            user=user,
            start_datetime=datetime(2021, 1, 2, 5, tzinfo=pytz.UTC),
            end_datetime=datetime(2021, 2, 4, 5, tzinfo=pytz.UTC)
        )
        Reservation.objects.create(
            truck=truck,
            user=user,
            start_datetime=datetime(2022, 1, 2, 5, tzinfo=pytz.UTC),
            end_datetime=datetime(2022, 2, 4, 5, tzinfo=pytz.UTC)
        )
        Reservation.objects.create(
            truck=truck,
            user=user,
            start_datetime=datetime(2023, 1, 2, 5, tzinfo=pytz.UTC),
            end_datetime=datetime(2023, 2, 4, 5, tzinfo=pytz.UTC)
        )
        Reservation.objects.create(
            truck=truck,
            user=user,
            start_datetime=datetime(2024, 1, 2, 5, tzinfo=pytz.UTC),
            end_datetime=datetime(2024, 2, 4, 5, tzinfo=pytz.UTC)
        )

        assert list(get_available_trucks(start_datetime, end_datetime)) == [other_truck]



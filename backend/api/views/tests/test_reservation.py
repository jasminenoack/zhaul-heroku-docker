import json
from datetime import datetime
from decimal import Decimal

import pytz
from django.contrib.auth.models import User
from django.test import TestCase

from django.urls import reverse

from ...models import Truck, Reservation


class CreateReservationTestCase(TestCase):
    def test_creates_reservation(self):
        data = {
            'start_time': "2022-07-14T01:16:30.000Z",
            'end_time': "2022-07-16T01:16:30.000Z",
            'truck_id': 9
        }
        truck = Truck.objects.create(
            name='john',
            price_per_hour='9.50',
            truck_type=Truck.VAN,
            id=9,
        )
        user = User.objects.create(username='john')
        self.client.force_login(user)
        url = reverse("reservations-list")
        result = self.client.post(url, data=data)
        assert result.status_code == 200
        reservation = Reservation.objects.get()
        assert reservation.user == user
        assert reservation.truck == truck
        assert reservation.start_datetime == datetime(2022, 7, 14, 1, 16, 30, tzinfo=pytz.UTC)
        assert reservation.end_datetime == datetime(2022, 7, 16, 1, 16, 30, tzinfo=pytz.UTC)


class ViewReservations(TestCase):
    def test_returns_users_reservations(self):
        truck = Truck.objects.create(
            name='john',
            truck_type='van',
            price_per_hour=Decimal(5),
            id=9,
        )
        user = User.objects.create(username='john')
        self.client.force_login(user)
        Reservation.objects.create(
            start_datetime=datetime(2020, 1, 1, 12, tzinfo=pytz.UTC),
            end_datetime=datetime(2020, 1, 3, 3, tzinfo=pytz.UTC),
            truck=truck,
            user=user,
            id=6,
        )
        url = reverse("reservations-list")
        result = self.client.get(url)
        assert result.status_code == 200
        assert json.loads(result.content) == [
            {
                'start_time': '2020-01-01T13:00:00+01:00',
                'end_time': '2020-01-03T04:00:00+01:00',
                'total_price': '195.00',
                'truck_name': 'john',
                'truck_type': 'van',
                'id': 6,
            }
        ]

    def test_does_not_return_other_users_reservations(self):
        truck = Truck.objects.create(
            name='john',
            truck_type='van',
            price_per_hour=Decimal(5),
            id=9,
        )
        user = User.objects.create(username='john')
        other_user = User.objects.create(username='ringo')
        self.client.force_login(other_user)
        Reservation.objects.create(
            start_datetime=datetime(2020, 1, 1, 12, tzinfo=pytz.UTC),
            end_datetime=datetime(2020, 1, 3, 3, tzinfo=pytz.UTC),
            truck=truck,
            user=user,
        )
        url = reverse("reservations-list")
        result = self.client.get(url)
        assert result.status_code == 200
        assert json.loads(result.content) == []

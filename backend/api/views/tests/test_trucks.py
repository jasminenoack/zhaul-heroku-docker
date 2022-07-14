import json
from datetime import datetime

from django.contrib.auth.models import User
from django.test import TestCase

from django.urls import reverse

from ...models import Truck, Reservation


class TruckViewSetTestCase(TestCase):
    def test_returns_truck(self):
        Truck.objects.create(
            name='john',
            price_per_hour='9.50',
            truck_type=Truck.VAN,
            id=9,
        )
        url = f'{reverse("trucks-list")}?truck_type=&start_time=2022-07-14T00%3A37%3A17.406Z&end_time=2022-07-14T00%3A37%3A17.406Z'
        result = self.client.get(url)
        assert result.status_code == 200
        assert json.loads(result.content) == [
            {
                'name': 'john',
                'truck_type': 'van',
                'price_per_hour': '9.50',
                'id': 9
            }
        ]

    def test_filters_out_by_date(self):
        truck = Truck.objects.create(
            name='john',
            price_per_hour='9.50',
            truck_type=Truck.VAN,
            id=9,
        )
        user = User.objects.create(username='john')
        Reservation.objects.create(
            truck=truck,
            user=user,
            start_datetime=datetime(2022, 7, 13, 5),
            end_datetime=datetime(2022, 7, 15, 5)
        )
        url = f'{reverse("trucks-list")}?truck_type=&start_time=2022-07-14T00%3A37%3A17.406Z&end_time=2022-07-14T00%3A37%3A17.406Z'
        result = self.client.get(url)
        assert result.status_code == 200
        assert json.loads(result.content) == []

    def test_filters_out_by_truck_type(self):
        truck = Truck.objects.create(
            name='john',
            price_per_hour='9.50',
            truck_type=Truck.VAN,
            id=9,
        )
        user = User.objects.create(username='john')
        Reservation.objects.create(
            truck=truck,
            user=user,
            start_datetime=datetime(2022, 7, 13, 5),
            end_datetime=datetime(2022, 7, 15, 5)
        )
        url = f'{reverse("trucks-list")}?truck_type=pickup&start_time=2022-07-14T00%3A37%3A17.406Z&end_time=2022-07-14T00%3A37%3A17.406Z'
        result = self.client.get(url)
        assert result.status_code == 200
        assert json.loads(result.content) == []

import json

from django.test import TestCase

from django.urls import reverse

from ...models import Truck


class TruckViewSetTestCase(TestCase):
    def test_returns_info_on_current_user(self):
        Truck.objects.create(
            name='john',
            price_per_hour='9.50',
            truck_type=Truck.VAN,
            id=9,
        )
        url = reverse('trucks-list')
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


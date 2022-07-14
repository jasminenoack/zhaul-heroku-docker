from decimal import Decimal

from django.db import models
from django.conf import settings
from .trucks import Truck


class Reservation(models.Model):
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    truck = models.ForeignKey(Truck, on_delete=models.PROTECT)

    def total_price(self):
        time_diff = self.end_datetime - self.start_datetime
        hours = Decimal(time_diff.total_seconds() / 60 / 60)
        return hours * self.truck.price_per_hour

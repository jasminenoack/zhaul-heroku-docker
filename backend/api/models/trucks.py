from django.db import models


class Truck(models.Model):
    name = models.CharField(max_length=30)
    price_per_hour = models.DecimalField(max_digits=8, decimal_places=2)

    PICK_UP = 'pick_up'
    VAN = 'van'
    SMALL = 'small'
    MEDIUM = 'medium'
    LARGE = 'large'
    TRUCK_TYPE = [
        (PICK_UP, 'Pick up truck'),
        (VAN, 'Van'),
        (SMALL, 'Small moving truck'),
        (MEDIUM, 'Medium moving truck'),
        (LARGE, 'Large moving truck'),
    ]
    truck_type = models.CharField(
        choices=TRUCK_TYPE,
        max_length=30
    )

from datetime import datetime
from typing import Optional, Iterable

from . import Truck


def get_available_trucks(
    start_datetime: datetime,
    end_datetime: datetime,
    truck_type: Optional[str] = None
) -> Iterable[Truck]:
    trucks = Truck.objects.all()

    trucks = trucks.exclude(
        reservation__end_datetime__gt=start_datetime,
        reservation__start_datetime__lt=end_datetime,
    )

    if truck_type:
        trucks = trucks.filter(truck_type=truck_type)
    return trucks

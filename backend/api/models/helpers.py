from datetime import datetime
from typing import Optional, Iterable

from . import Truck


def get_available_trucks(
    start_datetime: datetime,
    end_datetime: datetime,
    truck_type: Optional[str] = None
) -> Iterable[Truck]:
    """
    Gets a list of trucks that are available during a time interval.

    Assumes a truck can be dropped off and picked up at the same time
    If you wanted to add a window between rentals you could use timedelta to move the times
    by an hour or so before you filter

    ie. `reservation__end_datetime__gt=start_datetime - timedelta(hours=3)`

    If a truck type is given returns only trucks of that type. If a type isn't given returns
    all truck types
    """
    trucks = Truck.objects.all()

    trucks = trucks.exclude(
        reservation__end_datetime__gt=start_datetime,
        reservation__start_datetime__lt=end_datetime,
    )

    if truck_type:
        trucks = trucks.filter(truck_type=truck_type)
    return trucks

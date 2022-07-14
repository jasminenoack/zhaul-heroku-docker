import {ReservationInterface, TruckInterface} from "./types";

export function convertTruckData(trucks: any): TruckInterface[] {
  /*
  * Converts the api response to camel case. Long term instead of writing multiple of
  * these I would just write a util that converts anything to camel case
  * this was just quicker for me in the mock up.
  * */
  return trucks.map((truck: any) => ({
    name: truck.name,
    type: truck.truck_type,
    id: truck.id,
    pricePerHour: truck.price_per_hour,
  }))
}

export function convertReservationData(reservations: any): ReservationInterface[] {
  /*
  * Converts the api response to camel case. Long term instead of writing multiple of
  * these I would just write a util that converts anything to camel case
  * this was just quicker for me in the mock up.
  *
  * This also does some typing for the fields that are sent as strings but we want to be dates when we work with them.
  * */
  return reservations.map((reservation: any) => ({
    startTime: new Date(reservation.start_time),
    endTime: new Date(reservation.end_time),
    totalPrice: reservation.total_price,
    truckName: reservation.truck_name,
    truckType: reservation.truck_type,
    id: reservation.id,
  }))
}

export function addHours(numOfHours: number, date = new Date()) {
  /*
  * Add hours to a time, this came from stack overflow
  */
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

  return date;
}


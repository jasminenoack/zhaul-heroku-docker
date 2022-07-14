import {ReservationInterface, TruckInterface} from "./types";

export function convertTruckData(trucks: any): TruckInterface[] {
  return trucks.map((truck: any) => ({
    name: truck.name,
    type: truck.truck_type,
    id: truck.id,
    pricePerHour: truck.price_per_hour,
  }))
}

export function convertReservationData(reservations: any): ReservationInterface[] {
  return reservations.map((reservation: any)=> ({
    startTime: new Date(reservation.start_time),
    endTime: new Date(reservation.end_time),
    totalPrice: reservation.total_price,
    truckName: reservation.truck_name,
    truckType: reservation.truck_type,
    id: reservation.id,
  }))
}

export function addHours(numOfHours: number, date = new Date()) {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

  return date;
}


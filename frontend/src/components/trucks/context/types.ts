export interface TruckInterface {
  name: string;
  pricePerHour: string;
  type: string;
  id: number;
}

export interface ReservationInterface {
  startTime: Date;
  endTime: Date;
  totalPrice: string;
  truckName: string;
  truckType: string;
  id: number;
}

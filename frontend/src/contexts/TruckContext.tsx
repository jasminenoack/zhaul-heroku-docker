import React, {ReactNode, useContext, useEffect, useState} from 'react';
import {useQuery, useMutation} from 'react-query'
import axios from 'axios'
import {getCookie} from "./helpers";
import {UserContext} from "./UserContext";

export interface TruckInterface {
  name: string;
  pricePerHour: string;
  type: string;
  id: number;
}

function convertTruckData(trucks: any): TruckInterface[] {
  return trucks.map((truck: any) => ({
    name: truck.name,
    type: truck.truck_type,
    id: truck.id,
    pricePerHour: truck.price_per_hour,
  }))
}

export interface ReservationInterface {
  startTime: Date;
  endTime: Date;
  totalPrice: string;
  truckName: string;
  truckType: string;
  id: number;
}

function convertReservationData(reservations: any): ReservationInterface[] {
  return reservations.map((reservation: any)=> ({
    startTime: new Date(reservation.start_time),
    endTime: new Date(reservation.end_time),
    totalPrice: reservation.total_price,
    truckName: reservation.truck_name,
    truckType: reservation.truck_type,
    id: reservation.id,
  }))
}

export const TruckContextDefault = {
  startTime: new Date(),
  endTime: new Date(),
  setStartTime: (value: Date) => {},
  setEndTime: (value: Date) => {},
  truckType: null,
  setTruckType: (value: string) => {},
  trucks: [],
  isLoadingTrucks: true,
  createReservation: (truckId: number) => {},
  successMessage: '',
  reservations: [],
  isLoadingReservations: true,
  cancelReservation: (reservationId: number) => {},
  cancelMessage: '',
}

interface TruckContext {
  startTime: Date;
  endTime: Date;
  setStartTime: (value: Date) => void;
  setEndTime: (value: Date) => void;
  truckType: string | null;
  setTruckType: (value: string) => void;
  trucks: TruckInterface[];
  isLoadingTrucks: boolean;
  createReservation: (truckId: number) => void;
  successMessage: string;
  reservations: ReservationInterface[];
  isLoadingReservations: boolean;
  cancelReservation: (reservationId: number) => void;
  cancelMessage: string;
}

export const TruckContext = React.createContext<TruckContext>(TruckContextDefault);



function addHours(numOfHours: number, date = new Date()) {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

  return date;
}

export function TruckContextProvider({children}: {children: ReactNode}) {
  const csrfToken = getCookie('csrftoken') as string;
  const [truckType, setTruckType] = useState('');
  const [startTime, setStartTime] = useState(addHours(1, new Date()));
  const [endTime, setEndTime] = useState(addHours(3, new Date()));
  const [successMessage, setSuccessMessage] = useState('');
  const [cancelMessage, setCancelMessage] = useState('');
  const {username} = useContext(UserContext);

  const searchParams = {
    'truck_type': truckType,
    'start_time': startTime.toISOString(),
    'end_time': endTime.toISOString(),
  }
  const trucksUrl = `/api/trucks/?${new URLSearchParams(searchParams)}`;
  const {data: trucks, isLoading: isLoadingTrucks, refetch: refetchTruckList} = useQuery('trucks', () => fetch(
    trucksUrl
  ).then(res =>
     res.json()
  ))

  const {data: reservations, isLoading: isLoadingReservations, refetch: refetchReservations} = useQuery('reservations', () => fetch(
  '/api/reservations/'
  ).then(res =>
     res.json()
  ), {
    enabled: !!username,
    initialData: []
  })

  // this initially queries twice that's fixable.
  useEffect(() => {
    refetchTruckList()
  }, [trucksUrl])

  function updateForTruckChanges() {
    refetchTruckList();
    refetchReservations();
  }

  function createReservationFunction(truckId: number) {
      return axios.post(
        '/api/reservations/',
        {
          start_time: startTime.toISOString(),
          end_time: endTime.toISOString(),
          truck_id: truckId,
        },
        {'headers': {'X-CSRFToken': csrfToken}},
        )
    }
    const createReservation: any = useMutation(
        createReservationFunction,
        {
          onSuccess: () => {
            updateForTruckChanges();
            setSuccessMessage('Truck reserved')
          }
        }
      )

  function cancelReservationFunction(truckId: number) {
      return axios.delete(
        `/api/reservations/${truckId}/`,
        {'headers': {'X-CSRFToken': csrfToken}},
        )
    }
    const cancelReservation: any = useMutation(
        cancelReservationFunction,
        {
          onSuccess: () => {
            updateForTruckChanges();
            setCancelMessage('Reservation canceled')
          }
        }
      )

  const context = {
      ...TruckContextDefault,
      trucks: isLoadingTrucks? [] : convertTruckData(trucks),
      isLoadingTrucks,
      truckType,
      setTruckType,
      startTime,
      setStartTime,
      endTime,
      setEndTime,
      createReservation: createReservation.mutate,
      isLoadingReservations,
      reservations: isLoadingReservations || !username ? [] : convertReservationData(reservations),
      successMessage,
      cancelReservation: cancelReservation.mutate,
      cancelMessage,
    }

    return (
        <TruckContext.Provider value={context}>
            <div>
                {children}
            </div>
        </TruckContext.Provider>
    )
}

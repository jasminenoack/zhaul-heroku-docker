import React, {ReactNode, useContext, useEffect, useState} from 'react';
import {useQuery, useMutation} from 'react-query'
import {UserContext} from "../../users/context/UserContext";
import {getCookie} from "../../helpers";
import {TruckInterface, ReservationInterface} from "./types";
import {addHours, convertReservationData, convertTruckData} from "./helpers";
import {
  buildDeleteReservationFunction,
  buildPostCreationFunction,
  buildTrucksUrl,
  getReservations,
  getTrucks,
} from "./api";

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


export function TruckContextProvider({children}: {children: ReactNode}) {
  const csrfToken = getCookie('csrftoken') as string;
  const [truckType, setTruckType] = useState('');
  const [startTime, setStartTime] = useState(addHours(1, new Date()));
  const [endTime, setEndTime] = useState(addHours(3, new Date()));
  const [successMessage, setSuccessMessage] = useState('');
  const [cancelMessage, setCancelMessage] = useState('');
  const {username} = useContext(UserContext);

  const trucksUrl = buildTrucksUrl(truckType, startTime, endTime)
  const {
    data: trucks,
    isLoading: isLoadingTrucks,
    refetch: refetchTruckList
  } = useQuery('trucks', () => getTrucks(trucksUrl))

  const {
    data: reservations,
    isLoading: isLoadingReservations,
    refetch: refetchReservations
  } = useQuery('reservations', getReservations, {
    enabled: !!username,
    initialData: []
  })

  useEffect(() => {
    refetchTruckList()
  }, [trucksUrl])

  function updateForTruckChanges() {
    refetchTruckList();
    refetchReservations();
  }

  const createReservationMutation: any = useMutation(
    buildPostCreationFunction(startTime, endTime, csrfToken),
    {
      onSuccess: () => {
        updateForTruckChanges();
        setSuccessMessage('Truck reserved')
      }
    }
  );

  const cancelReservationMutation: any = useMutation(
    buildDeleteReservationFunction(csrfToken),
    {
      onSuccess: () => {
        updateForTruckChanges();
        setCancelMessage('Reservation canceled')
      }
    }
  );

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
      createReservation: createReservationMutation.mutate,
      isLoadingReservations,
      reservations: isLoadingReservations || !username ? [] : convertReservationData(reservations),
      successMessage,
      cancelReservation: cancelReservationMutation.mutate,
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

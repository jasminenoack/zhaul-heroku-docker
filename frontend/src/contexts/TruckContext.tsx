import React, {ReactNode, useEffect, useState} from 'react';
import {useQuery, useMutation} from 'react-query'
import axios from 'axios'
import {getCookie} from "./helpers";
import {TruckInterface} from "../components/types";

export const TruckContextDefault = {
  startTime: new Date(),
  endTime: new Date(),
  setStartTime: (value: Date) => {},
  setEndTime: (value: Date) => {},
  truckType: null,
  setTruckType: (value: string) => {},
  trucks: [],
  isLoading: true
}

interface TruckContext {
  startTime: Date,
  endTime: Date,
  setStartTime: (value: Date) => void,
  setEndTime: (value: Date) => void,
  truckType: string | null,
  setTruckType: (value: string) => void,
  trucks: TruckInterface[],
  isLoading: boolean,
}

export const TruckContext = React.createContext<TruckContext>(TruckContextDefault);

function convertTruckData(trucks: any): TruckInterface[] {
  return trucks.map((truck: any) => ({
    name: truck.name,
    type: truck.truck_type,
    id: truck.id,
    pricePerHour: truck.price_per_hour
  }))
}

export function TruckContextProvider({children}: {children: ReactNode}) {
  const csrfToken = getCookie('csrftoken') as string;
  const [truckType, setTruckType] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const searchParams = {
    'truck_type': truckType,
    'start_time': startTime.toISOString(),
    'end_time': endTime.toISOString(),
  }
  const url = `/api/trucks/?${new URLSearchParams(searchParams)}`;
  const {data, isLoading, refetch} = useQuery('trucks', () => fetch(
    url
  ).then(res =>
     res.json()
  ))

  // this initially queries twice that's fixable.
  useEffect(() => {
    refetch()
  }, [url])

  const context = {
      ...TruckContextDefault,
      trucks: isLoading? [] : convertTruckData(data),
      isLoading,
      truckType,
      setTruckType,
      startTime,
      setStartTime,
      endTime,
      setEndTime,
    }

    return (
        <TruckContext.Provider value={context}>
            <div>
                {children}
            </div>
        </TruckContext.Provider>
    )
}

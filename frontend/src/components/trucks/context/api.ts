import axios from "axios";

export function buildTrucksUrl(truckType: string, startTime: Date, endTime: Date) {
  const searchParams = {
    'truck_type': truckType,
    'start_time': startTime.toISOString(),
    'end_time': endTime.toISOString(),
  }
  return `/api/trucks/?${new URLSearchParams(searchParams)}`
}

export function getTrucks(url: string) {
  return fetch(
    url
  ).then(res =>
    res.json()
  )
}

export function getReservations() {
  return fetch(
    '/api/reservations/'
  ).then(res =>
    res.json()
  )
}

export function buildPostCreationFunction(startTime: Date, endTime: Date, csrfToken: string) {
  function postCreateReservation(truckId: number) {
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

  return postCreateReservation
}

export function buildDeleteReservationFunction(csrfToken: string) {
  function deleteReservation(truckId: number) {
    return axios.delete(
      `/api/reservations/${truckId}/`,
      {'headers': {'X-CSRFToken': csrfToken}},
    );
  }

  return deleteReservation
}

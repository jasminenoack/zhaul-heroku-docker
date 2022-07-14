import axios from "axios";
/*
* These are api builds to be used in the context object
* They are separated more for ease of reading than anything else
* */

export function buildTrucksUrl(truckType: string, startTime: Date, endTime: Date) {
  /*
  * Build the url to request the trucks list. Adds query params for truck type, and dates
  * */
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
  /*
  * Build the function we use to post to create a reservation.
  * We wrap this to get a closure with the date and csrf variables.
  * */
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
  /*
  * Build the function we use to delete a reservation.
  * We wrap this to get a closure with the csrf variable.
  * */
  function deleteReservation(truckId: number) {
    return axios.delete(
      `/api/reservations/${truckId}/`,
      {'headers': {'X-CSRFToken': csrfToken}},
    );
  }

  return deleteReservation
}

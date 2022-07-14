import {TruckFilter} from "./TruckFilter";
import {useContext} from "react";
import {TruckContext} from "./context/TruckContext";
import {LoadingCard} from "./LoadingCard";
import Typography from '@mui/material/Typography';
import {ReservationCard} from "./ReservationCard";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export function ReservationList() {
  const {isLoadingReservations, reservations, cancelMessage, setCancelMessage} = useContext(TruckContext)

  if (isLoadingReservations) {
    return <LoadingCard/>
  }

  return (
    <main>
      <Typography variant="h3" component="div" gutterBottom>Your reservations</Typography>
      <TruckFilter/>
      {
        reservations.map((reservation) => <ReservationCard {...reservation} key={reservation.id}/>)
      }
      {
        cancelMessage &&
        <Snackbar
          sx={{position: 'fixed', bottom: 0, width: "100%"}}
          open={!!cancelMessage}
          autoHideDuration={3000}
          onClose={() => setCancelMessage('')}
        >
          <Alert severity="warning" sx={{position: 'fixed', bottom: 0, width: "100%"}}>{cancelMessage}</Alert>
        </Snackbar>
      }
    </main>
  )
}

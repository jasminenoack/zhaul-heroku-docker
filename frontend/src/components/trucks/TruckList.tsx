import {TruckCard} from "./TruckCard";
import {TruckFilter} from "./TruckFilter";
import {useContext} from "react";
import {TruckContext} from "./context/TruckContext";
import Alert from '@mui/material/Alert';
import {LoadingCard} from "./LoadingCard";
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';

export function TruckList() {
  const {isLoadingTrucks, trucks, successMessage, setSuccessMessage} = useContext(TruckContext)

  if (isLoadingTrucks) {
    return <LoadingCard/>
  }

  return (
    <main>
      <Typography variant="h3" component="div" gutterBottom>Welcome to ZHaul enjoy our trucks</Typography>
      <TruckFilter/>
      {
        trucks.map((truck) => <TruckCard {...truck} key={truck.id}/>)
      }
      {
        successMessage &&
        <Snackbar
          sx={{position: 'fixed', bottom: 0, width: "100%"}}
          open={!!successMessage}
          autoHideDuration={3000}
          onClose={() => setSuccessMessage('')}
        >
          <Alert severity="success" sx={{position: 'fixed', bottom: 0, width: "100%"}}>{successMessage}</Alert>
        </Snackbar>
      }
    </main>
  );
}

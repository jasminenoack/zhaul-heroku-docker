import {TruckCard} from "./TruckCard";
import {TruckFilter} from "./TruckFilter";
import {useContext} from "react";
import {TruckContext} from "../contexts/TruckContext";
import Alert from '@mui/material/Alert';
import {LoadingCard} from "./LoadingCard";
import Typography from '@mui/material/Typography';

export function TruckList() {
  const {isLoadingTrucks, trucks, successMessage} = useContext(TruckContext)

  if (isLoadingTrucks) {
    return <LoadingCard/>
  }

  return (
    <main>
      <Typography variant="h3" component="div" gutterBottom>Welcome to ZHaul enjoy our trucks</Typography>
      <TruckFilter/>
      {
        trucks.map((truck) => <TruckCard {...truck} key={truck.id} />)
      }
      {
        successMessage && <Alert severity="success" sx={{position: 'fixed', bottom: 0, width: "100%"}}>{successMessage}</Alert>
      }
    </main>
  )
}

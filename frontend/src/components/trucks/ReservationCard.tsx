import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import {TruckContext} from "./context/TruckContext";
import {imageMap, truckTypeMap} from "../constants";
import Typography from '@mui/material/Typography';
import {useContext} from "react";
import {ReservationInterface} from "./context/types";


export function ReservationCard(props: ReservationInterface) {
  const {cancelReservation} = useContext(TruckContext)

  return (
    <Card sx={{width: 300, margin: '10px', float: 'left'}}>
      <CardHeader title={props.truckName} subheader={truckTypeMap[props.truckType]}/>
      <CardMedia
        component="img"
        height="200px"
        width="200px"
        image={imageMap[props.truckType]}
        alt="Picture of truck"
      />
      <CardContent>
        <Typography paragraph>Total cost: ${props.totalPrice}</Typography>
        <Typography paragraph>
          Start time: {props.startTime.toLocaleString()}
        </Typography>
        <Typography paragraph>
          End time: {props.endTime.toLocaleString()}
        </Typography>
      </CardContent>

      <CardActions><Button onClick={() => cancelReservation(props.id)}>Cancel reservation</Button></CardActions>
    </Card>
  )
}

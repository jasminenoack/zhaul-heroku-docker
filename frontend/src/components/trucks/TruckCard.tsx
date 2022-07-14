import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import {imageMap, truckTypeMap} from "../constants";
import {useContext} from "react";
import {TruckContext} from "./context/TruckContext";
import {UserContext} from "../users/context/UserContext";
import {TruckInterface} from "./context/types";


export function TruckCard(props: TruckInterface) {
  const {createReservation} = useContext(TruckContext)
  const {username} = useContext(UserContext)
  return (
    <Card sx={{width: 300, margin: '10px', float: 'left'}}>
      <CardHeader title={props.name} subheader={truckTypeMap[props.type]}/>
      <CardMedia
        component="img"
        height="200px"
        width="200px"
        image={imageMap[props.type]}
        alt="Picture of truck"
      />
      <CardContent>Price per hour: ${props.pricePerHour}</CardContent>
      <CardActions><Button disabled={!username}
                           onClick={() => createReservation(props.id)}>Reserve</Button></CardActions>
    </Card>
  )
}

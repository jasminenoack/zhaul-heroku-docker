import {
   useQuery,
 } from 'react-query'

import {Card, Placeholder} from 'react-bootstrap'
import {TruckInterface} from "./types";
import {TruckList} from "./TruckList";
import Typography from '@mui/material/Typography';
import {useContext} from "react";
import {TruckContext} from "../contexts/TruckContext";


function Loading() {
  return (
    <div className="d-flex justify-content-around">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          <Placeholder.Button variant="primary" xs={6} />
        </Card.Body>
      </Card>
    </div>
  );
}





export function Home() {
  const {isLoading} = useContext(TruckContext)

  if (isLoading) {
    return <Loading/>
  }

  return (
    <>
      <main>
        <Typography variant="h3" component="div" gutterBottom>Welcome to ZHaul enjoy our trucks</Typography>
        <TruckList/>
      </main>
    </>
  );
}

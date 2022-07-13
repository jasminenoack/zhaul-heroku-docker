import {
   useQuery,
 } from 'react-query'
import Axios from 'axios'
import {useState} from "react";

import {Card, Placeholder} from 'react-bootstrap'
import {TruckInterface} from "./types";
import {TruckList} from "./TruckList";


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


function convertTruckData(trucks: any): TruckInterface[] {
  return trucks.map((truck: any) => ({
    name: truck.name,
    type: truck.truck_type,
    id: truck.id,
    pricePerHour: truck.price_per_hour
  }))
}


export function Home() {
  const [trucks, setTrucks] = useState<string>("");

  const query = useQuery('trucks', () => fetch(
    '/api/trucks/'
  ).then(res =>
     res.json()
  ))

  if (query.isLoading) {
    return <Loading/>
  }

  return (
    <>
      <main>
        <h2>Welcome to ZHaul enjoy our trucks</h2>
        <TruckList trucks={convertTruckData(query.data)}/>
      </main>
    </>
  );
}

import {TruckCard} from "./TruckCard";
import {TruckFilter} from "./TruckFilter";
import {useContext} from "react";
import {TruckContext} from "../contexts/TruckContext";


export function TruckList() {
  const {trucks} = useContext(TruckContext)
  return (
    <div>
      <TruckFilter/>
      {
        trucks.map((truck) => <TruckCard {...truck} key={truck.id} />)
      }
    </div>
  )
}

import {TruckInterface} from "./types";
import {TruckCard} from "./TruckCard";

interface PropTypes {
  trucks: TruckInterface[]
}

export function TruckList({trucks}: PropTypes) {
  return (
    <div>
      {
        trucks.map((truck) => <TruckCard {...truck} key={truck.id} />)
      }
    </div>
  )
}

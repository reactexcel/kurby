import { useRecoilState } from "recoil";
import filterContext from "../../../context/filterContext";
import NearbyPlaceCard from "./NearbyPlaceCard";

/**
 * Nearby
 * @description: Container for the nearby place cards. 
*/

export default function Nearby() {
  const [filterVal] = useRecoilState(filterContext);

  return (
    <>
      {filterVal.nearbyPlaces?.length &&
        filterVal.nearbyPlaces.map((place: any) => {
          return <NearbyPlaceCard key={`placecard_${place.place_id}`} place={place} />;
        })}
    </>
  );
}

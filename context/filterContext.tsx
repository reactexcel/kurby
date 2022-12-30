import {
    atom,
} from "recoil";
import { Walkscore } from "../pages/interfaces/walkscore";

/**
 * Filter Contect
 * @description: Global state management system
 * @see https://recoiljs.org/
*/

//TODO we can remove radius once we are sure we aren't using it anymore
interface FilterContext {
    key: string, 
    default: {
        latlong: google.maps.LatLngLiteral | null,
        radius: any | null,
        address: string | null,
        nearbyPlaces: any[],
        loadedNearbyPlaces: [],
        selectedPlace: any | null,
        mapCenter: {lat: number, lng: number} | null,
        walkscore: Walkscore | null
    }
}

const filterContext: FilterContext  = {
    key: 'filterContext', // unique ID (with respect to other atoms/selectors)
    default: {
        latlong: null,
        radius: null,
        address: null,
        nearbyPlaces: [],
        loadedNearbyPlaces: [],
        selectedPlace: null,
        mapCenter: null,
        walkscore: null
    }, // default value (aka initial value)
  }

export default atom(filterContext);

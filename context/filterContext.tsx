import {
    atom,
} from "recoil";

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
        selectedPlace: any | null,
        mapCenter: {lat: number, lng: number} | null
    }
}

const filterContext: FilterContext  = {
    key: 'filterContext', // unique ID (with respect to other atoms/selectors)
    default: {
        latlong: null,
        radius: null,
        address: null,
        nearbyPlaces: [],
        selectedPlace: null,
        mapCenter: null
    }, // default value (aka initial value)
  }

export default atom(filterContext);
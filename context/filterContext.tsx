import {
    atom,
    
} from "recoil";
import { Walkscore } from "../interfaces/walkscore";
import { syncEffect } from "recoil-sync";
import { string } from '@recoiljs/refine'
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
        walkscore: Walkscore | null,
    },
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
        walkscore: null,
    },
    
     // default value (aka initial value)
  }


export const addressState = atom<string>({
  key: "address",
  default: "",
  effects: [syncEffect({ storeKey: "url-json-store", refine: string() })],
});

export const filterState = atom(filterContext);


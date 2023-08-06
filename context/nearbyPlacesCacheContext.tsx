import { atom } from "recoil";
import { PlacesType } from "../globals/GLOBAL_SETTINGS";

interface NearbyPlacesCacheContext {
  key: string;
  default: {
    [key: string]: {
      // eslint-disable-next-line no-unused-vars
      [key in PlacesType]?: object[];
    };
  };
}

const nearbyPlacesCacheState: NearbyPlacesCacheContext = {
  key: "nearbyPlacesCache",
  default: {},
};

export const nearbyPlacesCache = atom(nearbyPlacesCacheState);

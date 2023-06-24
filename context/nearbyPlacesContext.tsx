import { atom } from "recoil";

interface NearbyState {
  key: string;
  default: {
    address: string;
    places: any[];
    loadedOnScroll: number;
  };
}

const nearbyState: NearbyState = {
  key: "nearbyContext",
  default: {
    address: "Miami, FL, USA",
    places: [],
    loadedOnScroll: 0,
  },
};

export const nearbyContext = atom(nearbyState);

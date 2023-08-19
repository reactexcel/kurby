import { atom } from "recoil";

interface NearbyState {
  key: string;
  default: {
    address: string;
    places: any[];
  };
}

const nearbyState: NearbyState = {
  key: "nearbyContext",
  default: {
    address: "",
    places: [],
  },
};

export const nearbyContext = atom(nearbyState);

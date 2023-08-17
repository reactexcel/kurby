import { atom } from "recoil";

interface NearbyPlacesCallCount {
  key: string;
  default: {
    callCount: number;
    hasReachedLimit: boolean;
  };
}

const nearbyPlacesCallCountState: NearbyPlacesCallCount = {
  key: "nearbyPlacesCallCount",
  default: {
    callCount: 0,
    hasReachedLimit: false,
  },
};

export const nearbyPlacesCallCountContext = atom(nearbyPlacesCallCountState);

import { atom } from "recoil";

type GmapClickCounterType = {
  key: string;
  default: number;
};

const mapClicksCounterState: GmapClickCounterType = {
  key: "mapClicksCounter",
  default: 0,
};

export const mapClicksCounter = atom(mapClicksCounterState);

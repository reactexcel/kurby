import { atom } from "recoil";

type GmapClickCounterType = {
  key: string;
  default: number;
};

type VisitorStayLimitType = {
  key: string;
  default: boolean;
};

const mapClicksCounterState: GmapClickCounterType = {
  key: "mapClicksCounter",
  default: 0,
};

const visitorStayLimitState: VisitorStayLimitType = {
  key: "visitorStayLimit",
  default: false,
};

export const mapClicksCounter = atom(mapClicksCounterState);
export const visitorStayLimit = atom(visitorStayLimitState);

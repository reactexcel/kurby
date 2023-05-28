import { atom } from "recoil";

type SearchCounter = {
  key: string;
  default: {
    count: string;
  };
};

const searchCounterState: SearchCounter = {
  key: "searchCounter",
  default: {
    count: "0",
  },
};

export const searchContext = atom(searchCounterState);

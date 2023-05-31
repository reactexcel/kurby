import { atom } from "recoil";

type SearchCounter = {
  key: string;
  default: {
    count: string;
    searchLimit: boolean;
  };
};

const searchCounterState: SearchCounter = {
  key: "searchCounter",
  default: {
    count: "0",
    searchLimit: false,
  },
};

export const searchContext = atom(searchCounterState);

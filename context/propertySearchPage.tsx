import { atom } from "recoil";

const propertySearchPage = {
  key: "propertySearchPage",
  default: {
    searchPayload: "",
  },
};

export const propertySearch = atom(propertySearchPage);

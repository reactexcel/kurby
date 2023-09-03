import { atom } from "recoil";

export type PresetType =
  | "living"
  | "domesticTourism"
  | "shortTermRental"
  | "buyAndHold"
  | "internationalTourism"
  | "glamping"
  | "realEstateDeveloper"
  | "vacationHome"
  | "retireeLiving"
  | "corporateRelocation"
  | "luxuryEstates";

interface OpenaiDropdownContextState {
  key: string;
  default: {
    value: PresetType;
    label: string;
  };
}

const openaiDropdownState: OpenaiDropdownContextState = {
  key: "openaiDropdownState",
  default: {
    value: "living",
    label: "Living",
  },
};

export const openaiDropdownContext = atom(openaiDropdownState);

import { PresetType } from "context/openaiDropdownContext";

export const canUsePreset = (preset: PresetType, plan: string) => {
  switch (preset) {
    case "living":
    case "domesticTourism":
    case "internationalTourism":
      return true;
    case "vacationHome":
    case "corporateRelocation":
      return ["pro", "growth", "starter"].includes(plan);
    case "retireeLiving":
      return ["pro", "growth"].includes(plan);
    case "shortTermRental":
    case "buyAndHold":
    case "glamping":
    case "realEstateDeveloper":
    case "luxuryEstates":
      return plan === "pro";
  }
};

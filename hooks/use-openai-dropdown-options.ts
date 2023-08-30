import { usePlanChecker } from "./plans";
import { useMemo } from "react";

export const useOpenaiDropdownOptions = () => {
  const { isGrowth, isPro, isStarter } = usePlanChecker();

  const dropdownOptions = useMemo(
    () => ({
      living: {
        value: "living",
        label: "Living",
        includedInPlan: true,
      },
      domesticTourism: {
        value: "domesticTourism",
        label: "Domestic Tourism",
        includedInPlan: true,
      },
      internationalTourism: {
        value: "internationalTourism",
        label: "International Tourism",
        includedInPlan: true,
      },
      vacationHome: {
        value: "vacationHome",
        label: "Vacation Home",
        includedInPlan: isPro || isGrowth || isStarter,
      },
      corporateRelocation: {
        value: "corporateRelocation",
        label: "Corporate Relocation",
        includedInPlan: isPro || isGrowth || isStarter,
      },
      retireeLiving: {
        value: "retireeLiving",
        label: "Retiree Living",
        includedInPlan: isPro || isGrowth,
      },
      shortTermRental: {
        value: "shortTermRental",
        label: "Short Term Rental",
        includedInPlan: isPro,
      },
      buyAndHold: {
        value: "buyAndHold",
        label: "Buy and Hold",
        includedInPlan: isPro,
      },
      glamping: {
        value: "glamping",
        label: "Glamping",
        includedInPlan: isPro,
      },
      realEstateDeveloper: {
        value: "realEstateDeveloper",
        label: "Real Estate Developer",
        includedInPlan: isPro,
      },
      luxuryEstates: {
        value: "luxuryEstates",
        label: "Luxury Estates",
        includedInPlan: isPro,
      },
    }),
    [isPro, isGrowth, isStarter],
  );

  return dropdownOptions;
};

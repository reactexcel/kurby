import { usePlanChecker } from "./plans";
import { useMemo } from "react";

export const useOpenaiDropdownOptions = () => {
  const { isGrowth, isPro, isStarter } = usePlanChecker();

  const dropdownOptions = useMemo(
    () => ({
      living: {
        value: "living",
        label: "Living",
        url: "living",
        includedInPlan: true,
      },
      domesticTourism: {
        value: "domesticTourism",
        label: "Domestic Tourism",
        url: "domestic-tourism",
        includedInPlan: true,
      },
      internationalTourism: {
        value: "internationalTourism",
        label: "International Tourism",
        url: "international-travel",
        includedInPlan: true,
      },
      vacationHome: {
        value: "vacationHome",
        label: "Vacation Home",
        url: "vacation-home",
        includedInPlan: isPro || isGrowth || isStarter,
      },
      corporateRelocation: {
        value: "corporateRelocation",
        label: "Corporate Relocation",
        url: "corporate-relocation",
        includedInPlan: isPro || isGrowth || isStarter,
      },
      retireeLiving: {
        value: "retireeLiving",
        label: "Retiree Living",
        url: "retirement-home",
        includedInPlan: isPro || isGrowth,
      },
      shortTermRental: {
        value: "shortTermRental",
        label: "Short Term Rental",
        url: "short-term-rental",
        includedInPlan: isPro,
      },
      buyAndHold: {
        value: "buyAndHold",
        label: "Buy and Hold",
        url: "buy-and-hold",
        includedInPlan: isPro,
      },
      glamping: {
        value: "glamping",
        label: "Glamping",
        url: "glamping",
        includedInPlan: isPro,
      },
      realEstateDeveloper: {
        value: "realEstateDeveloper",
        label: "Real Estate Developer",
        url: "real-estate-developer",
        includedInPlan: isPro,
      },
      luxuryEstates: {
        value: "luxuryEstates",
        label: "Luxury Estates",
        url: "luxury-homes",
        includedInPlan: isPro,
      },
    }),
    [isPro, isGrowth, isStarter],
  );

  return dropdownOptions;
};

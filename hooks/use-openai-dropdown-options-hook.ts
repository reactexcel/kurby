import { usePlanChecker } from "./plans";
import { useMemo } from "react";

export const useOpenaiDropdownOptions = () => {
  const { isGrowth, isPro, isStarter } = usePlanChecker();

  const dropdownOptions = useMemo(
    () => ({
      living: {
        value: "living",
        label: "Living",
      },
      domesticTourism: {
        value: "domesticTourism",
        label: "Domestic Tourism",
      },
      internationalTourism: {
        value: "internationalTourism",
        label: "International Tourism",
      },
      ...(isPro && {
        shortTermRental: {
          value: "shortTermRental",
          label: "Short Term Rental",
        },
        buyAndHold: {
          value: "buyAndHold",
          label: "Buy and Hold",
        },
        glamping: {
          value: "glamping",
          label: "Glamping",
        },
        realEstateDeveloper: {
          value: "realEstateDeveloper",
          label: "Real Estate Developer",
        },
        luxuryEstates: {
          value: "luxuryEstates",
          label: "Luxury Estates",
        },
      }),
      ...((isPro || isGrowth) && {
        retireeLiving: {
          value: "retireeLiving",
          label: "Retiree Living",
        },
      }),
      ...((isPro || isGrowth || isStarter) && {
        vacationHome: {
          value: "vacationHome",
          label: "Vacation Home",
        },
        corporateRelocation: {
          value: "corporateRelocation",
          label: "Corporate Relocation",
        },
      }),
    }),
    [isPro, isGrowth, isStarter],
  );

  return dropdownOptions;
};

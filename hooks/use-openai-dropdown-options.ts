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
        // includedInPlan: isPro || isGrowth || isStarter,
        includedInPlan: true,
      },
      corporateRelocation: {
        value: "corporateRelocation",
        label: "Corporate Relocation",
        url: "corporate-relocation",
        // includedInPlan: isPro || isGrowth || isStarter,
        includedInPlan: true,
      },
      retireeLiving: {
        value: "retireeLiving",
        label: "Retiree Living",
        url: "retirement-home",
        // includedInPlan: isPro || isGrowth,
        includedInPlan: true,
      },
      shortTermRental: {
        value: "shortTermRental",
        label: "Short Term Rental",
        url: "short-term-rental",
        // includedInPlan: isPro,
        includedInPlan: true,
      },
      buyAndHold: {
        value: "buyAndHold",
        label: "Buy and Hold",
        url: "buy-and-hold",
        // includedInPlan: isPro,
        includedInPlan: true,
      },
      glamping: {
        value: "glamping",
        label: "Glamping",
        url: "glamping",
        // includedInPlan: isPro,
        includedInPlan: true,
      },
      realEstateDeveloper: {
        value: "realEstateDeveloper",
        label: "Real Estate Developer",
        url: "real-estate-developer",
        // includedInPlan: isPro,
        includedInPlan: true,
      },
      luxuryEstates: {
        value: "luxuryEstates",
        label: "Luxury Estates",
        url: "luxury-homes",
        // includedInPlan: isPro,
        includedInPlan: true,
      },
    }),
    [isPro, isGrowth, isStarter],
  );

  return dropdownOptions;
};

export const useSeoTitles = (preset: string, address: string | null) => {
  const seoTitles: Record<string, { title: string }> = {
    living: {
      title: `Living In ${address}: Everything You Need to Know`,
    },
    domesticTourism: {
      title: `${address} Vacation: Everything For The Perfect Trip`,
    },
    internationalTourism: {
      title: `International Travel to ${address}: Everything to Know`,
    },
    vacationHome: {
      title: `Buying A Vacation Home in ${address}: Here’s What to Know`,
    },
    corporateRelocation: {
      title: `Relocating to ${address} For Work? Here’s What to Know`,
    },
    retireeLiving: {
      title: `${address} Retirement Home: Everything You Need to Know`,
    },
    shortTermRental: {
      title: `${address} Short-Term Rental: Everything You Need to Know to Be Profitable`,
    },
    buyAndHold: {
      title: `Investing In Real Estate In ${address}: Everything You Need to Know`,
    },
    glamping: {
      title: `${address} Glamping: Everything You Need to Know`,
    },
    realEstateDeveloper: {
      title: `Real Estate Development In ${address}: Everything You Need to Know`,
    },
    luxuryEstates: {
      title: `Luxury Homes in ${address}: Here’s What You Need to Know`,
    },
  };

  if (preset) {
    return seoTitles[preset];
  } else {
    return null;
  }
};

import { atom } from "recoil";

interface LoadingState {
  key: string;
  default: {
    walkscore: boolean;
    openai: {
      living: {
        explainedLikeAlocal: boolean;
        greenFlags: boolean;
        redFlags: boolean;
      };
      domesticTourism: boolean;
      internationalTourism: boolean;
      shortTermRental: boolean;
      buyAndHold: boolean;
      glamping: boolean;
      realEstateDeveloper: boolean;
      vacationHome: boolean;
      retireeLiving: boolean;
      corporateRelocation: boolean;
      luxuryEstates: boolean;
    };
    neighborhood: boolean;
    nearby: boolean;
  };
}

const loadingState: LoadingState = {
  key: "loadingContext",
  default: {
    walkscore: true,
    openai: {
      living: {
        explainedLikeAlocal: true,
        greenFlags: true,
        redFlags: true,
      },
      domesticTourism: true,
      internationalTourism: true,
      shortTermRental: true,
      buyAndHold: true,
      glamping: true,
      realEstateDeveloper: true,
      vacationHome: true,
      retireeLiving: true,
      corporateRelocation: true,
      luxuryEstates: true,
    },
    neighborhood: true,
    nearby: true,
  },
};

export const loadingContext = atom(loadingState);

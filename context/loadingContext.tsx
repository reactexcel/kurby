import { atom } from "recoil";

interface LoadingState {
  key: string;
  default: {
    walkscore: boolean;
    openai: {
      explainedLikeAlocal: boolean;
      greenFlags: boolean;
      redFlags: boolean;
    };
    neighborhood: boolean;
  };
}

const loadingState: LoadingState = {
  key: "loadingContext",
  default: {
    walkscore: true,
    openai: {
      explainedLikeAlocal: true,
      greenFlags: true,
      redFlags: true,
    },
    neighborhood: true,
  },
};

export const loadingContext = atom(loadingState);

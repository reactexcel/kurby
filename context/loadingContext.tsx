import { atom } from "recoil";

interface LoadingState {
  key: string;
  default: {
    walkscore: boolean;
    openai: boolean;
  };
}

const loadingState: LoadingState = {
  key: "loadingContext",
  default: {
    walkscore: true,
    openai: true,
  },
};

export const loadingContext = atom(loadingState);

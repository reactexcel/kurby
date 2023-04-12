import { atom } from "recoil";

interface LoadingState {
  key: string;
  default: {
    walkscore: boolean;
    openai: boolean;
    neighborhood: boolean;
  };
}

const loadingState: LoadingState = {
  key: "loadingContext",
  default: {
    walkscore: true,
    openai: true,
    neighborhood: true,
  },
};

export const loadingContext = atom(loadingState);

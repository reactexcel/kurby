import { atom } from "recoil";

interface OpenaiCacheState {
  key: string;
  default: {
    [key: string]: {
      explainedLikeAlocal: string;
      greenFlags: string;
      redFlags: string;
    };
  };
}

const openaiCacheState: OpenaiCacheState = {
  key: "openaiCache",
  default: {},
};

export const openaiCacheContext = atom(openaiCacheState);

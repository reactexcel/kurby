import { atom } from "recoil";

interface OpenaiIdsContext {
  key: string;
  default: string[];
}

const openaiIdsState: OpenaiIdsContext = {
  key: "openaiIdsContext",
  default: [],
};

export const openaiIdsContext = atom(openaiIdsState);

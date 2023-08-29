import { atom } from "recoil";
import { PresetType } from "./openaiDropdownContext";

type LivingPresetCacheObject = {
  explainedLikeAlocal?: string;
  greenFlags?: string;
  redFlags?: string;
};

// define PresetCacheType based on value of PresetType
type PresetCacheType<T extends PresetType> = T extends "living" ? LivingPresetCacheObject : string;

interface OpenaiCacheState {
  key: string;
  default: {
    [key: string]: {
      [P in PresetType]: PresetCacheType<P>;
    };
  };
}

const openaiCacheState: OpenaiCacheState = {
  key: "openaiCache",
  default: {},
};

export const openaiCacheContext = atom(openaiCacheState);

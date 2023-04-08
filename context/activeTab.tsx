import { atom } from "recoil";

export const activeTabState = atom<Tab | null>({
  key: "tab",
  default: "location",
});

export type Tab = "location" | "nearby" | "neighborhood" | "utility" | "property";

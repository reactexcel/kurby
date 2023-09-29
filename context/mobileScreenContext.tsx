import { atom } from "recoil";

export const gmapMobileScreen = atom<boolean>({
  key: "gmapScreen",
  default: false,
});

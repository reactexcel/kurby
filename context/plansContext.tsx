import { atom } from "recoil";

export enum IAppPlans {
  FREE_PLAN = "Free",
  GROWTH = "Growth",
  PROFESSIONAL = "Pro",
}

type PlansContextState = {
  key: string;
  default: IAppPlans;
};

const plansContextState: PlansContextState = {
  key: "plansContext",
  default: IAppPlans.FREE_PLAN,
};

export const plansContext = atom(plansContextState);

import { atom } from "recoil";

export enum IAppPlans {
  FREE_PLAN = "Free",
  FREE_PLAN_UID = "pWrwqamn",
  STARTER = "Starter",
  STARTER_PLAN_UID = "L9nOOeWZ",
  GROWTH = "Growth Plan",
  GROWTH_PLAN_UID = "BWzEkg9E",
  PROFESSIONAL = "Professional Plan",
  PROFESSIONAL_PLAN_UID = "ZmN83E92",
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

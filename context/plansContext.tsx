import { usePersistentRecoilState } from "hooks/recoil-persist-state";
import { useEffect } from "react";
import { atom } from "recoil";
import { visitorStayLimit } from "./visitorContext";

export enum IAppPlans {
  FREE_PLAN = "Free",
  GROWTH = "Growth Plan",
  PROFESSIONAL = "Professional Plan",
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

export function useTenMinutesForVisitor() {
  const [, setLimit] = usePersistentRecoilState("visitorStayLimit", visitorStayLimit);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLimit(true);
    }, 10 * 60 * 1000);

    return () => clearTimeout(timer);
  }, [setLimit]);
}

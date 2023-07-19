import { usePersistentRecoilState } from "hooks/recoil-persist-state";
import { useEffect } from "react";
import { atom } from "recoil";
import { mapClicksCounter } from "./visitorContext";
export enum IAppPlans {
  FREE_PLAN,
  GROWTH,
  PROFESSIONAL,
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
  const [, setCounter] = usePersistentRecoilState("mapClickCounter", mapClicksCounter);

  useEffect(() => {
    // Set counter to 4 after 5 seconds (should be 10 minutes)
    const timer = setTimeout(() => {
      setCounter(4);
    }, 10 * 60 * 1000); // 5 seconds in milliseconds

    // Clear the timeout if the component is unmounted before the timeout completes
    return () => clearTimeout(timer);
  }, [setCounter]);
}

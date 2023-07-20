import { usePersistentRecoilState } from "hooks/recoil-persist-state";
import { useAuth } from "providers/AuthProvider";
import { useEffect } from "react";
import { atom } from "recoil";
import { IAppPlans } from "./plansContext";

type GmapClickCounterType = {
  key: string;
  default: number;
};

type StayLimitType = {
  key: string;
  default: boolean;
};

const mapClicksCounterState: GmapClickCounterType = {
  key: "mapClicksCounter",
  default: 0,
};

const visitorStayLimitState: StayLimitType = {
  key: "visitorStayLimit",
  default: false,
};
const freeUserStayLimitState: StayLimitType = {
  key: "freeUserStayLimit",
  default: false,
};

export const mapClicksCounter = atom(mapClicksCounterState);
export const visitorStayLimit = atom(visitorStayLimitState);
export const freeUserStayLimit = atom(freeUserStayLimitState);

export function useTenMinutesForVisitor() {
  const [, setLimit] = usePersistentRecoilState("visitorStayLimit", visitorStayLimit);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLimit(true);
    }, 10 * 60 * 1000);

    return () => clearTimeout(timer);
  }, [setLimit]);
}

// export function useFifthTeenMinutesForFreePlan() {
//   const [, setLimit] = usePersistentRecoilState("freeUserStayLimit", freeUserStayLimit);
//   const { user } = useAuth();
//   const isFreePlan = user?.Account?.CurrentSubscription?.Plan?.Name === IAppPlans.FREE_PLAN;
//   useEffect(() => {
//     if (!isFreePlan) {
//       return;
//     }
//     const timer = setTimeout(() => {
//       setLimit(true);
//     }, 15 * 60 * 1000); // 15 minutes in milliseconds

//     return () => clearTimeout(timer);
//   }, [setLimit]);
// }

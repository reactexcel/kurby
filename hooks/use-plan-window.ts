import { IAppPlans } from "context/plansContext";
import { useOutseta } from "./use-outseta";

const handlePlanSelect = (outsetaRef: any, planId: string) => {
  outsetaRef.current?.auth?.open({ widgetMode: "register", planUid: planId });
};

export const usePlanWindow = () => {
  const outsetaRef = useOutseta();

  return {
    openFree: () => handlePlanSelect(outsetaRef, IAppPlans.FREE_PLAN_UID),
    openStarter: () => handlePlanSelect(outsetaRef, IAppPlans.STARTER_PLAN_UID),
    openGrowth: () => handlePlanSelect(outsetaRef, IAppPlans.GROWTH_PLAN_UID),
    openPro: () => handlePlanSelect(outsetaRef, IAppPlans.PROFESSIONAL_PLAN_UID),
    openPlanWithUid: (uid: IAppPlans) => handlePlanSelect(outsetaRef, uid),
  };
};

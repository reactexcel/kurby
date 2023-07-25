import { IAppPlans } from "context/plansContext";
import { useAuth } from "providers/AuthProvider";

export function usePlanChecker() {
  const { user } = useAuth();

  const subscription = user?.Account?.CurrentSubscription?.Plan?.Uid;

  return {
    isVisitor: !localStorage.getItem("Outseta.nocode.accessToken"),
    isFree: subscription === IAppPlans.FREE_PLAN_UID,
    isStarter: subscription === IAppPlans.STARTER_PLAN_UID,
    isGrowth: subscription === IAppPlans.GROWTH_PLAN_UID,
    isPro: subscription === IAppPlans.PROFESSIONAL_PLAN_UID,
  };
}

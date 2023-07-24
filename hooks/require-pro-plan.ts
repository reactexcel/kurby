import { IAppPlans } from "context/plansContext";
import { useAuth } from "providers/AuthProvider";

export function useIsProPlan() {
  const { user } = useAuth();

  return user?.Account?.CurrentSubscription?.Plan?.Name === IAppPlans.PROFESSIONAL;
}

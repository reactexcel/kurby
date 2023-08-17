import { useEffect, useState, useCallback } from "react";
import axios, { AxiosResponse } from "axios";
import { useAuth } from "providers/AuthProvider";
import { useRecoilState } from "recoil";
import { activeTabState } from "context/activeTab";
import { nearbyPlacesCallCountContext } from "context/nearbyPlacesCallCountContext";
import { hasDatePassed } from "utils/hasDatePassed";
import { usePlanChecker } from "./plans";

const xanoApiUrl = process.env.NEXT_PUBLIC_XANO_USER_QUOTA_API;

export const useNearbyPlacesCallCount = () => {
  const [{ callCount }, setCallCount] = useRecoilState(nearbyPlacesCallCountContext);
  const { isGrowth, isPro } = usePlanChecker();
  const { user, xanoToken } = useAuth();
  const [activeTab] = useRecoilState(activeTabState);
  const [isCalled, setIsCalled] = useState(false);

  const handleLimit = useCallback(
    (count: number) => {
      if (isGrowth) {
        return count >= 20;
      } else if (isPro) {
        return count >= 40;
      }

      return false;
    },
    [isGrowth, isPro],
  );

  const incrementCallCount = async (incrementValue: number) => {
    if (user && (isGrowth || isPro)) {
      try {
        const response = await axios.post(
          `${xanoApiUrl}/user_quota/${user.Account.Uid}`,
          {
            used_count: callCount + incrementValue,
          },
          {
            headers: {
              Authorization: `Bearer ${xanoToken}`,
            },
          },
        );

        setCallCount(() => ({
          hasReachedLimit: handleLimit(response.data.used_count),
          callCount: response.data.used_count,
        }));
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    (async () => {
      let response = {} as AxiosResponse;

      if (isCalled === false && activeTab === "nearby" && user && (isGrowth || isPro)) {
        try {
          response = await axios.get(`${xanoApiUrl}/user_quota/${user.Account.Uid}`, {
            headers: {
              Authorization: `Bearer ${xanoToken}`,
            },
          });
        } catch (error: any) {
          if (error?.response?.status === 404) {
            try {
              response = await axios.post(
                `${xanoApiUrl}/user_quota`,
                {
                  user_id: user.Account.Uid,
                  quota_type: "nearby_places",
                  used_count: 0,
                  renewal_date: user?.Account?.CurrentSubscription?.RenewalDate,
                },
                {
                  headers: {
                    Authorization: `Bearer ${xanoToken}`,
                  },
                },
              );
            } catch (error: any) {
              console.log(error);
            }
          }
        }
      }

      if (response?.data) {
        if (hasDatePassed(response.data.renewal_date)) {
          try {
            response = await axios.post(
              `${xanoApiUrl}/user_quota/${user.Account.Uid}/renewal_date`,
              {
                used_count: 0,
                renewal_date: user?.Account?.CurrentSubscription?.RenewalDate,
              },
              {
                headers: {
                  Authorization: `Bearer ${xanoToken}`,
                },
              },
            );
          } catch (error) {
            console.log(error);
          }
        }

        setCallCount(() => ({
          hasReachedLimit: handleLimit(response.data.used_count),
          callCount: response.data.used_count,
        }));
        setIsCalled(true);
      }
    })();
  }, [user, activeTab]);

  return {
    hasBeenCalled: isCalled,
    incrementCallCount,
  };
};

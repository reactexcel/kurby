import { CircularProgress } from "@mui/material";
import axios from "axios";
import { filterState } from "context/filterContext";
import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { TabLayout } from "components/layouts/TabLayout/TabLayout";
import styles from "./Property.module.scss";
import { HouseList } from "./HouseList/HouseList";
import { Grid } from "components/Grid/Grid";
import { GridItem } from "components/Grid/GridItem";
import { IPropertySearchResponse } from "pages/api/propertyV2";
import RecordV2 from "./Record/RecordV2";
import FinancialMortgage from "./FinancialMortgage/FinancialMortgage";
import ListingHistory from "./ListingHistory/ListingHistory";
import LastSale from "./LastSale/LastSale";
import RentalEstimates from "./RentalEstimates/RentalEstimates";
import PropertyData from "./PropertyData/PropertyData";
import PropertyStatus from "./PropertyStatus/PropertyStatus";
import { IPropertyDetailResponse } from "pages/api/propertyDetail";
import { propertyDetailAvailable, propertyDetailContext, propertyInfoV2Context } from "context/propertyContext";
import { AdditionalPropertyInformation } from "./AdditionalPropertyInformation/AdditionalPropertyInformation";
import LotInfo from "./LotInfo/LotInfo";
import TaxInfo from "./TaxInfo/TaxInfo";
import KurbyPaidPlanLimit, { TabLimitMessage } from "components/AIWarningTooltip/KurbyPaidPlanLimit";
import { IAppPlans } from "context/plansContext";
import { useAuth } from "providers/AuthProvider";
import { propertyV2Mock } from "mock/freePlanPropertyMock";

/**
 * Body Content
 * @description: Displays everything below the filters
 */
export default function Property({ explainedLikeAlocal }: { explainedLikeAlocal: string }) {
  const { user } = useAuth();
  const [filterVal] = useRecoilState(filterState);
  const [propertyInfo, setPropertyInfoV2] = useRecoilState(propertyInfoV2Context);
  const [propertyDetail, setPropertyDetail] = useRecoilState(propertyDetailContext);

  const isNotLoaded = !Boolean(propertyDetail && propertyInfo);

  const [loading, setLoading] = useState<boolean>(isNotLoaded);
  const [isTabAvailable, setTabAvailable] = useRecoilState(propertyDetailAvailable);
  const isFreePlan = user?.Account?.CurrentSubscription?.Plan?.Name === IAppPlans.FREE_PLAN;
  const isGrowthPlan = user?.Account?.CurrentSubscription?.Plan?.Name === IAppPlans.GROWTH;

  useEffect(() => {
    async function preparePropertyV2Data() {
      const { data } = await axios.post<IPropertySearchResponse>("/api/propertyV2", {
        address: filterVal.address,
      });
      setLoading(false);
      if (data) {
        setPropertyInfoV2(data.data[0]);
      }
    }

    async function preparePropertyDetail() {
      const { data } = await axios.post<IPropertyDetailResponse>("/api/propertyDetail", {
        address: filterVal.address,
      });
      setLoading(false);
      if (data) {
        setPropertyDetail(data.data);
        setTabAvailable(Boolean(Object.keys(data.data).length > 0));
      }
    }

    if (isFreePlan || !Boolean(user)) {
      setPropertyInfoV2(propertyV2Mock);
      setLoading(false);
      // setPropertyDetail(data.data);
      return;
    }

    if (isGrowthPlan) {
      setLoading(true);
      preparePropertyV2Data();

      return;
    }

    if (isNotLoaded) {
      setLoading(true);
      preparePropertyV2Data();
      preparePropertyDetail();
    }
  }, []);

  const isAddressInUSA = useMemo(() => filterVal?.selectedPlace?.formatted_address?.includes("USA"), [filterVal?.selectedPlace?.formatted_address]);

  if (!isTabAvailable) {
    return <></>;
  }

  const isLimitReached = !Boolean(user) || isFreePlan;

  return (
    <TabLayout
      style={isLimitReached ? { height: "67vh", overflow: "hidden" } : {}}
      className={`${styles.tabLayout} ${!isAddressInUSA ? styles.note : ""}`}
      loading={loading || !propertyInfo}
    >
      {loading || !propertyInfo ? (
        <CircularProgress />
      ) : isAddressInUSA ? (
        <div className={styles.main}>
          {isLimitReached && <KurbyPaidPlanLimit type={TabLimitMessage.PROPERTY_DATA_TAB} />}
          <div className={styles.wrapper}>
            <img
              src={
                "https://maps.googleapis.com/maps/api/streetview?size=1600x200&location=" +
                filterVal?.selectedPlace?.geometry?.location?.lat() +
                "," +
                filterVal?.selectedPlace?.geometry?.location?.lng() +
                "&fov=50&key=AIzaSyBW6MS6leYzF_KDJcuUVT7M3FAf6QJKxW0"
              }
              className={styles.image}
              alt=""
            />
          </div>
          <div className={styles.wrapper}>
            <Grid>
              <GridItem>
                <RecordV2 description={explainedLikeAlocal} />
              </GridItem>
              <GridItem>
                <FinancialMortgage />
              </GridItem>
              {propertyDetail?.lastSale && (
                <GridItem>
                  <LastSale />
                </GridItem>
              )}
              {propertyInfo?.rentAmount && propertyInfo.suggestedRent && (
                <GridItem>
                  <RentalEstimates />
                </GridItem>
              )}
              <GridItem>
                <ListingHistory />
              </GridItem>
              <GridItem>
                <PropertyData />
              </GridItem>
              <GridItem>
                <AdditionalPropertyInformation />
              </GridItem>
              <GridItem>
                <LotInfo />
              </GridItem>
              <GridItem>
                <TaxInfo />
              </GridItem>
              <GridItem>
                <PropertyStatus />
              </GridItem>
              {/* <GridItem isEmpty={!propertyInfo?.valueEstimate}>
                <EstimationGraph valueEstimate={propertyInfo?.valueEstimate} />
              </GridItem> */}
              {propertyDetail?.comps && (
                <GridItem>
                  <HouseList />
                </GridItem>
              )}
            </Grid>
          </div>
        </div>
      ) : (
        <h3>Home data is currently only available for properties in the United States</h3>
      )}
    </TabLayout>
  );
}

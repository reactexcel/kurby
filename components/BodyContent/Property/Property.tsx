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
import School from "./SchoolData/SchoolData";
import TaxInfo from "./TaxInfo/TaxInfo";
import KurbyPaidPlanLimit, { TabLimitMessage } from "components/AIWarningTooltip/KurbyPaidPlanLimit";
import { useAuth } from "providers/AuthProvider";
import { propertyV2Mock } from "mock/freePlanPropertyMock";
import { usePlanChecker } from "hooks/plans";
import { IPropertySearchResponse } from "pages/api/core/reapi/propertySearch";
import House from "public/icons/not-found.svg";
import ArrowLeft from "public/icons/arrow-left-green.svg";
import { Button } from "components/Button/Button";
import { useRouter } from "next/router";
/**
 * Body Content
 * @description: Displays everything below the filters
 */

export enum IPropertyQueryProps {
  USE_IN_MEMORY = "useInMemoryObject",
  BASE64PROPERTY_INFO = "base64prInfo",
}

export default function Property() {
  const params = new URLSearchParams(window.location.search);
  const useMemoryObject = Boolean(params.get(IPropertyQueryProps.USE_IN_MEMORY));
  const base64property = params.get(IPropertyQueryProps.BASE64PROPERTY_INFO);

  const { user } = useAuth();
  const [filterVal] = useRecoilState(filterState);
  const [propertyInfo, setPropertyInfoV2] = useRecoilState(propertyInfoV2Context);
  const [propertyDetail, setPropertyDetail] = useRecoilState(propertyDetailContext);

  const isNotLoaded = !Boolean(propertyDetail || propertyInfo);

  const [loading, setLoading] = useState<boolean>(isNotLoaded);
  const [isError, setError] = useState<boolean>(false);
  const [isTabAvailable] = useRecoilState(propertyDetailAvailable);

  const { isFree, isStarter } = usePlanChecker();
  // const { explainedLikeAlocal } = useOpenAi();

  async function preparePropertyV2Data() {
    if (useMemoryObject && base64property) {
      const property = JSON.parse(atob(base64property));
      setPropertyInfoV2(property);
      setError(false);
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post<IPropertySearchResponse>("/api/propertyV2", {
        address: filterVal.address,
      });
      setError(false);
      setLoading(false);
      if (data) {
        setPropertyInfoV2(data.data[0]);
      }
    } catch (e) {
      setError(true);
    }
  }

  async function preparePropertyDetail() {
    try {
      const { data } = await axios.post<IPropertyDetailResponse>("/api/propertyDetail", {
        address: filterVal.address,
        userToken: localStorage.getItem("Outseta.nocode.accessToken"),
      });
      setError(false);
      setLoading(false);
      if (data) {
        setPropertyDetail(data.data);
      }
    } catch (e) {
      setError(true);
    }
  }

  const executeSearch = () => {
    if (isFree || isStarter || !Boolean(user)) {
      setPropertyInfoV2(propertyV2Mock);
      setLoading(false);
      // setPropertyDetail(data.data);
      return;
    }

    if (isNotLoaded) {
      setLoading(true);
      preparePropertyV2Data();
      preparePropertyDetail();
    }
  };

  useEffect(() => {
    executeSearch();
  }, []);

  const isAddressInUSA = useMemo(() => filterVal?.selectedPlace?.formatted_address?.includes("USA"), [filterVal?.selectedPlace?.formatted_address]);

  if (!isTabAvailable) {
    return (
      <TabLayout className={styles.propertyDataNotAvailable}>
        <h2>Property Data Unavailable</h2>
      </TabLayout>
    );
  }

  const isLimitReached = !Boolean(user) || isFree;

  const handleTryAgain = () => {
    setError(false);
    executeSearch();
  };

  return (
    <TabLayout
      style={isLimitReached || isStarter ? { height: "67vh", overflow: "hidden" } : {}}
      className={`${styles.tabLayout} ${!isAddressInUSA ? styles.note : ""}`}
      loading={loading || !propertyInfo}
    >
      {!isError && (loading || !propertyInfo) ? (
        <CircularProgress />
      ) : isError ? (
        <ErrorPage onTryAgain={handleTryAgain} />
      ) : isAddressInUSA ? (
        <div className={styles.main}>
          {isLimitReached && <KurbyPaidPlanLimit type={TabLimitMessage.PROPERTY_DATA_TAB} />}
          {isStarter && <KurbyPaidPlanLimit type={TabLimitMessage.PROPERTY_DATA_TAB_STARTER} />}
          <div className={styles.wrapper}>
            <BackNavigation />
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
                <RecordV2 />
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
              <GridItem>
                <School />
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

function ErrorPage({ onTryAgain }: { onTryAgain: () => void }) {
  return (
    <div className={styles.errorPage}>
      <House />
      <p>Failed to load the property</p>
      <Button onClick={onTryAgain}>Try again</Button>
    </div>
  );
}

function BackNavigation() {
  const router = useRouter();
  const prevAddress = localStorage.getItem("prevAddress") as string;

  const goBack = () => {
    localStorage.removeItem("prevAddress");
    if (prevAddress) {
      router.push(prevAddress);
    }
  };

  return (
    <button className={styles.backButton} onClick={goBack}>
      <ArrowLeft />
      Go Back
    </button>
  );
}

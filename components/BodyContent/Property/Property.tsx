import { CircularProgress } from "@mui/material";
import axios from "axios";
import { filterState } from "context/filterContext";
import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { PropertyType } from "./types";
import EstimationGraph from "./EstimationGraph/EstimationGraph";
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
import { propertyDetailContext, propertyInfoV2Context } from "context/propertyContext";
import { AdditionalPropertyInformation } from "./AdditionalPropertyInformation/AdditionalPropertyInformation";
import LotInfo from "./LotInfo/LotInfo";
import TaxInfo from "./TaxInfo/TaxInfo";

/**
 * Body Content
 * @description: Displays everything below the filters
 */
export default function Property({ explainedLikeAlocal }: { explainedLikeAlocal: string }) {
  const [filterVal] = useRecoilState(filterState);
  const [propertyInfo, setPropertyInfo] = useState<PropertyType | null>(null);
  const [propertyInfoV2, setPropertyInfoV2] = useRecoilState(propertyInfoV2Context);
  const [propertyDetail, setPropertyDetail] = useRecoilState(propertyDetailContext);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getPropertyData() {
      setLoading(true);
      const lat = filterVal.selectedPlace.geometry.location.lat();
      const lng = filterVal.selectedPlace.geometry.location.lng();

      const propertyData = await axios.post("/api/property", {
        place: filterVal.selectedPlace,
        latLng: [lat, lng],
      });
      setPropertyInfo(propertyData.data);
      setLoading(false);
    }

    async function preparePropertyV2Data() {
      const { data } = await axios.post<IPropertySearchResponse>("/api/propertyV2", {
        address: filterVal.address,
      });
      if (data) {
        setPropertyInfoV2(data.data[0]);
      }
    }

    async function preparePropertyDetail() {
      const { data } = await axios.post<IPropertyDetailResponse>("/api/propertyDetail", {
        address: filterVal.address,
      });
      console.log(data);
      if (data) {
        setPropertyDetail(data.data);
      }
    }

    preparePropertyV2Data();
    preparePropertyDetail();
    getPropertyData();
  }, []);

  const isAddressInUSA = useMemo(() => filterVal?.selectedPlace?.formatted_address?.includes("USA"), [filterVal?.selectedPlace?.formatted_address]);

  return (
    <TabLayout className={`${styles.tabLayout} ${!isAddressInUSA ? styles.note : ""}`} loading={loading || !propertyInfo}>
      {loading || !propertyInfo ? (
        <CircularProgress />
      ) : isAddressInUSA ? (
        <div className={styles.main}>
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
                {/* <Record propertyInfo={propertyInfo} description={explainedLikeAlocal} /> */}
                <RecordV2
                  propertyData={{
                    v1: propertyInfo,
                    v2: propertyInfoV2,
                  }}
                  description={explainedLikeAlocal}
                />
              </GridItem>
              <GridItem>
                <FinancialMortgage />
              </GridItem>
              {propertyDetail?.lastSale && (
                <GridItem>
                  {/* TODO Property Search API */}
                  <LastSale />
                </GridItem>
              )}
              {propertyInfoV2?.rentAmount && propertyInfoV2.suggestedRent && (
                <GridItem>
                  <RentalEstimates data={propertyInfoV2} />
                </GridItem>
              )}
              <GridItem>
                <ListingHistory data={propertyInfoV2} />
              </GridItem>
              <GridItem>
                <PropertyData data={propertyInfoV2} />
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
                <PropertyStatus data={propertyInfoV2} />
              </GridItem>
              {/* <GridItem isEmpty={!propertyInfo?.valueEstimate}>
                <EstimationGraph valueEstimate={propertyInfo?.valueEstimate} />
              </GridItem> */}
              <GridItem isEmpty={!propertyInfo?.valueEstimate}>
                <HouseList list={propertyInfo?.valueEstimate} variant="sale" />
              </GridItem>
              <GridItem isEmpty={!propertyInfo?.rentEstimate}>
                <HouseList list={propertyInfo?.rentEstimate} />
              </GridItem>
            </Grid>
          </div>
        </div>
      ) : (
        <h3>Home data is currently only available for properties in the United States</h3>
      )}
    </TabLayout>
  );
}

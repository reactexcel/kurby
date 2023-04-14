import { CircularProgress } from "@mui/material";
import axios from "axios";
import { filterState } from "context/filterContext";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Record from "./Record/Record";
import { PropertyType } from "./types";
import EstimationGraph from "./EstimationGraph/EstimationGraph";
import Owner from "./Owner/Owner";
import { TabLayout } from "components/layouts/TabLayout/TabLayout";
import styles from "./Property.module.scss";
import { HouseList } from "./HouseList/HouseList";
import { Grid } from "components/Grid/Grid";
import { GridItem } from "components/Grid/GridItem";

/**
 * Body Content
 * @description: Displays everything below the filters
 */
export default function Property({ explainedLikeAlocal }: { explainedLikeAlocal: string }) {
  const [filterVal] = useRecoilState(filterState);
  const [propertyInfo, setPropertyInfo] = useState<PropertyType | null>(null);
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
      console.log("propertyData =>>", propertyData);
      setPropertyInfo(propertyData.data);
      setLoading(false);
    }
    getPropertyData();
  }, []);

  return (
    <TabLayout className={styles.tabLayout} loading={loading || !propertyInfo}>
      {loading || !propertyInfo ? (
        <CircularProgress />
      ) : (
        <>
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
              <GridItem isEmpty={!(propertyInfo?.records && propertyInfo?.records.length > 0)}>
                <Record propertyInfo={propertyInfo} description={explainedLikeAlocal} />
              </GridItem>
              <GridItem isEmpty={!propertyInfo?.valueEstimate}>
                <EstimationGraph valueEstimate={propertyInfo?.valueEstimate} />
              </GridItem>
              <GridItem isEmpty={!propertyInfo?.valueEstimate}>
                <HouseList list={propertyInfo?.valueEstimate} variant="sale" />
              </GridItem>
              <GridItem isEmpty={!propertyInfo?.rentEstimate}>
                <HouseList list={propertyInfo?.rentEstimate} />
              </GridItem>
              <GridItem isEmpty={!(propertyInfo?.records && propertyInfo?.records.length > 0)}>
                <Owner owner={propertyInfo?.records[0]?.owner} />
              </GridItem>
            </Grid>
          </div>
        </>
      )}
    </TabLayout>
  );
}

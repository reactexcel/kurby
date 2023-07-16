import { Typography } from "@mui/material";
import React from "react";
import HouseCard from "../HouseCard/HouseCard";
import { Grid } from "../../../Grid/Grid";
import { GridItem } from "../../../Grid/GridItem";
import styles from "./HouseList.module.scss";
import { useRecoilState } from "recoil";
import { propertyDetailContext } from "context/propertyContext";
export function HouseList() {
  const [propertyDetail] = useRecoilState(propertyDetailContext);

  if (propertyDetail?.comps.length === 0) {
    return <></>;
  }

  return (
    <Grid>
      <GridItem>
        <Typography component="h5" variant="h5" fontSize="22px">
          Comparable Homes
        </Typography>
      </GridItem>
      <GridItem>
        <div className={styles.wrapper}>
          <Grid>
            {propertyDetail?.comps?.map((place, index) => {
              return (
                <GridItem className={styles.gi} width="1/2" key={index}>
                  <HouseCard
                    cardInfo={{
                      id: place.id,
                      formattedAddress: place.address.address,
                      longitude: parseFloat(place.longitude),
                      latitude: parseFloat(place.latitude),
                      city: place.mailAddress.city,
                      state: place.mailAddress.state,
                      zipcode: place.mailAddress.zip,
                      price: parseFloat(place.estimatedValue),
                      address: place.address.address,
                      bedrooms: parseInt(place.bedrooms),
                      bathrooms: parseInt(place.bathrooms),
                      propertyType: place.propertyType,
                      squareFootage: parseFloat(place.squareFeet),
                    }}
                  />
                </GridItem>
              );
            })}
          </Grid>
        </div>
      </GridItem>
    </Grid>
  );
}

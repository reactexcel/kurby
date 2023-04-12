import { Typography } from "@mui/material";
import React from "react";
import HouseCard from "../HouseCard/HouseCard";
import { Grid } from "../../../Grid/Grid";
import { GridItem } from "../../../Grid/GridItem";
import styles from "./HouseList.module.scss";

export function HouseList({ list, variant = "rent" }: { list?: any; variant?: "rent" | "sale" }) {
  if (!list || !list?.listings || list?.listings?.length === 0) {
    return null;
  }

  return (
    <Grid>
      <GridItem>
        <Typography component="h5" variant="h5" fontSize="22px">
          Comparable Homes for {variant === "rent" ? "Rent" : "Sale"} ({list?.listings?.length} location)
        </Typography>
      </GridItem>
      <GridItem>
        <div className={styles.wrapper}>
          <Grid>
            {Array.isArray(list?.listings) ? (
              list?.listings?.map((rentInfo: any, index: number) => (
                <GridItem className={styles.gi} width="1/2" key={index}>
                  <HouseCard cardInfo={rentInfo} />
                </GridItem>
              ))
            ) : (
              <GridItem className={styles.gi} width="1/2">
                <HouseCard cardInfo={list} />
              </GridItem>
            )}
          </Grid>
        </div>
      </GridItem>
    </Grid>
  );
}

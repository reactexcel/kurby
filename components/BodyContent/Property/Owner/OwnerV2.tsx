import { Box, Typography } from "@mui/material";
import React from "react";
import OwnerSvg from "../../../../public/icons/owner.svg";
import LocationSvg from "../../../../public/icons/location.svg";
import styles from "./Owner.module.scss";

interface OwnerProps {
  owner: {
    firstName: string;
    lastName: string;
    address: string;
  };
}

export default function Owner({ owner }: OwnerProps) {
  if (!owner) {
    return null;
  }

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.icon}>
        <OwnerSvg />
      </Box>
      <Box className={styles.info}>
        <Typography variant="h5" component="h5" fontSize={"20px"}>
          {owner.firstName} {owner.lastName}
        </Typography>
        <div className={styles.address}>
          <LocationSvg style={{ minWidth: "17px" }} />
          <p className={styles.ownerAddress}>{owner.address}</p>
        </div>
      </Box>
    </Box>
  );
}

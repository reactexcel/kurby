import React from "react";
import styles from "./Owner.module.scss";
import SkipTrace from "./SkipTrace/SkipTrace";
import { Box, Typography } from "@mui/material";
import OwnerSvg from "../../../../public/icons/owner.svg";
import LocationSvg from "../../../../public/icons/location.svg";

interface OwnerProps {
  owner: {
    firstName: string;
    lastName: string;
    address: string;
  };
  address: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
}

export default function Owner({ owner, address }: OwnerProps) {
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
        <div className={styles.getInfo}>
          <SkipTrace
            ownerInformation={{
              firstName: owner.firstName,
              lastName: owner.lastName,
              address: address.address,
              zip: address.zip,
              city: address.city,
              state: address.state,
            }}
          />
        </div>
      </Box>
    </Box>
  );
}

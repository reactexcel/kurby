import { Box, Typography } from "@mui/material";
import React from "react";
import OwnerSvg from "../../../../public/icons/owner.svg";
import LocationSvg from "../../../../public/icons/location.svg";
import styles from "./Owner.module.scss";

interface OwnerProps {
  owner: {
    names?: string[];
    mailingAddress?: {
      id: string;
      addressLine1: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
}

export default function Owner({ owner }: OwnerProps) {
  if (!owner) {
    return null;
  }

  return (
    <Box>
      <Typography component="h5" variant="h5" fontSize="22px">
        Owner
      </Typography>
      <Box className={styles.wrapper}>
        <Box className={styles.icon}>
          <OwnerSvg />
        </Box>
        <Box className={styles.info}>
          <Typography variant="h5" component="h5" fontSize={"18px"}>
            {owner?.names && owner?.names.length > 0 ? owner.names[0] : ""}
          </Typography>
          <div className={styles.address}>
            <LocationSvg style={{ minWidth: "17px" }} />
            <div>{`${owner?.mailingAddress?.addressLine1} ${owner?.mailingAddress?.city} ${owner?.mailingAddress?.state} ${owner?.mailingAddress?.zipCode}`}</div>
          </div>
        </Box>
      </Box>
    </Box>
  );
}

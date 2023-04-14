import { Box, Typography, styled } from "@mui/material";
import React from "react";
import { useStyles } from "../../styles";
import LocationSvg from "../../../../public/icons/location.svg";
import BedSvg from "../../../../public/icons/bed.svg";
import WashSvg from "../../../../public/icons/wash.svg";
import { convertUSNumberFormat } from "utils/number";
import { KBColor } from "constants/color";
import { useRouter } from "next/router";
import { addressToUrl } from "utils/address";
import styles from "./HouseCard.module.scss";

const ProTypography = styled(Typography)({
  fontFamily: "FilsonPro !important",
});

export default function HouseCard({ cardInfo }: { cardInfo: any }) {
  const classes = useStyles;
  const router = useRouter();

  if (!cardInfo) {
    return null;
  }

  return (
    <div
      className={styles.main}
      onClick={() => {
        const encodedAddress = addressToUrl(cardInfo?.formattedAddress);
        router.push(`/app/${encodedAddress}`);
      }}
    >
      <div className={styles.image}>
        <img
          src={"https://maps.googleapis.com/maps/api/streetview?size=200x200&location=" + cardInfo?.formattedAddress + "&fov=50&key=AIzaSyBW6MS6leYzF_KDJcuUVT7M3FAf6QJKxW0"}
          style={classes.roundImage}
          alt=""
        />
      </div>
      <div className={styles.info}>
        <Typography variant="h6" component="h6" fontSize="1rem">
          {cardInfo?.formattedAddress}
        </Typography>
        <ProTypography fontSize={"12px"} sx={{ display: "flex", alignItems: "center" }}>
          <LocationSvg style={{ marginRight: "8px" }} />
          {cardInfo?.formattedAddress}
        </ProTypography>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 1 }}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <BedSvg />
              <ProTypography sx={{ marginLeft: 1 }} fontSize="10px">
                {cardInfo?.bedrooms} Bedroom
              </ProTypography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", marginLeft: 2 }}>
              <WashSvg />
              <ProTypography sx={{ marginLeft: 1 }} fontSize="10px">
                {" "}
                {cardInfo?.bathrooms} Bathrooms
              </ProTypography>
            </Box>
          </Box>
          <Box>
            <ProTypography fontSize="12px" color={KBColor.GREEN}>
              ${convertUSNumberFormat(cardInfo?.price)}
            </ProTypography>
          </Box>
        </Box>
      </div>
    </div>
  );
}

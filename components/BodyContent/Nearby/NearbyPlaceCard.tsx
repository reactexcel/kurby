import { Box, SvgIcon, Typography } from "@mui/material";
import { borderRadius } from "@mui/system";
import Image from "next/image";
import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Rating } from "react-simple-star-rating";
import { Divider } from "@mui/material";
import PersonIcon from "../../../public/images/person.svg";
import styles from "./NearbyPlace.module.css";

/**
 * NearbyPlaceCard
 * @description: Displays a 'card' for the nearby place
*/

//TODO Get distance info and render it

export default function NearbyPlaceCard({ place }: any) {
  const { name: placeName, vicinity, rating, totalRatings, photos } = place;
  
  //Todo add to style sheet
  const resultsContentStyle = {
    padding: "20px",
    border: "1px solid rgba(38,75,92,.2)",
    boxShadow: "0 4px 4px #00000040",
    borderRadius: "14px",
    marginTop: "25px",
  };

  return (
    <Box style={resultsContentStyle}>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Box style={{ display: "flex" }}>
          <Image
            style={{
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              borderRadius: "10px",
              marginRight: "16px",
            }}
            src={photos?.[0]?.getUrl() || "/../public/images/maps_dummy.png"}
            alt="Picture of the author"
            width={200}
            height={200}
          />
          <Box>
            <Typography variant="h6">{placeName}</Typography>
            <Typography>{vicinity}</Typography>

            {
            //* only show rating box, if the item has a rating
            rating && (
              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <Rating
                  fillColor="#7ed321"
                  initialValue={rating}
                  readonly={true}
                  allowFraction={true}
                  size={20}
                />
                <Typography>({rating}/5)</Typography>
                <Typography>{totalRatings} reviews</Typography>
              </Box>
            )}

            <ul>{place._type}</ul>
          </Box>
        </Box>
        <Box
          style={{
            backgroundColor: "#bebebe1a",
            minWidth: "190px",
            maxWidth: "190px",
            borderRadius: "10px",
            padding: "12px",
          }}
        >
          <Typography>1.6 Miles</Typography>
          <Divider />

          <Box className={styles.nearbyDistanceBox}>
            <PersonIcon className={styles.nearbyIcon} />
            <Typography>30 min (1.5 Miles)</Typography>
          </Box>
          <Box className={styles.nearbyDistanceBox}>
            <PersonIcon className={styles.nearbyIcon} />
            <Typography>5 min (1.6 Miles)</Typography>
          </Box>
          <Box className={styles.nearbyDistanceBox}>
            <PersonIcon className={styles.nearbyIcon} />
            <Typography>8 min (1.5 Miles)</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

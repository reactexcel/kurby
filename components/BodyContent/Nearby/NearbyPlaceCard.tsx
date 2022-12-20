import { Box, SvgIcon, Typography } from "@mui/material";
import { borderRadius } from "@mui/system";
import Image from "next/image";
import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Rating } from "react-simple-star-rating";
import { Divider } from "@mui/material";
import PersonIcon from "../../../public/images/person.svg";
import BicycleIcon from "../../../public/images/bicycle.svg";
import CarIcon from "../../../public/images/car.svg";
import styles from "./NearbyPlace.module.css";

/**
 * NearbyPlaceCard
 * @description: Displays a 'card' for the nearby place
*/

//TODO Get distance info and render it

export default function NearbyPlaceCard({ place }: any) {
  const { name: placeName, vicinity, user_ratings_total, rating, photos, website, walking, biclycling, driving } = place;
  
  const formatPlaceType = (type: string) => {
    return type && type.replaceAll('_', ' ');
  }

  //Todo add to style sheet
  const resultsContentStyle = {
    padding: "20px",
    border: "1px solid rgba(38,75,92,.2)",
    boxShadow: "0 4px 4px #00000040",
    borderRadius: "14px",
    marginTop: "25px",
  };

  const distanceText = (directionObj: {time: string, distance: string})=>{
    if(directionObj.time) return `${directionObj.time} min (${directionObj.distance} Miles)`
   
    return 'not found'
  }

  const handleImageLoad = ()=>{
    //console.log('image loaded!')
  }

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
              minWidth: "200px",
              objectFit: 'cover'
            }}
            src={photos?.[0]?.getUrl() || "/../public/images/maps_dummy.png"}
            alt="Picture of the author"
            width={200}
            height={200}
            onLoad={handleImageLoad}
          />
          <Box>
            {website ?
              <Typography variant="h6">
                <a href={website} target="_blank">{placeName}</a>
              </Typography> :
              <Typography variant="h6">{placeName}</Typography>
            }
            <Typography>{vicinity}</Typography>

            {
              //* only show rating box, if the item has a rating
              rating && (
                <Box style={{ display: "flex" }}>
                  <Rating
                    fillColor="#7ed321"
                    initialValue={rating}
                    readonly={true}
                    allowFraction={true}
                    size={20}
                  />
                  <Typography style={{}}>({rating}/5)</Typography>
                  <Typography style={{
                    fontStyle: "italic",
                    marginLeft: "8px"
                  }}>{user_ratings_total} reviews</Typography>
                </Box>
              )}

            <ul style={{ paddingLeft: "18px", color: "#727272" }}>
              <li>{formatPlaceType(place._type)}</li>
            </ul>
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
          <Typography>
            {Object.keys(driving).length ? `${driving.distance} Miles` : ""}
          </Typography>
          <Divider />

          <Box className={styles.nearbyDistanceBox}>
            <PersonIcon className={styles.nearbyIcon} />
            <Typography>{distanceText(walking)}</Typography>
          </Box>
          <Box className={styles.nearbyDistanceBox}>
            <CarIcon className={styles.nearbyIcon} />
            <Typography>{distanceText(driving)}</Typography>
          </Box>
          <Box className={styles.nearbyDistanceBox}>
            <BicycleIcon className={styles.nearbyIcon} />
            <Typography>{distanceText(biclycling)}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

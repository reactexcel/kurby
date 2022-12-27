import { Box, Chip, SvgIcon, Typography } from "@mui/material";
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
import StreetView from "../StreetView";

/**
 * NearbyPlaceCard
 * @description: Displays a 'card' for the nearby place
*/

//TODO Get distance info and render it

export default function NearbyPlaceCard({ place }: any) {
  const { name: placeName, vicinity, user_ratings_total, rating, photos, website, walking, biclycling, driving } = place;
  const position = {
    lat: place.geometry.location.lat(),
    lng: place.geometry.location.lng(),
  }
  const formatPlaceType = (type: string) => {
    return type && type.charAt(0).toUpperCase() + type.replaceAll('_', ' ').slice(1);
  }

  //Todo add to style sheet
  const resultsContentStyle = {
    padding: "20px",
    border: "1px solid rgba(38,75,92,.2)",
    boxShadow: "0 4px 4px #00000040",
    borderRadius: "14px",
    marginTop: "25px",
  };

  const distanceText = (directionObj: { time: string, distance: string }) => {
    if (directionObj.time) return `${directionObj.time} (${directionObj.distance} Miles)`

    return 'not found'
  }


  return (
    <Box style={resultsContentStyle}>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Box style={{ display: "flex" }}>
          {photos?.[0]?.getUrl() &&
            <img
              style={{
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                borderRadius: "10px",
                marginRight: "16px",
                minWidth: "200px",
                objectFit: 'cover'
              }}
              src={photos?.[0]?.getUrl()}
              alt="Picture of the author"
              width={200}
              height={200}
            />
          }
          { !photos?.[0]?.getUrl() && 
            <StreetView position={position}/>
          }
          <Box>
            {website ?
              <Typography variant="h6">
                <a href={website} target="_blank" rel="noreferrer">{placeName}</a>
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
            <Chip disabled={true} style={{ color: "#000000", opacity: '0.8' }} label={formatPlaceType(place._type)} />
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

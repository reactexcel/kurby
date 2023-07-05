import { Chip, Typography, Divider } from "@mui/material";
import React, { useMemo } from "react";
import { Rating } from "react-simple-star-rating";
import PersonIcon from "/public/images/person.svg";
import BicycleIcon from "/public/images/bicycle.svg";
import CarIcon from "/public/images/car.svg";
import styles from "./NearbyPlace.module.scss";
import StreetView from "../../StreetView/StreetView";
import LocationSvg from "/public/icons/location.svg";

/**
 * NearbyPlaceCard
 * @description: Displays a 'card' for the nearby place
 */

//TODO Get distance info and render it

export default function NearbyPlaceCard({ place }: any) {
  const { name: placeName, vicinity, user_ratings_total: userRatingsTotal, rating, photos, walking, biclycling, driving } = place;
  const position = {
    lat: place.geometry.location.lat,
    lng: place.geometry.location.lng,
  };
  const formatPlaceType = (type: string) => {
    return type && type.charAt(0).toUpperCase() + type.replaceAll("_", " ").slice(1);
  };

  const getPhoto = (photoRef: string) => {
    if (!photoRef) {
      return "";
    }
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&sensor=false&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
  };

  const photo = useMemo(() => {
    return getPhoto(photos?.[0]?.photo_reference);
  }, [photos?.[0]?.photo_reference]);

  const distanceText = (directionObj: { time: string; distance: string }) => {
    if (directionObj.time) return `${directionObj.time} (${directionObj.distance} Miles)`;

    return "not found";
  };

  return (
    <div className={styles.main}>
      <div className={styles.flex}>
        <div className={styles.container}>
          {photo ? <img className={styles.image} src={photo} alt="Picture of the author" width={200} height={200} /> : <StreetView position={position} />}
          <div className={styles.info}>
            <Typography variant="h6">{placeName}</Typography>
            <div style={{ display: "flex", alignItems: "center", paddingTop: "2px" }}>
              <LocationSvg style={{ marginRight: "8px" }} />
              <Typography>{vicinity}</Typography>
            </div>
            {rating && (
              <div className={styles.rating}>
                <Rating fillColor="#7ed321" initialValue={rating} readonly={true} allowFraction={true} size={20} />
                <Typography>({rating}/5)</Typography>
                <Typography
                  style={{
                    fontStyle: "italic",
                    marginLeft: "8px",
                  }}
                >
                  {userRatingsTotal} reviews
                </Typography>
              </div>
            )}
            <Chip disabled={true} style={{ color: "#000000", opacity: "0.8", marginTop: "0.5rem" }} label={formatPlaceType(place._type)} />
          </div>
        </div>
        {(walking || biclycling || driving) && (
          <div className={styles.distance}>
            <Typography>{Object.keys(driving).length ? `${driving.distance} Miles` : ""}</Typography>
            <Divider />

            {walking && (
              <div className={styles.nearbyDistanceBox}>
                <PersonIcon className={styles.nearbyIcon} />
                <Typography>{distanceText(walking)}</Typography>
              </div>
            )}
            {driving && (
              <div className={styles.nearbyDistanceBox}>
                <CarIcon className={styles.nearbyIcon} />
                <Typography>{distanceText(driving)}</Typography>
              </div>
            )}
            {biclycling && (
              <div className={styles.nearbyDistanceBox}>
                <BicycleIcon className={styles.nearbyIcon} />
                <Typography>{distanceText(biclycling)}</Typography>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

import { Chip, CircularProgress, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { Rating } from "react-simple-star-rating";
import CarIcon from "/public/images/car-white.svg";
import styles from "./NearbyPlace.module.scss";
import StreetView from "../../StreetView/StreetView";
import LocationSvg from "/public/icons/location.svg";
import { Button } from "components/Button/Button";

interface NearbyPlaceCardProps {
  place: any;
  loadDrivingDistance: () => Promise<{ driving: any }>;
}

export default function NearbyPlaceCard({ place, loadDrivingDistance }: NearbyPlaceCardProps) {
  const [drivingDistance, setDrivingDistance] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { name: placeName, vicinity, user_ratings_total: userRatingsTotal, rating, photos } = place;
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

  const hanldeDrivingDistance = async () => {
    if (drivingDistance) {
      return;
    }

    setLoading(true);
    const { driving } = await loadDrivingDistance();

    if (driving) {
      setDrivingDistance(driving);
    }

    setLoading(false);
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
        <Button variant="filled" className={styles.drivingDistanceButton} onClick={() => hanldeDrivingDistance()}>
          <CarIcon className={styles.icon} />
          {loading && !drivingDistance && <CircularProgress className={styles.loader} />}
          {drivingDistance && <Typography>{distanceText(drivingDistance)}</Typography>}
        </Button>
      </div>
    </div>
  );
}

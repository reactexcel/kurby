import { useRecoilState } from "recoil";
import { filterState } from "../../../context/filterContext";
import NearbyPlaceCard from "./NearbyPlaceCard/NearbyPlaceCard";
import { useMemo } from "react";
import loadDirectionsApi from "./loadDirectionsApi";
import { CircularProgress, Typography } from "@mui/material";
import styles from "./Nearby.module.scss";
import { useAuth } from "providers/AuthProvider";
import { loadingContext } from "context/loadingContext";
import { useRouter } from "next/router";
import { nearbyContext } from "context/nearbyPlacesContext";
import { Button } from "components/Button/Button";

async function loadDrivingDistance(place: any, origin: any): Promise<{ driving: any }> {
  try {
    return await loadDirectionsApi({
      origin,
      destination: {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
      },
    });
  } catch (e) {
    console.error(e);
    return { driving: null };
  }
}

/**
 * Nearby
 * @description: Container for the nearby place cards.
 */

export default function Nearby() {
  const [filterVal] = useRecoilState(filterState);
  const [loading] = useRecoilState(loadingContext);
  const { user } = useAuth();
  const router = useRouter();
  const [nearby] = useRecoilState(nearbyContext);

  const nearbyPlaces = useMemo(
    () =>
      nearby.places.map((place: any, index) => {
        return <NearbyPlaceCard key={`placecard_${place.place_id}_${index}`} place={place} loadDrivingDistance={() => loadDrivingDistance(place, filterVal.mapCenter)} />;
      }),
    [nearby.places],
  );

  return (
    <div className={styles.main}>
      {loading.nearby || !nearbyPlaces.length ? (
        <div className={styles.loader}>
          <CircularProgress />
        </div>
      ) : nearby.places.length ? (
        <>
          {user ? (
            nearbyPlaces
          ) : (
            <>
              {nearbyPlaces[0]}
              <div className={styles.signUpNoteWrapper}>
                {nearbyPlaces[1]}
                {nearbyPlaces[2]}
                <div className={styles.signUpNote}>
                  <h2>Sign Up</h2>
                  <p>Sign Up for a paid account to see 60 top-rated schools, hospitals, parks, grocery stores, and attractions within a 2-mile radius</p>
                  <Button onClick={() => router.push("/?openLoginSignup=true")}>Get Started</Button>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <Typography>Please select a place of interest.</Typography>
      )}
    </div>
  );
}

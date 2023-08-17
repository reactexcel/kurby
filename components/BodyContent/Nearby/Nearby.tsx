import { useRecoilState } from "recoil";
import { filterState } from "../../../context/filterContext";
import NearbyPlaceCard from "./NearbyPlaceCard/NearbyPlaceCard";
import { useContext, useMemo, useEffect } from "react";
import loadDirectionsApi from "./loadDirectionsApi";
import { CircularProgress, Typography, Dialog, DialogContent } from "@mui/material";
import styles from "./Nearby.module.scss";
import { loadingContext } from "context/loadingContext";
import { useRouter } from "next/router";
import { nearbyContext } from "context/nearbyPlacesContext";
import { Button } from "components/Button/Button";
import { usePlanChecker } from "hooks/plans";
import { nearbyPlacesCallCountContext } from "context/nearbyPlacesCallCountContext";
import { DialogContext } from "context/limitDialogContext";
import { nearbyPlacesCache } from "context/nearbyPlacesCacheContext";
import { typesOfPlaceContext } from "context/typesOfPlaceContext";
import { PlacesType } from "globals/GLOBAL_SETTINGS";

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
  const router = useRouter();
  const [nearby, setNearby] = useRecoilState(nearbyContext);
  const { isGrowth, isPro } = usePlanChecker();
  const [{ hasReachedLimit }] = useRecoilState(nearbyPlacesCallCountContext);
  const { isOpen, setIsOpen } = useContext(DialogContext);
  const [nearbyCache] = useRecoilState(nearbyPlacesCache);
  const [typesOfPlace] = useRecoilState(typesOfPlaceContext);

  const nearbyPlaces = useMemo(
    () =>
      nearby.places.map((place: any, index) => {
        return <NearbyPlaceCard key={`placecard_${place.place_id}_${index}`} place={place} loadDrivingDistance={() => loadDrivingDistance(place, filterVal.mapCenter)} />;
      }),
    [nearby.places],
  );

  useEffect(() => {
    if (hasReachedLimit && !nearby.places.length) {
      if (filterVal.address && filterVal.address in nearbyCache) {
        const typesOfPlacesSnakeCase = typesOfPlace.map((type) => type.toLowerCase().replace(" ", "_"));

        setNearby((prevState) => ({
          ...prevState,
          places: typesOfPlacesSnakeCase
            .reduce((acc: any, type: string) => {
              return [...acc, ...(nearbyCache[filterVal.address as string]?.[type as PlacesType] || [])];
            }, [])
            .filter((place) => place),
        }));
      }
    }
  }, [hasReachedLimit, nearbyCache, filterVal.address, typesOfPlace]);

  if (hasReachedLimit && !nearby.places.length) {
    return (
      <div className={styles.main}>
        <Typography>You’ve reached the monthly limit.</Typography>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      {loading.nearby || !nearbyPlaces.length ? (
        <div className={styles.loader}>
          <CircularProgress />
        </div>
      ) : nearby.places.length ? (
        <>
          {isGrowth || isPro ? (
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

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={styles.dialog}>
        <DialogContent className={styles.dialogContent}>
          <h2 className={styles.dialogTitle}>Monthly Limit Reached</h2>
          You’ve reached the monthly limit.
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

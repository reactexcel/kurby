import { useRecoilState } from "recoil";
import { filterState } from "../../../context/filterContext";
import NearbyPlaceCard from "./NearbyPlaceCard/NearbyPlaceCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState, useMemo, useContext } from "react";
import loadDirectionsApi from "./loadDirectionsApi";
import { CircularProgress, Typography } from "@mui/material";
import styles from "./Nearby.module.scss";
import { useAuth } from "providers/AuthProvider";
import { loadingContext } from "context/loadingContext";
import { useRouter } from "next/router";
import { WindowSizeContext } from "context/windowSizeContext";
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
  const { isMobileTablet } = useContext(WindowSizeContext);
  const [nearby, setNearby] = useRecoilState(nearbyContext);
  const [loadedNearbyPlaces, setLoadedNearbyPlaces] = useState<any[]>([]);

  const pageSize = user ? 5 : 1;

  const fetchMoreData = (initialCall: boolean) => {
    const initialLoad = initialCall ? 0 : nearby.loadedOnScroll;
    setTimeout(async () => {
      const newPlaces = nearby.places.slice(initialLoad, initialLoad + pageSize);

      setNearby((prev) => ({
        ...prev,
        loadedOnScroll: prev.loadedOnScroll + pageSize,
      }));
      setLoadedNearbyPlaces([...loadedNearbyPlaces, newPlaces[0]]);
    }, 1000);
  };

  useEffect(() => {
    if (nearby.places.length && !loadedNearbyPlaces.length) {
      fetchMoreData(true);
    }
  }, [loadedNearbyPlaces]);

  useEffect(() => {
    setLoadedNearbyPlaces([]);
  }, [nearby.places]);

  const nearbyPlaces = useMemo(
    () =>
      loadedNearbyPlaces.map((place: any) => {
        return <NearbyPlaceCard key={`placecard_${place.place_id}`} place={place} loadDrivingDistance={() => loadDrivingDistance(place, filterVal.mapCenter)} />;
      }),
    [loadedNearbyPlaces],
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
            <InfiniteScroll
              className={styles.infiniteScroll}
              dataLength={loadedNearbyPlaces.length}
              next={() => fetchMoreData(false)}
              hasMore={nearby.places.length - loadedNearbyPlaces.length !== 0}
              loader={
                <div className={styles.loader}>
                  <CircularProgress />
                </div>
              }
              height={isMobileTablet ? undefined : "100%"}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {nearbyPlaces}
            </InfiniteScroll>
          ) : (
            <>
              {nearbyPlaces[0]}
              <div className={styles.signUpNote}>
                <h3>Sign Up</h3>
                <p>Sign Up for a free account to see 60 top-rated schools, hospitals, parks, grocery stores, and attractions within a 2-mile radius</p>
                <Button onClick={() => router.push("/?openLoginSignup=true")}>Get Started</Button>
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

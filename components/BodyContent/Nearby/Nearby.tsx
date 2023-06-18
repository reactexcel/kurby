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
import { Button } from "components/Button/Button";
import { useRouter } from "next/router";
import { WindowSizeContext } from "context/windowSizeContext";

async function prepareLoadedPlaces(places: any[], currentCenter: { lat: number; lng: number } | null): Promise<any[]> {
  if (!places || !places.length) {
    return [];
  }
  const resolved = await Promise.all(
    places.map(async (place) => {
      return {
        ...place,
        ...(await loadDirections(place, currentCenter)),
      };
    }),
  );

  return resolved;
}

async function loadDirections(place: any, origin: any): Promise<{ walking: any; driving: any; biclycling: any }> {
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
    return { walking: null, driving: null, biclycling: null };
  }
}

/**
 * Nearby
 * @description: Container for the nearby place cards.
 */

export default function Nearby() {
  const [filterVal] = useRecoilState(filterState);
  const [loadedNearbyPlaces, setLoadedNearbyPlaces] = useState([]);
  const [loading] = useRecoilState(loadingContext);
  const { user } = useAuth();
  const router = useRouter();
  const { isMobileTablet } = useContext(WindowSizeContext);

  const pageSize = user ? 5 : 1;

  const fetchMoreData = () => {
    setTimeout(async () => {
      const newPlaces = filterVal.nearbyPlaces.slice(loadedNearbyPlaces.length, loadedNearbyPlaces.length + pageSize);
      const updatedPlaces: any = await prepareLoadedPlaces(newPlaces, filterVal.mapCenter);

      setLoadedNearbyPlaces(loadedNearbyPlaces.concat(updatedPlaces));
    }, 1000);
  };

  //TODO verify that this doesn't run fetchMoreData if there is no places
  useEffect(() => {
    if (!loadedNearbyPlaces.length) {
      fetchMoreData();
    }
  }, [loadedNearbyPlaces]);

  useEffect(() => {
    setLoadedNearbyPlaces([]);
  }, [filterVal.nearbyPlaces]);

  const nearbyPlaces = useMemo(
    () =>
      loadedNearbyPlaces.map((place: any) => {
        return <NearbyPlaceCard key={`placecard_${place.place_id}`} place={place} />;
      }),
    [loadedNearbyPlaces],
  );

  return (
    <div className={styles.main}>
      {loading.nearby || !nearbyPlaces.length ? (
        <div className={styles.loader}>
          <CircularProgress />
        </div>
      ) : filterVal.nearbyPlaces.length ? (
        <>
          {user ? (
            <InfiniteScroll
              className={styles.infiniteScroll}
              dataLength={loadedNearbyPlaces.length}
              next={fetchMoreData}
              hasMore={filterVal.nearbyPlaces.length - loadedNearbyPlaces.length !== 0}
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

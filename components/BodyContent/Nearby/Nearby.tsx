import { useRecoilState } from "recoil";
import { filterState } from "../../../context/filterContext";
import NearbyPlaceCard from "./NearbyPlaceCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState, useMemo } from "react";
import loadDirectionsApi from "./loadDirectionsApi";
import { Box, CircularProgress, Typography } from "@mui/material";
import styles from "./Nearby.module.scss";
import { useAuth } from "providers/AuthProvider";
import { loadingContext } from "context/loadingContext";

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
    <Box className={styles.main}>
      {loading.nearby ? (
        <div className={styles.loader}>
          <CircularProgress />
        </div>
      ) : filterVal.nearbyPlaces.length ? (
        <>
          {user ? (
            <InfiniteScroll
              className={styles.infiniteScroll}
              dataLength={loadedNearbyPlaces.length} //This is important field to render the next data
              // Pass setFilterV as an argument to loadMore
              next={fetchMoreData}
              hasMore={filterVal.nearbyPlaces.length - loadedNearbyPlaces.length !== 0}
              loader={
                <div className={styles.loader}>
                  <CircularProgress />
                </div>
              }
              height="100%"
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              scrollThreshold={0.9}
            >
              {loadedNearbyPlaces.map((place: any) => {
                return <NearbyPlaceCard key={`placecard_${place.place_id}`} place={place} />;
              })}
            </InfiniteScroll>
          ) : (
            nearbyPlaces
          )}
        </>
      ) : (
        <Typography>Please select a place of interest.</Typography>
      )}
    </Box>
  );
}

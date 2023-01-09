import { useRecoilState } from "recoil";
import filterContext from "../../../context/filterContext";
import NearbyPlaceCard from "./NearbyPlaceCard";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from "react";
import loadDirectionsApi from "./loadDirectionsApi";
import { Box, Typography } from "@mui/material";



async function prepareLoadedPlaces(places: any[], currentCenter: { lat: number, lng: number } | null): Promise<any[]> {
  if (!places || !places.length) { return [] }
  const resolved = await Promise.all(places.map(async place => {
    return {
      ...place,

      ...(await loadDirections(place, currentCenter))
    }
  }))

  return resolved;
}

async function loadDirections(place: any, origin: any): Promise<{ walking: any, driving: any, biclycling: any }> {
  return await loadDirectionsApi({
    origin,
    destination: {
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng
    }
  })
}

const PAGE_SIZE = 5;

/**
 * Nearby
 * @description: Container for the nearby place cards. 
*/

export default function Nearby() {
  const [filterVal] = useRecoilState(filterContext);
  const [loadedNearbyPlaces, setLoadedNearbyPlaces] = useState([])
  const fetchMoreData = () => {
    setTimeout(async () => {

      const newPlaces = filterVal.nearbyPlaces.slice(loadedNearbyPlaces.length, loadedNearbyPlaces.length + PAGE_SIZE);
      const updatedPlaces: any = await prepareLoadedPlaces(newPlaces, filterVal.mapCenter);

      setLoadedNearbyPlaces(
        loadedNearbyPlaces.concat(updatedPlaces)
      );
    }, 1000);
  };

  //TODO verify that this doesn't run fetchMoreData if there is no places
  if (!loadedNearbyPlaces.length) {
    fetchMoreData();
  }

  useEffect(() => {
    setLoadedNearbyPlaces([])
  }, [filterVal.nearbyPlaces])


  return (
    <>
      <Box style={{ height: "100%", width: "100%", position: "relative", marginTop: "24px" }}>
        {filterVal.nearbyPlaces.length ?
          
            <InfiniteScroll
              style={{ overflow: "auto", height: "100%", width: "100", position: "absolute" }}
              dataLength={loadedNearbyPlaces.length} //This is important field to render the next data
              // Pass setFilterV as an argument to loadMore
              next={fetchMoreData}
              hasMore={filterVal.nearbyPlaces.length - loadedNearbyPlaces.length !== 0}
              loader={<h4>Loading...</h4>}
              height="100%"
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              
              {
                loadedNearbyPlaces.map((place: any) => {
                  return <NearbyPlaceCard key={`placecard_${place.place_id}`} place={place} />;
                })}
              
            </InfiniteScroll> : <Typography>Please select a place of interest.</Typography>
        }
      </Box>
    </>
  );
}




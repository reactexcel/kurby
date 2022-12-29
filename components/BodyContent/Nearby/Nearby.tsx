import { useRecoilState } from "recoil";
import filterContext from "../../../context/filterContext";
import NearbyPlaceCard from "./NearbyPlaceCard";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from "react";
import loadDirectionsApi from "./loadDirectionsApi";



async function prepareLoadedPlaces(places: any[], currentCenter: {lat: number, lng: number} | null): Promise<any[]> {
  if (!places || !places.length) { return []}
  const resolved = await Promise.all(places.map(async place => {
    return {
      ...place,
      ...(await loadAdditionalData(place)),
      ...(await loadDirections(place, currentCenter))
    }
  }))

  return resolved;
}

async function loadAdditionalData(place: any): Promise<{ website: string }> {
  const service = new google.maps.places.PlacesService(document.createElement('div'));
  // TODO: add reject handling
  const rPromise = new Promise((resolve, reject) => {
    service.getDetails({ placeId: place.place_id, fields: ['website'] }, (resp) => {
      resolve(resp);
    });
  });
  const response: any = await rPromise;
  return { website: response?.website };
}

async function loadDirections(place: any, origin: any): Promise<{walking: any, driving: any, biclycling: any}> {
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
      //* remove duplciates
      const noDups = filterVal.nearbyPlaces.filter((place: {reference: string}, index, array)=>{
        return index === array.findIndex(x=> place.reference === x.reference)
      })

      //*filter out certain data / incorrect info
      console.log('noDups', noDups)
      const goodPlaceListings = noDups.filter(place=>{
        const operational = "OPERATIONAL"

        const isNotLocality = !place.types.includes('locality');
        const isOpen = place.business_status === operational;
        const hasRating = !!place.rating;

        return isNotLocality && isOpen && hasRating
      })


      const newPlaces = goodPlaceListings.slice(loadedNearbyPlaces.length, loadedNearbyPlaces.length + PAGE_SIZE);
      const updatedPlaces: any = await prepareLoadedPlaces(newPlaces, filterVal.mapCenter);
      
      setLoadedNearbyPlaces(
        loadedNearbyPlaces.concat(updatedPlaces)
      );
    }, 1000);
  };

  //TODO verify that this doesn't run fetchMoreData if there is no places
  if(!loadedNearbyPlaces.length) {
    fetchMoreData();
  }

  useEffect(() => {
    setLoadedNearbyPlaces([])
  }, [filterVal.nearbyPlaces])
  

  return (
    <>
      <InfiniteScroll
        dataLength={loadedNearbyPlaces.length} //This is important field to render the next data
        // Pass setFilterV as an argument to loadMore
        next={fetchMoreData}
        hasMore={filterVal.nearbyPlaces.length - loadedNearbyPlaces.length !== 0}
        loader={<h4>Loading...</h4>}
        height="56vh"
      >
        {
          loadedNearbyPlaces.map((place: any) => {
            return <NearbyPlaceCard key={`placecard_${place.place_id}`} place={place} />;
          })}
      </InfiniteScroll>

    </>
  );
}




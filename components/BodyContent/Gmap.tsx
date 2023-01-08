import React from "react";
import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import filterContext from "../../context/filterContext";
import { useRecoilState } from "recoil";
import GLOBAL_SETTINGS from "../../globals/GLOBAL_SETTINGS";

/**
 * Gmap
 * @description: Displays the google map component + Markers
*/

//TODO add to stylesheet
const googleMapContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "62vh",
  position: "relative",
  overflow: "hidden",
};

//TODO where should this start?
const initialCenter = { lat: 38.9987208, lng: -77.2538699 };


function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = React.useState(null) as any;
  const [filterVal, setFilterVal] = useRecoilState(filterContext);

  //* Google maps options 
  //* SEE https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
  const googleMapOptions = {
    zoomControl: false,
    minZoom: 13,
    fullscreenControl: false
  }
  
  //* On map load
  const onLoad = React.useCallback(function callback(map: any) {
    setMap(map);
  }, []);

  //* On Unmount
  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  //* Handle when the map is dragged. Get center and update global state
  const handleMapDrag = ()=>{
    if(!map) return;

    //* Map center
    const center = map.getCenter()

    //* Update state which will re render certain components
    setFilterVal((prev:any)=>{
      return {
        ...prev,
        mapCenter: {
          lat: center.lat(),
          lng: center.lng()
        }
      }
    })
    
  }

  //* When the marker loads
  const onMarkerLoad = (marker: any) => {
    //console.log("marker: ", marker);
  };

 
  //* Get the place markers and icons for them
  const placesMarkers = (): any[] => {

    //* See if state has any nearby places
    if(!filterVal.nearbyPlaces?.length ) return [];

    return filterVal.nearbyPlaces.reduce((a: any, place: any) => {
      //* Short circiut if there's no place or geometry info
      if (!place || !place?.geometry || !place.geometry.location)
        return a;

      //* Handle the icon
      const icon = {
        url: place.icon,
        scaledSize: new google.maps.Size(20, 20),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0), // anchor
      };

      //Create the marker instance
      const marker = {
        position: {
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
        },
        options: { icon, clickable: true },
        place,
      };

      //Add all markers to accumulator
      a.push(marker);

      return a;
    }, []);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={googleMapContainerStyle}
      center={filterVal.latlong || initialCenter}
      zoom={GLOBAL_SETTINGS.MAP_ZOOM_DEFAULT}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={googleMapOptions}
      onDragEnd={handleMapDrag}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <>
      

        {filterVal.latlong && (
          <>
            <MarkerF position={filterVal.latlong} onLoad={onMarkerLoad} key={"addressMarker"}/>
            {
            placesMarkers().map(place=>
              <MarkerF key={place.place_id} position={place.position} options={place.options} />
            )
            }
          </>
        )}
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);

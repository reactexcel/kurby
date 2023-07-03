import React, { useEffect, useState } from "react";
import { GoogleMap, MarkerF, OverlayView, Polygon } from "@react-google-maps/api";
import { filterState } from "../../../context/filterContext";
import { useRecoilState } from "recoil";
import GLOBAL_SETTINGS from "../../../globals/GLOBAL_SETTINGS";
import styles from "./Gmap.module.scss";
import getCensusData, { LatLong } from "components/Census/getCensusData";
import { getCartographicData } from "components/Census/GeoJSON/getCensusCartographic";

/**
 * Gmap
 * @description: Displays the google map component + Markers
 */

//TODO add to stylesheet

//TODO where should this start?
const initialCenter = { lat: 38.9987208, lng: -77.2538699 };

function MyComponent() {
  const [map, setMap] = React.useState(null) as any;
  const [filterVal, setFilterVal] = useRecoilState(filterState);
  const [isLoaded, setIsLoaded] = useState(false);

  const [isMapOverlayLoaded, setMapOverlayLoaded] = useState<boolean>(false);

  useEffect(() => {
    const prepareGeometricData = async () => {
      const dataLayer = await getCartographicData({});
      console.log(dataLayer);
      map.data.addGeoJson(dataLayer);
    };
    if (map && !isMapOverlayLoaded) {
      map.data.setStyle({
        fillColor: "rgb(231, 51, 47, 0.5)",
        strokeColor: "red",
        strokeWeight: 2,
      });
      try {
        prepareGeometricData();
      } catch (e) {}
      setMapOverlayLoaded(true);
    }
  }, [filterVal]);

  //* Google maps options
  //* SEE https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
  const googleMapOptions = {
    zoomControl: false,
    minZoom: 13,
    fullscreenControl: false,
  };

  //* On map load
  const onLoad = React.useCallback(function callback(map: any) {
    setMap(map);
  }, []);

  //* On Unmount
  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  useEffect(() => {
    const googleMapsLoaded = sessionStorage.getItem("googleMapsLoaded");

    setIsLoaded(googleMapsLoaded === "true");
  }, []);

  //* Handle when the map is dragged. Get center and update global state
  const handleMapDrag = () => {
    if (!map) return;

    //* Map center
    const center = map.getCenter();

    //* Update state which will re render certain components
    setFilterVal((prev: any) => {
      return {
        ...prev,
        mapCenter: {
          lat: center.lat(),
          lng: center.lng(),
        },
      };
    });
  };

  const onCenterChanged = () => {
    if (!map) {
      return;
    }
    map.getStreetView().setVisible(false);
  };

  //* When the marker loads
  const onMarkerLoad = (marker: any) => {
    // console.log("marker: ", marker);
  };

  //* Get the place markers and icons for them
  const placesMarkers = React.useMemo((): any[] => {
    if (!filterVal.nearbyPlaces?.length) return [];

    return filterVal.nearbyPlaces.reduce((a, place) => {
      if (!place || !place?.geometry || !place.geometry.location) return a;

      const icon = {
        url: place.icon,
        scaledSize: new google.maps.Size(20, 20),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0),
      };

      const marker = {
        position: {
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
        },
        options: { icon, clickable: true },
        place,
      };

      a.push(marker);
      return a;
    }, []);
  }, [filterVal.nearbyPlaces]);

  if (!isLoaded) {
    return <div>Map error</div>;
  }

  return (
    <GoogleMap
      center={filterVal.latlong || initialCenter}
      zoom={GLOBAL_SETTINGS.MAP_ZOOM_DEFAULT}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={googleMapOptions}
      onDragEnd={handleMapDrag}
      onCenterChanged={onCenterChanged}
      mapContainerClassName={styles.map}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <>
        {filterVal.latlong && (
          <>
            <MarkerF position={filterVal.latlong} onLoad={onMarkerLoad} key={"addressMarker"} />
            {placesMarkers.map((place) => (
              <MarkerF key={place.place_id} position={place.position} options={place.options} />
            ))}
          </>
        )}
      </>
    </GoogleMap>
  );
}

export default React.memo(MyComponent);

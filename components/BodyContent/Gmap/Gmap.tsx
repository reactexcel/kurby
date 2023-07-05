import React, { useEffect, useState } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { filterState } from "../../../context/filterContext";
import { useRecoilState } from "recoil";
import GLOBAL_SETTINGS from "../../../globals/GLOBAL_SETTINGS";
import styles from "./Gmap.module.scss";
import { getCartographicData } from "components/Census/GeoJSON/getCensusCartographic";
import { Stack, Typography } from "@mui/material";
import getCensusData from "components/Census/getCensusData";

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
      getCensusData({
        lat: 28.2639,
        lng: -80.7214,
      });
      const dataLayer = await getCartographicData({});
      console.log(dataLayer);
      map.data.addGeoJson(dataLayer);
    };

    if (map && !isMapOverlayLoaded) {
      map.data.setStyle((feature: any) => {
        const income = feature.getProperty("B19013_001E");
        let fillColor = "#151e61";

        if (income <= 100000) {
          fillColor = "#2B368C";
        }
        if (income <= 90000) {
          fillColor = "#2B368C";
        }
        if (income <= 80000) {
          fillColor = "#6FA7C7";
        }
        if (income <= 70000) {
          fillColor = "#ADD2E3";
        }
        if (income <= 60000) {
          fillColor = "#D6EAEF";
        }
        if (income <= 50000) {
          fillColor = "#F6F6B9";
        }
        if (income <= 40000) {
          fillColor = "#F4D589";
        }
        if (income <= 30000) {
          fillColor = "#F4D589";
        }
        if (income <= 20000) {
          fillColor = "#EE6941";
        }
        if (income <= 10000) {
          fillColor = "#D12F26";
        }
        if (income <= 5000) {
          fillColor = "#A30123";
        }

        return {
          fillColor,
          fillOpacity: 0.9,
        };
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
    // zoomControl: false,
    // minZoom: 17,
    // fullscreenControl: false,
    mapId: "7ba16be0c9375fa7",
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
    <div style={{ position: "relative" }}>
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
      <MapLegend />
    </div>
  );
}

function MapLegend() {
  const demographicColorRepresentation = ["#A30123", "#D12F26", "#EE6941", "#EEAF72", "#F4D589", "#F4D589", "#D6EAEF", "#ADD2E3", "#6FA7C7", "#4873AF", "#2B368C"];
  return (
    <div className={styles.mapLegend}>
      <Typography marginBottom={1} fontSize={18} fontWeight={800}>
        Median Household Income
      </Typography>
      <Stack direction={"row"}>
        {demographicColorRepresentation.map((color: string, index: number) => (
          <Stack flex={1} textAlign={"center"} direction={"column"}>
            <MapLegendColorItem backgroundColor={color} />
            {
              <Typography style={{ fontStyle: "italic" }}>
                {index}
                {index !== 0 && "0"}k
              </Typography>
            }
          </Stack>
        ))}
      </Stack>
    </div>
  );
}

const MapLegendColorItem = ({ backgroundColor }: { backgroundColor: string }) => <div className={styles.mapLegendColorItem} style={{ backgroundColor }} />;

export default React.memo(MyComponent);

import React, { useEffect, useState } from "react";
import { GoogleMap, InfoWindow, MarkerF } from "@react-google-maps/api";
import { filterState } from "../../../context/filterContext";
import { useRecoilState } from "recoil";
import GLOBAL_SETTINGS from "../../../globals/GLOBAL_SETTINGS";
import styles from "./Gmap.module.scss";
import { getCartographicData, kurbyLegendColors, prepareGeometricData } from "components/Census/GeoJSON/getCensusCartographic";
import { Stack, Typography } from "@mui/material";

/**
 * Gmap
 * @description: Displays the google map component + Markers
 */

//TODO add to stylesheet

//TODO where should this start?
const initialCenter = { lat: 38.9987208, lng: -77.2538699 };

export interface ITooltipState {
  coordinates: google.maps.LatLng | null;
  income: number;
  tractName: string;
  county: string;
}

function MyComponent() {
  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const [filterVal, setFilterVal] = useRecoilState(filterState);
  const [isLoaded, setIsLoaded] = useState(false);

  const [toolTip, setToolTip] = useState<ITooltipState>();

  useEffect(() => {
    if (map?.data && filterVal.latlong) {
      map.data.setStyle(kurbyLegendColors);
      map.data.addListener("click", (event: google.maps.Data.MouseEvent) => {
        const income: number = event.feature.getProperty("B19013_001E");
        const tractName: string = event.feature.getProperty("NAMELSAD");
        const county: string = event.feature.getProperty("NAMELSADCO");

        const tooltip = {
          coordinates: event.latLng,
          income,
          tractName,
          county,
        };

        setToolTip(tooltip);
      });
      try {
        prepareGeometricData(map, {
          lat: filterVal.latlong.lat(),
          lng: filterVal.latlong.lng(),
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, [filterVal.latlong]);

  //* Google maps options
  //* SEE https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
  const googleMapOptions = {
    // zoomControl: false,
    // minZoom: 17,
    // fullscreenControl: false,
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
    if (!map?.data) return;

    // * Map center
    const center = map.getCenter();

    //* Update state which will re render certain components
    setFilterVal((prev) => {
      return {
        ...prev,
        mapCenter: {
          lat: center?.lat() || initialCenter.lat,
          lng: center?.lng() || initialCenter.lng,
        },
      };
    });
  };

  const onCenterChanged = () => {
    if (!map?.data) {
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
          {toolTip && (
            <InfoWindow onLoad={onLoad} position={toolTip.coordinates as google.maps.LatLng}>
              <div>
                <Typography fontWeight={"800"}>{toolTip.tractName}</Typography>
                <Typography>{toolTip.county}</Typography>
                <hr />
                {Math.sign(toolTip.income) ? <Typography>Income: ${toolTip.income.toLocaleString()}</Typography> : <Typography>N/A</Typography>}
              </div>
            </InfoWindow>
          )}
        </>
      </GoogleMap>
      <MapLegend />
    </div>
  );
}

function MapLegend() {
  const demographicColorRepresentation = ["#A30123", "#D12F26", "#EE6941", "#EEAF72", "#F4D589", "#F4D589", "#D6EAEF", "#ADD2E3", "#6FA7C7", "#4873AF", "#2B368C", "purple"];
  const mapTextItem = { fontStyle: "italic" };
  return (
    <div className={styles.mapLegend}>
      <Typography marginBottom={1} fontSize={18} fontWeight={800}>
        Median Household Income
      </Typography>
      <Stack direction={"row"}>
        {demographicColorRepresentation.map((color: string, index: number) => (
          <Stack flex={1} textAlign={"center"} direction={"column"}>
            <MapLegendColorItem backgroundColor={color} />
            {index === 11 ? (
              <Typography style={mapTextItem}>200k+</Typography>
            ) : (
              <Typography style={mapTextItem}>
                {index}
                {index !== 0 && "0"}k
              </Typography>
            )}
          </Stack>
        ))}
      </Stack>
      <Typography fontSize={"13px"} className={styles.legendSource}>
        Source: 2021 US Census Data
      </Typography>
    </div>
  );
}

const MapLegendColorItem = ({ backgroundColor }: { backgroundColor: string }) => <div className={styles.mapLegendColorItem} style={{ backgroundColor }} />;

export default React.memo(MyComponent);

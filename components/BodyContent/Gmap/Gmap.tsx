import React, { useEffect, useState } from "react";
import { GoogleMap, InfoBox, InfoWindow, MarkerF } from "@react-google-maps/api";
import { filterState } from "../../../context/filterContext";
import { atom, useRecoilState } from "recoil";
import GLOBAL_SETTINGS from "../../../globals/GLOBAL_SETTINGS";
import styles from "./Gmap.module.scss";
import { FormControl, MenuItem, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { createMedianHouseholdIncomeLegend } from "components/Census/Legends/MedianHouseholdIncome";
import { createMedianHomeValueLegend, getHomeValueColor } from "components/Census/Legends/MedianHomeValue";
import { prepareTractGeometricData } from "components/Census/GeoJSON/getCensusCartographic";

/**
 * Gmap
 * @description: Displays the google map component + Markers
 */

enum DemographicFeatureSelection {
  MEDIAN_HOUSEHOLD_INCOME = "household_tab",
  POVERTY_RATE = "povertyrate_tab",
  MEDIAN_HOME_VALUE = "homevalue_tab",
  VACANT_HOUSING_UNITS = "vacant_housing_units_tab",
}

const feature = atom({
  key: "featureState",
  default: DemographicFeatureSelection.MEDIAN_HOUSEHOLD_INCOME,
});

let previousFeature: google.maps.Data.Feature | null = null; // Track the previously clicked feature
const highlightTract = (map: google.maps.Map, event: google.maps.Data.MouseEvent) => {
  // Reset style of the previously clicked feature
  // Reset style of the previously clicked feature
  if (previousFeature) {
    map.data.overrideStyle(previousFeature, {
      strokeColor: "black",
      strokeWeight: 0.45,
      // other default style properties...
    });
  }

  // Apply custom style to the clicked feature
  map.data.overrideStyle(event.feature, {
    strokeColor: "white",
    strokeWeight: 2,
    // other custom style properties...
  });

  previousFeature = event.feature; // Update the previously clicked feature
};

//TODO add to stylesheet

//TODO where should this start?
const initialCenter = { lat: 38.9987208, lng: -77.2538699 };

export interface IMetricsTooltipState {
  coordinates: google.maps.LatLng;
  county: string;
  tractName: string;
  householdIncome: number;
  homeValue: number;
}

function MyComponent() {
  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const googleMapOptions = {
    // zoomControl: false,
    // minZoom: 17,
    // fullscreenControl: false,
  };

  const [filterVal, setFilterVal] = useRecoilState(filterState);
  const [isLoaded, setIsLoaded] = useState(false);

  const [value] = useRecoilState(feature);
  const [metricsTooltip, setMetricsTooltip] = useState<IMetricsTooltipState | undefined>();

  // Load tracts shapes using Census Cartographic
  useEffect(() => {
    if (map?.data && filterVal.latlong) {
      prepareTractGeometricData(map, {
        lat: filterVal.latlong.lat(),
        lng: filterVal.latlong.lng(),
      });
    }
  }, [filterVal.latlong]);

  useEffect(() => {
    if (!map?.data || !filterVal.latlong) {
      return;
    }
  }, [filterVal.latlong]);

  const [isClickListenerSet, setClickListener] = useState(false);
  // Create the choropleth map
  useEffect(() => {
    setMetricsTooltip(undefined);
    if (!map?.data || !filterVal.latlong) {
      return;
    }

    if (value === DemographicFeatureSelection.MEDIAN_HOUSEHOLD_INCOME) {
      const medianHouseholdLegend = createMedianHouseholdIncomeLegend();
      map.data.setStyle(medianHouseholdLegend.getGoogleMapsColor);
    } else if (value === DemographicFeatureSelection.MEDIAN_HOME_VALUE) {
      const medianHomeValue = createMedianHomeValueLegend();
      map.data.setStyle(medianHomeValue.getGoogleMapsColor);
    }
  }, [filterVal.latlong, value]);

  // Handle tract tooltip on hover
  useEffect(() => {
    if (!map?.data) {
      return;
    }
    if (isClickListenerSet) {
      return;
    }
    setClickListener(true);
    map.data.addListener("mouseover", (event: google.maps.Data.MouseEvent) => {
      highlightTract(map, event);
      const income: number = event.feature.getProperty("B19013_001E");
      const value: number = event.feature.getProperty("B25077_001E");

      const tractName: string = event.feature.getProperty("NAMELSAD");
      const county: string = event.feature.getProperty("NAMELSADCO");

      setMetricsTooltip({
        // @ts-ignore
        coordinates: event.latLng,
        householdIncome: income,
        homeValue: value,
        tractName,
        county,
      });
    });
  }, [filterVal.latlong]);

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
          {metricsTooltip && (
            <MetricsTooltip
              onClose={() => setMetricsTooltip(undefined)}
              coordinates={metricsTooltip.coordinates as google.maps.LatLng}
              homeValue={metricsTooltip.homeValue}
              householdIncome={metricsTooltip.householdIncome}
              tractName={metricsTooltip.tractName}
              county={metricsTooltip.county}
            />
          )}
        </>
      </GoogleMap>
      <DemographicFeatureDropdown />
      {value === DemographicFeatureSelection.MEDIAN_HOUSEHOLD_INCOME ? <HouseholdMapLegend /> : <HomevalueMapLegend />}
    </div>
  );
}

function HouseholdMapLegend() {
  const demographicColorRepresentation = ["#A30123", "#D12F26", "#EE6941", "#EEAF72", "#F4D589", "#F6F6B9", "#D6EAEF", "#ADD2E3", "#6FA7C7", "#4873AF", "#2B368C", "purple"];
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

interface IMetricsTooltipProps extends IMetricsTooltipState {
  onClose: () => void;
}

function MetricsTooltip(props: IMetricsTooltipProps) {
  const [value] = useRecoilState(feature);
  return (
    <InfoBox onCloseClick={() => props.onClose()} position={props.coordinates}>
      {value === DemographicFeatureSelection.MEDIAN_HOUSEHOLD_INCOME ? (
        <HouseholdIncomeTooltip income={props.householdIncome} county={props.county} tractName={props.tractName} />
      ) : (
        value === DemographicFeatureSelection.MEDIAN_HOME_VALUE && <HomevalueTooltip value={props.homeValue} county={props.county} tractName={props.tractName} />
      )}
    </InfoBox>
  );
}

interface IHouseholdIncomeTooltip {
  income: number;
  county: string;
  tractName: string;
}

function HouseholdIncomeTooltip({ tractName, income, county }: IHouseholdIncomeTooltip) {
  return (
    <div style={{ width: 180, borderRadius: 20, backgroundColor: "white", opacity: 0.86, padding: 12 }}>
      <Typography fontWeight={"800"}>{tractName}</Typography>
      <Typography>{county}</Typography>

      {Math.sign(income || -1) ? <Typography>Income: ${income.toLocaleString()}</Typography> : <Typography>N/A</Typography>}
    </div>
  );
}

interface IHomeValueTooltipContent {
  value: number;
  county: string;
  tractName: string;
}

function HomevalueTooltip({ value, county, tractName }: IHomeValueTooltipContent) {
  return (
    <div style={{ width: 180, borderRadius: 20, backgroundColor: "white", opacity: 0.86, padding: 12 }}>
      <Typography fontWeight={"800"}>{tractName}</Typography>
      <Typography>{county}</Typography>

      {Math.sign(value || -1) ? <Typography>Value: ${value.toLocaleString()}</Typography> : <Typography>N/A</Typography>}
    </div>
  );
}

function HomevalueMapLegend() {
  const demographicColorRepresentation = ["#A30123", "#D12F26", "#EE6941", "#EEAF72", "#F4D589", "#F6F6B9", "#D6EAEF", "#ADD2E3", "#6FA7C7", "#4873AF", "#2B368C"];
  const mapTextItem = { fontStyle: "italic" };
  return (
    <div className={styles.mapLegend}>
      <Typography marginBottom={1} fontSize={18} fontWeight={800}>
        Median Home value
      </Typography>
      <Stack direction={"row"}>
        {demographicColorRepresentation.map((color: string, index: number) => (
          <Stack flex={1} textAlign={"center"} direction={"column"}>
            <MapLegendColorItem backgroundColor={color} />
            {index === 10 ? (
              <Typography style={mapTextItem}>1M+</Typography>
            ) : (
              <Typography style={mapTextItem}>
                {index}
                {index !== 0 && "00"}k
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

function DemographicFeatureDropdown() {
  const [value, setValue] = useRecoilState(feature);
  const handleChange = async (event: SelectChangeEvent) => {
    const value = event.target.value;
    setValue(value as DemographicFeatureSelection);
  };

  return (
    <div className={styles.dropdownFeatureSelector}>
      <FormControl size="small" fullWidth>
        <Select value={value} onChange={handleChange} defaultValue={DemographicFeatureSelection.MEDIAN_HOUSEHOLD_INCOME} labelId="demo-simple-select-label">
          <MenuItem value={DemographicFeatureSelection.MEDIAN_HOUSEHOLD_INCOME} defaultChecked>
            Median household income
          </MenuItem>
          <MenuItem value={DemographicFeatureSelection.POVERTY_RATE}>Poverty rate</MenuItem>
          <MenuItem value={DemographicFeatureSelection.MEDIAN_HOME_VALUE}>Median home value</MenuItem>
          <MenuItem value={DemographicFeatureSelection.VACANT_HOUSING_UNITS}>Vacant housing units</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

const MapLegendColorItem = ({ backgroundColor }: { backgroundColor: string }) => <div className={styles.mapLegendColorItem} style={{ backgroundColor }} />;

export default React.memo(MyComponent);

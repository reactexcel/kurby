import React, { useEffect, useState } from "react";
import { GoogleMap, InfoBox, MarkerF } from "@react-google-maps/api";
import { filterState } from "../../../context/filterContext";
import { atom, useRecoilState } from "recoil";
import GLOBAL_SETTINGS from "../../../globals/GLOBAL_SETTINGS";
import styles from "./Gmap.module.scss";
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { createMedianHouseholdIncomeLegend } from "components/Census/Legends/MedianHouseholdIncome";
import { createMedianHomeValueLegend } from "components/Census/Legends/MedianHomeValue";
import { getCenusTractGeometricData } from "components/Census/GeoJSON/getCensusCartographic";
import { createMedianPovertyRateLegend, getPercentUnderPoverty } from "components/Census/Legends/MedianPovertyRate";
import { HomevalueMapLegend, HouseholdMapLegend, PovertyRateLegend, VacantHousingLegend } from "components/Census/Legends/Legends";
import { HomevalueTooltip, HouseholdIncomeTooltip, PlanReachedTooltip, PovertyRateTooltip, VacantHousingTooltip } from "components/Census/Tooltips/Tooltips";
import { createHousingUnitsLegend, getVacantHousingUnits } from "components/Census/Legends/MedianVacantHousing";
import { ICensusResponse } from "components/Census/GeoJSON/Census";
import { mapClicksCounter } from "context/visitorContext";
import { usePersistentRecoilState } from "hooks/recoil-persist-state";
import { useAuth } from "providers/AuthProvider";
import { IAppPlans } from "context/plansContext";
import { usePlanChecker } from "hooks/plans";

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

const initialCenter = { lat: 38.9987208, lng: -77.2538699 };

export interface IMetricsTooltipState {
  coordinates: google.maps.LatLng;
  county: string;
  tractName: string;
  householdIncome: number;
  homeValue: number;
  povertyRate: number;
  vacantHousing: number;
}

function MyComponent() {
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [, setMapCounter] = useRecoilState(mapClicksCounter);

  const googleMapOptions = {
    // zoomControl: false,
    // minZoom: 17,
    // fullscreenControl: false,
  };
  const [tractGeometricData, setTractGeometricData] = useState<ICensusResponse<object> | null>(null);

  const [filterVal, setFilterVal] = useRecoilState(filterState);
  const [isLoaded, setIsLoaded] = useState(false);

  const [value] = useRecoilState(feature);
  const [metricsTooltip, setMetricsTooltip] = useState<IMetricsTooltipState | undefined>();

  // Load tracts shapes using Census Cartographic
  useEffect(() => {
    const prepareTractGeometricData = async () => {
      const dataLayer = await getCenusTractGeometricData({
        // @ts-ignore
        lat: filterVal.latlong.lat(),
        // @ts-ignore
        lng: filterVal.latlong.lng(),
      });
      if (dataLayer?.features.length !== tractGeometricData?.features?.length) {
        setTractGeometricData(dataLayer);
      }
    };
    try {
      if (filterVal.latlong) {
        prepareTractGeometricData();
      }
    } catch (error) {}
  }, [filterVal.latlong]);

  // Load requested to Google Maps as soon as it becomes available
  useEffect(() => {
    if (map?.data && tractGeometricData) {
      map.data.setMap(map);
      map.data.addGeoJson(tractGeometricData);
    }
  }, [map, tractGeometricData]);

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
    } else if (value === DemographicFeatureSelection.POVERTY_RATE) {
      const medianPovertyRate = createMedianPovertyRateLegend();
      map.data.setStyle(medianPovertyRate.getGoogleMapsColor);
    } else if (value === DemographicFeatureSelection.VACANT_HOUSING_UNITS) {
      const housingUnits = createHousingUnitsLegend();
      map.data.setStyle(housingUnits.getGoogleMapsColor);
    }
  }, [filterVal.latlong, value]);

  // Handle tract tooltip on hover
  const [isClickListenerSet, setClickListener] = useState(false);

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
      setMapCounter((prev) => prev + 1);
      // Get all necessary data for all categories for the map.
      const county: string = event.feature.getProperty("NAMELSADCO");
      const tractName: string = event.feature.getProperty("NAMELSAD");

      const income: number = event.feature.getProperty("B19013_001E");
      const value: number = event.feature.getProperty("B25077_001E");

      const C17002_001E = event.feature.getProperty("C17002_001E");
      const C17002_002E = event.feature.getProperty("C17002_002E");
      const C17002_003E = event.feature.getProperty("C17002_003E");

      const B25002_003E = event.feature.getProperty("B25002_003E");
      const B25002_001E = event.feature.getProperty("B25002_001E");

      const povertyRate: number = getPercentUnderPoverty({
        C17002_001E,
        C17002_002E,
        C17002_003E,
      });

      const vacantUnits = getVacantHousingUnits({
        B25002_003E,
        B25002_001E,
      });

      setMetricsTooltip({
        // @ts-ignore
        coordinates: event.latLng,
        householdIncome: income,
        homeValue: value,
        vacantHousing: vacantUnits,
        povertyRate,
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
              povertyRate={metricsTooltip.povertyRate}
              coordinates={metricsTooltip.coordinates as google.maps.LatLng}
              homeValue={metricsTooltip.homeValue}
              householdIncome={metricsTooltip.householdIncome}
              tractName={metricsTooltip.tractName}
              county={metricsTooltip.county}
              vacantHousing={metricsTooltip.vacantHousing}
            />
          )}
        </>
      </GoogleMap>
      <DemographicFeatureDropdown />
      {value === DemographicFeatureSelection.MEDIAN_HOUSEHOLD_INCOME ? (
        <HouseholdMapLegend />
      ) : value === DemographicFeatureSelection.MEDIAN_HOME_VALUE ? (
        <HomevalueMapLegend />
      ) : value === DemographicFeatureSelection.POVERTY_RATE ? (
        <PovertyRateLegend />
      ) : (
        value === DemographicFeatureSelection.VACANT_HOUSING_UNITS && <VacantHousingLegend />
      )}
    </div>
  );
}

interface IMetricsTooltipProps extends IMetricsTooltipState {
  onClose: () => void;
}

function MetricsTooltip(props: IMetricsTooltipProps) {
  const { isFree } = usePlanChecker();
  const [value] = useRecoilState(feature);
  const [mapCounter, setMapCounter] = usePersistentRecoilState("mapClickCounter", mapClicksCounter);

  // check if we've reached a new day and reset the counter if so
  useEffect(() => {
    const lastVisitDate = localStorage.getItem("lastVisitDate");
    const currentDate = new Date().toISOString().slice(0, 10); // today's date in 'yyyy-mm-dd' format

    if (lastVisitDate !== currentDate) {
      localStorage.setItem("lastVisitDate", currentDate);
      setMapCounter(0);
    }
  }, [setMapCounter]);

  const visitorMapReachedClickLimit = isFree && mapCounter >= 50;

  if (visitorMapReachedClickLimit) {
    return (
      <InfoBox onCloseClick={() => props.onClose()} position={props.coordinates}>
        <PlanReachedTooltip />
      </InfoBox>
    );
  }

  return (
    <InfoBox onCloseClick={() => props.onClose()} position={props.coordinates}>
      <div>
        {value === DemographicFeatureSelection.MEDIAN_HOUSEHOLD_INCOME ? (
          <HouseholdIncomeTooltip income={props.householdIncome} county={props.county} tractName={props.tractName} />
        ) : value === DemographicFeatureSelection.MEDIAN_HOME_VALUE ? (
          <HomevalueTooltip value={props.homeValue} county={props.county} tractName={props.tractName} />
        ) : value === DemographicFeatureSelection.POVERTY_RATE ? (
          <PovertyRateTooltip povertyRate={props.povertyRate} county={props.county} tractName={props.tractName} />
        ) : (
          value === DemographicFeatureSelection.VACANT_HOUSING_UNITS && (
            <VacantHousingTooltip vacantHousing={props.vacantHousing} county={props.county} tractName={props.tractName} />
          )
        )}
      </div>
    </InfoBox>
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
          <MenuItem key={DemographicFeatureSelection.MEDIAN_HOUSEHOLD_INCOME} value={DemographicFeatureSelection.MEDIAN_HOUSEHOLD_INCOME} defaultChecked>
            Median household income
          </MenuItem>
          <MenuItem key={DemographicFeatureSelection.POVERTY_RATE} value={DemographicFeatureSelection.POVERTY_RATE}>
            Poverty rate
          </MenuItem>
          <MenuItem key={DemographicFeatureSelection.MEDIAN_HOME_VALUE} value={DemographicFeatureSelection.MEDIAN_HOME_VALUE}>
            Median home value
          </MenuItem>
          <MenuItem key={DemographicFeatureSelection.VACANT_HOUSING_UNITS} value={DemographicFeatureSelection.VACANT_HOUSING_UNITS}>
            Vacant housing units
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default React.memo(MyComponent);

import { createCensusDemographicAPI } from "./Census";

interface MedianHouseholdIncome {
  readonly STATEFP: string;
  readonly LSAD: string;
  readonly tract: string;
  readonly AFFGEOID: string;
  readonly STUSPS: string;
  readonly B19013_001E: number; // WHAT WE NEED: MEDIAN_HOUSEHOLD_INCOME
  readonly county: string;
  readonly state: string;
  readonly GEOID: string;
  readonly AWATER: number;
  readonly NAMELSAD: string;
  readonly STATE_NAME: string;
  readonly COUNTYFP: string;
  readonly TRACTCE: string;
  readonly NAMELSADCO: string;
  readonly NAME: string;
  readonly ALAND: number;
}

interface PovertyRateResponse {
  readonly STATEFP: string;
  readonly LSAD: string;
  readonly tract: string;
  readonly AFFGEOID: string;
  readonly STUSPS: string;
  readonly C17002_002E: number;
  readonly C17002_001E: number;
  readonly C17002_003E: number;
  readonly county: string;
  readonly state: string;
  readonly GEOID: string;
  readonly AWATER: number;
  readonly NAMELSAD: string;
  readonly STATE_NAME: string;
  readonly COUNTYFP: string;
  readonly TRACTCE: string;
  readonly NAMELSADCO: string;
  readonly NAME: string;
  readonly ALAND: number;
}

export const prepareTractGeometricData = async (map: google.maps.Map, coordinates: google.maps.LatLngLiteral) => {
  const censusStatsApi = createCensusDemographicAPI({
    statusKey: process.env.NEXT_CENSUS_BUREAU_API_KEY || "978f544e844f821ccfe1dd7620e9180801de2107",
    sourcePath: ["acs", "acs5"],
    values: ["B19013_001E", "B25077_001E"],
    vintage: "2021",
    geoResolution: "500k",
  });
  const dataLayer = await censusStatsApi.getCartographicData<MedianHouseholdIncome>(coordinates.lat, coordinates.lng);
  if (dataLayer) {
    map.data.setMap(map);
    map.data.addGeoJson(dataLayer);
  }
};

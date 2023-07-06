import census from "citysdk";

interface ICartographicData {
  readonly lat: number;
  readonly lng: number;
}

interface ICensusResponse {
  readonly type: string;
  readonly features: Feature[];
}

export interface Feature {
  readonly type: string;
  readonly geometry: Geometry;
  readonly properties: Properties;
}

export interface Geometry {
  readonly bbox: number[];
  readonly type: string;
  readonly coordinates: number[][][];
}

export interface Properties {
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

//* Gets the raw census data
export const getCartographicData = async ({ lat, lng }: ICartographicData): Promise<ICensusResponse | null> => {
  const request = {
    vintage: "2021",
    geoHierarchy: {
      state: {
        lat,
        lng,
      },
      county: null, // <- leapfrog fix
      tract: "*",
    },
    sourcePath: ["acs", "acs5"],
    values: ["B19013_001E"], // MEDIAN_HOUSEHOLD_INCOME
    geoResolution: "500k",
    statsKey: process.env.NEXT_CENSUS_BUREAU_API_KEY,
  };
  return new Promise((resolve) => {
    census(request, async (err: any, res: ICensusResponse) => {
      if (err) {
        throw new Error("Failed to request census data.");
      }
      resolve(res);
    });
  });
};

interface IKurbyLegendColor {
  readonly fillColor: string;
  readonly fillOpacity: number;
  readonly strokeWeight: number;
}

interface IKurbyLegendColorDefault {
  readonly strokeWeight: number;
  readonly fillColor: string;
}

export const kurbyLegendColors = (feature: google.maps.Data.Feature): IKurbyLegendColor | IKurbyLegendColorDefault => {
  const income = feature.getProperty("B19013_001E").toString();
  const incomeNativeType = feature.getProperty("B19013_001E");
  const isIncomeAvailable = Math.sign(incomeNativeType) === 1;

  const returnMap = {
    fillOpacity: 0.75,
    strokeWeight: 0.45,
  };

  const color = (fillColor: string) => ({
    ...returnMap,
    fillColor: fillColor,
  });

  const IS_200K_PLUS = isIncomeAvailable && income.length > 6;
  const IS_200K = isIncomeAvailable && income.length === 6 && income.startsWith("2");
  const IS_120K = isIncomeAvailable && income.length === 6 && income.startsWith("12");
  const IS_100K = isIncomeAvailable && income.length === 6 && income.startsWith("1");
  const IS_90K = isIncomeAvailable && income.length === 5 && income.startsWith("9");
  const IS_80K = isIncomeAvailable && income.length === 5 && income.startsWith("8");
  const IS_70K = isIncomeAvailable && income.length === 5 && income.startsWith("7");
  const IS_60K = isIncomeAvailable && income.length === 5 && income.startsWith("6");
  const IS_50K = isIncomeAvailable && income.length === 5 && income.startsWith("5");
  const IS_40K = isIncomeAvailable && income.length === 5 && income.startsWith("4");
  const IS_30K = isIncomeAvailable && income.length === 5 && income.startsWith("3");
  const IS_20K = isIncomeAvailable && income.length === 5 && income.startsWith("2");
  const IS_10K = isIncomeAvailable && income.length === 5 && income.startsWith("1");
  const IS_0K = isIncomeAvailable && income.length === 4;

  switch (true) {
    case IS_200K_PLUS:
      return color("#5C00B2");
    case IS_200K:
      return color("purple");
    case IS_120K:
      return color("#2B368C");
    case IS_100K:
      return color("#2B368C");
    case IS_90K:
      return color("#4873AF");
    case IS_80K:
      return color("#6FA7C7");
    case IS_70K:
      return color("#ADD2E3");
    case IS_60K:
      return color("#D6EAEF");
    case IS_50K:
      return color("#F6F6B9");
    case IS_40K:
      return color("#F4D589");
    case IS_30K:
      return color("#F4D589");
    case IS_20K:
      return color("#EE6941");
    case IS_10K:
      return color("#D12F26");
    case IS_0K:
      return color("#A30123");
    default:
      return {
        strokeWeight: 0,
        fillColor: "rgb(255, 255, 255, 0)",
      };
  }
};

export const prepareGeometricData = async (map: google.maps.Map, coordinates: google.maps.LatLngLiteral) => {
  const dataLayer = await getCartographicData(coordinates);
  if (dataLayer) {
    map.data.addGeoJson(dataLayer);
  }
};

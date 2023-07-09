import census from "citysdk";
import { CENSUS_VALUES } from "../getCensusData";

type CensusVintageVersions = "2017" | "2018" | "2019" | "2020" | "2021";
type CensusSourcePath = "acs" | "acs5";
type CensusGeoResolution = "20m" | "5m" | "500k";

type DataRequestType = typeof CENSUS_VALUES;
type CensusStatsValue = keyof DataRequestType;

interface ICitySDKRequest {
  readonly vintage: CensusVintageVersions;
  readonly geoHierarchy: {
    readonly state: {
      readonly lat: number;
      readonly lng: number;
    };
    readonly county: null;
    readonly tract: string;
  };
  readonly sourcePath: CensusSourcePath[];
  readonly values: CensusStatsValue[];
  readonly geoResolution: CensusGeoResolution;
  readonly statsKey: string;
}

interface ICensusDemographicStatsProps {
  readonly statusKey: string;
  readonly vintage: CensusVintageVersions;
  readonly sourcePath: CensusSourcePath[];
  readonly values: CensusStatsValue[];
  readonly geoResolution: CensusGeoResolution;
}

interface ICensusResponse<T> {
  readonly type: string;
  readonly features: Feature<T>[];
}

export interface Feature<T> {
  readonly type: string;
  readonly geometry: Geometry;
  readonly properties: T;
}

export interface Geometry {
  readonly bbox: number[];
  readonly type: string;
  readonly coordinates: number[][][];
}

export class CensusDemographicTractStats {
  protected readonly statusKey: string;
  protected readonly vintage: CensusVintageVersions;
  protected readonly sourcePath: CensusSourcePath[];
  protected readonly values: CensusStatsValue[];
  protected readonly geoResolution: CensusGeoResolution;

  constructor({ statusKey, vintage, sourcePath, values, geoResolution }: ICensusDemographicStatsProps) {
    this.vintage = vintage;
    this.statusKey = statusKey;
    this.sourcePath = sourcePath;
    this.values = values;
    this.geoResolution = geoResolution;
  }

  protected request(lat: number, lng: number): ICitySDKRequest {
    return {
      vintage: this.vintage,
      geoHierarchy: {
        state: {
          lat,
          lng,
        },
        county: null, // <- leapfrog fix
        tract: "*",
      },
      sourcePath: this.sourcePath,
      values: this.values,
      geoResolution: this.geoResolution,
      statsKey: this.statusKey,
    };
  }

  public getCartographicData = async <T>(lat: number, lng: number): Promise<ICensusResponse<T> | null> => {
    return new Promise((resolve) => {
      const censusHandler = async (err: any, res: ICensusResponse<T>) => {
        if (err) {
          throw new Error("Failed to request census data.");
        }
        resolve(res);
      };
      census(this.request(lat, lng), censusHandler);
    });
  };
}

export function createCensusDemographicAPI(props: ICensusDemographicStatsProps) {
  return new CensusDemographicTractStats(props);
}

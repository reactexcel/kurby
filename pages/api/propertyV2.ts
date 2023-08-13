/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { BedsBathsContext, HomeFilterContext, MoreFilterContext, PriceContext, SaleContext } from "context/propertySearchContext";
import { DateTime } from "luxon";

export interface IPropertySearchResponse {
  readonly live: boolean;
  readonly input: Input;
  readonly data: IPropertyHouse[];
  readonly resultCount: number;
  readonly resultIndex: number;
  readonly recordCount: number;
  readonly statusCode: number;
  readonly statusMessage: string;
  readonly credits: number;
  readonly requestExecutionTimeMS: string;
}

interface Input {
  readonly ids_only: boolean;
  readonly obfuscate: boolean;
  readonly summary: boolean;
  readonly size: number;
}

export interface IPropertyHouse {
  readonly absenteeOwner: boolean;
  readonly address: Address;
  readonly adjustableRate: boolean;
  readonly airConditioningAvailable: boolean;
  readonly assessedImprovementValue: number;
  readonly assessedLandValue: number;
  readonly assessedValue: number;
  readonly auction: boolean;
  readonly basement: boolean;
  readonly bathrooms: number;
  readonly bedrooms: number;
  readonly cashBuyer: boolean;
  readonly companyName?: string;
  readonly corporateOwned: boolean;
  readonly death: boolean;
  readonly distressed: boolean;
  readonly documentType?: string;
  readonly documentTypeCode?: string;
  readonly equity: boolean;
  readonly equityPercent?: number;
  readonly estimatedEquity: number;
  readonly estimatedValue: number;
  readonly floodZone: boolean;
  readonly floodZoneDescription?: string;
  readonly floodZoneType?: string;
  readonly foreclosure: boolean;
  readonly forSale: boolean;
  readonly freeClear: boolean;
  readonly garage: boolean;
  readonly highEquity: boolean;
  readonly id: string;
  readonly inherited: boolean;
  readonly inStateAbsenteeOwner: boolean;
  readonly investorBuyer: boolean;
  readonly landUse: string;
  readonly lastMortgage1Amount: any;
  readonly lastSaleAmount?: string;
  readonly lastSaleDate?: string;
  readonly latitude: number;
  readonly lenderName?: string;
  readonly listingAmount: any;
  readonly longitude: number;
  readonly lotSquareFeet: number;
  readonly mailAddress: MailAddress;
  readonly medianIncome: string;
  readonly MFH2to4: boolean;
  readonly MFH5plus: boolean;
  readonly mlsActive: boolean;
  readonly mlsCancelled: boolean;
  readonly mlsFailed: boolean;
  readonly mlsHasPhotos: boolean;
  readonly mlsLastSaleDate?: string;
  readonly mlsListingPrice: any;
  readonly mlsPending: boolean;
  readonly mlsSold: boolean;
  readonly negativeEquity: boolean;
  readonly openMortgageBalance: number;
  readonly outOfStateAbsenteeOwner: boolean;
  readonly owner1LastName: string;
  readonly ownerOccupied: boolean;
  readonly preForeclosure: boolean;
  readonly privateLender: boolean;
  readonly propertyId: string;
  readonly propertyType: string;
  readonly propertyUse: string;
  readonly propertyUseCode: number;
  readonly rentAmount: any;
  readonly reo: boolean;
  readonly roomsCount: number;
  readonly squareFeet: number;
  readonly totalPortfolioEquity?: string;
  readonly totalPortfolioMortgageBalance?: string;
  readonly totalPortfolioValue?: string;
  readonly totalPropertiesOwned?: string;
  readonly unitsCount: number;
  readonly vacant: boolean;
  readonly yearBuilt?: number;
  readonly yearsOwned?: number;
  readonly owner1FirstName?: string;
  readonly owner2FirstName?: string;
  readonly owner2LastName?: string;
  readonly suggestedRent?: string;
  readonly neighborhood?: Neighborhood;
}

export interface Address {
  readonly address: string;
  readonly city: string;
  readonly county: string;
  readonly state: string;
  readonly street: string;
  readonly zip: string;
}

export interface MailAddress {
  readonly address?: string;
  readonly city?: string;
  readonly county?: string;
  readonly state?: string;
  readonly street?: string;
  readonly zip?: string;
}

export interface Neighborhood {
  readonly center: string;
  readonly id: string;
  readonly name: string;
  readonly type: string;
}

interface IFilterSearchProps {
  readonly latitude: number;
  readonly longitude: number;
  readonly forSale: SaleContext["default"];
  readonly bedsFilter: BedsBathsContext["default"];
  readonly radius: number;
  readonly homeFilter: HomeFilterContext["default"];
  readonly priceFilter: PriceContext["default"];
  readonly moreFilter: MoreFilterContext["default"];
}

class PropertySearchApiV2 {
  private BASE_URL = "https://api.realestateapi.com/v2/PropertySearch";

  public constructor(private readonly accessKey: string) {
    this.accessKey = accessKey;
  }

  private headers() {
    return {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-api-key": this.accessKey,
      },
    };
  }

  async getPropertiesByAddress(address: string) {
    if (",#-/ !@$%^*(){}|[]\\".indexOf(address) >= 0) {
      throw new Error("Please enter an valid US State address");
    }

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: this.BASE_URL,
      ...this.headers(),
      data: {
        address,
      },
    };

    return (await axios.request<IPropertySearchResponse>(config)).data;
  }

  async getPropertiesByFilters({ latitude, longitude, forSale, bedsFilter, homeFilter, priceFilter, moreFilter }: IFilterSearchProps) {
    const parseHomeType = (property_type: IFilterSearchProps["homeFilter"]) => {
      if (property_type.houses) return "SFR";
      if (property_type.multiFamily) return "MFR";
      if (property_type.lotsLands) return "LAND";
      if (property_type.condosCoOps) return "CONDO";
      if (property_type.mobile) return "MOBILE";

      return "OTHER";
    };

    const now = DateTime.now();
    const oneYearAgo = now.minus({ years: 1 });

    const isPricingFilterOn = Boolean(priceFilter?.minimum || priceFilter?.maximum);

    const filtersObject = {
      // For Sale Filter:
      mls_active: isPricingFilterOn || forSale?.forSaleByAgent,
      last_sale_date: forSale?.sold && oneYearAgo.toFormat("yyyy-MM-dd"),
      for_sale: !forSale?.forSaleByAgent ? forSale?.forSaleByOwner : false,
      mls_pending: forSale?.propertyStatusPending,
      mls_cancelled: forSale?.propertyStatusCancelled,
      // Price Filter
      mls_listing_price_min: priceFilter?.minimum,
      mls_listing_price_max: priceFilter?.maximum * (1 - 0.3),
      // Beds & Baths Filter
      beds_min: bedsFilter?.bedrooms,
      beds_max: 5,
      baths_min: bedsFilter?.bathrooms,
      baths_max: 4,
      // Home Type Filter:
      property_type: homeFilter && parseHomeType(homeFilter),
      // More Filter
      years_owned_min: moreFilter?.yearsOwnedMin,
      years_owned_max: moreFilter?.yearsOwnedMax,
      auction: moreFilter?.auction,
      pre_foreclosure: moreFilter?.preForeclosure,
      foreclosure: moreFilter?.foreclosed,
    };

    const filters = Object.keys(filtersObject)
      // @ts-ignore
      .filter((key) => Boolean(filtersObject[key])) // Filtering keys with non-null and non-undefined values
      .reduce((acc, key) => {
        // @ts-ignore
        acc[key] = filtersObject[key]; // Adding keys with non-null and non-undefined values to the new object
        return acc;
      }, {});

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: this.BASE_URL,
      ...this.headers(),
      data: {
        ...filters,
        latitude,
        longitude,
        size: 10,
        radius: 10,
      },
    };

    return (await axios.request<IPropertySearchResponse>(config)).data;
  }
}

export const createPropertySearchApi = () => {
  const env = process.env.NEXT_PROPERTY_SEARCH_API_KEY || "KURBYAI-7afa-7c90-87e6-fc599dbb61ce";
  if (!env) {
    throw new Error("No PROPERTY_SEARCH_API_KEY found in .env");
  }
  return new PropertySearchApiV2(env);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const api = createPropertySearchApi();
  if (req.body?.filters) {
    const response = await api.getPropertiesByFilters(req.body.filters);
    return res.status(200).json(response);
  }

  const response = await api.getPropertiesByAddress(req.body.address);
  return res.status(200).json(response);
}

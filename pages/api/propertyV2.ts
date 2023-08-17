/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { BedsBathsContext, HomeFilterContext, MoreFilterContext, PriceContext, SaleContext } from "context/propertySearchContext";
import { DateTime } from "luxon";
import checkPlan from "./checkPlan";
import { rateLimiter } from "./rateLimiter";

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
      const types = [];

      if (property_type.houses) types.push("SFR");
      if (property_type.multiFamily) types.push("MFR");
      if (property_type.lotsLands) types.push("LAND");
      if (property_type.condosCoOps) types.push("CONDO");
      if (property_type.mobile) types.push("MOBILE");
      return types.map((home) => ({ property_type: home }));
    };

    const now = DateTime.now();
    const oneYearAgo = now.minus({ years: 1 });
    const isPricingFilterOn = Boolean(priceFilter?.minimum || priceFilter?.maximum);

    let equityPercentMin = moreFilter?.equityPercentMin || 0;
    let equityPercentMax = moreFilter?.equityPercentMax || 0;
    let equityPercentMedian;

    if (equityPercentMin || equityPercentMax) {
      equityPercentMedian = (equityPercentMin + equityPercentMax) / 2;
      equityPercentMedian = Math.max(0, Math.min(100, equityPercentMedian)); // Ensure that the median is between 0 and 100
    } else {
      equityPercentMedian = null; // You can assign a default value here if needed
    }

    let estimatedEquityMin = moreFilter?.estimatedEquityMin || 0;
    let estimatedEquityMax = moreFilter?.estimatedEquityMax || 0;
    let estimatedEquityMedian;

    if (estimatedEquityMin || estimatedEquityMax) {
      estimatedEquityMedian = (estimatedEquityMin + estimatedEquityMax) / 2;
    } else {
      estimatedEquityMedian = null; // You can assign a default value here if needed
    }

    const filtersObject = {
      // For Sale Filter:
      mls_active: isPricingFilterOn || forSale?.forSaleByAgent,
      last_sale_date: forSale?.sold && oneYearAgo.toFormat("yyyy-MM-dd"),
      for_sale: !forSale?.forSaleByAgent ? forSale?.forSaleByOwner : false,
      mls_pending: forSale?.propertyStatusPending,
      mls_cancelled: forSale?.propertyStatusCancelled,
      // Price Filter
      mls_listing_price_min: priceFilter?.minimum,
      mls_listing_price_max: priceFilter?.maximum * (1 - 0.1),
      // Beds & Baths Filter
      beds_min: bedsFilter?.bedrooms,
      beds_max: 5,
      baths_min: bedsFilter?.bathrooms,
      baths_max: 4,

      // More Filter
      auction: moreFilter?.auction,
      pre_foreclosure: moreFilter?.preForeclosure,
      foreclosure: moreFilter?.foreclosure,
      // More Filter - Owner Information
      absentee_owner: moreFilter?.nonOwnerOccupied || moreFilter?.absenteeOwner,
      out_of_state_owner: moreFilter?.outOfStateAbsenteeOwner,
      in_state_owner: moreFilter?.inStateAbsenteeOwner,
      corporate_owned: moreFilter?.corporateOwned,
      investor_buyer: moreFilter?.investorBuyer,
      inherited: moreFilter?.inherited,
      death: moreFilter?.ownerDeath || moreFilter?.spousalDeath,
      // More Filter - Years Owned
      years_owned_min: moreFilter?.yearsOwnedMin,
      years_owned_max: moreFilter?.yearsOwnedMax,
      // More Filter - Financial Information
      cash_buyer: moreFilter?.cashBuyer,
      equity: moreFilter?.equity,
      high_equity: moreFilter?.highEquity,
      negative_equity: moreFilter?.negativeEquity,
      reo: moreFilter?.reo,
      private_lender: moreFilter?.privateLender,
      adjustable_rate: moreFilter?.adjustableRate,
      free_clear: moreFilter?.freeClear,
      // More Filter - Equity Percent
      equity_percent:
        moreFilter?.equityPercentMin && !moreFilter?.equityPercentMax
          ? moreFilter?.equityPercentMin
          : moreFilter?.equityPercentMax && !moreFilter?.equityPercentMin
          ? moreFilter?.equityPercentMax
          : equityPercentMedian,
      equity_percent_operator: moreFilter?.equityPercentMin || moreFilter?.equityPercentMax ? "gt" : null,
      // More Filter - Estimated Equity
      estimated_equity:
        moreFilter?.estimatedEquityMin && !moreFilter?.estimatedEquityMax
          ? moreFilter?.estimatedEquityMin
          : moreFilter?.estimatedEquityMax && !moreFilter?.estimatedEquityMin
          ? moreFilter?.estimatedEquityMax
          : estimatedEquityMedian,
      equity_operator: moreFilter?.estimatedEquityMin || moreFilter?.estimatedEquityMax ? "lt" : null,
      // More Filter - Estiamted Value
      value_min: moreFilter?.estimatedValueMin,
      value_max: moreFilter?.estimatedValueMax,
      // More Filter - Open Mortgage Balance
      mortgage_min: moreFilter?.openMortgageBalanceMin,
      mortgage_max: moreFilter?.openMortgageBalanceMax,
      document_type: moreFilter?.deedType,
      // More Filter - Loan Types
      loan_type_code_first: moreFilter?.loanType,
      // More Filter - Interest Rate
      portfolio_equity_min: moreFilter?.interestRateMin,
      portfolio_equity_max: moreFilter?.interestRateMax,
    };

    const trueFilters = Object.keys(filtersObject)
      // @ts-ignore
      .filter((key) => Boolean(filtersObject[key])) // Filtering keys with non-null and non-undefined values
      .reduce((acc, key) => {
        // @ts-ignore
        acc[key] = filtersObject[key]; // Adding keys with non-null and non-undefined values to the new object
        return acc;
      }, {});

    const filter = {
      ...trueFilters,
      ...(forSale?.offMarket && {
        mls_active: false,
        mls_pending: false,
        mls_cancelled: false,
      }),
      // Home Type Filter:
      ...(homeFilter && { or: parseHomeType(homeFilter) }),
    };

    console.log(filter);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: this.BASE_URL,
      ...this.headers(),
      data: {
        ...filter,
        latitude,
        longitude,
        size: 25,
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
  if (!rateLimiter(req, res)) return;

  const api = createPropertySearchApi();

  if (req.body?.filters) {
    const { isGrowth, isPro } = await checkPlan(req.body.userToken);

    if (!isGrowth && !isPro) {
      return res.status(401).send(
        JSON.stringify({
          error: "You are not allowed to create this request.",
        }),
      );
    }
    const response = await api.getPropertiesByFilters(req.body.filters);
    return res.status(200).json(response);
  }

  const response = await api.getPropertiesByAddress(req.body.address);
  return res.status(200).json(response);
}

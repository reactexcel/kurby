import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

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
  address: string;
  city: string;
  county: string;
  state: string;
  street: string;
  zip: string;
}

export interface MailAddress {
  address?: string;
  city?: string;
  county?: string;
  state?: string;
  street?: string;
  zip?: string;
}

export interface Neighborhood {
  center: string;
  id: string;
  name: string;
  type: string;
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

  async getPropertyDataByAddress(address: string) {
    if (",#-/ !@$%^*(){}|[]\\".indexOf(address) >= 0) {
      throw new Error("Please enter an valid US State address");
    }
    console.log(address);
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
}

export const createPropertySearchApi = () => {
  const env = process.env.NEXT_PROPERTY_SEARCH_API_KEY;
  if (!env) {
    throw new Error("No PROPERTY_SEARCH_API_KEY found in .env");
  }
  return new PropertySearchApiV2(env);
};

export default async function handler(request: NextApiRequest, res: NextApiResponse) {
  const api = createPropertySearchApi();
  const response = await api.getPropertyDataByAddress(request.body.address);

  return res.status(200).send(JSON.stringify(response));
}

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import checkProPlan from "./checkProPlan";

export interface IPropertyDetailResponse {
  readonly input: IPropertyDetailSearchInput;
  readonly data: IPropertyDetailHouse;
  readonly statusCode: number;
  readonly statusMessage: string;
  readonly credits: number;
  readonly live: boolean;
  readonly requestExecutionTimeMS: string;
  readonly propertyLookupExecutionTimeMS: string;
  readonly compsLookupExecutionTimeMS: any;
}

interface IPropertyDetailSearchInput {
  readonly house: string;
  readonly street: string;
  readonly city: string;
  readonly state: string;
  readonly zip: string;
}

export interface IPropertyDetailHouse {
  readonly _searchedAddress: string;
  readonly absenteeOwner: boolean;
  readonly auction: boolean;
  readonly cashBuyer: boolean;
  readonly cashSale: boolean;
  readonly corporateOwned: boolean;
  readonly currentMortgages: Mortgage[];
  readonly death: boolean;
  readonly deathTransfer: boolean;
  readonly deedInLieu: boolean;
  readonly demographics: Demographics;
  readonly equity: any;
  readonly equityPercent: number;
  readonly estimatedEquity: number;
  readonly estimatedMortgageBalance: string;
  readonly estimatedMortgagePayment: string;
  readonly estimatedValue: number;
  readonly floodZone: boolean;
  readonly foreclosureInfo: any[];
  readonly freeClear: boolean;
  readonly highEquity: boolean;
  readonly id: number;
  readonly inherited: boolean;
  readonly inStateAbsenteeOwner: boolean;
  readonly investorBuyer: boolean;
  readonly lastSale: LastSale;
  readonly lastSaleDate: string;
  readonly lastSalePrice: string;
  readonly lastUpdateDate: string;
  readonly lien: boolean;
  readonly lotInfo: LotInfo;
  readonly MFH2to4: boolean;
  readonly MFH5plus: boolean;
  readonly mlsActive: boolean;
  readonly mlsCancelled: boolean;
  readonly mlsFailed: boolean;
  readonly mlsHasPhotos: boolean;
  readonly mlsHistory: any[];
  readonly mlsPending: boolean;
  readonly mlsSold: boolean;
  readonly mobileHome: boolean;
  readonly mortgageHistory: Mortgage[];
  readonly neighborhood: Neighborhood;
  readonly openMortgageBalance: number;
  readonly outOfStateAbsenteeOwner: boolean;
  readonly ownerInfo: OwnerInfo;
  readonly ownerOccupied: boolean;
  readonly priorId: any;
  readonly propertyInfo: PropertyInfo;
  readonly propertyType: string;
  readonly quitClaim: boolean;
  readonly saleHistory: SaleHistory[];
  readonly schools: School[];
  readonly sheriffsDeed: boolean;
  readonly spousalDeath: boolean;
  readonly taxInfo: TaxInfo;
  readonly taxLien: boolean;
  readonly trusteeSale: boolean;
  readonly vacant: boolean;
  readonly warrantyDeed: boolean;
  readonly reapiAvm: any;
  readonly comps: IPropertyDetailComps[];
}

interface Demographics {
  readonly fmrEfficiency: string;
  readonly fmrFourBedroom: string;
  readonly fmrOneBedroom: string;
  readonly fmrThreeBedroom: string;
  readonly fmrTwoBedroom: string;
  readonly fmrYear: string;
  readonly hudAreaCode: string;
  readonly hudAreaName: string;
  readonly medianIncome: string;
  readonly suggestedRent: string;
}

interface LastSale {
  readonly armsLength: boolean;
  readonly buyerNames: string;
  readonly documentType: string;
  readonly documentTypeCode: string;
  readonly downPayment: string;
  readonly load_date: string;
  readonly ltv: string;
  readonly purchaseMethod: string;
  readonly recordingDate: string;
  readonly saleAmount: string;
  readonly saleDate: string;
  readonly sellerNames: string;
  readonly seqNo: string;
  readonly transactionType: string;
}

interface LotInfo {
  readonly apn: string;
  readonly apnUnformatted: string;
  readonly censusTract: string;
  readonly landUse: string;
  readonly legalDescription: string;
  readonly lotAcres: number;
  readonly lotNumber: string;
  readonly lotSquareFeet: number;
  readonly propertyClass: string;
  readonly propertyUse: string;
}

interface Neighborhood {
  readonly center: string;
  readonly id: string;
  readonly name: string;
  readonly type: string;
}

interface OwnerInfo {
  readonly equity: any;
  readonly mailAddress: MailAddress;
  readonly owner1FirstName: string;
  readonly owner1FullName: string;
  readonly owner1LastName: string;
  readonly owner1Type: string;
  readonly owner2FirstName: string;
  readonly owner2FullName: string;
  readonly owner2LastName: string;
  readonly ownershipLength: number;
}

interface MailAddress {
  readonly address: string;
  readonly carrierRoute: string;
  readonly city: string;
  readonly county: string;
  readonly fips: string;
  readonly house: string;
  readonly label: string;
  readonly state: string;
  readonly street: string;
  readonly streetType: string;
  readonly zip: string;
  readonly zip4: string;
}

interface PropertyInfo {
  readonly address: Address;
  readonly basementFinishedPercent: any;
  readonly basementSquareFeet: number;
  readonly basementSquareFeetFinished: number;
  readonly basementSquareFeetUnfinished: string;
  readonly basementSquareFeetUnFinished: any;
  readonly basementType: string;
  readonly bathrooms: number;
  readonly bedrooms: number;
  readonly buildingSquareFeet: number;
  readonly fireplace: boolean;
  readonly fireplaces: number;
  readonly garageSquareFeet: number;
  readonly garageSquareFeetFinished: any;
  readonly garageSquareFeetUnfinished: any;
  readonly garageType: string;
  readonly heatingType: string;
  readonly latitude: number;
  readonly livingSquareFeet: number;
  readonly longitude: number;
  readonly lotSquareFeet: number;
  readonly parkingSpaces: number;
  readonly partialBathrooms: number;
  readonly pool: boolean;
  readonly propertyUse: string;
  readonly propertyUseCode: number;
  readonly roomsCount: number;
  readonly stories: number;
  readonly unitsCount: string;
  readonly yearBuilt: number;
}

interface Address {
  readonly address: string;
  readonly carrierRoute: string;
  readonly city: string;
  readonly congressionalDistrict: string;
  readonly county: string;
  readonly fips: string;
  readonly house: string;
  readonly label: string;
  readonly state: string;
  readonly street: string;
  readonly streetType: string;
  readonly zip: string;
  readonly zip4: string;
}

interface SaleHistory {
  readonly armsLength: boolean;
  readonly buyerNames: string;
  readonly documentType: string;
  readonly documentTypeCode: string;
  readonly downPayment: number;
  readonly load_date: string;
  readonly ltv: string;
  readonly purchaseMethod: string;
  readonly recordingDate: string;
  readonly saleAmount: number;
  readonly saleDate: string;
  readonly sellerNames: string;
  readonly seq: number;
  readonly seqNo: string;
  readonly transactionType: string;
}

interface School {
  readonly city: string;
  readonly enrollment: string;
  readonly grades: string;
  readonly levels: Levels;
  readonly location: string;
  readonly name: string;
  readonly parentRating: string;
  readonly rating: string;
  readonly state: string;
  readonly street: string;
  readonly type: string;
  readonly zip: string;
}

interface Levels {
  readonly middle?: boolean;
  readonly elementary?: boolean;
  readonly preschool?: boolean;
  readonly high?: boolean;
}

interface TaxInfo {
  readonly assessedImprovementValue: string;
  readonly assessedLandValue: number;
  readonly assessedValue: number;
  readonly assessmentYear: number;
  readonly estimatedValue: number;
  readonly marketImprovementValue: number;
  readonly marketLandValue: number;
  readonly marketValue: number;
  readonly propertyId: number;
  readonly taxAmount: string;
  readonly year: number;
}

interface Mortgage {
  readonly amount: number;
  readonly deedType: string;
  readonly documentDate: string;
  readonly granteeName: string;
  readonly interestRate: number;
  readonly interestRateType: string;
  readonly lenderCode: string;
  readonly lenderName: string;
  readonly lenderType: string;
  readonly load_date: string;
  readonly maturityDate: any;
  readonly mortgageId: string;
  readonly open: boolean;
  readonly recordingDate: string;
  readonly seq: number;
  readonly term: string;
  readonly transactionType: string;
}

export interface IPropertyDetailComps {
  readonly id: string;
  readonly vacant: boolean;
  readonly absenteeOwner: boolean;
  readonly corporateOwned: boolean;
  readonly outOfStateAbsenteeOwner: boolean;
  readonly inStateAbsenteeOwner: boolean;
  readonly propertyId: string;
  readonly bedrooms: string;
  readonly bathrooms: string;
  readonly yearBuilt: string;
  readonly squareFeet: string;
  readonly estimatedValue: string;
  readonly equityPercent: string;
  readonly lastSaleDate: string;
  readonly lastSaleAmount: string;
  readonly mlsListingDate?: string;
  readonly mlsLastStatusDate?: string;
  readonly lotSquareFeet: string;
  readonly latitude: string;
  readonly longitude: string;
  readonly openMortgageBalance: string;
  readonly landUse: string;
  readonly propertyType: string;
  readonly owner1LastName: string;
  readonly owner2FirstName?: string;
  readonly owner2LastName?: string;
  readonly companyName?: string;
  readonly preForeclosure?: boolean;
  readonly cashBuyer: boolean;
  readonly privateLender: boolean;
  readonly lenderName: string;
  readonly address: {
    readonly zip: string;
    readonly city: string;
    readonly county: string;
    readonly state: string;
    readonly street: string;
    readonly address: string;
  };
  readonly mailAddress: {
    readonly zip: string;
    readonly city: string;
    readonly county: string;
    readonly state: string;
    readonly street: string;
    readonly address: string;
  };
  readonly owner1FirstName?: string;
}

class PropertyDetail {
  private BASE_URL = "https://api.realestateapi.com/v2/PropertyDetail";

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
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: this.BASE_URL,
      ...this.headers(),
      data: {
        address,
        comps: true,
      },
    };

    return (await axios.request<IPropertyDetailResponse>(config)).data;
  }
}

export const createPropertyDetailApi = () => {
  const env = process.env.NEXT_PROPERTY_SEARCH_API_KEY || "KURBYAI-7afa-7c90-87e6-fc599dbb61ce";
  if (!env) {
    throw new Error("No PROPERTY_SEARCH_API_KEY found in .env");
  }
  return new PropertyDetail(env);
};

export default async function handler(request: NextApiRequest, res: NextApiResponse) {
  const isPro = await checkProPlan(request.body.userToken);

  if (!isPro) {
    return res.status(401).send(
      JSON.stringify({
        error: "You are not allowed to create this request.",
      }),
    );
  }

  const api = createPropertyDetailApi();
  const response = await api.getPropertyDataByAddress(request.body.address);

  return res.status(200).send(JSON.stringify(response));
}

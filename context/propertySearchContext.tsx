import { ListingTypeTab } from "components/BodyContent/PropertySearch/Filters/MoreFilter/MoreFilter";
import { IPriceFilterCurrentTab, IPriceFilterDownPayment } from "components/BodyContent/PropertySearch/Filters/PriceFilter/PriceFilter";
import { atom } from "recoil";

interface SaleContext {
  key: string;
  default: {
    for_sale: boolean;
    off_market: boolean;
    sold: boolean;
  };
}

const forSaleContext: SaleContext = {
  key: "propertySearchContext",
  default: {
    for_sale: false,
    off_market: false,
    sold: false,
  },
};

interface PriceContext {
  key: string;
  default: {
    tab: IPriceFilterCurrentTab;
    minimum: number;
    maximum: number;
    downPayment: IPriceFilterDownPayment;
  };
}

const priceFilterContext: PriceContext = {
  key: "priceFilterContext",
  default: {
    tab: IPriceFilterCurrentTab.LIST_PRICE_TAB,
    minimum: 0,
    maximum: 0,
    downPayment: IPriceFilterDownPayment.NO_DOWN_PAYMENT,
  },
};

interface HomeFilterContext {
  key: string;
  default: {
    houses: boolean;
    townHouse: boolean;
    multiFamily: boolean;
    condosCoOps: boolean;
    lotsLands: boolean;
    apartment: boolean;
    manufactured: boolean;
  };
}

const homeType: HomeFilterContext = {
  key: "homeTypeFilter",
  default: {
    houses: false,
    townHouse: false,
    multiFamily: false,
    condosCoOps: false,
    lotsLands: false,
    apartment: false,
    manufactured: false,
  },
};

interface MoreFilterContext {
  key: string;
  default: {
    listingType: ListingTypeTab;
    agentListed: boolean;
    newConstruction: boolean;
    preForeclosure: boolean;
    auction: boolean;
    foreclosed: boolean;
    propertyStatusActive: boolean;
    propertyStatusPending: boolean;
    propertyStatusOffMarket: boolean;
    propertyStatusCancelled: boolean;
    propertyStatusFailed: boolean;
    propertyStatusSold: boolean;
    nonOwnerOccupied: boolean;
    absenteeOwner: boolean;
    outOfStateAbsenteeOwner: boolean;
    inStateAbsenteeOwner: boolean;
    corporateOwner: boolean;
    investorBuyer: boolean;
    inherited: boolean;
    ownerDeath: boolean;
    spousalDeath: boolean;
    yearsOwnedMin: number | null;
    yearsOwnedMax: number | null;
    cashBuyer: boolean;
    equity: boolean;
    highEquity: boolean;
    negativeEquity: boolean;
    reo: boolean;
    privateLender: boolean;
    adjustableRate: boolean;
    freeClear: boolean;
    equityPercentMin: number | null;
    equityPercentMax: number | null;
    estimatedEquityMin: number | null;
    estimatedEquityMax: number | null;
    estimatedValueMin: number | null;
    estimatedValueMax: number | null;
  };
}

const moreFilterContext: MoreFilterContext = {
  key: "moreFilterContext",
  default: {
    listingType: ListingTypeTab.BY_AGENT,
    agentListed: true,
    newConstruction: false,
    preForeclosure: false,
    auction: false,
    foreclosed: false,
    propertyStatusActive: false,
    propertyStatusPending: false,
    propertyStatusOffMarket: false,
    propertyStatusCancelled: false,
    propertyStatusFailed: false,
    propertyStatusSold: false,
    nonOwnerOccupied: false,
    absenteeOwner: false,
    outOfStateAbsenteeOwner: false,
    inStateAbsenteeOwner: false,
    corporateOwner: false,
    investorBuyer: false,
    inherited: false,
    ownerDeath: false,
    spousalDeath: false,
    yearsOwnedMin: null,
    yearsOwnedMax: null,
    cashBuyer: false,
    equity: false,
    highEquity: false,
    negativeEquity: false,
    reo: false,
    privateLender: false,
    adjustableRate: false,
    freeClear: false,
    equityPercentMin: null,
    equityPercentMax: null,
    estimatedEquityMin: null,
    estimatedEquityMax: null,
    estimatedValueMin: null,
    estimatedValueMax: null,
  },
};

export const forSaleFilter = atom(forSaleContext);
export const priceFilter = atom(priceFilterContext);
export const homeTypeFilter = atom(homeType);
export const moreFilter = atom(moreFilterContext);

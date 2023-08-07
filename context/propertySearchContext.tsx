import { ListingTypeTab } from "components/BodyContent/PropertySearch/Filters/MoreFilter/MoreFilter";
import { IPriceFilterCurrentTab, IPriceFilterDownPayment } from "components/BodyContent/PropertySearch/Filters/PriceFilter/PriceFilter";
import { IPropertyHouse } from "pages/api/propertyV2";
import { atom } from "recoil";

interface IFilterMetaProps {
  readonly createdAt: Date;
  readonly isFilterApplied: boolean;
}
export interface SaleContext {
  key: string;
  default: {
    __meta__: {
      createdAt: Date;
      isFilterApplied: boolean;
    };
    for_sale: boolean | null;
    off_market: boolean | null;
    sold: boolean | null;
  };
}

const forSaleContext: SaleContext = {
  key: "propertySearchContext",
  default: {
    __meta__: {
      createdAt: new Date(),
      isFilterApplied: false,
    },
    for_sale: null,
    off_market: null,
    sold: null,
  },
};

interface PriceContext {
  key: string;
  default: {
    __meta__: IFilterMetaProps;
    tab: IPriceFilterCurrentTab;
    minimum: number;
    maximum: number;
    downPayment: IPriceFilterDownPayment;
  };
}

const priceFilterContext: PriceContext = {
  key: "priceFilterContext",
  default: {
    __meta__: {
      createdAt: new Date(),
      isFilterApplied: false,
    },
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
    __meta__: IFilterMetaProps;
    listingType: ListingTypeTab;
    agentListed: boolean | null;
    newConstruction: boolean | null;
    preForeclosure: boolean | null;
    auction: boolean | null;
    foreclosed: boolean | null;
    propertyStatusActive: boolean | null;
    propertyStatusPending: boolean | null;
    propertyStatusOffMarket: boolean | null;
    propertyStatusCancelled: boolean | null;
    propertyStatusFailed: boolean | null;
    propertyStatusSold: boolean | null;
    nonOwnerOccupied: boolean | null;
    absenteeOwner: boolean | null;
    outOfStateAbsenteeOwner: boolean | null;
    inStateAbsenteeOwner: boolean | null;
    corporateOwner: boolean | null;
    investorBuyer: boolean | null;
    inherited: boolean | null;
    ownerDeath: boolean | null;
    spousalDeath: boolean | null;
    yearsOwnedMin: number | null;
    yearsOwnedMax: number | null;
    cashBuyer: boolean | null;
    equity: boolean | null;
    highEquity: boolean | null;
    negativeEquity: boolean | null;
    reo: boolean | null;
    privateLender: boolean | null;
    adjustableRate: boolean | null;
    freeClear: boolean | null;
    equityPercentMin: number | null;
    equityPercentMax: number | null;
    estimatedEquityMin: number | null;
    estimatedEquityMax: number | null;
    estimatedValueMin: number | null;
    estimatedValueMax: number | null;
    openMortgageBalanceMin: number | null;
    openMortgageBalanceMax: number | null;
    deedType: string | null;
    loanType: string | null;
    interestRateMin: number | null;
    interestRateMax: number | null;
    loadDateAfter: null | Date;
    loadDateBefore: null | Date;
    maturityDateAfter: null | Date;
    maturityDateBefore: null | Date;
  };
}

const moreFilterContext: MoreFilterContext = {
  key: "moreFilterContext",
  default: {
    __meta__: {
      createdAt: new Date(),
      isFilterApplied: false,
    },
    listingType: ListingTypeTab.BY_AGENT,
    agentListed: true,
    newConstruction: null,
    preForeclosure: null,
    auction: null,
    foreclosed: null,
    propertyStatusActive: null,
    propertyStatusPending: null,
    propertyStatusOffMarket: null,
    propertyStatusCancelled: null,
    propertyStatusFailed: null,
    propertyStatusSold: null,
    nonOwnerOccupied: null,
    absenteeOwner: null,
    outOfStateAbsenteeOwner: null,
    inStateAbsenteeOwner: null,
    corporateOwner: null,
    investorBuyer: null,
    inherited: null,
    ownerDeath: null,
    spousalDeath: null,
    yearsOwnedMin: null,
    yearsOwnedMax: null,
    cashBuyer: null,
    equity: null,
    highEquity: null,
    negativeEquity: null,
    reo: null,
    privateLender: null,
    adjustableRate: null,
    freeClear: null,
    equityPercentMin: null,
    equityPercentMax: null,
    estimatedEquityMin: null,
    estimatedEquityMax: null,
    estimatedValueMin: null,
    estimatedValueMax: null,
    openMortgageBalanceMin: null,
    openMortgageBalanceMax: null,
    deedType: null,
    loanType: null,
    interestRateMin: null,
    interestRateMax: null,
    loadDateAfter: null,
    loadDateBefore: null,
    maturityDateAfter: null,
    maturityDateBefore: null,
  },
};

interface SearchResultContext {
  key: string;
  default: {
    results: IPropertyHouse[] | null | true; // True indicating that isLoading;
  };
}

const propertySearchResultContext: SearchResultContext = {
  key: "propertyFilterResults",
  default: {
    results: null,
  },
};

export interface BedsBathsContext {
  key: "bedsBathsFilter";
  default: {
    __meta__: IFilterMetaProps;
    bedrooms: number;
    bathrooms: number;
  };
}

const bedsBathsFilterContext: BedsBathsContext = {
  key: "bedsBathsFilter",
  default: {
    __meta__: {
      createdAt: new Date(),
      isFilterApplied: false,
    },
    bedrooms: 0,
    bathrooms: 0,
  },
};

export const forSaleFilter = atom(forSaleContext);
export const priceFilter = atom(priceFilterContext);
export const homeTypeFilter = atom(homeType);
export const moreFilter = atom(moreFilterContext);
export const propertySearch = atom(propertySearchResultContext);
export const bedsBathsFilter = atom(bedsBathsFilterContext);

import { ListingTypeTab } from "components/BodyContent/PropertySearch/Filters/MoreFilter/MoreFilter";
import { IPriceFilterCurrentTab, IPriceFilterDownPayment } from "components/BodyContent/PropertySearch/Filters/PriceFilter/PriceFilter";
import { IPropertyHouse } from "pages/api/core/reapi/propertySearch";
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
    forSaleByAgent: boolean | null;
    forSaleByOwner: boolean | null;
    offMarket: boolean | null;
    sold: boolean | null;
    propertyStatusPending: boolean | null;
    propertyStatusCancelled: boolean | null;
    // propertyStatusFailed: boolean | null;
  };
}

const forSaleContext: SaleContext = {
  key: "propertySearchContext",
  default: {
    __meta__: {
      createdAt: new Date(),
      isFilterApplied: false,
    },
    forSaleByAgent: null,
    forSaleByOwner: null,
    offMarket: null,
    sold: null,
    propertyStatusPending: null,
    propertyStatusCancelled: null,
    // propertyStatusFailed: null,
  },
};

export interface PriceContext {
  key: string;
  default: {
    __meta__: IFilterMetaProps;
    tab: IPriceFilterCurrentTab;
    minimum: number;
    maximum: number;
    downPayment: IPriceFilterDownPayment;
    priceSort: string;
    value_min: number;
    value_max: number;
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
    priceSort: "lowToHigh",
    value_min: 0,
    value_max: 0,
  },
};

export interface HomeFilterContext {
  key: string;
  default: {
    __meta__: IFilterMetaProps;
    houses: boolean;
    townHouse: boolean;
    multiFamily: boolean;
    duplex: boolean;
    triplex: boolean;
    quadplex: boolean;
    mfh_5plus: boolean;
    condosCoOps: boolean;
    lotsLands: boolean;
    apartment: boolean;
    mobile: boolean;
  };
}

const homeType: HomeFilterContext = {
  key: "homeTypeFilter",
  default: {
    __meta__: {
      createdAt: new Date(),
      isFilterApplied: false,
    },
    houses: false,
    townHouse: false,
    multiFamily: false,
    duplex: false,
    triplex: false,
    quadplex: false,
    mfh_5plus: false,
    condosCoOps: false,
    lotsLands: false,
    apartment: false,
    mobile: false,
  },
};

export interface MoreFilterContext {
  key: string;
  default: {
    __meta__: IFilterMetaProps;
    listingType: ListingTypeTab;
    agentListed: boolean | null;
    assumable: boolean | null;
    judgment: boolean | null;
    newConstruction: boolean | null;
    preForeclosure: boolean | null;
    auction: boolean | null;
    foreclosure: boolean | null;
    vacant: boolean | null;
    taxLien: boolean | null;
    nonOwnerOccupied: boolean | null;
    absenteeOwner: boolean | null;
    outOfStateAbsenteeOwner: boolean | null;
    inStateAbsenteeOwner: boolean | null;
    corporateOwned: boolean | null;
    investorBuyer: boolean | null;
    inherited: boolean | null;
    ownerDeath: boolean | null;
    propertiesOwnedMin: number | null;
    propertiesOwnedMax: number | null;
    portfolioValueMin: number | null;
    portfolioValueMax: number | null;
    portfolioMortgageBalanceMin: number | null;
    portfolioMortgageBalanceMax: number | null;
    portfolioEquityMin: number | null;
    portfolioEquityMax: number | null;
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
    taxDelinquentYearMin: number | null;
    taxDelinquentYearMax: number | null;
    unitsMin: number | null;
    unitsMax: number | null;
    yearBuiltMin: number | null;
    yearBuiltMax: number | null;
    lotSquareFeetMin: number | null;
    lotSquareFeetMax: number | null;
    lastSaleDateMin: Date | null;
    lastSaleDateMax: Date | null;
    assessedLandValueMin: number | null;
    assessedLandValueMax: number | null;
    assessedValueMin: number | null;
    assessedValueMax: number | null;
    assessedImprovementValueMin: number | null;
    assessedImprovementValueMax: number | null;
    lastSalePriceMin: number | null;
    lastSalePriceMax: number | null;
    medianIncomeMin: number | null;
    medianIncomeMax: number | null;
    mortgageBalanceMin: number | null;
    mortgageBalanceMax: number | null;
    storiesMin: number | null;
    storiesMax: number | null;
    livingSquareFeetMin: number | null;
    livingSquareFeetMax: number | null;
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
    foreclosure: null,
    vacant: null,
    taxLien: null,
    judgment: null,
    assumable: null,
    nonOwnerOccupied: null,
    absenteeOwner: null,
    outOfStateAbsenteeOwner: null,
    inStateAbsenteeOwner: null,
    corporateOwned: null,
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
    propertiesOwnedMin: null,
    propertiesOwnedMax: null,
    portfolioValueMin: null,
    portfolioValueMax: null,
    portfolioMortgageBalanceMin: null,
    portfolioMortgageBalanceMax: null,
    portfolioEquityMin: null,
    portfolioEquityMax: null,
    taxDelinquentYearMin: null,
    taxDelinquentYearMax: null,
    unitsMin: null,
    unitsMax: null,
    yearBuiltMin: null,
    yearBuiltMax: null,
    lotSquareFeetMin: null,
    lotSquareFeetMax: null,
    lastSaleDateMin: null,
    lastSaleDateMax: null,
    assessedLandValueMin: null,
    assessedLandValueMax: null,
    assessedValueMin: null,
    assessedValueMax: null,
    assessedImprovementValueMin: null,
    assessedImprovementValueMax: null,
    lastSalePriceMin: null,
    lastSalePriceMax: null,
    medianIncomeMin: null,
    medianIncomeMax: null,
    storiesMin: null,
    storiesMax: null,
    livingSquareFeetMin: null,
    livingSquareFeetMax: null,
    mortgageBalanceMin: null,
    mortgageBalanceMax: null,
  },
};

interface SearchResultContext {
  key: string;
  default: {
    isLoading: boolean;
    results: IPropertyHouse[] | null;
    isError: boolean;
    isClientSideRendered: boolean;
  };
}

const propertySearchResultContext: SearchResultContext = {
  key: "propertyFilterResults",
  default: {
    isLoading: false,
    results: null,
    isError: false,
    isClientSideRendered: false,
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

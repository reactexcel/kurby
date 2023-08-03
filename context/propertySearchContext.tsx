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
    minimum: number;
    maximum: number;
  };
}

const priceFilterContext: PriceContext = {
  key: "propertySearchContext",
  default: {
    minimum: 0,
    maximum: 0,
  },
};

export const forSaleFilter = atom(forSaleContext);
export const priceFilter = atom(priceFilterContext);

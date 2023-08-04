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

export const forSaleFilter = atom(forSaleContext);
export const priceFilter = atom(priceFilterContext);

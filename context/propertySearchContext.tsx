import { atom } from "recoil";

interface SaleContext {
  key: string;
  default: {
    for_sale: boolean;
  };
}

const forSaleContext: SaleContext = {
  key: "propertySearchContext",
  default: {
    for_sale: false,
  },
};

export const forSaleFilter = atom(forSaleContext);

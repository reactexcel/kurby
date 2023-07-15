import { IPropertyDetailHouse } from "pages/api/propertyDetail";
import { IPropertyHouse } from "pages/api/propertyV2";
import { atom } from "recoil";

interface IPropertyInfoState {
  key: string;
  default: IPropertyHouse | null;
}

interface IPropertyDetailState {
  key: string;
  default: IPropertyDetailHouse | null;
}

const propertyInfo: IPropertyInfoState = {
  key: "propertyInfoV2",
  default: null,
};

const propertyDetail: IPropertyDetailState = {
  key: "propertyDetail",
  default: null,
};

export const propertyInfoV2Context = atom(propertyInfo);
export const propertyDetailContext = atom(propertyDetail);

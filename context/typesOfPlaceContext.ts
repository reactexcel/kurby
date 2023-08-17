import { atom } from "recoil";

interface TypesOfPlaceContext {
  key: string;
  default: string[];
}

const typesOfPlacecState: TypesOfPlaceContext = {
  key: "typesOfPlace",
  default: ["School"],
};

export const typesOfPlaceContext = atom(typesOfPlacecState);

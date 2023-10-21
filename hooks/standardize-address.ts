import { states } from "mock/states";

export const standardizeAddress = (address: string) => {
  if (!address) {
    return "";
  }
  const addressArray = address.split(/,?\s+/);
  const updatedAddressArray = [...addressArray];

  for (const state of states) {
    if (addressArray.includes(state.state_code)) {
      if (addressArray.includes(state.iso2) || addressArray.includes(state.iso3)) {
        const index = addressArray.indexOf(state.state_code);
        updatedAddressArray[index] = state.name;
      }
    }

    if (addressArray.includes(state.iso2)) {
      const index = addressArray.indexOf(state.iso2);
      updatedAddressArray[index] = state.country_name;
    }

    if (addressArray.includes(state.iso3)) {
      const index = addressArray.indexOf(state.iso3);
      updatedAddressArray[index] = state.country_name;
    }
  }

  if (updatedAddressArray) {
    const formattedAddress = updatedAddressArray.join(" ");
    // const finalAddress = formattedAddress.replace(/ (?!and\b)/g, ", ");
    return formattedAddress;
  } else return "";
};

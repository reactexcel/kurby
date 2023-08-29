export const extractCityCountry = (address: string) => {
  const pattern = /([\w\s]+), [A-Z]{2}, ([A-Za-z\s]+)/;

  const match = address.match(pattern);

  if (match) {
    return {
      city: match[1].trim(),
      country: match[2].trim(),
    };
  }

  return {};
};

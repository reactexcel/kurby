import axios from "axios";

const getFloodData = async (zip: string) => {
  try {
    const baseUrl = "https://www.fema.gov/api/open";
    const version = "v1";
    const entity = "FimaNfipClaims";

    const url = `${baseUrl}/${version}/${entity}?$filter=reportedZipcode eq ${zip}`;

    const hazardData = await axios.get(url);
    return hazardData.data?.FimaNfipClaims || [];
  } catch (err) {
    console.error("Unable to get flood data", err);
  }
};

export default getFloodData;

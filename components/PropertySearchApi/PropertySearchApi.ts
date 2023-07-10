import axios from "axios";

class PropertySearchApiV2 {
  private BASE_URL = "https://api.realestateapi.com/v2/PropertySearch";

  public constructor(private readonly accessKey: string) {
    this.accessKey = accessKey;
  }

  private headers() {
    return {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-api-key": this.accessKey,
      },
    };
  }

  async getPropertyDataByAddress(address: string) {
    if (",#-/ !@$%^*(){}|[]\\".indexOf(address) >= 0) {
      throw new Error("Please enter an valid US State address");
    }
    return await axios.post(this.BASE_URL, {
      ...this.headers(),
      data: {
        address,
      },
    });
  }
}

export const createPropertySearchApi = () => {
  return new PropertySearchApiV2("KURBYAI-7afa-7c90-87e6-fc599dbb61ce");
};

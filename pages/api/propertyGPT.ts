import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import checkProPlan from "./checkProPlan";
import { IPropertySearchResponse } from "./propertyV2";

class PropGptAPI {
  private BASE_URL = "https://www.propgpt.com/query";

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

  async getPropertyDataByQuery(query: string) {
    let config = {
      method: "get",
      url: `${this.BASE_URL}/?query=${encodeURIComponent(query)}`,
      ...this.headers(),
    };

    return (await axios.request<IPropertySearchResponse>(config)).data;
  }
}

export const createPropGptAPI = () => {
  const env = process.env.NEXT_PROPERTY_SEARCH_API_KEY || "KURBYAI-7afa-7c90-87e6-fc599dbb61ce";
  if (!env) {
    throw new Error("No PROPGPT_API_KEY found in .env");
  }
  return new PropGptAPI(env);
};

export default async function handler(request: NextApiRequest, res: NextApiResponse) {
  const isPro = await checkProPlan(request.body.userToken);

  if (!isPro) {
    return res.status(401).send(
      JSON.stringify({
        error: "You are not allowed to create this request.",
      }),
    );
  }

  const api = createPropGptAPI();
  const response = await api.getPropertyDataByQuery(request.body.query);

  return res.status(200).send(JSON.stringify(response));
}

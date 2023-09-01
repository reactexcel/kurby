import OutsetaApiClient from "outseta-api-client";

interface IOutsetaClientProvider {
  subdomain: string;
  accessToken?: string;
  apiKey?: string;
  secretKey?: string;
}

export class OutsetaClientProvider {
  protected client: OutsetaApiClient;
  constructor(props: IOutsetaClientProvider) {
    this.client = this.initializeClient(props);
  }

  initializeClient(credentials: IOutsetaClientProvider) {
    return new OutsetaApiClient(credentials);
  }
}

// export const client = new OutsetaClientProvider({
//   subdomain: "kurby",
//   accessToken: userToken,
// });

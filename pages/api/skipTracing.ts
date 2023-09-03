import { NextApiRequest, NextApiResponse } from "next";
import { rateLimiter } from "./rateLimiter";
import checkPlan from "./checkPlan";
import { createSkipTraceApiInstance } from "./core/reapi/skipTrace";
import OutsetaApiClient from "outseta-api-client";

export interface IUserTokenResponse {
  readonly nbf: number;
  readonly exp: number;
  readonly iss: string;
  readonly client_id: string;
  readonly scope: Array<string>;
  readonly sub: string;
  readonly auth_time: number;
  readonly idp: string;
  readonly email: string;
  readonly family_name: string;
  readonly given_name: string;
  readonly name: string;
  readonly nameid: string;
  readonly "outseta:accountUid": string;
  readonly "outseta:isPrimary": string;
  readonly "outseta:subscriptionUid": string;
  readonly "outseta:planUid": string;
  readonly "outseta:addOnUids": Array<any>;
  readonly amr: Array<string>;
  readonly aud: Array<string>;
  readonly iat: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Add rate limiting middleware to block excesive traffic.
  if (!rateLimiter(req, res)) return;

  const userToken = req.body.userToken;

  const { isFree } = await checkPlan(userToken);
  if (isFree) {
    res.status(401).send("Sorry you cannot make this transaction");
  }

  const firstName: string = req.body.firstName;
  const lastName: string = req.body.lastName;
  const address: string = req.body.address;
  const city: string = req.body.city;
  const state: string = req.body.state;
  const zip: string = req.body.zip;

  const isValidField = (input: string) => typeof input !== "string" || input?.length > 0;

  // Validate input parameters:
  [firstName, lastName, address, city, state, zip].map((field) => {
    const errorMessage = JSON.stringify({
      message: "Please input correct parameters",
    });
    if (!isValidField(field)) {
      res.status(401).send(errorMessage);
    }
  });

  // Create request to the SkipTrace Api:
  const skipTraceApi = createSkipTraceApiInstance();
  const response = await skipTraceApi.getOwnerContacts({ first_name: firstName, last_name: lastName, address, city, state, zip });
  if (!response.output) {
    const errorMessage = JSON.stringify({
      message: "Sorry something went wrong. You won't be charged for this request.",
    });
    res.status(401).send(errorMessage);
    return;
  }

  // Bill user 0.12 cents after successful api call:
  const { subscriptionUid } = await checkPlan(userToken);

  const credentials = {
    subdomain: "kurby",
    apiKey: process.env.NEXT_OUTSETA_PUBLIC_API_KEY,
    secretKey: process.env.NEXT_OUTSETA_PRIVATE_API_KEY,
  };

  const client = new OutsetaApiClient(credentials);

  await client.billing.invoices.add({
    Subscription: {
      Uid: subscriptionUid,
    },
    InvoiceDate: new Date(),
    InvoiceLineItems: [
      {
        Description: `Skip trace contact information: ${firstName} ${lastName}`,
        Amount: 0.12,
      },
    ],
  } as any);

  res.status(200).send(response);
}

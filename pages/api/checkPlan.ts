import OutsetaApiClient from "outseta-api-client";
import jwt_decode from "jwt-decode";
import { IAppPlans } from "context/plansContext";

interface IUserTokenResponse {
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

export default async function checkPlan(userToken: string) {
  try {
    if (!userToken) {
      throw new Error("No user token provided.");
    }
    const decoded: IUserTokenResponse = jwt_decode(userToken);

    // Validate userToken with REST
    const client = new OutsetaApiClient({
      subdomain: "kurby",
      accessToken: userToken,
    });
    if ((await client.user.profile.get()).Uid !== decoded.nameid) {
      throw new Error("This user is not valid.");
    }
    const planId = decoded["outseta:planUid"];

    return {
      isFree: planId === IAppPlans.FREE_PLAN_UID,
      isStarter: planId === IAppPlans.STARTER_PLAN_UID,
      isGrowth: planId === IAppPlans.GROWTH_PLAN_UID,
      isPro: planId === IAppPlans.PROFESSIONAL_PLAN_UID,
    };
  } catch (error) {
    // @ts-ignore
    throw new Error(error?.message || "Unexpected error.");
  }
}

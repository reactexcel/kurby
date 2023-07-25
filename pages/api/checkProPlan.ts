import { NextApiRequest, NextApiResponse } from "next";
import OutsetaApiClient from "outseta-api-client";

export default async function checkProPlan(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userToken = JSON.parse(req.body).userToken;

    if (!userToken) {
      return res.status(400).json({ error: "No user token provided." });
    }

    new OutsetaApiClient({
      subdomain: "kurby",
      accessToken: userToken,
    });

    // const hasProPlan = profile.Account?.Subscriptions?.some((subscription) => subscription.Plan.Uid === IAppPlans.PROFESSIONAL_PLAN_UID);

    // if (!hasProPlan) {
    //   return res.status(403).json({ error: "User does not have a Pro plan." });
    // }

    return res.status(200).json({ message: "User has a Pro plan." });
  } catch (error) {
    // @ts-ignore
    return res.status(500).json({ error: error?.message || "Unexpected error." });
  }
}

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  console.log("req", req);
  console.log("res", res);

  return;
}

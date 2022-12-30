import type { NextApiRequest, NextApiResponse } from "next";



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { location, radius, type } = req.body;

    const r = await fetch(createAPIUrl(location, radius), {
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
          },
      });

    const response = await r.json();
    //TODO map responses to error codes?
    
    res.status(200).json(response)
    
}

const createAPIUrl = (location: any, address: string) => {
    const API_KEY = process.env.NEXT_WALKSCORE_API_KEY;
    const a = new URLSearchParams(address).toString()

    return `https://api.walkscore.com/score?format=json&address=${a}&lat=${location.lat}&lon=${location.lng}&transit=1&bike=1&wsapikey=${API_KEY}`;

}

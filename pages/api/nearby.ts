import type { NextApiRequest, NextApiResponse } from "next";



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { location, radius, type } = req.body;

    const r = await fetch(createAPIUrl(location, radius, type), {
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
          },
      });

    const response = await r.json();
    //TODO map responses to error codes?
    
    res.status(200).json(response)
    
}

const createAPIUrl = (location: any, radius: any, type: any) => {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const l = `${location.lat},${location.lng}`
    return `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${l}&radius=${radius}&type=${type}&key=${API_KEY}`;

}

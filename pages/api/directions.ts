import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { destination, origin, travelMode } = req.body;

    const createAPIUrl = (origin: any, destination: any, travelMode: string) => {
        const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        const o = `${origin.lat},${origin.lng}`
        const d = `${destination.lat},${destination.lng}`
        return `https://maps.googleapis.com/maps/api/directions/json?origin=${o}&destination=${d}&mode=${travelMode.toLocaleLowerCase()}&key=${API_KEY}`;
    }

    const r = await fetch(createAPIUrl(origin, destination, travelMode), {
        method:"GET",
        headers: {
          'Content-Type': 'application/json',
        },
      });
    res.status(200).json(await r.json())
}


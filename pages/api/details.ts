import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { place_id, fields } = req.body;
    const r = await fetch(createAPIUrl(place_id, fields), {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const response = await r.json();
    if(response.status === 'INVALID_REQUEST') {
        res.status(400).json(response);
        return;
    }
    res.status(200).json(response)

}

const createAPIUrl = (place_id: string, fields: string[]) => {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    return `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=${fields.toString()}&key=${API_KEY}`;

}

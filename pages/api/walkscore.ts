import type { NextApiRequest, NextApiResponse } from "next";



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { location, address } = req.body;

    const r = await fetch(createAPIUrl(location, address), {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const parsedResponse = await r.json();
    if (r.status === 200 && parsedResponse.status === 1) {
        parsedResponse.isUSOrCanada = await isInsideUSOrCanada(location);
        res.status(200).json(parsedResponse);
        return;
    }
    if (errorMapping[parsedResponse.status]) {
        res.status(400).json({
            error: {
                message: errorMapping[parsedResponse.status],
                code: parsedResponse.status
            }
        });
        return
    }
    res.status(500).json(parsedResponse);
}

const createAPIUrl = (location: any, address: string) => {
    const API_KEY = process.env.NEXT_WALKSCORE_API_KEY;
    const a = new URLSearchParams(address).toString()

    return `https://api.walkscore.com/score?format=json&address=${a}&lat=${location.lat}&lon=${location.lng}&transit=1&bike=1&wsapikey=${API_KEY}`;
}

const errorMapping: Record<number, string> = {
    2: 'Score is being calculated and is not currently available',
    30: 'Invalid latitude/longitude',
    31: 'Walk Score API internal error',
    40: 'Your WSAPIKEY is invalid',
    41: 'Your daily API quota has been exceeded',
    42: 'Your IP address has been blocked'
}

const isInsideUSOrCanada = async (location: {lat: string, lng: string}) => {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${API_KEY}`;
    const res = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return (await res.json())?.results[0].address_components.some((component: any) => 
        component.types.includes('country') && (component.short_name === 'US' || component.short_name === 'CA')    
    )
}
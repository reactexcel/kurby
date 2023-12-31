import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { location, radius, types } = req.body;

  let placesWithType = await Promise.all(getPlacesByTypes(types, radius, location));

  const places: any[] = [];
  placesWithType.map((p) => {
    const resultWithType = p.results.map((place: any) => {
      return { ...place, _type: p._type };
    });
    places.push(...resultWithType);
  });
  const preparedPlaces = getValuablePlaces(places, types);
  res.status(200).json(preparedPlaces);
}

function getPlacesByTypes(types: string[], radius: any, location: any): Promise<any>[] {
  return types.map(async (t: string) => {
    const r = await fetch(createAPIUrl(location, radius, t), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return {
      ...(await r.json()),
      _type: t,
    };
  });
}
/**
 * This is not being intentionally used for now
 */
function getValuablePlaces(places: any, types: string[]) {
  let result: any[] = [];
  if (types.length === 0) {
    return [];
  }
  if (types.length === 1) {
    return places;
  }
  result = places.filter((p: any) => isOneOfItsType(p, places) || (p.user_ratings_total > 0 && p.rating >= 3));

  return result;
}

function isOneOfItsType(place: any, places: any[]) {
  return places.filter((p) => p.type === place.type).length === 1;
}

const createAPIUrl = (location: any, radius: any, type: any) => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const l = `${location.lat},${location.lng}`;
  return `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${l}&radius=${radius}&type=${type}&key=${API_KEY}`;
};

/**
 * Rules:
 * 1. If only 1 type is required return all places
 * 2. Remove places that have a Google review rating below 3 unless it's the only place of that type
 * 3. Remove places that dont have reviews unless it's the only place of that type
 * 4. Always display place which is only of its type, dont have rating over 3, dont have reviews
 */

import GLOBAL_SETTINGS from "../../globals/GLOBAL_SETTINGS";
const { MILES_TO_METERS, MAP_ZOOM_MILES, PLACE_TYPES } = GLOBAL_SETTINGS
//TODO make this file typesafe

interface searchNearbyParams {
  typeOfPlace: any[];
  request: {
    location: {
      lat: number;
      lng: number;
    };
    radius: number;
  };
}

export default async ({ request, typeOfPlace }: searchNearbyParams) => {
  const { location } = request;
  
  if(!typeOfPlace.length) return[];

  const getNearbyPlace = async (nearbySearchRequest: any) => {
    const response = await (await fetch(`/api/nearby/`, {
      method: "POST",
      body: JSON.stringify({ ...nearbySearchRequest }),
      headers: {
        'Content-Type': 'application/json',
      },
    }));

    if (response.status === 200) {
      const places = (await response.json()).results;
      const withType = places.map((r: any) => {
        //* Add the request type that was used so we can see if they are correct
        return {
          ...r,
          _type: nearbySearchRequest.type,
        };
      });
      return withType
    } else {
      console.error("error getting nearby places", response.status);
      return ([]);
    }
  }

  let allResults: any = [];
  for (const searchType of typeOfPlace) {
    //* setup place request payload
    const request: google.maps.places.PlaceSearchRequest = {
      location,
      radius: MILES_TO_METERS(MAP_ZOOM_MILES),
      type: searchType.toLowerCase().replace(" ", "_"),
    };
    const placeResults: any = await getNearbyPlace(request);

    allResults.push(...placeResults);
  }

  return allResults;

};
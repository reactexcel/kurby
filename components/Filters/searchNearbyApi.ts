import GLOBAL_SETTINGS from "../../globals/GLOBAL_SETTINGS";
const { MILES_TO_METERS, MAP_ZOOM_MILES } = GLOBAL_SETTINGS;
//TODO make this file typesafe

interface searchNearbyParams {
  typesOfPlace: any[];
  request: {
    location: {
      lat: number;
      lng: number;
    };
    radius: number;
  };
}

export const searchNearbyApi = async ({ request, typesOfPlace }: searchNearbyParams) => {
  const { location } = request;

  if (!typesOfPlace.length) return [];
  const getNearbyPlace = async (req: any) => {
    const response = await fetch(`/api/nearby`, {
      method: "POST",
      body: JSON.stringify({ ...req }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const places = await response.json();
      const withType = places.map((r: any) => {
        //* Add the request type that was used so we can see if they are correct
        return {
          ...r,
        };
      });
      return withType;
    } else {
      console.error("error getting nearby places", response.status);
      return [];
    }
  };
  const req = {
    location,
    radius: MILES_TO_METERS(MAP_ZOOM_MILES),
    types: typesOfPlace.map((t) => t.toLowerCase().replace(" ", "_")),
  };
  const result = await getNearbyPlace(req);

  return result;
};

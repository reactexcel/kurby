import GLOBAL_SETTINGS from "../../../globals/GLOBAL_SETTINGS";

const { METERS_TO_MILES, SECONDS_TO_MINUTES } = GLOBAL_SETTINGS;

export default async (request: {origin: any, destination: any}) => {
    const { origin, destination } = request;
    
    const getLegs = (r: any) => {
      // if there was an error in the api then make this var false so components show different message 
      console.log('r', r)
      if(!r || r.status != "OK") return false;

      return {
        distance: METERS_TO_MILES(r.routes[0]?.legs[0]?.distance?.value),
        time: SECONDS_TO_MINUTES(r.routes[0]?.legs[0]?.duration?.value)
      }
    }

    async function getDirectionsByType(origin: any, destination: any, travelMode: google.maps.TravelMode): Promise<Response> {
        const request = fetch(`/api/directions/`, {
            method:"POST",
            body: JSON.stringify({origin, destination, travelMode}),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          return (await request).json();
    }

    const directions = {
      walking: getLegs(await getDirectionsByType(origin, destination, google.maps.TravelMode.WALKING)) ,
      biclycling: getLegs(await getDirectionsByType(origin, destination, google.maps.TravelMode.BICYCLING)),
      driving: getLegs(await getDirectionsByType(origin, destination, google.maps.TravelMode.DRIVING)),
  }

   console.log('directions', directions)

    return directions
}


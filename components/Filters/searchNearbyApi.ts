import GLOBAL_SETTINGS from "../../globals/GLOBAL_SETTINGS";
const {MILES_TO_METERS, MAP_ZOOM_MILES, PLACE_TYPES}= GLOBAL_SETTINGS
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

export default async ({request, typeOfPlace}: searchNearbyParams) => {
    const { location } = request;

    // create a new instance of the PlacesService class
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    //* use the places api to request the data. This is a promise because it doesn't return a promise
    const getNearbyPlace = (nearbySearchRequest: any) =>
      new Promise((resolve, reject) => {
        
        //* use the nearbySearch service - returns a callback
        service.nearbySearch(
          nearbySearchRequest,
          (results: any, status, pagination) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              const withType = results.map((r: any) => {
                //* Add the request type that was used so we can see if they are correct
                const reqType = nearbySearchRequest.type;
                return {
                  ...r,
                  _type: reqType,
                };
              });
              resolve(withType);
            } else {
              console.error("error getting nearby places", status);
              reject(status);
            }
          }
        );
      });

    let typesToSearch = typeOfPlace.length ? typeOfPlace : PLACE_TYPES;

    let allResults: any = [];
    for (const searchType of typesToSearch) {
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
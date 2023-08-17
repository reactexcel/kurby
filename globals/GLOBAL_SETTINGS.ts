export type PlacesType =
  | "school"
  | "primary_school"
  | "secondary_school"
  | "university"
  | "park"
  | "hospital"
  | "shopping_mall"
  | "tourist_attraction"
  | "restaurant"
  | "supermarket";

//TODO split this file into multiples each for it's own purpose
const GLOBAL_SETTINGS = {
  MAP_ZOOM_MILES: 2,
  MILES_TO_METERS: (miles: number) => miles * 1609.34,
  SECONDS_TO_MINUTES(seconds: number) {
    const toMin = seconds / 60;

    if (toMin <= 60) return `${Math.floor(toMin)} min`;

    const hours = toMin / 60;
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    return `${rhours} h ${rminutes} min`;
  },
  METERS_TO_MILES: (distance: number) => {
    return isNaN(distance) ? "/" : (distance * 0.000621371).toFixed(1);
  },
  MAP_ZOOM_DEFAULT: 14,
  PLACE_TYPES: ["School", "Primary School", "Secondary School", "University", "Park", "Hospital", "Shopping mall", "Tourist Attraction", "Restaurant", "Supermarket"],
};

export default GLOBAL_SETTINGS;

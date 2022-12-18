//TODO split this file into multiples each for it's own purpose
export default {
    MAP_ZOOM_MILES : 2,
    MILES_TO_METERS: (miles: number)=> miles * 1609.34,
    SECONDS_TO_MINUTES: (time: number) => {
      return isNaN(time) ? '/' : Math.floor(time / 60);
    },
    METERS_TO_MILES: (distance: number) => {
      return isNaN(distance) ? '/' : (distance * 0.000621371).toFixed(1)
    },
    MAP_ZOOM_DEFAULT: 14,
    PLACE_TYPES: [
        "Primary School",
        "Secondary School",
        "University",
        "Park",
        "Hospital",
        "Department Store",
        "Tourist Attraction",
        "Restaurants",
      ]
}
import census from "citysdk";

interface ICartographicData {
  lat: number;
  lng: number;
}

//* Gets the raw census data
export const getCartographicData = async ({ lat, lng }: ICartographicData) => {
  return new Promise((resolve) => {
    census(
      {
        vintage: "2021",
        geoHierarchy: {
          state: {
            lat,
            lng,
          },
          county: null, // <- leapfrog fix
          tract: "*",
        },
        sourcePath: ["acs", "acs5"],
        values: ["B19013_001E"], // MEDIAN_HOUSEHOLD_INCOME
        geoResolution: "500k",
        statsKey: "978f544e844f821ccfe1dd7620e9180801de2107",
      },
      async (err: any, res: any) => {
        resolve(res);
      },
    );
  });
};

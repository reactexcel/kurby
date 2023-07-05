import census from "citysdk";

interface ICensusCartographicData {}

//* Gets the raw census data
export const getCartographicData = async ({}: ICensusCartographicData) => {
  return new Promise((resolve) => {
    census(
      {
        vintage: "2021",
        geoHierarchy: {
          state: "*",
          county: "*",
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

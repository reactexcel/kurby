import census from "citysdk";

interface ICensusCartographicData {}

//* Gets the raw census data
export const getCartographicData = async ({}: ICensusCartographicData) => {
  return new Promise((resolve) => {
    census(
      {
        vintage: "2021",
        geoHierarchy: {
          state: "12",
          county: "*",
        },
        sourcePath: ["acs", "acs5"],
        values: ["B19013_001E"], // MEDIAN_HOUSEHOLD_INCOME
        geoResolution: "20m",
        // statsKey: "<your key here>",
      },
      async (err: any, res: any) => {
        resolve(res);
      },
    );
  });
};

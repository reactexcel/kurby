import census from "citysdk";

interface ICensusCartographicData {}

//* Gets the raw census data
export const getCartographicData = async ({}: ICensusCartographicData) => {
  return new Promise((resolve) => {
    census(
      {
        vintage: 2021,
        geoHierarchy: {
          county: "*",
        },
        // sourcePath: ["acs", "acs5"],
        // values: ["B19083_001E"], // GINI index
        geoResolution: "20m", // required
      },
      async (err: any, res: any) => {
        resolve(JSON.parse(res));
      },
    );
  });
};

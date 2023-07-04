import census from "citysdk";

interface ICensusCartographicData {}

//* Gets the raw census data
export const getCartographicData = async ({}: ICensusCartographicData) => {
  return new Promise((resolve) => {
    census(
      {
        vintage: "2021",
        geoHierarchy: {
          county: "*",
        },
        sourcePath: ["acs", "acs5"],
        values: ["B19083_001E"], // GINI index
        statsKey: "978f544e844f821ccfe1dd7620e9180801de2107",
        geoResolution: "500k",
      },
      async (err: any, res: any) => {
        resolve(res);
      },
    );
  });
};

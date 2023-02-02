import census from "citysdk";
import { Box, Button, TextField } from "@mui/material";
import { createRef, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { filterState } from "context/filterContext";

export default function Census() {
  const [censusKey, setCensusKey] = useState<string | null>(null);
  const [filterVal] = useRecoilState(filterState);
  const handleClick = () => {
    console.log("click", censusKey);
    if (!filterVal.latlong || !censusKey) return;
    getAcs5data(filterVal.latlong, censusKey);
  };

  return (
    <>
      <Box>
        <h3>Census Checker</h3>
        <TextField onChange={(e) => setCensusKey(e.target.value)} id="outlined-basic" label="Census Key" variant="outlined" />
        <Button onClick={handleClick} variant="contained">
          Search
        </Button>
      </Box>
    </>
  );
}

interface LatLong {
  lat: number;
  lng: number;
}
//* GET Age/Sex/income DATA
function getAcs5data(latlng: LatLong, censusKey: string) {
  //https://api.census.gov/data/2021/acs/acs5/variables.html

  census(
    {
      vintage: 2021, // required
      geoHierarchy: {
        // required
        tract: {
          ...latlng,
        },
      },
      sourcePath: ["acs", "acs5"],
      values: [censusKey],
      //geoResolution: '500k', // required
      //values: [], // required
    },
    (err: any, res: any[]) => {
      let response = res[0];

      console.log("response", response);
    },
  );
}

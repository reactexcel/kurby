import census from "citysdk";
import { Box, Button, TextField } from "@mui/material";
import { createRef, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { filterState } from "context/filterContext";



export default function Census() {
  const [censusKey, setCensusKey] = useState<string | null>(null);
  const [dataInfo, setDatainfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [filterVal] = useRecoilState(filterState);

  const handleClick = async () => {
    console.log("filterVal", filterVal);
    setLoading(true);
    if (!filterVal.mapCenter || !censusKey) return;
    const response = await getAcs5data(filterVal.mapCenter, censusKey);
    console.log("response", response);
    setDatainfo(response);
    setLoading(false);
  };

  return (
    <>
      <Box>
        <h3>Census Checker</h3>
        <TextField onChange={(e) => setCensusKey(e.target.value.trim())} id="outlined-basic" label="Census Key" variant="outlined" />
        <Button onClick={handleClick} variant="contained">
          Search
        </Button>
      </Box>
      {loading && <p>Loading...</p>}

      {censusKey && !loading && (
        <div>
          <ul>
            <li>Concept: {dataInfo?.varData?.concept || ""}</li>
            <li>label: {dataInfo?.varData?.label || ""}</li>
            <li>Tract: {dataInfo?.censusRespons?.tract || ""}</li>
            <li>Value: {dataInfo?.censusRespons?.[censusKey] || ""}</li>
            <li>
              Developer String:
              {censusKey}:&#123; label: "{dataInfo?.devString || ""}" &#125;,
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

interface LatLong {
  lat: number;
  lng: number;
}
//* GET Age/Sex/income DATA
async function getAcs5data(latlng: LatLong, censusKey: string) {
  //https://api.census.gov/data/2021/acs/acs5/variables.html

  return new Promise((resolve, rej) => {
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
      async (err: any, res: any[]) => {
        console.log({ res, censusKey });
        let keyData = res[0];

        const dataLookup = async () => {
          const url = "https://api.census.gov/data/2021/acs/acs5/variables.json";
          const req = await fetch(url);
          const res = await req.json();

          let newString = `${res.variables[censusKey].concept.toUpperCase()}_${res.variables[censusKey].label.toUpperCase()}`;
          newString = newString.replaceAll(" ", "_");
          newString = newString.replace(/[^a-zA-Z0-9 ]/g, "_");

          console.log(newString);
          resolve({
            varData: res.variables[censusKey],
            censusRespons: keyData,
            devString: newString,
          });
        };
        dataLookup();
      },
    );
  });
}

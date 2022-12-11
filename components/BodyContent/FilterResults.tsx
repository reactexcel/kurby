import { Box, Typography } from "@mui/material";
import styles from "./BodyContent.module.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import { useRecoilState } from "recoil";
import filterContext from "../../context/filterContext";
import StreetView from "./StreetView";
import Nearby from "./Nearby/Nearby";

/**
 * FilterResults
 * @description: Displays right side of the home page. Will show home information and nearby places
*/

export default function FilterResults() {
  const [isHomeTab, setIsHomeTab] = useState(true);

  //TODO should this be sent in via PROPs????
  const [filterVal] = useRecoilState(filterContext);

  const handleTabChange = () => setIsHomeTab(!isHomeTab);

  //TODO add to style sheet
  const resultsContentStyle = {
    padding: "20px",
    border: "1px solid rgba(38,75,92,.2)",
    boxShadow: "0 4px 4px #00000040",
    borderRadius: "14px",
    marginTop: "25px",
    display:"flex"
  };
  return (
    <Box style={{ width: "100%", marginLeft: "12.5px" }}>
      <ToggleButtonGroup
        color="primary"
        value={isHomeTab ? "home" : "nearby"}
        exclusive
        onChange={handleTabChange}
        aria-label="Platform"
      >
        <ToggleButton style={{ width: "220px" }} value="home">
          Home
        </ToggleButton>
        <ToggleButton style={{ width: "220px" }} value="nearby">
          Nearby Places
        </ToggleButton>
      </ToggleButtonGroup>

     
      {filterVal.address && (
        <Box >
          {isHomeTab ? (
            <>
            <Box style={resultsContentStyle}>
               <StreetView />
               <Typography variant="h5" component="h5">{filterVal.address}</Typography>
            </Box>
            <Box style={{marginTop:"24px"}}>
              <Box>Green Flag</Box>
              <Box className={styles.box}></Box>
              <Box>Red Flag</Box>
              <Box className={styles.box}></Box>
            </Box>
            </>
          ) : (
            <Nearby />
          )}
        </Box>
      )}
    </Box>
  );
}

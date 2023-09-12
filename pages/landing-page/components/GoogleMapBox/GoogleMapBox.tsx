import { Avatar, AvatarGroup, Box, Skeleton, ToggleButton, ToggleButtonGroup } from "@mui/material";
import styles from "./GoogleMapBox.module.scss";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import { Tab } from "context/activeTab";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ThreeDRotation from "@mui/icons-material/ThreeDRotation";

export default function GoogleMapBox() {
  const [activeTab, setActiveTab] = useState<Tab>("location");

  const handleChangeTab = (tab: Tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  return (
    <Box className={styles.main}>
      {/* <SearchBar /> */}
      {/* <Filters /> */}
      <Box className={styles.googlemap_box}>
        <Box className={styles.map}></Box>
        <Box className={styles.tabs_results}>
          <Box className={styles.tabs}>
            <ToggleButtonGroup className={styles.tabs} color="success" value={activeTab} onChange={(e, tab) => handleChangeTab(tab)} exclusive aria-label="Platform">
              <ToggleButton className={styles.button} value="location">
                Location
              </ToggleButton>

              <ToggleButton className={styles.button} value="property">
                Properties
              </ToggleButton>

              <ToggleButton className={styles.button} value="neighborhood">
                Neighborhood
              </ToggleButton>

              <ToggleButton className={styles.button} value="nearby">
                Nearby
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <div className={styles.results}>
            New York, often called New York City[a] or NYC, is the most populous city in the United States. With a 2020 population of 8,804,190 distributed over 300.46 square
            miles (778.2 km2), New York City is the most densely populated major city in the United States. The city is more than twice as populous as Los Angeles, the
            nation's second-largest city. New York City is situated at the southern tip of New York State. Situated on one of the world's largest natural harbors, New York
            City comprises five boroughs, each of which is coextensive with a respective county.
          </div>
        </Box>
      </Box>
    </Box>
  );
}

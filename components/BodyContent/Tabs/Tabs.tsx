import { Box } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React from "react";
import { useRecoilState } from "recoil";
import { filterState } from "../../../context/filterContext";
import Nearby from "../Nearby/Nearby";
import { NextSeo } from "next-seo";
import { activeTabState, Tab } from "context/activeTab";
import Neighborhood from "../Neighborhood/Neighborhood";
import Property from "../Property/Property";
import { Location } from "../Location/Location";
import styles from "./Tabs.module.scss";
import { searchContext } from "context/searchCounter";
import { useOpenAi } from "hooks/use-open-ai";
import CityStatePropertiesFilters from "../PropertySearch/PropertySearch";

export function Tabs() {
  const [activeTab, setActiveTab] = useRecoilState(activeTabState);
  const { explainedLikeAlocal, greenFlags, redFlags } = useOpenAi();
  const [{ searchLimit }] = useRecoilState(searchContext);
  const [filterVal] = useRecoilState(filterState);

  const handleTabChange = (event: React.MouseEvent<HTMLElement>, newTab: Tab | null) => {
    if (newTab) {
      setActiveTab(newTab);
    }
  };

  console.log("TABS: RENDER");

  const PropertySceneManager = () => {
    if (filterVal.placeCategory === "address") {
      return <Property />;
    }
    return <CityStatePropertiesFilters />;
  };

  return (
    <>
      <NextSeo description={explainedLikeAlocal?.split(".")[0] || "Kurby uses location data to estimate property value like never before."} />
      <Box className={styles.main}>
        <ToggleButtonGroup className={styles.toggleButtonGroupLayout} color="success" value={activeTab} exclusive onChange={handleTabChange} aria-label="Platform">
          <ToggleButton className={styles.button} value="location">
            Location
          </ToggleButton>

          <ToggleButton className={styles.button} value="property">
            {filterVal.placeCategory === "address" ? "Property data" : "Properties"}
          </ToggleButton>

          <ToggleButton className={styles.button} value="neighborhood">
            Neighborhood
          </ToggleButton>
        </ToggleButtonGroup>

        {!searchLimit && (
          <Box className={styles.tabsWrapper}>
            {activeTab === "location" && <Location explainedLikeAlocal={explainedLikeAlocal} greenFlags={greenFlags} redFlags={redFlags} />}
            {activeTab == "nearby" && <Nearby />}
            {activeTab == "property" && <PropertySceneManager />}

            {activeTab == "neighborhood" && <Neighborhood filterVal={filterVal} />}
          </Box>
        )}
      </Box>
    </>
  );
}

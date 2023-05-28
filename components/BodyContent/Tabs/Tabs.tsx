import { Box } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React, { useEffect, useState, useMemo } from "react";
import { useRecoilState } from "recoil";
import { filterState } from "../../../context/filterContext";
import Nearby from "../Nearby/Nearby";
import { NextSeo } from "next-seo";
import { activeTabState, Tab } from "context/activeTab";
import Neighborhood from "../Neighborhood/Neighborhood";
import Property from "../Property/Property";
import { Location } from "../Location/Location";
import { loadingContext } from "context/loadingContext";
import styles from "./Tabs.module.scss";
import { searchContext } from "context/searchCounter";

export function Tabs() {
  const [activeTab, setActiveTab] = useRecoilState(activeTabState);
  const [explainedLikeAlocal, setExplainedLikeAlocal] = useState("");
  const [greenFlags, setGreenFlags] = useState<any[]>([]);
  const [redFlags, setRedFlags] = useState<any[]>([]);
  const [loading, setLoading] = useRecoilState(loadingContext);
  const [{ count }] = useRecoilState(searchContext);
  const [filterVal] = useRecoilState(filterState);

  const [showHome, setShowHome] = useState<boolean>(true);

  const handleTabChange = (event: React.MouseEvent<HTMLElement>, newTab: Tab | null) => {
    if (newTab) {
      setActiveTab(newTab);
    }
  };

  const searchLimit = useMemo(() => +count > 5, [count]);

  useEffect(() => {
    const getPropertyRecord = async (formatted_address: string) => {
      const request = await fetch(`/api/prorecord/`, {
        method: "POST",
        body: JSON.stringify({ formatted_address }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();
      if (response.records && response.records.length > 0 && response.records[0].propertyType === "Single Family") {
        setShowHome(true);
      } else {
        setShowHome(false);
      }
    };

    const getOpenAiData = async () => {
      if (!filterVal.address) return;

      if (!loading.openai) {
        setLoading((prevState) => ({ ...prevState, openai: true }));
      }

      setActiveTab("location");
      //* the entire selected place is sent in so we can validate the address
      try {
        const request = await fetch(`/api/openai`, {
          method: "POST",
          body: JSON.stringify(filterVal.selectedPlace),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const response = await request.json();

        // await getPropertyRecord(filterVal.selectedPlace.formatted_address);

        setExplainedLikeAlocal(response.explained_like_a_local);
        setGreenFlags(response.greenFlags);
        setRedFlags(response.redFlags);
      } catch (error) {
        console.log({ error });
      }
      setLoading((prevState) => ({ ...prevState, openai: false }));
    };
    getOpenAiData();
  }, [filterVal.address, filterVal.selectedPlace]);

  return (
    <>
      <NextSeo description={explainedLikeAlocal.split(".")[0] || "Kurby uses location data to estimate property value like never before."} />
      <Box className={styles.main}>
        <ToggleButtonGroup color="success" value={activeTab} exclusive onChange={handleTabChange} aria-label="Platform">
          <ToggleButton className={styles.button} value="location">
            Location
          </ToggleButton>

          {showHome && (
            <ToggleButton className={styles.button} value="property">
              Home
            </ToggleButton>
          )}

          <ToggleButton className={styles.button} value="neighborhood">
            Neighborhood
          </ToggleButton>
        </ToggleButtonGroup>

        {!searchLimit && (
          <Box className={styles.tabsWrapper}>
            {activeTab === "location" && <Location explainedLikeAlocal={explainedLikeAlocal} greenFlags={greenFlags} redFlags={redFlags} />}
            {activeTab == "nearby" && <Nearby />}
            {activeTab == "property" && showHome && <Property explainedLikeAlocal={explainedLikeAlocal} />}

            {activeTab == "neighborhood" && <Neighborhood filterVal={filterVal} />}
          </Box>
        )}
      </Box>
    </>
  );
}

import { Box } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { filterState } from "../../context/filterContext";
import Nearby from "./Nearby/Nearby";
import { NextSeo } from "next-seo";
import { activeTabState, Tab } from "context/activeTab";
import Neighborhood from "./Neighborhood/Neighborhood";
import Property from "./Property/Property";
import { Location } from "./Location/Location";

/**
 * FilterResults
 * @description: Displays right side of the home page. Will show home information and nearby places
 */

export default function FilterResults() {
  const [activeTab, setActiveTab] = useRecoilState(activeTabState);
  const [explainedLikeAlocal, setExplainedLikeAlocal] = useState("");
  const [greenFlags, setGreenFlags] = useState<any[]>([]);
  const [redFlags, setRedFlags] = useState<any[]>([]);
  const [loading, isLoading] = useState(false);

  const [filterVal] = useRecoilState(filterState);

  const [showHome, setShowHome] = useState<boolean>(true);

  const handleTabChange = (event: React.MouseEvent<HTMLElement>, newTab: Tab | null) => {
    if (newTab) {
      setActiveTab(newTab);
    }
  };

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

      isLoading(true);
      setActiveTab("location");
      //* the entire selected place is sent in so we can validate the address
      try {
        const request = await fetch(`/api/openai/`, {
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
        isLoading(false);
      } catch (error) {
        console.log({ error });
      }
      isLoading(false);
    };
    getOpenAiData();
  }, [filterVal.address, filterVal.selectedPlace]);

  return (
    <>
      <NextSeo description={explainedLikeAlocal.split(".")[0] || "Kurby uses location data to estimate property value like never before."} />
      <Box
        style={{
          width: "100%",
          marginLeft: "12.5px",
          height: "100%",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ToggleButtonGroup color="primary" value={activeTab} exclusive onChange={handleTabChange} aria-label="Platform">
          <ToggleButton style={{ width: "220px", textTransform: "initial" }} value="location">
            Location
          </ToggleButton>

          {showHome && (
            <ToggleButton style={{ width: "220px", textTransform: "initial" }} value="property">
              Home
            </ToggleButton>
          )}

          <ToggleButton style={{ width: "220px", textTransform: "initial" }} value="neighborhood">
            Neighborhood
          </ToggleButton>
        </ToggleButtonGroup>

        {
          <Box style={{ height: "100%", marginBottom: "24px" }}>
            {activeTab === "location" && <Location loading={loading} explainedLikeAlocal={explainedLikeAlocal} greenFlags={greenFlags} redFlags={redFlags} />}
            {activeTab == "nearby" && <Nearby />}
            {activeTab == "property" && showHome && <Property explainedLikeAlocal={explainedLikeAlocal} />}

            {activeTab == "neighborhood" && <Neighborhood filterVal={filterVal} />}
          </Box>
        }
      </Box>
    </>
  );
}

import { Box, IconButton, Skeleton, Tooltip, Typography, Button } from "@mui/material";
import styles from "./BodyContent.module.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { filterState } from "../../context/filterContext";
import StreetView from "./StreetView";
import Nearby from "./Nearby/Nearby";
import InfoIcon from "@mui/icons-material/Info";
import WalkscoreList from "./Walkscore/WalkscoreList";
import LocationSvg from "../../public/icons/location.svg";
import QuestionTooltipSvg from "../../public/icons/question-tooltip.svg";
import { NextSeo } from "next-seo";
import getFloodData from "./Neighborhood/floodData";
import FactCard from "./Neighborhood/FactCard";
import FloodIcon from "@mui/icons-material/Flood";
import { styled } from "@mui/material/styles";
import FloodZoneModal from "./Neighborhood/FloodZoneModal";
import WaterDamageIcon from "@mui/icons-material/WaterDamage";
import WarningIcon from "@mui/icons-material/Warning";
import Census from "components/Census/Census";
import { activeTabState, Tab } from "context/activeTab";

const floodRiskMap: { [key: string]: string } = {
  A: "Medium",
  A1: "Unknown",
  A99: "Medium",
  AE: "Unknown",
  AH: "Medium",
  AO: "Medium",
  AR: "High",
  B: "Medium",
  X: "Low",
  C: "Low",
  D: "Medium",
  V: "Medium",
  VE: "Medium",
  V1: "Medium",
};

const convertFloodZoneToRisk = (floodZone: string) => {
  if (!floodZone) return "Unknown";

  const formattedFloodZone = floodZone.trim();
  let zoneNumber: string | number = parseInt(formattedFloodZone.replace(/[^0-9]/g, ""));
  const zoneLetter = formattedFloodZone.replace(/[\d\.]/g, "").replace(/ /g, "");

  if (!isNaN(zoneNumber) && zoneNumber) {
    if (zoneNumber <= 30) zoneNumber = 1;
  } else {
    zoneNumber = "";
  }

  const finalFloodZone = `${zoneLetter}${zoneNumber}`;
  return floodRiskMap[finalFloodZone] || "Unknown";
};

const FactCardContainer = styled("div")(() => ({
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
}));

/**
 * FilterResults
 * @description: Displays right side of the home page. Will show home information and nearby places
 */

export default function FilterResults() {
  const [activeTab, setActiveTab] = useRecoilState(activeTabState)
  const [explainedLikeAlocal, setExplainedLikeAlocal] = useState("");
  const [greenFlags, setGreenFlags] = useState<any[]>([]);
  const [redFlags, setRedFlags] = useState<any[]>([]);
  const [loading, isLoading] = useState(false);
  const [selectedZipCode, setSelectedZipCode] = useState("");
  const [openFloodZoneMap, setOpenFloodZoneMap] = useState(false);
  const [floodData, setFloodData] = useState<any[]>([]);

  const handleCloseFloodZoneModal = () => {
    setOpenFloodZoneMap(false);
  };

  const [filterVal] = useRecoilState(filterState);

  const handleTabChange = (event: React.MouseEvent<HTMLElement>, newTab: Tab | null) => {
    setActiveTab(newTab);
  };

  useEffect(() => {
    const getOpenAiData = async () => {
      if (!filterVal.address) return;

      isLoading(true);
      setActiveTab("home");
      //* the entire selected place is sent in so we can validate the address
      const request = await fetch(`/api/openai/`, {
        method: "POST",
        body: JSON.stringify(filterVal.selectedPlace),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();

      setExplainedLikeAlocal(response.explained_like_a_local);
      setGreenFlags(response.greenFlags);
      setRedFlags(response.redFlags);
      isLoading(false);
    };

    getOpenAiData();

    const retrieveFloodData = async () => {
      if (!filterVal.selectedPlace) return;

      const addressComponents = filterVal.selectedPlace.address_components;

      const zipData = addressComponents.filter((component: any) => component.types.includes("postal_code"));
      const zipCode = zipData[0]?.long_name;
      setSelectedZipCode(zipCode);
      const dt = await getFloodData(zipCode);
      setFloodData(dt);
    };

    (async () => {
      await retrieveFloodData();
    })();
  }, [filterVal.address, filterVal.selectedPlace]);

  useEffect(() => {
    console.log("filterVal", filterVal);
  }, [filterVal]);

  const AIWarningToolTip = () => (
    <Tooltip title="The information provided by AI is never 100% accurate and should only be used as a starting point for further research. AI cannot replace human judgment, and no AI system can guarantee the accuracy of its conclusions. As such, any decisions made based on the results of AI should be carefully evaluated and independently verified.">
      <IconButton style={{ marginBottom: "2px" }}>
        <QuestionTooltipSvg sx={{ fontSize: 20 }} />
      </IconButton>
    </Tooltip>
  );

  const Flags = ({ color, flagsArr }: { color: string; flagsArr: any[] }) => {
    const Title = () => (
      <Box style={{ marginTop: "10px" }}>
        <Typography variant="subtitle2">
          {color} Flags
          <AIWarningToolTip />
        </Typography>
      </Box>
    );

    if (loading)
      return (
        <>
          <Title />
          <ParagraphSkeleton />
        </>
      );

    return (
      <>
        <Title />

        <Box className={styles.box}>
          <ul>
            {flagsArr.length &&
              flagsArr.map((flagContent: string, index: number) => {
                return <li key={index}>{flagContent}</li>;
              })}
          </ul>
        </Box>
      </>
    );
  };

  const ParagraphSkeleton = () => {
    return (
      <>
        <Skeleton variant="rectangular" height={10} style={{ marginBottom: 6 }} />
        <Skeleton variant="rectangular" height={10} style={{ marginBottom: 6 }} />
        <Skeleton variant="rectangular" height={10} />
      </>
    );
  };

  //TODO add to style sheet
  const resultsContentStyle = {
    padding: "20px",
    border: "1px solid rgba(38,75,92,.2)",
    boxShadow: "0 4px 4px #00000040",
    borderRadius: "14px",
    borderBottomRightRadius: "0px",
    borderBottomLeftRadius: "0px",
    marginTop: "25px",
    display: "flex",
    height: "100%",
    boxSizing: "border-box",
  } as any;
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
          <ToggleButton style={{ width: "220px", textTransform: "initial" }} value="home">
            Location
          </ToggleButton>
          <ToggleButton style={{ width: "220px", textTransform: "initial" }} value="nearby">
            Nearby Places
          </ToggleButton>
          <ToggleButton style={{ width: "220px", textTransform: "initial" }} value="neighborhood">
            Neighborhood
          </ToggleButton>
          <ToggleButton style={{ width: "220px", textTransform: "initial" }} value="utility">
            Utility
          </ToggleButton>
        </ToggleButtonGroup>

        {/* filterVal.address */ true && (
          <Box style={{ height: "100%", marginBottom: "24px" }}>
            {activeTab == "home" && (
              <Box style={resultsContentStyle}>
                <Box
                  style={{
                    overflow: "auto",
                    height: "100%",
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <Box style={{ display: "flex" }}>
                    <StreetView position={filterVal.latlong} />
                    <Box>
                      <Box style={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="h5" component="h5">
                          <LocationSvg style={{ marginRight: "8px" }} />
                          {filterVal.address}
                        </Typography>
                      </Box>
                      <Typography style={{ marginTop: "10px" }} variant="subtitle2">
                        Explain it like a local:
                        <AIWarningToolTip />
                      </Typography>
                      {loading ? <ParagraphSkeleton /> : <Typography>{explainedLikeAlocal}</Typography>}
                      <Box style={{ marginTop: "10px" }}>
                        <WalkscoreList></WalkscoreList>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    style={{
                      marginTop: "24px",
                      position: "absolute",
                      width: "100%",
                    }}
                  >
                    <Flags color="Green" flagsArr={greenFlags} />

                    <Flags color="Red" flagsArr={redFlags} />
                  </Box>
                </Box>
              </Box>
            )}
            {activeTab == "nearby" && <Nearby />}
            {activeTab == "neighborhood" && (
              <Box style={resultsContentStyle}>
                <Box
                  style={{
                    overflow: "auto",
                    height: "100%",
                    width: "100%",
                    position: "relative",
                  }}
                >
                  {floodData.length ? (
                    <FactCardContainer>
                      <FactCard
                        label="Flood Risk"
                        value={convertFloodZoneToRisk(floodData[0]?.floodZone || "")}
                        icon={
                          <WarningIcon
                            sx={{
                              color: "green",
                              fontSize: "50px",
                            }}
                          />
                        }
                      />
                      <FactCard
                        label="Flood Zone"
                        value={floodData[0]?.floodZone || "Unknown"}
                        icon={
                          <FloodIcon
                            sx={{
                              color: "green",
                              fontSize: "50px",
                            }}
                          />
                        }
                      >
                        <Button
                          variant="text"
                          onClick={() => {
                            setOpenFloodZoneMap(true);
                          }}
                          sx={{
                            fontSize: "12px",
                          }}
                        >
                          See More
                        </Button>
                      </FactCard>
                      <FloodZoneModal open={openFloodZoneMap} handleClose={handleCloseFloodZoneModal}>
                        <FactCard
                          label="Flood Zone"
                          value={floodData[0]?.floodZone || "Unknown"}
                          icon={
                            <FloodIcon
                              sx={{
                                color: "green",
                                fontSize: "50px",
                              }}
                            />
                          }
                        ></FactCard>
                      </FloodZoneModal>
                    </FactCardContainer>
                  ) : (
                    <h3>No Flood Data</h3>
                  )}
                </Box>
              </Box>
            )}

            {activeTab == "utility" && (
              <Box style={resultsContentStyle}>
                <Census></Census>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </>
  );
}

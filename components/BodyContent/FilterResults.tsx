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
import { activeTabState, Tab } from "context/activeTab";
import Neighborhood from "./Neighborhood/Neighborhood";
import Census from "components/Census/Census";
import axios from "axios";
import { AddressComponentType, AgencyFBI, CrimeInfoType } from "types/address";
import { distanceBetweenTwoPlaces } from "utils/address";

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
  const [crimeInfo, setCrimeInfo] = useState<CrimeInfoType | null>(null)

  const [filterVal] = useRecoilState(filterState);

  const handleTabChange = (event: React.MouseEvent<HTMLElement>, newTab: Tab | null) => {
    setActiveTab(newTab);
  };

  const getCrimeFBIInfo = async () => {
    try {
      const nationalCrimeData = await axios.get(`${process.env.NEXT_PUBLIC_CRIME_FBI_URL}/estimate/national?year=${process.env.NEXT_PUBLIC_CRIME_FBI_YEAR}&API_KEY=${process.env.NEXT_PUBLIC_CRIME_FBI_KEY}`);
      
      
      const stateComponent = filterVal.selectedPlace?.address_components?.find((item: AddressComponentType) => item?.types?.includes("administrative_area_level_1"));
      const areaComponent = filterVal.selectedPlace?.address_components?.find((item: AddressComponentType) => item?.types?.includes("locality"));

      let stateCrime = [];
      let areaViolent = 0, areaProperty = 0;
      const areaPopulation = 100 * 1000;

      let agencyFBI: AgencyFBI | null = null;

      if (stateComponent?.short_name) {
        const stateCrimeData = await axios.get(`${process.env.NEXT_PUBLIC_CRIME_FBI_URL}/estimate/state/${stateComponent.short_name}?year=${process.env.NEXT_PUBLIC_CRIME_FBI_YEAR}&API_KEY=${process.env.NEXT_PUBLIC_CRIME_FBI_KEY}`);
        stateCrime = stateCrimeData.data;

        const agencyListData = await axios.get(`${process.env.NEXT_PUBLIC_CRIME_FBI_URL}/agency/byStateAbbr/${stateComponent.short_name}?API_KEY=${process.env.NEXT_PUBLIC_CRIME_FBI_KEY}`);
        const agencyList = agencyListData.data;

        const lat1 = filterVal.selectedPlace.geometry.location.lat();
        const lng1 = filterVal.selectedPlace.geometry.location.lng();

        let minDistance = Number.POSITIVE_INFINITY;
        agencyList.map((agency: AgencyFBI) => {
          const distance = distanceBetweenTwoPlaces(Number(lat1), Number(lng1), Number(agency.latitude), Number(agency.longitude));
          if (distance < minDistance) {
            minDistance = distance;
            agencyFBI = agency;
          }
        })

        const areaViolentCrimeData = await axios.get(`${process.env.NEXT_PUBLIC_CRIME_FBI_URL}/summarized/agency/${agencyFBI.ori}/violent-crime?from=${process.env.NEXT_PUBLIC_CRIME_FBI_YEAR}&to=${process.env.NEXT_PUBLIC_CRIME_FBI_YEAR}&API_KEY=${process.env.NEXT_PUBLIC_CRIME_FBI_KEY}`);
        areaViolent = areaViolentCrimeData.data[0].actual + areaViolentCrimeData.data[0].cleared;

        const areaPropertyCrimeData = await axios.get(`${process.env.NEXT_PUBLIC_CRIME_FBI_URL}/summarized/agency/${agencyFBI.ori}/property-crime?from=${process.env.NEXT_PUBLIC_CRIME_FBI_YEAR}&to=${process.env.NEXT_PUBLIC_CRIME_FBI_YEAR}&API_KEY=${process.env.NEXT_PUBLIC_CRIME_FBI_KEY}`);
        areaProperty = areaPropertyCrimeData.data[0].actual + areaPropertyCrimeData.data[0].cleared;
      }


      setCrimeInfo({
        national: {
          violent_crime: parseInt(nationalCrimeData.data[0].violent_crime),
          property_crime: parseInt(nationalCrimeData.data[0].property_crime),
          population: parseInt(nationalCrimeData.data[0].population)
        },
        state: {
          violent_crime: stateCrime.length > 0 ? parseInt(stateCrime[0].violent_crime) : 0,
          property_crime: stateCrime.length > 0 ? parseInt(stateCrime[0].property_crime) : 0,
          population: stateCrime.length > 0 ? parseInt(stateCrime[0].population) : 0,
        },
        area: {
          violent_crime: areaViolent,
          property_crime: areaProperty,
          population: areaPopulation
        },
        localInfo: {
          state: stateComponent?.long_name || '',
          area: areaComponent?.long_name || '',
        }
      })
    } catch (error) {
      console.log('error =>>', error)
    }

  }

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
    getCrimeFBIInfo();
  }, [filterVal.address, filterVal.selectedPlace]);

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
            {flagsArr.length ? (
              flagsArr.map((flagContent: string, index: number) => {
                return <li key={index}>{flagContent}</li>;
              })
            ) : (
              <></>
            )}
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
          {/* <ToggleButton style={{ width: "220px", textTransform: "initial" }} value="nearby">
            Nearby Places
          </ToggleButton> */}

          <ToggleButton style={{ width: "220px", textTransform: "initial" }} value="neighborhood">
            Neighborhood
          </ToggleButton>
          {/* <ToggleButton style={{ width: "220px", textTransform: "initial" }} value="utility">
            Utility
          </ToggleButton> */}
        </ToggleButtonGroup>

        {
          /* filterVal.address */ true && (
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
              {activeTab == "neighborhood" && <Neighborhood filterVal={filterVal} crimeInfo={crimeInfo} />}

              {/* activeTab == "utility" && (
                <Box style={resultsContentStyle}>
                  <Census></Census>
                </Box>
              ) */}
            </Box>
          )
        }
      </Box>
    </>
  );
}

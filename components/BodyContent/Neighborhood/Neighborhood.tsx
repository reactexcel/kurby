import { Box, Button, styled } from "@mui/material";
import { useEffect, useState } from "react";
import FactCard from "./FactCard";
import getFloodData from "./floodData";
import WarningIcon from "@mui/icons-material/Warning";
import FloodIcon from "@mui/icons-material/Flood";
import FloodZoneModal from "./FloodZoneModal";
import getCensusData, { CensusData } from "components/Census/getCensusData";
import RaceBreakdown from "./RaceBreakdown";
import Hunger from "../../../public/icons/hunger.svg";
import Unemployment from "../../../public/icons/unemployment.svg";
import Graduation from "../../../public/icons/graduation.svg";
import Married from "../../../public/icons/married.svg";
import Home from "../../../public/icons/home.svg";
import Population from "../../../public/icons/population.svg";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { CrimeInfoType, OverallCrimeInfo } from "types/address";
import Handcuff from "../../../public/images/handcuff.svg";
import CrimeModal from "./CrimeModal";

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

const FactCardContainer = styled("div")(() => ({
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
}));

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

interface Props {
  filterVal: {
    latlong: google.maps.LatLngLiteral | null;
    radius: any | null;
    address: string | null;
    nearbyPlaces: any[];
    loadedNearbyPlaces: [];
    selectedPlace: any | null;
    mapCenter: { lat: number; lng: number } | null;
  };
  crimeInfo: CrimeInfoType | null
}

export default function Neighborhood({ filterVal, crimeInfo }: Props) {
  const [openFloodZoneMap, setOpenFloodZoneMap] = useState(false);
  const [openCrimeViolentMap, setOpenCrimeViolentMap] = useState(false);
  const [openCrimePropertyMap, setOpenCrimePropertyMap] = useState(false);
  const [openRaceBreakdown, setOpenRaceBreakdown] = useState(false);
  const [floodData, setFloodData] = useState<any[]>([]);
  const [censusData, setCensusData] = useState<CensusData | null>(null);
  const [loading, setLoading] = useState(false);


  const [crimeModal, setCrimeModal] = useState<string>("")
  const [overallCrimeInfo, setOverallCrimeInfo] = useState<OverallCrimeInfo | null>(null);

  useEffect(() => {
    const retrieveFloodData = async () => {
      if (!filterVal.selectedPlace || !filterVal.selectedPlace.formatted_address.includes("USA")) return;

      setLoading(true);
      const addressComponents = filterVal.selectedPlace.address_components;

      const zipData = addressComponents.filter((component: any) => component.types.includes("postal_code"));
      const zipCode = zipData[0]?.long_name;
      //setSelectedZipCode(zipCode);
      const dt = await getFloodData(zipCode);
      setFloodData(dt);

      if (!filterVal.mapCenter) return;
      const censusDt = await getCensusData(filterVal.mapCenter);

      setCensusData(censusDt);
      setLoading(false);
    };

    (async () => {
      await retrieveFloodData();
    })();
    crimeSummaryInfo();
  }, []);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);
  const handleCloseModals = () => {
    setOpenFloodZoneMap(false);
    setOpenRaceBreakdown(false);
  };

  const crimeSummaryInfo = () => {
    let violentNationalRate = 0;
    let propertyNationalRate = 0;
    let violentStateRate = 0;
    let propertyStateRate = 0;
    let violentAreaRate = 0;
    let propertyAreaRate = 0;
    let violentAreaPerNational = 0;
    let propertyAreaPerNational = 0;
    if (crimeInfo?.national && crimeInfo?.state && crimeInfo?.area) {
      violentNationalRate = crimeInfo.national.violent_crime * 100 * 1000 / crimeInfo.national.population
      violentStateRate = crimeInfo.state.violent_crime * 100 * 1000 / crimeInfo.state.population
      violentAreaRate = crimeInfo.area.violent_crime * 100 * 1000 / crimeInfo.area.population
      propertyNationalRate = crimeInfo.national.property_crime * 100 * 1000 / crimeInfo.national.population
      propertyStateRate = crimeInfo.state.property_crime * 100 * 1000 / crimeInfo.state.population
      propertyAreaRate = crimeInfo.area.property_crime * 100 * 1000 / crimeInfo.area.population

      violentAreaPerNational = (violentAreaRate - violentNationalRate) * 100 / violentNationalRate;
      propertyAreaPerNational = (propertyAreaRate - propertyNationalRate) * 100 / propertyNationalRate;

      setOverallCrimeInfo({
        violentIncidents: crimeInfo.area.violent_crime,
        violentNationalRate: violentNationalRate,
        violentStateRate: violentStateRate,
        violentAreaRate: violentAreaRate,
        propertyIncidents: crimeInfo.area.property_crime,
        propertyNationalRate: propertyNationalRate,
        propertyStateRate: propertyStateRate,
        propertyAreaRate: propertyAreaRate,
        violentAreaPerNational: violentAreaPerNational,
        propertyAreaPerNational: propertyAreaPerNational,
        localInfo: crimeInfo?.localInfo
      })
    }

    // const areaPerNational = (areaRate - nationalRate) * 100 / nationalRate;
    // return {
    //   number: Math.round(Math.abs(areaPerNational)),
    //   status: Math.sign(areaPerNational)
    // };
  }

  const handleCloseCrimModal = () => {
    setCrimeModal("")
  }

  return (
    <Box style={resultsContentStyle}>
      <Box
        style={{
          overflow: "auto",
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        {filterVal.selectedPlace.formatted_address.includes("USA") ? (
          <FactCardContainer>
            <FactCard
              loading={loading}
              label="Flood Risk"
              type="string"
              value={convertFloodZoneToRisk(floodData?.[0]?.floodZone)}
              icon={
                <WarningIcon
                  sx={{
                    color: "green",
                    fontSize: "40px",
                  }}
                />
              }
            />
            <FactCard
              loading={loading}
              label="Flood Zone"
              type="string"
              value={floodData?.[0]?.floodZone || "Unknown"}
              icon={
                <FloodIcon
                  sx={{
                    color: "green",
                    fontSize: "40px",
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
            <FactCard
              loading={loading}
              label="Adults with a bachlors degree"
              type="percent"
              value={censusData?.percentOfAdultsWithBatchlorsDegree}
              icon={
                <Graduation
                  sx={{
                    color: "green",
                    fontSize: "40px",
                  }}
                />
              }
            />
            <FactCard
              loading={loading}
              label="Homes with married-couple families"
              type="percent"
              value={censusData && censusData.percentageOfHomesWithMarriedCouples}
              icon={
                <Married
                  sx={{
                    color: "green",
                  }}
                />
              }
            />
            <FactCard
              loading={loading}
              label="Average Salary"
              type="string"
              value={censusData?.averageSalary && formatter.format(censusData.averageSalary)}
              icon={
                <AttachMoneyIcon
                  sx={{
                    color: "green",
                    fontSize: "40px",
                  }}
                />
              }
            />
            <FactCard
              loading={loading}
              label="Percent Under Poverty"
              type="percent"
              value={censusData && censusData.percentUnderPoverty}
              icon={
                <Hunger
                  sx={{
                    color: "green",
                    fontSize: "40px",
                  }}
                />
              }
            />
            <FactCard
              loading={loading}
              label="Percent not US citizens"
              type="percent"
              value={censusData && censusData.nonCitizens}
              icon={
                <Population
                  sx={{
                    color: "green",
                    fontSize: "40px",
                  }}
                />
              }
            />
            <FactCard
              loading={loading}
              label="Dominant Race"
              type="string"
              value={censusData && `${capitalize(censusData.dominantRace)}`}
              icon={
                <Population
                  sx={{
                    color: "green",
                    fontSize: "40px",
                  }}
                />
              }
            >
              <Button
                variant="text"
                onClick={() => {
                  setOpenRaceBreakdown(true);
                }}
                sx={{
                  fontSize: "12px",
                }}
              >
                See Breakdown
              </Button>
            </FactCard>

            <FactCard
              loading={loading}
              label="Unemployment Rate"
              type="percent"
              value={censusData && censusData.unemploymentRate}
              icon={
                <Unemployment
                  style={{
                    color: "green",
                    width: "40px",
                  }}
                />
              }
            />
            <FactCard
              loading={loading}
              label="Owner morgage ≥ 30% household income"
              type="percent"
              value={censusData && censusData.morgageGreaterThan30Percent}
              icon={
                <Home
                  sx={{
                    color: "green",
                    fontSize: "40px",
                  }}
                />
              }
            />
            <FactCard
              loading={loading}
              label="Rent ≥ 30% household income"
              type="string"
              value={censusData && censusData.rentGreaterThan30Percent}
              icon={
                <Home
                  sx={{
                    color: "green",
                    fontSize: "40px",
                  }}
                />
              }
            />
            <FactCard
              loading={loading}
              label="Owners without morgages"
              type="percent"
              value={censusData && censusData.percentOwnersNoMorgage}
              icon={
                <Home
                  sx={{
                    color: "green",
                    fontSize: "40px",
                  }}
                />
              }
            />
            <FactCard
              loading={loading}
              label="Violent Crime Rate"
              type="string"
              value={Math.round(overallCrimeInfo?.violentAreaPerNational) + "%" || "Unknown"}
              icon={
                <Handcuff
                  sx={{
                    color: "green",
                    fontSize: "40px",
                  }}
                />
              }
            >
              <Button
                variant="text"
                onClick={() => {
                  setCrimeModal("violent")
                }}
                sx={{
                  fontSize: "12px",
                }}
              >
                See More
              </Button>
            </FactCard>
            <FactCard
              loading={loading}
              label="Property Crime Rate"
              type="string"
              value={Math.round(overallCrimeInfo?.propertyAreaPerNational) + "%" || "Unknown"}
              icon={
                <Handcuff
                  sx={{
                    color: "green",
                    fontSize: "40px",
                  }}
                />
              }
            >
              <Button
                variant="text"
                onClick={() => {
                  setCrimeModal("property")
                }}
                sx={{
                  fontSize: "12px",
                }}
              >
                See More
              </Button>
            </FactCard>

            <CrimeModal open={!!crimeModal} handleClose={handleCloseCrimModal} overallCrimeInfo={overallCrimeInfo} crimeType={crimeModal}>
              <FactCard
                loading={false}
                label={`${crimeModal.charAt(0).toUpperCase() + crimeModal.slice(1)} Crime Info`}
                type="string"
                value={crimeModal === "violent" ? Math.round(overallCrimeInfo?.propertyAreaPerNational) + "%" : Math.round(overallCrimeInfo?.propertyAreaPerNational) + "%" || "Unknown"}
                icon={
                  <Handcuff
                    sx={{
                      color: "green",
                      fontSize: "40px",
                    }}
                  />
                }
              ></FactCard>
            </CrimeModal>

            <RaceBreakdown open={openRaceBreakdown} handleClose={handleCloseModals} raceData={censusData?.raceData} />

            <FloodZoneModal open={openFloodZoneMap} handleClose={handleCloseModals}>
              <FactCard
                loading={loading}
                label="Flood Zone"
                type="string"
                value={floodData?.[0]?.floodZone || "Unknown"}
                icon={
                  <FloodIcon
                    sx={{
                      color: "green",
                      fontSize: "40px",
                    }}
                  />
                }
              ></FactCard>
            </FloodZoneModal>
          </FactCardContainer>
        ) : (
          <h3>No Neighborhood Data</h3>
        )}
      </Box>
    </Box>
  );
}

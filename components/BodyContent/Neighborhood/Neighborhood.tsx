import { Box, Button, styled } from "@mui/material";
import { useEffect, useState } from "react";
import FactCard from "./FactCard";
import getFloodData from "./floodData";
import WarningIcon from "@mui/icons-material/Warning";
import FloodIcon from "@mui/icons-material/Flood";
import FloodZoneModal from "./FloodZoneModal";
import getCensusData, { CensusData } from "components/Census/getCensusData";
import RaceBreakdown from "./RaceBreakdown";

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
}

export default function Neighborhood({ filterVal }: Props) {
  const [openFloodZoneMap, setOpenFloodZoneMap] = useState(false);
  const [openRaceBreakdown, setOpenRaceBreakdown] = useState(false);
  const [floodData, setFloodData] = useState<any[]>([]);
  const [censusData, setCensusData] = useState<CensusData | null>(null);
  const [loading, setLoading] = useState(false);

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
                    fontSize: "50px",
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
            <FactCard
              loading={loading}
              label="Adults with a bachlors degree"
              type="percent"
              value={censusData?.percentOfAdultsWithBatchlorsDegree}
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
              loading={loading}
              label="Homes with married-couple families"
              type="percent"
              value={censusData && censusData.percentageOfHomesWithMarriedCouples}
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
              loading={loading}
              label="Average Salary"
              type="string"
              value={censusData?.averageSalary && formatter.format(censusData.averageSalary)}
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
              loading={loading}
              label="Percent Under Poverty"
              type="percent"
              value={censusData && censusData.percentUnderPoverty}
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
              loading={loading}
              label="Percent not US citizens"
              type="percent"
              value={censusData && censusData.nonCitizens}
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
              loading={loading}
              label="Dominant Race"
              type="string"
              value={censusData && `${capitalize(censusData.dominantRace)}`}
              icon={
                <WarningIcon
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
              type="string"
              value={censusData && censusData.unemploymentRate}
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
              loading={loading}
              label="Owner morgage ≥ 30% household income"
              type="string"
              value={censusData && censusData.morgageGreaterThan30Percent}
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
              loading={loading}
              label="Rent ≥ 30% household income"
              type="string"
              value={censusData && censusData.rentGreaterThan30Percent}
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
              loading={loading}
              label="Owners without morgages"
              type="percent"
              value={censusData && censusData.percentOwnersNoMorgage}
              icon={
                <WarningIcon
                  sx={{
                    color: "green",
                    fontSize: "50px",
                  }}
                />
              }
            />

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
                      fontSize: "50px",
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

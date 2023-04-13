import { Box, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import FactCard from "./FactCard/FactCard";
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
import { AddressComponentType, AgencyFBI, OverallCrimeInfo } from "types/address";
import Handcuff from "../../../public/images/handcuff.svg";
import CrimeModal from "./CrimeModal";
import { distanceBetweenTwoPlaces } from "utils/address";
import axios from "axios";
import { TabLayout } from "components/layouts/TabLayout/TabLayout";
import styles from "./Neighborhood.module.scss";
import { useRecoilState } from "recoil";
import { loadingContext } from "context/loadingContext";

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
  const [loading, setLoading] = useRecoilState(loadingContext);

  const [crimeModal, setCrimeModal] = useState<string>("");
  const [overallCrimeInfo, setOverallCrimeInfo] = useState<OverallCrimeInfo | null>(null);

  const getNearestAgency = async (agencyList: AgencyFBI[]) => {
    let agencyOri = "";
    let areaViolent = 0,
      areaProperty = 0;

    const lat1 = filterVal.selectedPlace.geometry.location.lat();
    const lng1 = filterVal.selectedPlace.geometry.location.lng();

    let minDistance = Number.POSITIVE_INFINITY;
    const agencyIgnoreList: string[] = [];

    while (areaViolent === 0 || areaProperty === 0) {
      agencyList.map((agency: AgencyFBI) => {
        const distance = distanceBetweenTwoPlaces(Number(lat1), Number(lng1), Number(agency.latitude), Number(agency.longitude));
        if (distance < minDistance && !agencyIgnoreList.includes(agency.ori)) {
          minDistance = distance;
          agencyOri = agency.ori;
        }
      });

      const areaViolentCrimeData = await axios.get(
        `${process.env.NEXT_PUBLIC_CRIME_FBI_URL}/summarized/agency/${agencyOri}/violent-crime?from=${process.env.NEXT_PUBLIC_CRIME_FBI_YEAR}&to=${process.env.NEXT_PUBLIC_CRIME_FBI_YEAR}&API_KEY=${process.env.NEXT_PUBLIC_CRIME_FBI_KEY}`,
      );
      if (areaViolentCrimeData.data.length > 0) {
        areaViolent = Number(areaViolentCrimeData.data[0].actual);
      }

      const areaPropertyCrimeData = await axios.get(
        `${process.env.NEXT_PUBLIC_CRIME_FBI_URL}/summarized/agency/${agencyOri}/property-crime?from=${process.env.NEXT_PUBLIC_CRIME_FBI_YEAR}&to=${process.env.NEXT_PUBLIC_CRIME_FBI_YEAR}&API_KEY=${process.env.NEXT_PUBLIC_CRIME_FBI_KEY}`,
      );
      if (areaPropertyCrimeData.data.length > 0) {
        areaProperty = Number(areaPropertyCrimeData.data[0].actual);
      }

      if (areaViolent === 0 || areaProperty === 0) {
        agencyIgnoreList.push(agencyOri);
        minDistance = Number.POSITIVE_INFINITY;
      }
    }

    return {
      areaViolent,
      areaProperty,
    };
  };

  const getCrimeFBIInfo = async () => {
    try {
      const nationalCrimeData = await axios.get(
        `${process.env.NEXT_PUBLIC_CRIME_FBI_URL}/estimate/national?year=${process.env.NEXT_PUBLIC_CRIME_FBI_YEAR}&API_KEY=${process.env.NEXT_PUBLIC_CRIME_FBI_KEY}`,
      );

      const stateComponent = filterVal.selectedPlace?.address_components?.find((item: AddressComponentType) => item?.types?.includes("administrative_area_level_1"));
      const areaComponent = filterVal.selectedPlace?.address_components?.find((item: AddressComponentType) => item?.types?.includes("locality"));

      let stateCrime = [];
      let areaViolent = 0,
        areaProperty = 0;
      const areaPopulation = 100 * 1000;

      if (stateComponent?.short_name) {
        const stateCrimeData = await axios.get(
          `${process.env.NEXT_PUBLIC_CRIME_FBI_URL}/estimate/state/${stateComponent.short_name}?year=${process.env.NEXT_PUBLIC_CRIME_FBI_YEAR}&API_KEY=${process.env.NEXT_PUBLIC_CRIME_FBI_KEY}`,
        );
        stateCrime = stateCrimeData.data;

        const agencyListData = await axios.get(
          `${process.env.NEXT_PUBLIC_CRIME_FBI_URL}/agency/byStateAbbr/${stateComponent.short_name}?API_KEY=${process.env.NEXT_PUBLIC_CRIME_FBI_KEY}`,
        );
        const agencyList = agencyListData.data;

        const areaInfo = await getNearestAgency(agencyList);
        areaViolent = areaInfo.areaViolent;
        areaProperty = areaInfo.areaProperty;
      }

      const crimeInfo = {
        national: {
          violent_crime: parseInt(nationalCrimeData.data[0].violent_crime),
          property_crime: parseInt(nationalCrimeData.data[0].property_crime),
          population: parseInt(nationalCrimeData.data[0].population),
        },
        state: {
          violent_crime: stateCrime.length > 0 ? parseInt(stateCrime[0].violent_crime) : 0,
          property_crime: stateCrime.length > 0 ? parseInt(stateCrime[0].property_crime) : 0,
          population: stateCrime.length > 0 ? parseInt(stateCrime[0].population) : 0,
        },
        area: {
          violent_crime: areaViolent,
          property_crime: areaProperty,
          population: areaPopulation,
        },
        localInfo: {
          state: stateComponent?.long_name || "",
          area: areaComponent?.long_name || "",
        },
      };

      let violentNationalRate = 0;
      let propertyNationalRate = 0;
      let violentStateRate = 0;
      let propertyStateRate = 0;
      let violentAreaRate = 0;
      let propertyAreaRate = 0;
      let violentAreaPerNational = 0;
      let propertyAreaPerNational = 0;
      if (crimeInfo?.national && crimeInfo?.state && crimeInfo?.area) {
        violentNationalRate = (crimeInfo.national.violent_crime * 100 * 1000) / crimeInfo.national.population;
        violentStateRate = (crimeInfo.state.violent_crime * 100 * 1000) / crimeInfo.state.population;
        violentAreaRate = (crimeInfo.area.violent_crime * 100 * 1000) / crimeInfo.area.population;
        propertyNationalRate = (crimeInfo.national.property_crime * 100 * 1000) / crimeInfo.national.population;
        propertyStateRate = (crimeInfo.state.property_crime * 100 * 1000) / crimeInfo.state.population;
        propertyAreaRate = (crimeInfo.area.property_crime * 100 * 1000) / crimeInfo.area.population;

        violentAreaPerNational = ((violentAreaRate - violentNationalRate) * 100) / violentNationalRate;
        propertyAreaPerNational = ((propertyAreaRate - propertyNationalRate) * 100) / propertyNationalRate;

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
          localInfo: crimeInfo?.localInfo,
        });
      }
    } catch (error) {
      console.log("error =>>", error);
    }
  };

  useEffect(() => {
    const retrieveFloodData = async () => {
      if (!filterVal.selectedPlace) return;

      const addressComponents = filterVal.selectedPlace.address_components;

      const zipData = addressComponents.filter((component: any) => component.types.includes("postal_code"));
      const zipCode = zipData[0]?.long_name;
      //setSelectedZipCode(zipCode);
      const dt = await getFloodData(zipCode);
      setFloodData(dt);

      if (!filterVal.mapCenter) return;
      const censusDt = await getCensusData(filterVal.mapCenter);

      setCensusData(censusDt);
      setLoading((prev) => ({
        ...prev,
        neighborhood: false,
      }));
    };

    if (filterVal.selectedPlace.formatted_address.includes("USA")) {
      (async () => {
        await getCrimeFBIInfo();
        await retrieveFloodData();
      })();
    }
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

  const handleCloseCrimModal = () => {
    setCrimeModal("");
  };

  if (loading.neighborhood) {
    return (
      <TabLayout loading={loading.neighborhood}>
        <CircularProgress />
      </TabLayout>
    );
  }

  return (
    <TabLayout className={styles.tabLayout}>
      <Box
        style={{
          overflow: "auto",
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        <h3 className={styles.header}>Quick Facts</h3>
        {filterVal.selectedPlace.formatted_address.includes("USA") ? (
          <div className={styles.container}>
            <FactCard label="Flood Risk" type="string" value={convertFloodZoneToRisk(floodData?.[0]?.floodZone)} icon={<WarningIcon className={styles.icon} />} />
            <FactCard
              label="Flood Zone"
              type="string"
              value={floodData?.[0]?.floodZone || "Unknown"}
              icon={<FloodIcon className={styles.icon} />}
              seeMoreOnClick={() => setOpenFloodZoneMap(true)}
            />
            <FactCard
              label="Adults with a bachlors degree"
              type="percent"
              value={censusData?.percentOfAdultsWithBatchlorsDegree}
              icon={<Graduation className={styles.icon} />}
            />
            <FactCard
              label="Homes with married-couple families"
              type="percent"
              value={censusData && censusData.percentageOfHomesWithMarriedCouples}
              icon={<Married className={styles.icon} />}
            />
            <FactCard
              label="Average Salary"
              type="string"
              value={censusData?.averageSalary && formatter.format(censusData.averageSalary)}
              icon={<AttachMoneyIcon className={styles.icon} />}
            />
            <FactCard label="Percent Under Poverty" type="percent" value={censusData && censusData.percentUnderPoverty} icon={<Hunger className={styles.icon} />} />
            <FactCard label="Percent not US citizens" type="percent" value={censusData && censusData.nonCitizens} icon={<Population className={styles.icon} />} />
            <FactCard
              label="Dominant Race"
              type="string"
              value={censusData && `${capitalize(censusData.dominantRace)}`}
              icon={<Population className={styles.icon} />}
              seeMoreOnClick={() => setOpenRaceBreakdown(true)}
            />
            <FactCard label="Unemployment Rate" type="percent" value={censusData && censusData.unemploymentRate} icon={<Unemployment className={styles.icon} />} />
            <FactCard
              label="Owner morgage ≥ 30% household income"
              type="percent"
              value={censusData && censusData.morgageGreaterThan30Percent}
              icon={<Home className={styles.icon} />}
            />
            <FactCard label="Rent ≥ 30% household income" type="string" value={censusData && censusData.rentGreaterThan30Percent} icon={<Home className={styles.icon} />} />
            <FactCard label="Owners without morgages" type="percent" value={censusData && censusData.percentOwnersNoMorgage} icon={<Home className={styles.icon} />} />
            <FactCard
              label="Violent Crime Rate"
              type="string"
              value={Math.round(overallCrimeInfo?.violentAreaPerNational || 0) + "%" || "Unknown"}
              icon={<Handcuff className={styles.icon} />}
              seeMoreOnClick={() => setCrimeModal("violent")}
            />
            <FactCard
              label="Property Crime Rate"
              type="string"
              value={Math.round(overallCrimeInfo?.propertyAreaPerNational || 0) + "%" || "Unknown"}
              icon={<Handcuff className={styles.icon} />}
              seeMoreOnClick={() => setCrimeModal("property")}
            />

            <CrimeModal open={["violent", "property"].includes(crimeModal)} handleClose={handleCloseCrimModal} overallCrimeInfo={overallCrimeInfo} crimeType={crimeModal}>
              <FactCard
                label={`${crimeModal.charAt(0).toUpperCase() + crimeModal.slice(1)} Crime Info`}
                type="string"
                value={
                  crimeModal === "violent"
                    ? Math.round(overallCrimeInfo?.violentAreaPerNational || 0) + "%"
                    : Math.round(overallCrimeInfo?.propertyAreaPerNational || 0) + "%" || "Unknown"
                }
                icon={<Handcuff className={styles.icon} />}
              ></FactCard>
            </CrimeModal>

            <RaceBreakdown open={openRaceBreakdown} handleClose={handleCloseModals} raceData={censusData?.raceData} />

            <FloodZoneModal open={openFloodZoneMap} handleClose={handleCloseModals}>
              <FactCard label="Flood Zone" type="string" value={floodData?.[0]?.floodZone || "Unknown"} icon={<FloodIcon className={styles.icon} />}></FactCard>
            </FloodZoneModal>
          </div>
        ) : (
          <h3>Neighborhood data is currently only available for properties in the United States</h3>
        )}
      </Box>
    </TabLayout>
  );
}

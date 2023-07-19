import { Box, CircularProgress, IconButton, Tooltip } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import FactCard from "./FactCard/FactCard";
import getFloodData from "./floodData";
import WarningIcon from "@mui/icons-material/Warning";
import FloodIcon from "@mui/icons-material/Flood";
import FloodZoneModal from "./FloodZoneModal/FloodZoneModal";
import getCensusData, { CensusData } from "components/Census/getCensusData";
import RaceBreakdown from "./RaceBreakdown/RaceBreakdown";
import Hunger from "../../../public/icons/hunger.svg";
import Unemployment from "../../../public/icons/unemployment.svg";
import Graduation from "../../../public/icons/graduation.svg";
import Married from "../../../public/icons/married.svg";
import Home from "../../../public/icons/home.svg";
import Population from "../../../public/icons/population.svg";
import Vacancy from "../../../public/icons/vacancy.svg";
import QuestionTooltipSvg from "../../../public/icons/question-tooltip.svg";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { AddressComponentType, AgencyFBI, OverallCrimeInfo } from "types/address";
import Handcuff from "../../../public/images/handcuff.svg";
import { distanceBetweenTwoPlaces } from "utils/address";
import axios from "axios";
import { TabLayout } from "components/layouts/TabLayout/TabLayout";
import styles from "./Neighborhood.module.scss";
import { useRecoilState } from "recoil";
import { loadingContext } from "context/loadingContext";
import { DetailsModal } from "./DetailsModal/DetailsModal";
import { DetailsCard } from "./DetailsCard/DetailsCard";
import { VersusCard } from "./VersusCard/VersusCard";
import { useSearchCounter } from "hooks/use-search-counter";
import KurbyPaidPlanLimit, { TabLimitMessage } from "components/AIWarningTooltip/KurbyPaidPlanLimit";

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
    latlong: google.maps.LatLng | null;
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

  const [overallCrimeInfo, setOverallCrimeInfo] = useState<OverallCrimeInfo | null>(null);
  const { searchLimit } = useSearchCounter();

  const usaDetectionKeywords = [
    "USA", // English
    "США", // Russian
    "EE. UU.", // Spanish
    "États-Unis", // French
    "USA", // German
    "USA", // Italian
    "EUA", // Portuguese
    "美国", // Chinese (Simplified)
    "アメリカ", // Japanese
    "미국", // Korean
    "االمتحدة", // Arabic
  ];

  const searchInput = filterVal?.selectedPlace?.formatted_address;
  const isUsa = useMemo(() => {
    if (!searchInput) return false;

    const lowercasedInput = searchInput.toLowerCase();
    return usaDetectionKeywords.some((keyword) => lowercasedInput.includes(keyword.toLowerCase()));
  }, [filterVal.selectedPlace, searchInput]);

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
    };

    if (isUsa) {
      (async () => {
        await getCrimeFBIInfo();
        await retrieveFloodData();

        setLoading((prev) => ({
          ...prev,
          neighborhood: false,
        }));
      })();
    }

    return () => {
      setLoading((prev) => ({
        ...prev,
        neighborhood: true,
      }));
    };
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

  if (!isUsa) {
    return <h3>Neighborhood data is currently only available for properties in the United States</h3>;
  }

  if (loading.neighborhood) {
    return (
      <TabLayout loading={loading.neighborhood}>
        <CircularProgress />
      </TabLayout>
    );
  }

  return (
    <TabLayout className={styles.tabLayout}>
      {searchLimit && <KurbyPaidPlanLimit type={TabLimitMessage.NEIGHBORHOOD_TAB} />}
      <Box
        style={{
          overflow: "auto",
          height: "50%",
          width: "100%",
          position: "relative",
        }}
      >
        <h3 className={styles.header}>
          Quick Facts{" "}
          <Tooltip title="Please note that the primary data provider for our Neighborhood information is sourced from the 2021 American Community Survey conducted by the U.S. Census. Whenever more recent data is available from subsequent Census surveys, we endeavor to update our platform accordingly. However, there may still be a time lag in data representation, and we advise investors to exercise caution and consider consulting additional sources for the most current information.">
            <IconButton style={{ marginBottom: "2px" }}>
              <QuestionTooltipSvg sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
        </h3>
        <div className={styles.container}>
          <DetailsModal card={<FactCard label="Population" type="string" value={censusData?.population?.total || 0} icon={<Population className={styles.icon} />} />}>
            <DetailsCard label="Median Age of Total Population" value={censusData?.population?.medianAge} />
            <DetailsCard label="Foreign Born Population" value={censusData?.population?.foreginBorn} />
            <DetailsCard label="Foreign Born Population %" value={censusData?.population?.foreginBornPercent} />
          </DetailsModal>
          <FactCard
            label="Median Household Income"
            type="string"
            value={censusData?.averageSalary && formatter.format(censusData.averageSalary)}
            icon={<AttachMoneyIcon className={styles.icon} />}
          />
          <FactCard
            label="Median Home Value"
            type="string"
            value={censusData?.medianHomeValue && formatter.format(censusData.medianHomeValue)}
            icon={<Home className={styles.icon} />}
          />
          <FactCard
            label="Median Contract Rent"
            type="string"
            value={censusData?.medianContractRent ? formatter.format(censusData.medianContractRent) : "Unknown"}
            icon={<Home clasName={styles.icon} />}
          />
          <DetailsModal
            card={<FactCard label="Vacant Housing Units %" type="percent" value={censusData?.vacantHousingUnits?.percentage} icon={<Vacancy className={styles.icon} />} />}
          >
            <DetailsCard label="Total Housing Units" value={censusData?.vacantHousingUnits?.totalHousingUnits} />
            <DetailsCard label="Vacant Housing Units" value={censusData?.vacantHousingUnits?.vacantHousingUnits} />
            <DetailsCard label="Total Occupied Housing Units" value={censusData?.vacantHousingUnits?.totalOccupiedHousingUnits} />
          </DetailsModal>
          <FactCard label="Percent Under Poverty" type="percent" value={censusData?.percentUnderPoverty} icon={<Hunger className={styles.icon} />} />
          <FactCard
            label="Adults with a bachlors degree"
            type="percent"
            value={censusData?.percentOfAdultsWithBatchlorsDegree}
            icon={<Graduation className={styles.icon} />}
          />
          <FactCard
            label="Homes with married-couple families"
            type="percent"
            value={censusData?.percentageOfHomesWithMarriedCouples}
            icon={<Married className={styles.icon} />}
          />
          <FactCard
            label="Dominant Race"
            type="string"
            value={censusData && `${capitalize(censusData.dominantRace)}`}
            icon={<Population className={styles.icon} />}
            seeMoreOnClick={() => setOpenRaceBreakdown(true)}
          />
          <RaceBreakdown open={openRaceBreakdown} handleClose={handleCloseModals} raceData={censusData?.raceData} />
          <FactCard label="Unemployment Rate" type="percent" value={censusData?.unemploymentRate} icon={<Unemployment className={styles.icon} />} />
          <DetailsModal
            card={
              <FactCard
                label="Violent Crime Rate"
                type="string"
                value={Math.round(overallCrimeInfo?.violentAreaPerNational || 0) + "%" || "Unknown"}
                icon={<Handcuff className={styles.icon} />}
              />
            }
          >
            <DetailsCard label="Incidents" value={overallCrimeInfo?.violentIncidents} />
            <DetailsCard label={overallCrimeInfo?.localInfo?.state + " / 100k"} value={overallCrimeInfo?.violentStateRate} />
            <DetailsCard label={overallCrimeInfo?.localInfo?.area + " / 100k"} value={overallCrimeInfo?.violentAreaRate} />
            <DetailsCard label="National / 100k" value={overallCrimeInfo?.violentNationalRate} />
          </DetailsModal>
          <DetailsModal
            card={
              <FactCard
                label="Property Crime Rate"
                type="string"
                value={Math.round(overallCrimeInfo?.propertyAreaPerNational || 0) + "%" || "Unknown"}
                icon={<Handcuff className={styles.icon} />}
              />
            }
          >
            <DetailsCard label="Incidents" value={overallCrimeInfo?.propertyIncidents} />
            <DetailsCard label={overallCrimeInfo?.localInfo?.state + " / 100k"} value={overallCrimeInfo?.propertyStateRate} />
            <DetailsCard label={overallCrimeInfo?.localInfo?.area + " / 100k"} value={overallCrimeInfo?.propertyAreaRate} />
            <DetailsCard label="National / 100k" value={overallCrimeInfo?.propertyNationalRate} />
          </DetailsModal>
          <DetailsModal
            card={
              <VersusCard
                left={{
                  label: "Owners",
                  value: censusData?.ownerOccupiedVsRenterOccupied?.ownerOccupiedPercentage,
                }}
                right={{
                  label: "Renters",
                  value: censusData?.ownerOccupiedVsRenterOccupied?.renterOccupiedPercentage,
                }}
              />
            }
          >
            <DetailsCard label="Owner-Occupied Housing Units" value={censusData?.ownerOccupiedVsRenterOccupied?.ownerOccupied} />
            <DetailsCard label="Renter-Occupied Housing Units" value={censusData?.ownerOccupiedVsRenterOccupied?.renterOccupied} />
          </DetailsModal>
          <FactCard label="Owners without morgages" type="percent" value={censusData?.percentOwnersNoMorgage} icon={<Home className={styles.icon} />} />
          <FactCard label="Owner morgage ≥ 30% household income" type="percent" value={censusData?.morgageGreaterThan30Percent} icon={<Home className={styles.icon} />} />
          <FactCard label="Rent ≥ 30% household income" type="string" value={censusData?.rentGreaterThan30Percent} icon={<Home className={styles.icon} />} />
          <FactCard label="Percent not US citizens" type="percent" value={censusData?.nonCitizens} icon={<Population className={styles.icon} />} />
          <FactCard label="Flood Risk" type="string" value={convertFloodZoneToRisk(floodData?.[0]?.floodZone)} icon={<WarningIcon className={styles.icon} />} />
          <FactCard
            label="Flood Zone"
            type="string"
            value={floodData?.[0]?.floodZone || "Unknown"}
            icon={<FloodIcon className={styles.icon} />}
            seeMoreOnClick={() => setOpenFloodZoneMap(true)}
          />
          <FloodZoneModal open={openFloodZoneMap} handleClose={handleCloseModals}>
            <FactCard label="Flood Zone" type="string" value={floodData?.[0]?.floodZone || "Unknown"} icon={<FloodIcon className={styles.icon} />}></FactCard>
          </FloodZoneModal>
        </div>
      </Box>
    </TabLayout>
  );
}

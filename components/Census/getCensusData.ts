import census from "citysdk";

export interface LatLong {
  lat: number;
  lng: number;
}

const dataRequests: any = {
  B15003_022E: { label: "EDUCATIONAL_ATTAINMENT_FOR_THE_POPULATION____YEARS_AND_OVER_ESTIMATE__TOTAL___BACHELOR_S_DEGREE" },
  B15003_001E: { label: "EDUCATIONAL_ATTAINMENT_FOR_THE_POPULATION____YEARS_AND_OVER_ESTIMATE__TOTAL_" },
  B11012_002E: { label: "HOUSEHOLDS_BY_TYPE_ESTIMATE__TOTAL___MARRIED_COUPLE_HOUSEHOLD_" },
  B11012_001E: { label: "HOUSEHOLDS_BY_TYPE_ESTIMATE__TOTAL_" },
  B24011_001E: {
    label: "OCCUPATION_BY_MEDIAN_EARNINGS_IN_THE_PAST____MONTHS__IN______INFLATION_ADJUSTED_DOLLARS__FOR_THE_CIVILIAN_EMPLOYED_POPULATION____YEARS_AND_OVER_ESTIMATE__TOTAL_",
  },
  B25004_001E: { label: "VACANCY_STATUS_ESTIMATE__TOTAL_" },
  B25004_002E: { label: "VACANCY_STATUS_ESTIMATE__TOTAL___FOR_RENT" },
  B06002_001E: { label: "MEDIAN_AGE_BY_PLACE_OF_BIRTH_IN_THE_UNITED_STATES_ESTIMATE__MEDIAN_AGE_____TOTAL_" },
  B06002PR_001E: { label: "MEDIAN_AGE_BY_PLACE_OF_BIRTH_IN_PUERTO_RICO_ESTIMATE__MEDIAN_AGE_____TOTAL_" },
  B07013_002E: {
    label: "GEOGRAPHICAL_MOBILITY_IN_THE_PAST_YEAR_BY_TENURE_FOR_CURRENT_RESIDENCE_IN_THE_UNITED_STATES_ESTIMATE__TOTAL___HOUSEHOLDER_LIVED_IN_OWNER_OCCUPIED_HOUSING_UNITS",
  },
  B07013_003E: {
    label: "GEOGRAPHICAL_MOBILITY_IN_THE_PAST_YEAR_BY_TENURE_FOR_CURRENT_RESIDENCE_IN_THE_UNITED_STATES_ESTIMATE__TOTAL___HOUSEHOLDER_LIVED_IN_RENTER_OCCUPIED_HOUSING_UNITS",
  },
  C17002_001E: { label: "RATIO_OF_INCOME_TO_POVERTY_LEVEL_IN_THE_PAST____MONTHS_ESTIMATE__TOTAL_" },
  B05001_006E: { label: "NATIVITY_AND_CITIZENSHIP_STATUS_IN_THE_UNITED_STATES_ESTIMATE__TOTAL___NOT_A_U_S__CITIZEN" },
  B05001_001E: { label: "NATIVITY_AND_CITIZENSHIP_STATUS_IN_THE_UNITED_STATES_ESTIMATE__TOTAL_" },
  B02001_001E: { label: "RACE_ESTIMATE__TOTAL_" },
  B02001_002E: { label: "RACE_ESTIMATE__TOTAL___WHITE_ALONE" },
  B02001_003E: { label: "RACE_ESTIMATE__TOTAL___BLACK_OR_AFRICAN_AMERICAN_ALONE" },
  B02001_004E: { label: "RACE_ESTIMATE__TOTAL___AMERICAN_INDIAN_AND_ALASKA_NATIVE_ALONE" },
  B02001_005E: { label: "RACE_ESTIMATE__TOTAL___ASIAN_ALONE" },
  B02001_006E: { label: "RACE_ESTIMATE__TOTAL___NATIVE_HAWAIIAN_AND_OTHER_PACIFIC_ISLANDER_ALONE" },
  B02001_007E: { label: "RACE_ESTIMATE__TOTAL___SOME_OTHER_RACE_ALONE" },
  B02001_008E: { label: "RACE_ESTIMATE__TOTAL___TWO_OR_MORE_RACES_" },
  C17002_002E: { label: "RATIO_OF_INCOME_TO_POVERTY_LEVEL_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___UNDER__50" },
  C17002_003E: { label: "RATIO_OF_INCOME_TO_POVERTY_LEVEL_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL____50_TO__99" },
  B23025_005E: { label: "EMPLOYMENT_STATUS_FOR_THE_POPULATION_16_YEARS_AND_OVER_ESTIMATE__TOTAL___IN_LABOR_FORCE___CIVILIAN_LABOR_FORCE___UNEMPLOYED" },
  B23025_001E: { label: "EMPLOYMENT_STATUS_FOR_THE_POPULATION_16_YEARS_AND_OVER_ESTIMATE__TOTAL_" },
  B25091_013E: {
    label: "MORTGAGE_STATUS_BY_SELECTED_MONTHLY_OWNER_COSTS_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___HOUSING_UNITS_WITHOUT_A_MORTGAGE_",
  },
  B25091_002E: {
    label: "MORTGAGE_STATUS_BY_SELECTED_MONTHLY_OWNER_COSTS_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___HOUSING_UNITS_WITH_A_MORTGAGE_",
  },
  B25091_008E: {
    label:
      "MORTGAGE_STATUS_BY_SELECTED_MONTHLY_OWNER_COSTS_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___HOUSING_UNITS_WITH_A_MORTGAGE___30_0_TO_34_9_PERCENT",
  },
  B25091_009E: {
    label:
      "MORTGAGE_STATUS_BY_SELECTED_MONTHLY_OWNER_COSTS_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___HOUSING_UNITS_WITH_A_MORTGAGE___35_0_TO_39_9_PERCENT",
  },
  B25091_010E: {
    label:
      "MORTGAGE_STATUS_BY_SELECTED_MONTHLY_OWNER_COSTS_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___HOUSING_UNITS_WITH_A_MORTGAGE___40_0_TO_49_9_PERCENT",
  },
  B25091_011E: {
    label:
      "MORTGAGE_STATUS_BY_SELECTED_MONTHLY_OWNER_COSTS_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___HOUSING_UNITS_WITH_A_MORTGAGE___50_0_PERCENT_OR_MORE",
  },
  B25070_007E: { label: "GROSS_RENT_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___30_0_TO_34_9_PERCENT" },
  B25070_008E: { label: "GROSS_RENT_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___35_0_TO_39_9_PERCENT" },
  B25070_009E: { label: "GROSS_RENT_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___40_0_TO_49_9_PERCENT" },
  B25070_010E: { label: "GROSS_RENT_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___50_0_PERCENT_OR_MORE" },
  B25070_001E: { label: "GROSS_RENT_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL_" },
  B01001_001E: { label: "TOTAL_POPULATION" },
  B01002_001E: { label: "MEDIAN_AGE_TOTAL" },
  B05011_001E: { label: "FOREIGN_BORN_POPULATION" },
  B25002_001E: { label: "TOTAL_HOUSING_UNITS" },
  B25002_003E: { label: "VACANT_HOUSING_UNITS" },
  B25003_001E: { label: "TOTAL_OCCUPIED_HOUSING_UNITS" },
  B25003_002E: { label: "OWNER_OCCUPIED_HOUSING_UNITS" },
  B25003_003E: { label: "RENTER_OCCUPIED_HOUSING_UNITS" },
  B25058_001E: { label: "MEDIAN_CONTRACT_RENT" },
  B25077_001E: { label: "MEDIAN_HOME_VALUE" },
  B19013_001E: { label: "MEDIAN_HOUSEHOLD_INCOME" },
};

const deriveCensusData = (mappedDt: any) => {
  const convertToPercentage = (num: number) => Math.round(num * 100);

  const rentGreaterThan30Percent = 0;

  const {
    MORTGAGE_STATUS_BY_SELECTED_MONTHLY_OWNER_COSTS_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___HOUSING_UNITS_WITH_A_MORTGAGE_,
    MORTGAGE_STATUS_BY_SELECTED_MONTHLY_OWNER_COSTS_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___HOUSING_UNITS_WITH_A_MORTGAGE___30_0_TO_34_9_PERCENT,
    MORTGAGE_STATUS_BY_SELECTED_MONTHLY_OWNER_COSTS_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___HOUSING_UNITS_WITH_A_MORTGAGE___35_0_TO_39_9_PERCENT,
    MORTGAGE_STATUS_BY_SELECTED_MONTHLY_OWNER_COSTS_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___HOUSING_UNITS_WITH_A_MORTGAGE___40_0_TO_49_9_PERCENT,
    MORTGAGE_STATUS_BY_SELECTED_MONTHLY_OWNER_COSTS_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___HOUSING_UNITS_WITH_A_MORTGAGE___50_0_PERCENT_OR_MORE,
    EDUCATIONAL_ATTAINMENT_FOR_THE_POPULATION____YEARS_AND_OVER_ESTIMATE__TOTAL_,
    EDUCATIONAL_ATTAINMENT_FOR_THE_POPULATION____YEARS_AND_OVER_ESTIMATE__TOTAL___BACHELOR_S_DEGREE,
    HOUSEHOLDS_BY_TYPE_ESTIMATE__TOTAL_,
    HOUSEHOLDS_BY_TYPE_ESTIMATE__TOTAL___MARRIED_COUPLE_HOUSEHOLD_,
    GEOGRAPHICAL_MOBILITY_IN_THE_PAST_YEAR_BY_TENURE_FOR_CURRENT_RESIDENCE_IN_THE_UNITED_STATES_ESTIMATE__TOTAL___HOUSEHOLDER_LIVED_IN_OWNER_OCCUPIED_HOUSING_UNITS,
    GEOGRAPHICAL_MOBILITY_IN_THE_PAST_YEAR_BY_TENURE_FOR_CURRENT_RESIDENCE_IN_THE_UNITED_STATES_ESTIMATE__TOTAL___HOUSEHOLDER_LIVED_IN_RENTER_OCCUPIED_HOUSING_UNITS,
    VACANCY_STATUS_ESTIMATE__TOTAL_,
    RATIO_OF_INCOME_TO_POVERTY_LEVEL_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL____50_TO__99,
    RATIO_OF_INCOME_TO_POVERTY_LEVEL_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___UNDER__50,
    RATIO_OF_INCOME_TO_POVERTY_LEVEL_IN_THE_PAST____MONTHS_ESTIMATE__TOTAL_,
    NATIVITY_AND_CITIZENSHIP_STATUS_IN_THE_UNITED_STATES_ESTIMATE__TOTAL_,
    NATIVITY_AND_CITIZENSHIP_STATUS_IN_THE_UNITED_STATES_ESTIMATE__TOTAL___NOT_A_U_S__CITIZEN,
    MORTGAGE_STATUS_BY_SELECTED_MONTHLY_OWNER_COSTS_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___HOUSING_UNITS_WITHOUT_A_MORTGAGE_,
    EMPLOYMENT_STATUS_FOR_THE_POPULATION_16_YEARS_AND_OVER_ESTIMATE__TOTAL_,
    EMPLOYMENT_STATUS_FOR_THE_POPULATION_16_YEARS_AND_OVER_ESTIMATE__TOTAL___IN_LABOR_FORCE___CIVILIAN_LABOR_FORCE___UNEMPLOYED,
    RACE_ESTIMATE__TOTAL___AMERICAN_INDIAN_AND_ALASKA_NATIVE_ALONE,
    RACE_ESTIMATE__TOTAL___ASIAN_ALONE,
    RACE_ESTIMATE__TOTAL___BLACK_OR_AFRICAN_AMERICAN_ALONE,
    RACE_ESTIMATE__TOTAL___NATIVE_HAWAIIAN_AND_OTHER_PACIFIC_ISLANDER_ALONE,
    RACE_ESTIMATE__TOTAL___SOME_OTHER_RACE_ALONE,
    RACE_ESTIMATE__TOTAL___TWO_OR_MORE_RACES_,
    RACE_ESTIMATE__TOTAL___WHITE_ALONE,
    OCCUPATION_BY_MEDIAN_EARNINGS_IN_THE_PAST____MONTHS__IN______INFLATION_ADJUSTED_DOLLARS__FOR_THE_CIVILIAN_EMPLOYED_POPULATION____YEARS_AND_OVER_ESTIMATE__TOTAL_,
    VACANCY_STATUS_ESTIMATE__TOTAL___FOR_RENT,
    MEDIAN_AGE_BY_PLACE_OF_BIRTH_IN_THE_UNITED_STATES_ESTIMATE__MEDIAN_AGE_____TOTAL_,
    TOTAL_POPULATION,
    MEDIAN_AGE_TOTAL,
    FOREIGN_BORN_POPULATION,
    VACANT_HOUSING_UNITS,
    TOTAL_HOUSING_UNITS,
    TOTAL_OCCUPIED_HOUSING_UNITS,
    OWNER_OCCUPIED_HOUSING_UNITS,
    RENTER_OCCUPIED_HOUSING_UNITS,
    MEDIAN_CONTRACT_RENT,
    MEDIAN_HOME_VALUE,
  } = mappedDt;

  const morgageGreaterThan30Percent = convertToPercentage(
    (MORTGAGE_STATUS_BY_SELECTED_MONTHLY_OWNER_COSTS_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___HOUSING_UNITS_WITH_A_MORTGAGE___30_0_TO_34_9_PERCENT +
      MORTGAGE_STATUS_BY_SELECTED_MONTHLY_OWNER_COSTS_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___HOUSING_UNITS_WITH_A_MORTGAGE___35_0_TO_39_9_PERCENT +
      MORTGAGE_STATUS_BY_SELECTED_MONTHLY_OWNER_COSTS_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___HOUSING_UNITS_WITH_A_MORTGAGE___40_0_TO_49_9_PERCENT +
      MORTGAGE_STATUS_BY_SELECTED_MONTHLY_OWNER_COSTS_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___HOUSING_UNITS_WITH_A_MORTGAGE___50_0_PERCENT_OR_MORE) /
      MORTGAGE_STATUS_BY_SELECTED_MONTHLY_OWNER_COSTS_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___HOUSING_UNITS_WITH_A_MORTGAGE_,
  );

  const percentOfAdultsWithBatchlorsDegree = convertToPercentage(
    EDUCATIONAL_ATTAINMENT_FOR_THE_POPULATION____YEARS_AND_OVER_ESTIMATE__TOTAL___BACHELOR_S_DEGREE /
      EDUCATIONAL_ATTAINMENT_FOR_THE_POPULATION____YEARS_AND_OVER_ESTIMATE__TOTAL_,
  );

  const percentageOfHomesWithMarriedCouples = convertToPercentage(HOUSEHOLDS_BY_TYPE_ESTIMATE__TOTAL___MARRIED_COUPLE_HOUSEHOLD_ / HOUSEHOLDS_BY_TYPE_ESTIMATE__TOTAL_);

  const owners =
    GEOGRAPHICAL_MOBILITY_IN_THE_PAST_YEAR_BY_TENURE_FOR_CURRENT_RESIDENCE_IN_THE_UNITED_STATES_ESTIMATE__TOTAL___HOUSEHOLDER_LIVED_IN_OWNER_OCCUPIED_HOUSING_UNITS;
  const renters =
    GEOGRAPHICAL_MOBILITY_IN_THE_PAST_YEAR_BY_TENURE_FOR_CURRENT_RESIDENCE_IN_THE_UNITED_STATES_ESTIMATE__TOTAL___HOUSEHOLDER_LIVED_IN_RENTER_OCCUPIED_HOUSING_UNITS;

  const totalOwnersAndRenters = VACANCY_STATUS_ESTIMATE__TOTAL_;

  const percentUnderPoverty = convertToPercentage(
    (RATIO_OF_INCOME_TO_POVERTY_LEVEL_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___UNDER__50 +
      RATIO_OF_INCOME_TO_POVERTY_LEVEL_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL____50_TO__99) /
      RATIO_OF_INCOME_TO_POVERTY_LEVEL_IN_THE_PAST____MONTHS_ESTIMATE__TOTAL_,
  );

  const nonCitizens = convertToPercentage(
    NATIVITY_AND_CITIZENSHIP_STATUS_IN_THE_UNITED_STATES_ESTIMATE__TOTAL___NOT_A_U_S__CITIZEN / NATIVITY_AND_CITIZENSHIP_STATUS_IN_THE_UNITED_STATES_ESTIMATE__TOTAL_,
  );

  const percentOwnersNoMorgage = convertToPercentage(
    MORTGAGE_STATUS_BY_SELECTED_MONTHLY_OWNER_COSTS_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___HOUSING_UNITS_WITHOUT_A_MORTGAGE_ /
      (MORTGAGE_STATUS_BY_SELECTED_MONTHLY_OWNER_COSTS_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___HOUSING_UNITS_WITH_A_MORTGAGE_ +
        MORTGAGE_STATUS_BY_SELECTED_MONTHLY_OWNER_COSTS_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___HOUSING_UNITS_WITHOUT_A_MORTGAGE_),
  );

  const unemploymentRate =
    EMPLOYMENT_STATUS_FOR_THE_POPULATION_16_YEARS_AND_OVER_ESTIMATE__TOTAL___IN_LABOR_FORCE___CIVILIAN_LABOR_FORCE___UNEMPLOYED /
    EMPLOYMENT_STATUS_FOR_THE_POPULATION_16_YEARS_AND_OVER_ESTIMATE__TOTAL_;

  const totalWhite = RACE_ESTIMATE__TOTAL___WHITE_ALONE;
  const totalBlack = RACE_ESTIMATE__TOTAL___BLACK_OR_AFRICAN_AMERICAN_ALONE;
  const totalIndianAlaskanNative = RACE_ESTIMATE__TOTAL___AMERICAN_INDIAN_AND_ALASKA_NATIVE_ALONE;
  const totalAsian = RACE_ESTIMATE__TOTAL___ASIAN_ALONE;
  const totalIslander = RACE_ESTIMATE__TOTAL___NATIVE_HAWAIIAN_AND_OTHER_PACIFIC_ISLANDER_ALONE;
  const totalOther = RACE_ESTIMATE__TOTAL___SOME_OTHER_RACE_ALONE;
  const twoOrMore = RACE_ESTIMATE__TOTAL___TWO_OR_MORE_RACES_;

  const raceMap = [
    { white: totalWhite },
    { black: totalBlack },
    { indian: totalIndianAlaskanNative },
    { asian: totalAsian },
    { islander: totalIslander },
    { other: totalOther },
  ];

  const dominantRace = raceMap.reduce(
    (a, c) => {
      const val = Object.values(c)[0];
      const key = Object.keys(c)[0];

      if (val > a.number) {
        a.number = val;
        a.label = key;
      }

      return a;
    },
    { number: 0, label: "" },
  );

  return {
    percentOfAdultsWithBatchlorsDegree,
    morgageGreaterThan30Percent,
    rentGreaterThan30Percent,
    percentageOfHomesWithMarriedCouples,
    percentUnderPoverty,
    nonCitizens,
    percentOwnersNoMorgage,
    dominantRace: dominantRace.label,
    averageSalary:
      OCCUPATION_BY_MEDIAN_EARNINGS_IN_THE_PAST____MONTHS__IN______INFLATION_ADJUSTED_DOLLARS__FOR_THE_CIVILIAN_EMPLOYED_POPULATION____YEARS_AND_OVER_ESTIMATE__TOTAL_,
    vacantHomes: VACANCY_STATUS_ESTIMATE__TOTAL_,
    vacantUnitsForRent: VACANCY_STATUS_ESTIMATE__TOTAL___FOR_RENT,
    medianAge: MEDIAN_AGE_BY_PLACE_OF_BIRTH_IN_THE_UNITED_STATES_ESTIMATE__MEDIAN_AGE_____TOTAL_,
    unemploymentRate: convertToPercentage(unemploymentRate),
    owners: convertToPercentage(owners / totalOwnersAndRenters), //!not working
    renters: convertToPercentage(renters / totalOwnersAndRenters), //!not working
    raceData: {
      totalWhite,
      totalBlack,
      totalAsian,
      totalIndianAlaskanNative,
      totalIslander,
      totalOther,
    },
    population: {
      total: TOTAL_POPULATION,
      medianAge: MEDIAN_AGE_TOTAL,
      foreginBorn: FOREIGN_BORN_POPULATION,
      foreginBornPercent: FOREIGN_BORN_POPULATION && TOTAL_POPULATION && convertToPercentage(FOREIGN_BORN_POPULATION / TOTAL_POPULATION),
    },
    vacantHousingUnits: {
      percentage: VACANT_HOUSING_UNITS && TOTAL_HOUSING_UNITS && convertToPercentage(VACANT_HOUSING_UNITS / TOTAL_HOUSING_UNITS),
      totalHousingUnits: TOTAL_HOUSING_UNITS,
      vacantHousingUnits: VACANT_HOUSING_UNITS,
      totalOccupiedHousingUnits: TOTAL_OCCUPIED_HOUSING_UNITS,
    },
    ownerOccupiedVsRenterOccupied: {
      ownerOccupied: OWNER_OCCUPIED_HOUSING_UNITS,
      ownerOccupiedPercentage: OWNER_OCCUPIED_HOUSING_UNITS && TOTAL_HOUSING_UNITS && convertToPercentage(OWNER_OCCUPIED_HOUSING_UNITS / TOTAL_HOUSING_UNITS),
      renterOccupied: RENTER_OCCUPIED_HOUSING_UNITS,
      renterOccupiedPercentage: RENTER_OCCUPIED_HOUSING_UNITS && TOTAL_HOUSING_UNITS && convertToPercentage(RENTER_OCCUPIED_HOUSING_UNITS / TOTAL_HOUSING_UNITS),
    },
    medianContractRent: MEDIAN_CONTRACT_RENT,
    medianHomeValue: MEDIAN_HOME_VALUE,
  };
};
export interface CensusData {
  percentOfAdultsWithBatchlorsDegree: number;
  percentageOfHomesWithMarriedCouples: number;
  morgageGreaterThan30Percent: number;
  rentGreaterThan30Percent: number;
  percentUnderPoverty: number;
  nonCitizens: number;
  dominantRace: string;
  averageSalary: number;
  vacantHomes: number;
  vacantUnitsForRent: number;
  medianAge: number;
  owners: number;
  renters: number;
  percentOwnersNoMorgage: number;
  unemploymentRate: number;
  raceData: {
    totalWhite: number;
    totalBlack: number;
    totalAsian: number;
    totalIndianAlaskanNative: number;
    totalIslander: number;
    totalOther: number;
  };
  population: {
    total: number;
    medianAge: number;
    foreginBorn: number;
    foreginBornPercent: number;
  };
  vacantHousingUnits: {
    percentage: number;
    totalHousingUnits: number;
    vacantHousingUnits: number;
    totalOccupiedHousingUnits: number;
  };
  ownerOccupiedVsRenterOccupied: {
    ownerOccupied: number;
    ownerOccupiedPercentage: number;
    renterOccupied: number;
    renterOccupiedPercentage: number;
  };
  medianContractRent: number;
  medianHomeValue: number;
}

//* Gets the raw census data
const getCensusData = (latlng: LatLong): Promise<CensusData> => {
  //https://api.census.gov/data/2021/acs/acs5/variables.html

  const vals = Object.entries(dataRequests).reduce<string[]>((a, x) => {
    const keyValue = x[0];
    a.push(keyValue);
    return a;
  }, []);

  return new Promise((resolve, rej) => {
    census(
      {
        vintage: 2021, // required
        geoHierarchy: {
          // required
          tract: {
            ...latlng,
          },
        },
        sourcePath: ["acs", "acs5"],
        values: [...vals],
        //geoResolution: '500k', // required
        //values: [], // required
      },
      async (err: any, res: any[]) => {
        let response = res[0];

        const mappedValues = Object.entries(response).reduce<any>((a, c) => {
          const key = c[0];

          if (!dataRequests[key]) return a;

          if (!dataRequests[key]?.label) return a;

          a[dataRequests[key].label] = c[1];
          return a;
        }, {});

        resolve(deriveCensusData(mappedValues));
      },
    );
  });
};

export default getCensusData;

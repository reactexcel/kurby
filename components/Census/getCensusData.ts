import census from "citysdk";

interface LatLong {
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
};

const deriveCensusData = (mappedDt: any) => {
  const convertToPercentage = (num: number) => {
    return Math.round(num * 100);
  };

  /* const rentGreaterThan30Percent = convertToPercentage(
    (mappedDt.GROSS_RENT_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___30_0_TO_34_9_PERCENT +
      mappedDt.GROSS_RENT_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___35_0_TO_39_9_PERCENT +
      mappedDt.GROSS_RENT_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___40_0_TO_49_9_PERCENT +
      mappedDt.GROSS_RENT_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___50_0_PERCENT_OR_MORE) /
      mappedDt.GROSS_RENT_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL_,
  ); */
  const rentGreaterThan30Percent = 0;

  const morgageGreaterThan30Percent = convertToPercentage(
    (mappedDt.MORTGAGE_STATUS_BY_SELECTED_MONTHLY_OWNER_COSTS_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___HOUSING_UNITS_WITH_A_MORTGAGE___30_0_TO_34_9_PERCENT +
      mappedDt.MORTGAGE_STATUS_BY_SELECTED_MONTHLY_OWNER_COSTS_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___HOUSING_UNITS_WITH_A_MORTGAGE___35_0_TO_39_9_PERCENT +
      mappedDt.MORTGAGE_STATUS_BY_SELECTED_MONTHLY_OWNER_COSTS_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___HOUSING_UNITS_WITH_A_MORTGAGE___40_0_TO_49_9_PERCENT +
      mappedDt.MORTGAGE_STATUS_BY_SELECTED_MONTHLY_OWNER_COSTS_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___HOUSING_UNITS_WITH_A_MORTGAGE___50_0_PERCENT_OR_MORE) /
      mappedDt.MORTGAGE_STATUS_BY_SELECTED_MONTHLY_OWNER_COSTS_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___HOUSING_UNITS_WITH_A_MORTGAGE_,
  );

  const percentOfAdultsWithBatchlorsDegree = convertToPercentage(
    mappedDt.EDUCATIONAL_ATTAINMENT_FOR_THE_POPULATION____YEARS_AND_OVER_ESTIMATE__TOTAL___BACHELOR_S_DEGREE /
      mappedDt.EDUCATIONAL_ATTAINMENT_FOR_THE_POPULATION____YEARS_AND_OVER_ESTIMATE__TOTAL_,
  );

  const percentageOfHomesWithMarriedCouples = convertToPercentage(
    mappedDt.HOUSEHOLDS_BY_TYPE_ESTIMATE__TOTAL___MARRIED_COUPLE_HOUSEHOLD_ / mappedDt.HOUSEHOLDS_BY_TYPE_ESTIMATE__TOTAL_,
  );

  const owners =
    mappedDt.GEOGRAPHICAL_MOBILITY_IN_THE_PAST_YEAR_BY_TENURE_FOR_CURRENT_RESIDENCE_IN_THE_UNITED_STATES_ESTIMATE__TOTAL___HOUSEHOLDER_LIVED_IN_OWNER_OCCUPIED_HOUSING_UNITS;
  const renters =
    mappedDt.GEOGRAPHICAL_MOBILITY_IN_THE_PAST_YEAR_BY_TENURE_FOR_CURRENT_RESIDENCE_IN_THE_UNITED_STATES_ESTIMATE__TOTAL___HOUSEHOLDER_LIVED_IN_RENTER_OCCUPIED_HOUSING_UNITS;

  const totalOwnersAndRenters = mappedDt.VACANCY_STATUS_ESTIMATE__TOTAL_;

  const percentUnderPoverty = convertToPercentage(
    (mappedDt.RATIO_OF_INCOME_TO_POVERTY_LEVEL_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___UNDER__50 +
      mappedDt.RATIO_OF_INCOME_TO_POVERTY_LEVEL_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL____50_TO__99) /
      mappedDt.RATIO_OF_INCOME_TO_POVERTY_LEVEL_IN_THE_PAST____MONTHS_ESTIMATE__TOTAL_,
  );

  const nonCitizens = convertToPercentage(
    mappedDt.NATIVITY_AND_CITIZENSHIP_STATUS_IN_THE_UNITED_STATES_ESTIMATE__TOTAL___NOT_A_U_S__CITIZEN /
      mappedDt.NATIVITY_AND_CITIZENSHIP_STATUS_IN_THE_UNITED_STATES_ESTIMATE__TOTAL_,
  );

  console.log(
    "mappedDt.EMPLOYMENT_STATUS_FOR_THE_POPULATION_16_YEARS_AND_OVER_ESTIMATE__TOTAL_",
    mappedDt.EMPLOYMENT_STATUS_FOR_THE_POPULATION_16_YEARS_AND_OVER_ESTIMATE__TOTAL_,
  );

  const percentOwnersNoMorgage = convertToPercentage(
    mappedDt.MORTGAGE_STATUS_BY_SELECTED_MONTHLY_OWNER_COSTS_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___HOUSING_UNITS_WITHOUT_A_MORTGAGE_ /
      (mappedDt.MORTGAGE_STATUS_BY_SELECTED_MONTHLY_OWNER_COSTS_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___HOUSING_UNITS_WITH_A_MORTGAGE_ +
        mappedDt.MORTGAGE_STATUS_BY_SELECTED_MONTHLY_OWNER_COSTS_AS_A_PERCENTAGE_OF_HOUSEHOLD_INCOME_IN_THE_PAST_12_MONTHS_ESTIMATE__TOTAL___HOUSING_UNITS_WITHOUT_A_MORTGAGE_),
  );

  const unemploymentRate =
    mappedDt.EMPLOYMENT_STATUS_FOR_THE_POPULATION_16_YEARS_AND_OVER_ESTIMATE__TOTAL___IN_LABOR_FORCE___CIVILIAN_LABOR_FORCE___UNEMPLOYED /
    mappedDt.EMPLOYMENT_STATUS_FOR_THE_POPULATION_16_YEARS_AND_OVER_ESTIMATE__TOTAL_;

  const totalRacePopulation = mappedDt.B02001_001E;
  const totalWhite = mappedDt.RACE_ESTIMATE__TOTAL___WHITE_ALONE;
  const totalBlack = mappedDt.RACE_ESTIMATE__TOTAL___BLACK_OR_AFRICAN_AMERICAN_ALONE;
  const totalIndianAlaskanNative = mappedDt.RACE_ESTIMATE__TOTAL___AMERICAN_INDIAN_AND_ALASKA_NATIVE_ALONE;
  const totalAsian = mappedDt.RACE_ESTIMATE__TOTAL___ASIAN_ALONE;
  const totalIslander = mappedDt.RACE_ESTIMATE__TOTAL___NATIVE_HAWAIIAN_AND_OTHER_PACIFIC_ISLANDER_ALONE;
  const totalOther = mappedDt.RACE_ESTIMATE__TOTAL___SOME_OTHER_RACE_ALONE;
  const twoOrMore = mappedDt.RACE_ESTIMATE__TOTAL___TWO_OR_MORE_RACES_;

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
      mappedDt.OCCUPATION_BY_MEDIAN_EARNINGS_IN_THE_PAST____MONTHS__IN______INFLATION_ADJUSTED_DOLLARS__FOR_THE_CIVILIAN_EMPLOYED_POPULATION____YEARS_AND_OVER_ESTIMATE__TOTAL_,
    vacantHomes: mappedDt.VACANCY_STATUS_ESTIMATE__TOTAL_,
    vacantUnitsForRent: mappedDt.VACANCY_STATUS_ESTIMATE__TOTAL___FOR_RENT,
    medianAge: mappedDt.MEDIAN_AGE_BY_PLACE_OF_BIRTH_IN_THE_UNITED_STATES_ESTIMATE__MEDIAN_AGE_____TOTAL_,
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

        //console.log("mappedValues", mappedValues);
        resolve(deriveCensusData(mappedValues));
      },
    );
  });
};

export default getCensusData;

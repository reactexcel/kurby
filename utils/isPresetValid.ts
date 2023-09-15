const validPresets = [
  "living",
  "shortTermRental",
  "buyAndHold",
  "domesticTourism",
  "internationalTourism",
  "glamping",
  "realEstateDeveloper",
  "vacationHome",
  "retireeLiving",
  "corporateRelocation",
  "luxuryEstates",
];

export const isPresetValid = (preset: string): boolean => {
  return validPresets.includes(preset);
};

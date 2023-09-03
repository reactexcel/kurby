export type VariantType = "explainedLikeAlocal" | "greenFlags" | "redFlags";

export interface OpenAiResponseType {
  living?: {
    explainedLikeAlocal?: string;
    greenFlags?: string;
    redFlags?: string;
  };
  domesticTourism?: string;
  internationalTourism?: string;
  shortTermRental?: string;
  buyAndHold?: string;
  glamping?: string;
  realEstateDeveloper?: string;
  vacationHome?: string;
  retireeLiving?: string;
  corporateRelocation?: string;
  luxuryEstates?: string;
}

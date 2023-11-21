import RequiresProPlan from "components/RequiresProPlanHeaading/RequiresProPlan";
import styles from "../FinancialMortgage/FinancialMortgage.module.scss";
import { InformationTable, createData } from "components/BodyContent/InformationTable/InformationTable";
import { IAppPlans } from "context/plansContext";
import { propertyDetailContext } from "context/propertyContext";
import { useRecoilState } from "recoil";

export function AdditionalPropertyInformation() {
  const [propertyDetail] = useRecoilState(propertyDetailContext);
  const propertyInfo = propertyDetail?.propertyInfo;
  const propertyHouseData = [
    createData("Basement Finished Percent", propertyInfo?.basementFinishedPercent, IAppPlans.PROFESSIONAL),
    createData("Basement Square Feet", propertyInfo?.basementSquareFeet, IAppPlans.PROFESSIONAL),
    createData("Basement Square Feet Finished", propertyInfo?.basementSquareFeetFinished, IAppPlans.PROFESSIONAL),
    createData("Basement Square Feet Unfinished", propertyInfo?.basementSquareFeetUnfinished, IAppPlans.PROFESSIONAL),
    createData("Basement Type", propertyInfo?.basementType, IAppPlans.PROFESSIONAL),
    createData("Bathrooms", propertyInfo?.bathrooms, IAppPlans.PROFESSIONAL),
    createData("Bedrooms", propertyInfo?.bedrooms, IAppPlans.PROFESSIONAL),
    createData("Building Square Feet", propertyInfo?.buildingSquareFeet, IAppPlans.PROFESSIONAL),
    createData("Construction", propertyInfo?.construction, IAppPlans.PROFESSIONAL),
    createData("Fireplace", propertyInfo?.fireplace, IAppPlans.PROFESSIONAL),
    createData("Fireplaces", propertyInfo?.fireplaces, IAppPlans.PROFESSIONAL),
    createData("Garage Type", propertyInfo?.garageType, IAppPlans.PROFESSIONAL),
    createData("Garage Square Feet", propertyInfo?.garageSquareFeet, IAppPlans.PROFESSIONAL),
    createData("Garage Square Feet Finished", propertyInfo?.garageSquareFeetFinished, IAppPlans.PROFESSIONAL),
    createData("Garage Square Feet Unfinished", propertyInfo?.garageSquareFeetUnfinished, IAppPlans.PROFESSIONAL),
    createData("Heating Type", propertyInfo?.heatingType, IAppPlans.PROFESSIONAL),
    createData("Living Square Feet", propertyInfo?.livingSquareFeet, IAppPlans.PROFESSIONAL),
    createData("Parking Spaces", propertyInfo?.parkingSpaces, IAppPlans.PROFESSIONAL),
    createData("Partial Bathrooms", propertyInfo?.partialBathrooms, IAppPlans.PROFESSIONAL),
    createData("Pool", propertyInfo?.pool, IAppPlans.PROFESSIONAL),
    createData("Pool Area", propertyInfo?.poolArea, IAppPlans.PROFESSIONAL),
    createData("Stories", propertyInfo?.stories, IAppPlans.PROFESSIONAL),
    createData("Attic", propertyInfo?.attic, IAppPlans.PROFESSIONAL),
    createData("Deck Area (sq ft)", propertyInfo?.deckArea, IAppPlans.PROFESSIONAL),
    createData("Patio Area (sq ft)", propertyInfo?.patioArea, IAppPlans.PROFESSIONAL),
    createData("Porch Type", propertyInfo?.porchType, IAppPlans.PROFESSIONAL),
    createData("Porch Area (sq ft)", propertyInfo?.porchArea, IAppPlans.PROFESSIONAL),
    createData("Fire Sprinklers", propertyInfo?.safetyFireSprinklers, IAppPlans.PROFESSIONAL),
    createData("Water Source", propertyInfo?.utilitiesWaterSource, IAppPlans.PROFESSIONAL),
    createData("Sewage Usage", propertyInfo?.utilitiesSewageUsage, IAppPlans.PROFESSIONAL),
    createData("RV Parking", propertyInfo?.rvParking, IAppPlans.PROFESSIONAL),
  ];

  return (
    <>
      <RequiresProPlan title={"Additional Property Information"} />
      <InformationTable dataFields={propertyHouseData} />
    </>
  );
}

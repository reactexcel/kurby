import styles from "../FinancialMortgage/FinancialMortgage.module.scss";
import { InformationTable, createData } from "components/BodyContent/InformationTable/InformationTable";
import { propertyDetailContext } from "context/propertyContext";
import { useRecoilState } from "recoil";

export function AdditionalPropertyInformation() {
  const [propertyDetail] = useRecoilState(propertyDetailContext);
  const propertyInfo = propertyDetail?.propertyInfo;
  const propertyHouseData = [
    createData("Basement Finished Percent", propertyInfo?.basementFinishedPercent),
    createData("Basement Square Feet", propertyInfo?.basementSquareFeet),
    createData("Basement Square Feet Finished", propertyInfo?.basementSquareFeetFinished),
    createData("Basement Square Feet Unfinished", propertyInfo?.basementSquareFeetUnfinished),
    createData("Basement Type", propertyInfo?.basementType),
    createData("Bathrooms", propertyInfo?.bathrooms),
    createData("Bedrooms", propertyInfo?.bedrooms),
    createData("Building Square Feet", propertyInfo?.buildingSquareFeet),
    createData("Fireplace", propertyInfo?.fireplace),
    createData("Fireplaces", propertyInfo?.fireplaces),
    createData("Garage Square Feet", propertyInfo?.garageSquareFeet),
    createData("Garage Square Feet Finished", propertyInfo?.garageSquareFeetFinished),
    createData("Garage Square Feet Unfinished", propertyInfo?.garageSquareFeetUnfinished),
    createData("Heating Type", propertyInfo?.heatingType),
    createData("Living Square Feet", propertyInfo?.livingSquareFeet),
    createData("Parking Spaces", propertyInfo?.parkingSpaces),
    createData("Partial Bathrooms", propertyInfo?.partialBathrooms),
    createData("Pool", propertyInfo?.pool),
    createData("Stories", propertyInfo?.stories),
  ];
  return (
    <>
      <h3 className={styles.titleStyle}>Additional Property Information (Requires Pro Plan)</h3>
      <InformationTable dataFields={propertyHouseData} />
    </>
  );
}

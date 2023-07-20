import styles from "../FinancialMortgage/FinancialMortgage.module.scss";
import { InformationTable, createData } from "components/BodyContent/InformationTable/InformationTable";
import { propertyInfoV2Context } from "context/propertyContext";
import { useRecoilState } from "recoil";
import { toUSDField } from "../utils";

export default function PropertyData() {
  const [propertyInfo] = useRecoilState(propertyInfoV2Context);
  const propertyDataHouse = [
    createData("Property Type", propertyInfo?.propertyType),
    createData("Property Use", propertyInfo?.propertyUse),
    createData("MFH2to4", propertyInfo?.MFH2to4),
    createData("MFH5plus", propertyInfo?.MFH5plus),
    createData("Square Feet", propertyInfo?.squareFeet),
    createData("Bathrooms", propertyInfo?.bathrooms),
    createData("Bedrooms", propertyInfo?.bedrooms),
    createData("Year built", propertyInfo?.yearBuilt),
    createData("Assessed Land Value", toUSDField(propertyInfo?.assessedLandValue)),
    createData("Assessed Improvement Value", toUSDField(propertyInfo?.assessedImprovementValue)),
    createData("Land Use", propertyInfo?.landUse),
    createData("Units Count", propertyInfo?.unitsCount),
    createData("Rooms Count", propertyInfo?.roomsCount),
    createData("Vacant", propertyInfo?.vacant),
    createData("Basement", propertyInfo?.basement),
    createData("Distressed", propertyInfo?.distressed),
    createData("Garage Available", propertyInfo?.garage),
    createData("Air Conditioning Available", propertyInfo?.airConditioningAvailable),
  ];

  return (
    <div>
      <div className={styles.wrapper}>
        <div style={{ flex: 1 }}>
          <h3 className={styles.titleStyle}>Property Data</h3>
          <InformationTable dataFields={propertyDataHouse} />
        </div>
      </div>
    </div>
  );
}

import styles from "../FinancialMortgage/FinancialMortgage.module.scss";
import { InformationTable } from "components/BodyContent/InformationTable/InformationTable";
import { propertyInfoV2Context } from "context/propertyContext";
import { useRecoilState } from "recoil";

export default function PropertyData() {
  const [propertyInfo] = useRecoilState(propertyInfoV2Context);
  const useBool = (value: boolean | undefined | null) => (value === undefined || null ? "-" : "False");
  const propertyDataHouse = [
    { title: "Property Type", value: propertyInfo?.propertyType || "-" },
    { title: "Property Use", value: propertyInfo?.propertyUse || "-" },
    { title: "MFH2to4", value: useBool(propertyInfo?.MFH2to4) },
    { title: "MFH5plus", value: useBool(propertyInfo?.MFH5plus) },
    { title: "Square Feet", value: propertyInfo?.squareFeet || "-" },
    { title: "Bathrooms", value: propertyInfo?.bathrooms || "-" },
    { title: "Bedrooms", value: propertyInfo?.bedrooms || "-" },
    { title: "Year built", value: propertyInfo?.yearBuilt || "-" },
    { title: "Assessed Land Value", value: `$${propertyInfo?.assessedLandValue.toLocaleString()}` || "-" },
    { title: "Assessed Improvement Value", value: `$${propertyInfo?.assessedImprovementValue.toLocaleString()}` || "-" },
    { title: "Land Use", value: propertyInfo?.landUse || "-" },
    { title: "Units Count", value: propertyInfo?.unitsCount || "-" },
    { title: "Rooms Count", value: propertyInfo?.roomsCount || "-" },
    { title: "Vacant", value: useBool(propertyInfo?.vacant) },
    { title: "Basement", value: useBool(propertyInfo?.basement) },
    { title: "Distressed", value: useBool(propertyInfo?.distressed) },
    { title: "Garage Available", value: useBool(propertyInfo?.garage) },
    { title: "Air Conditioning Available", value: useBool(propertyInfo?.airConditioningAvailable) },
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

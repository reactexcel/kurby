import styles from "../FinancialMortgage/FinancialMortgage.module.scss";
import { InformationTable } from "components/BodyContent/InformationTable/InformationTable";
import { IPropertyHouse } from "pages/api/propertyV2";

interface IRentalEstimatesProps {
  data: IPropertyHouse | null;
}

export default function PropertyData({ data }: IRentalEstimatesProps) {
  const useBool = (value: boolean | undefined | null) => (value === undefined || null ? "-" : "False");
  const propertyDataHouse = [
    { title: "Property Type", value: data?.propertyType || "-" },
    { title: "Property Use", value: data?.propertyUse || "-" },
    { title: "MFH2to4", value: useBool(data?.MFH2to4) },
    { title: "MFH5plus", value: useBool(data?.MFH5plus) },
    { title: "Square Feet", value: data?.squareFeet || "-" },
    { title: "Bathrooms", value: data?.bathrooms || "-" },
    { title: "Bedrooms", value: data?.bedrooms || "-" },
    { title: "Year built", value: data?.yearBuilt || "-" },
    { title: "Assessed Land Value", value: `$${data?.assessedLandValue.toLocaleString()}` || "-" },
    { title: "Assessed Improvement Value", value: `$${data?.assessedImprovementValue.toLocaleString()}` || "-" },
    { title: "Land Use", value: data?.landUse || "-" },
    { title: "Units Count", value: data?.unitsCount || "-" },
    { title: "Rooms Count", value: data?.roomsCount || "-" },
    { title: "Vacant", value: useBool(data?.vacant) },
    { title: "Basement", value: useBool(data?.basement) },
    { title: "Distressed", value: useBool(data?.distressed) },
    { title: "Garage Available", value: useBool(data?.garage) },
    { title: "Air Conditioning Available", value: useBool(data?.airConditioningAvailable) },
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

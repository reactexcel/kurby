import { InformationTable, createData } from "components/BodyContent/InformationTable/InformationTable";
import { propertyDetailContext } from "context/propertyContext";
import React from "react";
import { useRecoilState } from "recoil";
import styles from "../FinancialMortgage/FinancialMortgage.module.scss";

export default function LotInfo() {
  const [propertyDetail] = useRecoilState(propertyDetailContext);
  const propertyInfo = propertyDetail?.lotInfo;
  const propertyHouseData = [
    createData("Census tract", propertyInfo?.censusTract),
    createData("Land use", propertyInfo?.landUse),
    createData("Legal description", propertyInfo?.legalDescription),
    createData("Lot acres", propertyInfo?.lotAcres),
    createData("Lot number", propertyInfo?.lotNumber),
    createData("Lot square feet", propertyInfo?.lotSquareFeet),
    createData("Property class", propertyInfo?.propertyClass),
    createData("Property use", propertyInfo?.propertyUse),
  ];
  return (
    <>
      <h3 className={styles.titleStyle}>Lot Info</h3>
      <InformationTable dataFields={propertyHouseData} />
    </>
  );
}

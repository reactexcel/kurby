import { InformationTable, createData } from "components/BodyContent/InformationTable/InformationTable";
import { propertyDetailContext } from "context/propertyContext";
import React from "react";
import { useRecoilState } from "recoil";
import styles from "../FinancialMortgage/FinancialMortgage.module.scss";

export default function LotInfo() {
  const [propertyDetail] = useRecoilState(propertyDetailContext);
  const propertyInfo = propertyDetail?.lotInfo;
  const propertyHouseData = [
    createData("Census Tract", propertyInfo?.censusTract),
    createData("Land Use", propertyInfo?.landUse),
    createData("Legal Description", propertyInfo?.legalDescription),
    createData("Lot Acres", propertyInfo?.lotAcres),
    createData("Lot Number", propertyInfo?.lotNumber),
    createData("Lot Square Feet", propertyInfo?.lotSquareFeet),
    createData("Property Class", propertyInfo?.propertyClass),
    createData("Property Use", propertyInfo?.propertyUse),
  ];
  return (
    <>
      <h3 className={styles.titleStyle}>Lot Info (Requires Pro Plan)</h3>
      <InformationTable dataFields={propertyHouseData} />
    </>
  );
}

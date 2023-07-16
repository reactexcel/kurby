import { InformationTable, createData } from "components/BodyContent/InformationTable/InformationTable";
import { propertyDetailContext } from "context/propertyContext";
import React from "react";
import { useRecoilState } from "recoil";
import styles from "../FinancialMortgage/FinancialMortgage.module.scss";
import { toUSDField } from "../utils";

export default function TaxInfo() {
  const [propertyDetail] = useRecoilState(propertyDetailContext);
  const propertyInfo = propertyDetail?.taxInfo;
  const propertyHouseData = [
    createData("Assessed Improvement Value", toUSDField(propertyInfo?.assessedImprovementValue)),
    createData("Assessed Land Value", toUSDField(propertyInfo?.assessedLandValue)),
    createData("Assessed Value", toUSDField(propertyInfo?.assessedValue)),
    createData("Assessment Year", propertyInfo?.assessmentYear),
    createData("Estimated Value", toUSDField(propertyInfo?.estimatedValue)),
    createData("Market Improvement Value", toUSDField(propertyInfo?.marketImprovementValue)),
    createData("Market Land Value", toUSDField(propertyInfo?.marketLandValue)),
    createData("Market Value", toUSDField(propertyInfo?.marketValue)),
    createData("Property Id", toUSDField(propertyInfo?.propertyId)),
    createData("Tax Amount", toUSDField(propertyInfo?.taxAmount)),
    createData("Tax Lien", toUSDField(propertyDetail?.taxLien)),
    createData("Trustee Sale", toUSDField(propertyDetail?.trusteeSale)),
    createData("Warranty Deed", toUSDField(propertyDetail?.warrantyDeed)),
    createData("Sheriff's Deed", toUSDField(propertyDetail?.sheriffsDeed)),
    createData("Year", propertyInfo?.year),
  ];
  return (
    <>
      <h3 className={styles.titleStyle}>Tax Info (Requires Pro Plan)</h3>
      <InformationTable dataFields={propertyHouseData} />
    </>
  );
}

import React from "react";
import styles from "../FinancialMortgage/FinancialMortgage.module.scss";
import { InformationTable, createData } from "components/BodyContent/InformationTable/InformationTable";
import { useRecoilState } from "recoil";
import { propertyDetailContext, propertyInfoV2Context } from "context/propertyContext";

export default function FinancialMortgage() {
  return (
    <div className={styles.wrapper}>
      <div style={{ flex: 1 }}>
        <h3 className={styles.titleStyle}>Financial Information</h3>
        <FinancialInformationTable />
      </div>
      <div style={{ flex: 1 }}>
        <h3 className={styles.titleStyle}>Mortgage Information (Upgrade to Pro Plan)</h3>
        <MortgageInformation />
      </div>
    </div>
  );
}

function FinancialInformationTable() {
  const [propertyHouse] = useRecoilState(propertyInfoV2Context);
  const propertyHouseData = [
    createData("Cash Buyer", propertyHouse?.cashBuyer),
    createData("Equity", propertyHouse?.equity),
    createData("Equity Percent", `${propertyHouse?.equityPercent}%` || "-"),
    createData("Estimated Equity", `$${propertyHouse?.estimatedEquity.toLocaleString()}` || "-"),
    createData("Estimated Value", `$${propertyHouse?.estimatedValue.toLocaleString()}` || "-"),
    createData("High Equity", propertyHouse?.highEquity),
    createData("Negative Equity", propertyHouse?.negativeEquity),
    createData("Open Mortgage Balance", `$${propertyHouse?.openMortgageBalance.toLocaleString()}` || "-"),
    createData("Pre Foreclosure", propertyHouse?.preForeclosure),
    createData("REO", propertyHouse?.reo),
  ];
  return <InformationTable dataFields={propertyHouseData} />;
}

function MortgageInformation() {
  const [propertyDetail] = useRecoilState(propertyDetailContext);
  const propertyHouseData = [
    createData("Amount", propertyDetail?.mortgageHistory?.[0]?.amount && `$${propertyDetail?.mortgageHistory?.[0].amount.toLocaleString()}`),
    createData("Deed Type", propertyDetail?.mortgageHistory?.[0]?.deedType),
    createData("Open Mortgage Balance", propertyDetail?.mortgageHistory?.[0]?.open),
    createData("Interest Rate", propertyDetail?.mortgageHistory?.[0]?.interestRate),
    createData("Interest Rate Type", propertyDetail?.mortgageHistory?.[0]?.interestRateType),
    createData("Lender Name", propertyDetail?.mortgageHistory?.[0]?.lenderName),
    createData("Lender Type", propertyDetail?.mortgageHistory?.[0]?.lenderType),
    createData("Grantee Name", propertyDetail?.mortgageHistory?.[0]?.granteeName),
    createData("Load Date", propertyDetail?.mortgageHistory?.[0]?.load_date),
    createData("Maturity Date", propertyDetail?.mortgageHistory?.[0]?.maturityDate),
  ];
  return <InformationTable dataFields={propertyHouseData} />;
}

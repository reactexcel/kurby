import { IPropertyHouse } from "pages/api/propertyV2";
import React from "react";
import styles from "../FinancialMortgage/FinancialMortgage.module.scss";
import { InformationTable, createData } from "components/BodyContent/InformationTable/InformationTable";

interface IFinancialMortgageProps {
  readonly data: IPropertyHouse | null;
}

export default function FinancialMortgage({ data }: IFinancialMortgageProps) {
  return (
    <div className={styles.wrapper}>
      <div style={{ flex: 1 }}>
        <h3 className={styles.titleStyle}>Financial Information</h3>
        <FinancialInformationTable propertyHouse={data} />
      </div>
      <div style={{ flex: 1 }}>
        <h3 className={styles.titleStyle}>Mortgage Information (Upgrade to Pro Plan)</h3>
        <MortgageInformation />
      </div>
    </div>
  );
}

function FinancialInformationTable({ propertyHouse }: { propertyHouse: IPropertyHouse | null | undefined }) {
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
  const propertyHouseData = [
    createData("Amount", "-"),
    createData("Deed Type", "-"),
    createData("Open Mortgage Balance", "-"),
    createData("Interest Rate", "-"),
    createData("Interest Rate Type", "-"),
    createData("Lender Name", "-"),
    createData("Lender Type", "-"),
    createData("Grantee Name", "-"),
    createData("Load Date", "-"),
    createData("Maturity Date", "-"),
  ];
  return <InformationTable dataFields={propertyHouseData} />;
}

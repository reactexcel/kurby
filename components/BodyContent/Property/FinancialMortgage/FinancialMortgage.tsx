import { IPropertyHouse } from "pages/api/propertyV2";
import React from "react";
import styles from "../Record/Record.module.scss";
import { InformationTable, createData } from "components/BodyContent/InformationTable/InformationTable";

interface IFinancialMortgageProps {
  readonly data: IPropertyHouse | null;
}

export default function FinancialMortgage({ data }: IFinancialMortgageProps) {
  return (
    <div style={{ display: "flex", gap: 30, flexDirection: "row", marginTop: "25px" }}>
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
    createData("Cash Buyer", propertyHouse?.cashBuyer || "Null"),
    createData("Equity", propertyHouse?.equity || "Null"),
    createData("Equity Percent", propertyHouse?.equityPercent || "Null"),
    createData("Estimated Equity", propertyHouse?.estimatedEquity || "Null"),
    createData("Estimated Value", propertyHouse?.estimatedValue || "Null"),
    createData("High Equity", propertyHouse?.highEquity || "Null"),
    createData("Negative Equity", propertyHouse?.negativeEquity || "Null"),
    createData("Open Mortgage Balance", propertyHouse?.openMortgageBalance || 0),
    createData("Pre Foreclosure", propertyHouse?.preForeclosure || "Null"),
    createData("REO", propertyHouse?.reo || "Null"),
  ];
  return <InformationTable dataFields={propertyHouseData} />;
}
function MortgageInformation() {
  const propertyHouseData = [
    createData("Amount", "Null"),
    createData("Deed Type", "Null"),
    createData("Open Mortgage Balance", "Null"),
    createData("Interest Rate", "Null"),
    createData("Interest Rate Type", "Null"),
    createData("Lender Name", "Null"),
    createData("Lender Type", "Null"),
    createData("Grantee Name", 0),
    createData("Load Date", "Null"),
    createData("Maturity Date", "Null"),
  ];
  return <InformationTable dataFields={propertyHouseData} />;
}

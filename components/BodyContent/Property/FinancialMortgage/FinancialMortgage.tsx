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
    createData("Cash Buyer", propertyHouse?.cashBuyer),
    createData("Equity", propertyHouse?.equity),
    createData("Equity Percent", propertyHouse?.equityPercent || "Null"),
    createData("Estimated Equity", propertyHouse?.estimatedEquity),
    createData("Estimated Value", propertyHouse?.estimatedValue || "Null"),
    createData("High Equity", propertyHouse?.highEquity),
    createData("Negative Equity", propertyHouse?.negativeEquity),
    createData("Open Mortgage Balance", propertyHouse?.openMortgageBalance || "Null"),
    createData("Pre Foreclosure", propertyHouse?.preForeclosure),
    createData("REO", propertyHouse?.reo),
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

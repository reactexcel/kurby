import React from "react";
import styles from "../FinancialMortgage/FinancialMortgage.module.scss";
import { InformationTable, createData } from "components/BodyContent/InformationTable/InformationTable";
import { useRecoilState } from "recoil";
import { propertyDetailContext, propertyInfoV2Context } from "context/propertyContext";
import { toUSDField } from "../utils";
import { IAppPlans } from "context/plansContext";
import RequiresProPlan from "components/RequiresProPlanHeaading/RequiresProPlan";

export default function FinancialMortgage() {
  return (
    <div className={styles.wrapper}>
      <div style={{ flex: 1 }}>
        <h3 className={styles.titleStyle}>Financial Information</h3>
        <FinancialInformationTable />
      </div>
      <div style={{ flex: 1 }}>
        <RequiresProPlan title={"Mortgage Information"} />
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
    createData("Equity Percent", propertyHouse?.equityPercent),
    createData("Estimated Equity", toUSDField(propertyHouse?.estimatedEquity)),
    createData("Estimated Value", toUSDField(propertyHouse?.estimatedValue)),
    createData("High Equity", propertyHouse?.highEquity),
    createData("Negative Equity", propertyHouse?.negativeEquity),
    createData("Open Mortgage Balance", toUSDField(propertyHouse?.openMortgageBalance)),
    createData("Pre Foreclosure", propertyHouse?.preForeclosure),
    createData("REO", propertyHouse?.reo),
  ];
  return <InformationTable dataFields={propertyHouseData} />;
}

function MortgageInformation() {
  const [propertyDetail] = useRecoilState(propertyDetailContext);
  const mortgage = propertyDetail?.mortgageHistory?.[0];
  const propertyHouseData = [
    createData("Amount", toUSDField(mortgage?.amount), IAppPlans.PROFESSIONAL),
    createData("Deed Type", mortgage?.deedType, IAppPlans.PROFESSIONAL),
    createData("Open Mortgage Balance", mortgage?.open, IAppPlans.PROFESSIONAL),
    createData("Interest Rate", mortgage?.interestRate || "-", IAppPlans.PROFESSIONAL),
    createData("Interest Rate Type", mortgage?.interestRateType, IAppPlans.PROFESSIONAL),
    createData("Lender Name", mortgage?.lenderName, IAppPlans.PROFESSIONAL),
    createData("Lender Type", mortgage?.lenderType, IAppPlans.PROFESSIONAL),
    createData("Grantee Name", mortgage?.granteeName, IAppPlans.PROFESSIONAL),
    createData("Load Date", mortgage?.load_date, IAppPlans.PROFESSIONAL),
    createData("Maturity Date", mortgage?.maturityDate, IAppPlans.PROFESSIONAL),
  ];

  return <InformationTable dataFields={propertyHouseData} />;
}

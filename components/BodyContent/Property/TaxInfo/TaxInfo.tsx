import { InformationTable, createData } from "components/BodyContent/InformationTable/InformationTable";
import { propertyDetailContext } from "context/propertyContext";
import React from "react";
import { useRecoilState } from "recoil";
import { toUSDField } from "../utils";
import { IAppPlans } from "context/plansContext";
import RequiresProPlan from "components/RequiresProPlanHeaading/RequiresProPlan";

export default function TaxInfo() {
  const [propertyDetail] = useRecoilState(propertyDetailContext);
  const propertyInfo = propertyDetail?.taxInfo;
  const propertyHouseData = [
    createData("Assessed Improvement Value", toUSDField(propertyInfo?.assessedImprovementValue), IAppPlans.PROFESSIONAL),
    createData("Assessed Land Value", toUSDField(propertyInfo?.assessedLandValue), IAppPlans.PROFESSIONAL),
    createData("Assessed Value", toUSDField(propertyInfo?.assessedValue), IAppPlans.PROFESSIONAL),
    createData("Assessment Year", propertyInfo?.assessmentYear, IAppPlans.PROFESSIONAL),
    createData("Estimated Value", toUSDField(propertyInfo?.estimatedValue), IAppPlans.PROFESSIONAL),
    createData("Market Improvement Value", toUSDField(propertyInfo?.marketImprovementValue), IAppPlans.PROFESSIONAL),
    createData("Market Land Value", toUSDField(propertyInfo?.marketLandValue), IAppPlans.PROFESSIONAL),
    createData("Market Value", toUSDField(propertyInfo?.marketValue), IAppPlans.PROFESSIONAL),
    createData("Property Id", toUSDField(propertyInfo?.propertyId), IAppPlans.PROFESSIONAL),
    createData("Tax Amount", toUSDField(propertyInfo?.taxAmount), IAppPlans.PROFESSIONAL),
    createData("Tax Lien", toUSDField(propertyDetail?.taxLien), IAppPlans.PROFESSIONAL),
    createData("Trustee Sale", toUSDField(propertyDetail?.trusteeSale), IAppPlans.PROFESSIONAL),
    createData("Warranty Deed", toUSDField(propertyDetail?.warrantyDeed), IAppPlans.PROFESSIONAL),
    createData("Sheriff's Deed", toUSDField(propertyDetail?.sheriffsDeed), IAppPlans.PROFESSIONAL),
    createData("Year", propertyInfo?.year),
  ];

  return (
    <>
      <RequiresProPlan title={"Tax Info"} />
      <InformationTable dataFields={propertyHouseData} />
    </>
  );
}

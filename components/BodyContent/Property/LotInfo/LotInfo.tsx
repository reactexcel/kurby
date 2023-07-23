import { InformationTable, createData } from "components/BodyContent/InformationTable/InformationTable";
import { propertyDetailContext } from "context/propertyContext";
import React from "react";
import { useRecoilState } from "recoil";
import { IAppPlans } from "context/plansContext";
import RequiresProPlan from "components/RequiresProPlanHeaading/RequiresProPlan";

export default function LotInfo() {
  const [propertyDetail] = useRecoilState(propertyDetailContext);
  const propertyInfo = propertyDetail?.lotInfo;
  const propertyHouseData = [
    createData("Census Tract", propertyInfo?.censusTract, IAppPlans.PROFESSIONAL),
    createData("Land Use", propertyInfo?.landUse, IAppPlans.PROFESSIONAL),
    createData("Legal Description", propertyInfo?.legalDescription, IAppPlans.PROFESSIONAL),
    createData("Lot Acres", propertyInfo?.lotAcres, IAppPlans.PROFESSIONAL),
    createData("Lot Number", propertyInfo?.lotNumber, IAppPlans.PROFESSIONAL),
    createData("Lot Square Feet", propertyInfo?.lotSquareFeet, IAppPlans.PROFESSIONAL),
    createData("Property Class", propertyInfo?.propertyClass, IAppPlans.PROFESSIONAL),
    createData("Property Use", propertyInfo?.propertyUse, IAppPlans.PROFESSIONAL),
  ];

  return (
    <>
      <RequiresProPlan title={"Lot Info"} />
      <InformationTable dataFields={propertyHouseData} />
    </>
  );
}

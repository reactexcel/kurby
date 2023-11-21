import React from "react";
import styles from "../Record/Record.module.scss";
import { Box } from "@mui/material";
import KBTable from "components/KBTable/KBTable";
import { KBColor } from "constants/color";
import { TableFieldType } from "types/table";
import { toUSDField } from "../utils";
import { useRecoilState } from "recoil";
import { propertyInfoV2Context } from "context/propertyContext";

export default function ListingHistory() {
  const [propertyInfo] = useRecoilState(propertyInfoV2Context);
  const valueEstimatFields: TableFieldType[] = [
    { label: "Last Sale Amount", key: "lastSaleAmount" },
    { label: "Last Sale Date", key: "lastSaleDate" },
    { label: "Listing Amount", key: "listingAmount" },
    { label: "Rent Amount", key: "rentAmount" },
    { label: "Suggested Rent", key: "suggestedRent" },
  ];
  const generateGraphData = () => {
    return [
      {
        lastSaleAmount: toUSDField(propertyInfo?.lastSaleAmount),
        lastSaleDate: propertyInfo?.lastSaleDate,
        listingAmount: toUSDField(propertyInfo?.listingAmount),
        rentAmount: toUSDField(propertyInfo?.rentAmount),
        suggestedRent: toUSDField(propertyInfo?.suggestedRent),
      },
    ];
  };
  {
    /*
  return (
    <div>
      <h3 className={styles.titleStyle}>Listing History</h3>
      <Box>
        <KBTable maxHeight="220px" lineColor={KBColor.LIGHT_GREY} sx={{ background: KBColor.DARK_WHITE }} fields={valueEstimatFields} data={generateGraphData() as any} />
      </Box>
    </div>
  );
    */
  }
}

import React from "react";
import styles from "../Record/Record.module.scss";
import { IPropertyHouse } from "pages/api/propertyV2";
import { Box } from "@mui/material";
import KBTable from "components/KBTable/KBTable";
import { KBColor } from "constants/color";
import { TableFieldType } from "types/table";

interface IFinancialMortgageProps {
  readonly data: IPropertyHouse | null;
}

export default function ListingHistory({ data }: IFinancialMortgageProps) {
  const valueEstimatFields: TableFieldType[] = [
    { label: "Last Sale Amount", key: "lastSaleAmount" },
    { label: "Last Sale Date", key: "lastSaleDate" },
    { label: "Listing Amount", key: "listingAmount" },
    { label: "Rental Estimates", key: "rentalEstimates" },
    { label: "Rent Amount", key: "rentAmount" },
    { label: "Suggested Rent", key: "suggestedRent" },
  ];
  const generateGraphData = () => {
    return [
      {
        lastSaleAmount: data?.lastSaleAmount,
        lastSaleDate: data?.lastSaleDate,
        listingAmount: data?.listingAmount || "Null",
        rentalEstimates: "Null",
        rentAmount: data?.rentAmount || "Null",
        suggestedRent: data?.suggestedRent,
      },
    ];
  };
  return (
    <div>
      <h3 className={styles.titleStyle}>Listing History</h3>
      <Box>
        <KBTable maxHeight="220px" lineColor={KBColor.LIGHT_GREY} sx={{ background: KBColor.DARK_WHITE }} fields={valueEstimatFields} data={generateGraphData() as any} />
      </Box>
    </div>
  );
}

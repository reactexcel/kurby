import React from "react";
import styles from "../Record/Record.module.scss";
import { IPropertyHouse } from "pages/api/propertyV2";
import { Box } from "@mui/material";
import KBTable from "components/KBTable/KBTable";
import { KBColor } from "constants/color";
import { TableFieldType } from "types/table";

export default function LastSale() {
  const valueEstimatFields: TableFieldType[] = [
    { label: "Buyer Names", key: "buyerNames" },
    { label: "Document Type", key: "documentType" },
    { label: "Down Payment", key: "downPayment" },
    { label: "LTV", key: "ltv" },
    { label: "Purchase Method", key: "purchaseMethod" },
    { label: "Seller Names", key: "sellerNames" },
    { label: "Last Sale Date", key: "lastSaleDate" },
    { label: "Last Sale Price", key: "lastSalePrice" },
  ];
  const generateGraphData = () => {
    return [
      {
        buyerNames: "Upgrade to Pro",
        documentType: "Upgrade to Pro",
        downPayment: "Upgrade to Pro",
        ltv: "Upgrade to Pro",
        purchaseMethod: "Upgrade to Pro",
        sellerNames: "Upgrade to Pro",
        lastSaleDate: "Upgrade to Pro",
        lastSalePrice: "Upgrade to Pro",
      },
    ];
  };
  return (
    <div>
      <h3 className={styles.titleStyle}>Last Sale</h3>
      <Box>
        <KBTable maxHeight="220px" lineColor={KBColor.LIGHT_GREY} sx={{ background: KBColor.DARK_WHITE }} fields={valueEstimatFields} data={generateGraphData() as any} />
      </Box>
    </div>
  );
}

import React from "react";
import styles from "../Record/Record.module.scss";
import { Box } from "@mui/material";
import KBTable from "components/KBTable/KBTable";
import { KBColor } from "constants/color";
import { TableFieldType } from "types/table";
import { useRecoilState } from "recoil";
import { propertyDetailContext } from "context/propertyContext";

export default function LastSale() {
  const [propertyDetail] = useRecoilState(propertyDetailContext);
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
        buyerNames: propertyDetail?.lastSale?.buyerNames,
        documentType: propertyDetail?.lastSale?.documentType,
        downPayment: propertyDetail?.lastSale?.downPayment,
        ltv: propertyDetail?.lastSale?.ltv,
        purchaseMethod: propertyDetail?.lastSale?.purchaseMethod,
        sellerNames: propertyDetail?.lastSale?.sellerNames,
        lastSaleDate: propertyDetail?.lastSaleDate,
        lastSalePrice: propertyDetail?.lastSalePrice,
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

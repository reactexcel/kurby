import React from "react";
import styles from "../Record/Record.module.scss";
import { Box } from "@mui/material";
import KBTable from "components/KBTable/KBTable";
import { KBColor } from "constants/color";
import { TableFieldType } from "types/table";
import { useRecoilState } from "recoil";
import { propertyDetailContext } from "context/propertyContext";
import { toUSDField } from "../utils";

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const generateGraphData = () => {
    if (!propertyDetail) return [];
    if (Array.isArray(propertyDetail?.saleHistory)) {
      // Handle the scenario when it's an array
      return propertyDetail.saleHistory.map((sale) => ({
        buyerNames: sale.buyerNames,
        documentType: sale.documentType,
        downPayment: toUSDField(sale.downPayment),
        ltv: sale.ltv ? `${parseFloat(sale.ltv).toFixed(0)}%` : null,
        purchaseMethod: sale.purchaseMethod,
        sellerNames: sale.sellerNames,
        lastSaleDate: formatDate(sale.saleDate),
        lastSalePrice: toUSDField(sale.saleAmount),
      }));
    } else if (propertyDetail?.saleHistory) {
      // Handle the scenario when it's a single object
      return [
        {
          buyerNames: propertyDetail.lastSale.buyerNames,
          documentType: propertyDetail.lastSale.documentType,
          downPayment: toUSDField(propertyDetail.lastSale.downPayment),
          ltv: propertyDetail.lastSale.ltv && parseFloat(propertyDetail.lastSale.ltv),
          purchaseMethod: propertyDetail.lastSale.purchaseMethod,
          sellerNames: propertyDetail.lastSale.sellerNames,
          lastSaleDate: propertyDetail.lastSale.saleDate,
          lastSalePrice: toUSDField(propertyDetail.lastSale.saleAmount),
        },
      ];
    }
    return []; // Return an empty array if no data
  };

  return (
    <div>
      <h3 className={styles.titleStyle}>Sales History</h3>
      <Box>
        <KBTable maxHeight="320px" lineColor={KBColor.LIGHT_GREY} sx={{ background: KBColor.DARK_WHITE }} fields={valueEstimatFields} data={generateGraphData() as any} />
      </Box>
    </div>
  );
}

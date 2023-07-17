import { TableFieldType } from "types/table";
import styles from "../Record/Record.module.scss";
import { Box } from "@mui/material";
import KBTable from "components/KBTable/KBTable";
import { KBColor } from "constants/color";
import { toUSDField } from "../utils";
import { useRecoilState } from "recoil";
import { propertyInfoV2Context } from "context/propertyContext";

export default function RentalEstimates() {
  const [propertyInfo] = useRecoilState(propertyInfoV2Context);
  const valueEstimatFields: TableFieldType[] = [
    { label: "Rent Amount", key: "rentAmount" },
    { label: "Suggested Rent", key: "suggestedRent" },
  ];
  const generateGraphData = () => {
    return [
      {
        rentAmount: toUSDField(propertyInfo?.rentAmount) || "-",
        suggestedRent: toUSDField(propertyInfo?.rentAmount) || "-",
      },
    ];
  };
  return (
    <div>
      <h3 className={styles.titleStyle}>Rental Estimates</h3>
      <Box>
        <KBTable maxHeight="220px" lineColor={KBColor.LIGHT_GREY} sx={{ background: KBColor.DARK_WHITE }} fields={valueEstimatFields} data={generateGraphData() as any} />
      </Box>
    </div>
  );
}

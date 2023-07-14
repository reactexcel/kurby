import { TableFieldType } from "types/table";
import styles from "../Record/Record.module.scss";
import { Box } from "@mui/material";
import KBTable from "components/KBTable/KBTable";
import { KBColor } from "constants/color";
import { IPropertyHouse } from "pages/api/propertyV2";

interface IRentalEstimatesProps {
  data: IPropertyHouse | null;
}

export default function RentalEstimates({ data }: IRentalEstimatesProps) {
  const valueEstimatFields: TableFieldType[] = [
    { label: "Rent Amount", key: "rentAmount" },
    { label: "Suggested Rent", key: "suggestedRent" },
  ];
  const generateGraphData = () => {
    return [
      {
        rentAmount: data?.rentAmount || "-",
        suggestedRent: data?.suggestedRent ? `$${data?.suggestedRent}` : "-",
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

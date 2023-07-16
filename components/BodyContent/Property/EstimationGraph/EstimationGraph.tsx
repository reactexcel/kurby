import React from "react";
import { Box } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { KBColor } from "constants/color";
import KBTable from "components/KBTable/KBTable";
import Typography from "@mui/material/Typography";
import { TableFieldType } from "types/table";
import { convertUSNumberFormat } from "utils/number";
import { toUSDField } from "../utils";
import { useRecoilState } from "recoil";
import { propertyInfoV2Context } from "context/propertyContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Property Value Estimates",
      font: {
        family: "FilsonProLight",
        size: 20,
        weight: "bold",
        lineHeight: 1.2,
      },
      padding: { top: 20, left: 0, right: 0, bottom: 0 },
    },
  },
};

const valueEstimatFields: TableFieldType[] = [
  { label: "Price", key: "price" },
  { label: "High Price", key: "highPrice" },
  { label: "Low Price", key: "lowPrice" },
];

export default function EstimationGraph({ valueEstimate }: { valueEstimate: any }) {
  const [propertyInfoV2] = useRecoilState(propertyInfoV2Context);
  const generateGraphData = () => {
    return [
      {
        price: toUSDField(propertyInfoV2?.estimatedValue),
        highPrice: `$${convertUSNumberFormat(valueEstimate.priceRangeHigh)}`,
        lowPrice: `$${convertUSNumberFormat(valueEstimate.priceRangeLow)}`,
      },
    ];
    // const listings = valueEstimate.listings;

    // const labels = [moment().format("Y-M-D")];
    // const highEstimateList = [valueEstimate.priceRangeHigh];
    // const lowEstimateList = [valueEstimate.priceRangeLow];
    // const estimateList = [valueEstimate.price];
    // let count = 0;
    // listings.map(item => {
    //     labels.push(moment(item?.publishedDate).format("Y-MM-D"));
    //     // highEstimateList.push(item?.maxRent)
    //     // lowEstimateList.push(item?.minRent)
    //     estimateList.push(item?.price)
    // })
    // // for (let item in marketingHistory) {
    // //     labels.push(item);
    // //     highEstimateList.push(marketingHistory[item]?.maxRent)
    // //     lowEstimateList.push(marketingHistory[item]?.minRent)
    // //     estimateList.push(marketingHistory[item]?.averageRent)
    // // }

    // return {
    //     labels: labels.slice(-6),
    //     datasets: [
    //         {
    //             label: 'High Estimate',
    //             data: highEstimateList.slice(-6),
    //             backgroundColor: KBColor.DRAK_GREEN,
    //             borderRadius: 8,
    //         },
    //         {
    //             label: 'Low Estimate',
    //             data: lowEstimateList.slice(-6),
    //             backgroundColor: KBColor.ORANGE,
    //             borderRadius: 8,
    //         },
    //         {
    //             label: 'Estimate',
    //             data: estimateList.slice(-6),
    //             backgroundColor: KBColor.YELLOW,
    //             borderRadius: 8,
    //         },
    //     ],
    // }
  };

  if (!valueEstimate || !valueEstimate.price) {
    return null;
  }

  return (
    <Box>
      <Typography component="h5" variant="h5" fontSize="22px" marginBottom="0.5rem">
        Property Value Estimates
      </Typography>
      <Box>
        <KBTable maxHeight="220px" lineColor={KBColor.LIGHT_GREY} sx={{ background: KBColor.DARK_WHITE }} fields={valueEstimatFields} data={generateGraphData()} />
      </Box>
      {/* <Bar options={options} data={generateGraphData()} /> */}
    </Box>
  );
}

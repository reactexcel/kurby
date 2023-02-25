import { Dialog, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const CardContainer = styled("div")(() => ({
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
  padding: "30px",
}));

const MapContainer = styled("div")(() => ({
  width: "100%",
}));

interface RaceData {
  totalWhite: number;
  totalBlack: number;
  totalAsian: number;
  totalIndianAlaskanNative: number;
  totalIslander: number;
  totalOther: number;
}

interface Props {
  open: boolean;
  handleClose: () => void;
  children?: JSX.Element | JSX.Element[];
  raceData: RaceData | undefined;
}

const RaceBreakDownModal = ({ open, handleClose, children, raceData }: Props) => {
  const data = {
    labels: ["Asian", "Black", "Indian / Alaskan Native", "Islander", "Other", "White"],
    datasets: [
      {
        data: [raceData?.totalAsian, raceData?.totalBlack, raceData?.totalIndianAlaskanNative, raceData?.totalIslander, raceData?.totalOther, raceData?.totalWhite],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)", "rgb(66, 245, 69)", "rgb(215, 20, 250)", "rgb(250, 123, 20)"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      PaperProps={{
        sx: {
          padding: "25px",
          display: "flex",
          alignItems: "center",
        },
      }}
    >
      {children}
      <MapContainer>
        <Typography variant="h5">Race Demographics</Typography>
        <CardContainer>
          <Doughnut data={data} />
        </CardContainer>
      </MapContainer>
    </Dialog>
  );
};

export default RaceBreakDownModal;

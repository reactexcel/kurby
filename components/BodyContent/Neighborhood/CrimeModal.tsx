import { Dialog, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { OverallCrimeInfo } from "types/address";
import CrimeDetailCard from "./CrimeDetailCard";

const CardContainer = styled("div")(() => ({
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
}));

const MapContainer = styled("div")(() => ({
  width: "100%",
}));

interface Props {
  open: boolean;
  handleClose: () => void;
  children: JSX.Element | JSX.Element[];
  overallCrimeInfo: OverallCrimeInfo | null
  crimeType: string
}

const CrimeModal = ({ open, handleClose, overallCrimeInfo, crimeType, children }: Props) => {
  if(!crimeType){
    return <></>
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="lg"
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
        <CardContainer>
          <CrimeDetailCard
            label="Incidents"
            value={crimeType === 'violent' ? overallCrimeInfo?.violentIncidents : overallCrimeInfo?.propertyIncidents}
          />
          <CrimeDetailCard
            label={overallCrimeInfo?.localInfo?.state + " /100k"}
            value={crimeType === 'violent' ? overallCrimeInfo?.violentStateRate : overallCrimeInfo?.propertyStateRate}
          />
          <CrimeDetailCard
            label={overallCrimeInfo?.localInfo?.area + " /100k"}
            value={crimeType === 'violent' ? overallCrimeInfo?.violentAreaRate : overallCrimeInfo?.propertyAreaRate}
          />
          <CrimeDetailCard
            label="National /100k"
            value={crimeType === 'violent' ? overallCrimeInfo?.violentNationalRate : overallCrimeInfo?.propertyNationalRate}
          />
        </CardContainer>
      </MapContainer>
    </Dialog>
  );
};

export default CrimeModal;

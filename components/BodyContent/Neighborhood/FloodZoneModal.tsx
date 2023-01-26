import { Dialog, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import MapDetailCard from "./MapDetailCard";

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
}

const FloodZoneModal = ({ open, handleClose, children }: Props) => {
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
        <Typography variant="h5">Flood Zone Map</Typography>
        <CardContainer>
          <MapDetailCard
            label="A"
            value="Areas with a 1% annual chance of flooding and a 26% chance of flooding over the life of a 30‐year mortgage. Because detailed analyses are not performed for such areas; no depths or base flood elevations are shown within these zones."
          />
          <MapDetailCard label="A1-30" value="These are known as numbered A Zones (e.g., A7 or A14). This is the base floodplain where the FIRM shows a BFE (old format)." />
          <MapDetailCard
            label="A99"
            value="Areas with a 1% annual chance of flooding that will be protected by a Federal flood control system where construction has reached specified legal requirements. No depths or base flood elevations are shown within these zones."
          />
          <MapDetailCard label="AE" value="The base floodplain where base flood elevations are provided. AE Zones are now used on new format FIRMs instead of A1‐A30 Zones." />
          <MapDetailCard
            label="AH"
            value="Areas with a 1% annual chance of shallow flooding, usually in the form of a pond, with an average depth ranging from 1 to 3 feet. These areas have a 26% chance of flooding over the life of a 30‐year mortgage. Base flood elevations derived from detailed analyses are shown at selected intervals within these zones."
          />
          <MapDetailCard
            label="AO"
            value="River or stream flood hazard areas, and areas with a 1% or greater chance of shallow flooding each year, usually in the form of sheet flow, with an average depth ranging from 1 to 3 feet. These areas have a 26% chance of flooding over the life of a 30‐year mortgage. Average flood depths derived from detailed analyses are shown within these zones."
          />
          <MapDetailCard
            label="AR"
            value="Areas with a temporarily increased flood risk due to the building or restoration of a flood control system (such as a levee or a dam). Mandatory flood insurance purchase requirements will apply, but rates will not exceed the rates for unnumbered A zones if the structure is built or restored in compliance with Zone AR floodplain management regulations."
          />
          <MapDetailCard
            label="B"
            value="Area of moderate flood hazard, usually the area between the limits of the 100‐ year and 500‐year floods. B Zones are also used to designate base floodplains of lesser hazards, such as areas protected by levees from 100‐year flood, or shallow flooding areas with average depths of less than one foot or drainage areas less than 1 square mile."
          />
          <MapDetailCard
            label="X or C"
            value="Area of minimal flood hazard, usually depicted on FIRMs as above the 500‐year flood level. Zone C may have ponding and local drainage problems that don't warrant a detailed study or designation as base floodplain. Zone X is the area determined to be outside the 500‐year flood and protected by levee from 100‐ year flood."
          />
          <MapDetailCard
            label="D"
            value="Areas with possible but undetermined flood hazards. No flood hazard analysis has been conducted. Flood insurance rates are commensurate with the uncertainty of the flood risk."
          />
          <MapDetailCard
            label="V"
            value="Coastal areas with a 1% or greater chance of flooding and an additional hazard associated with storm waves. These areas have a 26% chance of flooding over the life of a 30‐year mortgage. No base flood elevations are shown within these zones."
          />
          <MapDetailCard
            label="VE or V1-V30"
            value="Coastal areas with a 1% or greater chance of flooding and an additional hazard associated with storm waves. These areas have a 26% chance of flooding over the life of a 30‐year mortgage. Base flood elevations derived from detailed analyses are shown at selected intervals within these zones."
          />
        </CardContainer>
      </MapContainer>
    </Dialog>
  );
};

export default FloodZoneModal;

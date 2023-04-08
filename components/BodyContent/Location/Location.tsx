import { Box, Typography, CircularProgress } from "@mui/material";
import StreetView from "../StreetView";
import LocationSvg from "../../../public/icons/location.svg";
import { ParagraphSkeleton } from "components/ParagraphSkeleton/ParagraphSkeleton";
import { AIWarningToolTip } from "components/AIWarningTooltip/AIWarningTooltip";
import { useRecoilState } from "recoil";
import { filterState } from "../../../context/filterContext";
import WalkscoreList from "../Walkscore/WalkscoreList";
import { Flags } from "components/Flags/Flags";
import { loadingContext } from "context/loadingContext";

interface LocationProps {
  explainedLikeAlocal: string;
  greenFlags: any;
  redFlags: any;
}

const resultsContentStyle = {
  padding: "20px",
  border: "1px solid rgba(38,75,92,.2)",
  boxShadow: "0 4px 4px #00000040",
  borderRadius: "14px",
  borderBottomRightRadius: "0px",
  borderBottomLeftRadius: "0px",
  marginTop: "25px",
  display: "flex",
  height: "100%",
  boxSizing: "border-box",
} as any;

export const Location = ({ explainedLikeAlocal, greenFlags, redFlags }: LocationProps) => {
  const [filterVal] = useRecoilState(filterState);
  const [loading] = useRecoilState(loadingContext);

  if (loading.walkscore) {
    return (
      <Box style={resultsContentStyle} display="flex" justifyContent="center" alignItems="center" padding={3}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box style={resultsContentStyle}>
      <Box
        style={{
          overflow: "auto",
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        <Box style={{ display: "flex" }}>
          <StreetView position={filterVal.latlong} />
          <Box>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontWeight: 400,
                  fontSize: "1.5rem",
                  fontFamily: "FilsonPro",
                }}
              >
                <LocationSvg style={{ marginRight: "8px" }} />
                {filterVal.address}
              </Typography>
            </Box>
            <Typography style={{ marginTop: "10px" }} variant="subtitle2">
              Explain it like a local:
              <AIWarningToolTip />
            </Typography>
            {loading.openai ? <ParagraphSkeleton /> : <Typography>{explainedLikeAlocal}</Typography>}
            <Box style={{ marginTop: "10px" }}>
              <WalkscoreList />
            </Box>
          </Box>
        </Box>
        <Box
          style={{
            marginTop: "24px",
            position: "absolute",
            width: "100%",
          }}
        >
          <Flags color="Green" flagsArr={greenFlags} />

          <Flags color="Red" flagsArr={redFlags} />
        </Box>
      </Box>
    </Box>
  );
};

import { Box, Typography, CircularProgress } from "@mui/material";
import StreetView from "../StreetView/StreetView";
import LocationSvg from "../../../public/icons/location.svg";
import { ParagraphSkeleton } from "components/ParagraphSkeleton/ParagraphSkeleton";
import { AIWarningToolTip } from "components/AIWarningTooltip/AIWarningTooltip";
import { useRecoilState } from "recoil";
import { filterState } from "../../../context/filterContext";
import WalkscoreList from "../Walkscore/WalkscoreList";
import { Flags } from "components/Flags/Flags";
import { loadingContext } from "context/loadingContext";
import { TabLayout } from "components/layouts/TabLayout/TabLayout";
import styles from "./Location.module.scss";

interface LocationProps {
  explainedLikeAlocal: string;
  greenFlags: any;
  redFlags: any;
}

export const Location = ({ explainedLikeAlocal, greenFlags, redFlags }: LocationProps) => {
  const [filterVal] = useRecoilState(filterState);
  const [loading] = useRecoilState(loadingContext);

  if (loading.walkscore) {
    return (
      <TabLayout loading={loading.walkscore}>
        <CircularProgress />
      </TabLayout>
    );
  }

  return (
    <TabLayout>
      <Box className={styles.main}>
        <Box className={styles.wrapper}>
          <StreetView position={filterVal.latlong} />
          <Box>
            <div className={styles.headerWrapper}>
              <LocationSvg style={{ minWidth: "17px" }} />
              <h3 className={styles.address}>{filterVal.address}</h3>
            </div>
            <Typography className={styles.margin} variant="subtitle2">
              Explain it like a local:
              <AIWarningToolTip />
            </Typography>
            {loading.openai ? <ParagraphSkeleton /> : <Typography>{explainedLikeAlocal}</Typography>}
            <Box className={styles.margin}>
              <WalkscoreList />
            </Box>
          </Box>
        </Box>
        <Box className={styles.flags}>
          <Flags color="Green" flagsArr={greenFlags} />
          <Flags color="Red" flagsArr={redFlags} />
        </Box>
      </Box>
    </TabLayout>
  );
};

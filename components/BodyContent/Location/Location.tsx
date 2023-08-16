import { useContext, useMemo } from "react";
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
import { IsDevContext } from "context/isDevContext";
import { useOpenAi } from "hooks/use-open-ai";

export const Location = () => {
  const [filterVal] = useRecoilState(filterState);
  const [loading] = useRecoilState(loadingContext);
  const { isDev, message } = useContext(IsDevContext);
  const { explainedLikeAlocal, greenFlags, redFlags } = useOpenAi();

  const separateMessage = useMemo(() => explainedLikeAlocal?.split("- ").filter((part) => part), [explainedLikeAlocal]);

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
            <Typography className={styles.margin} variant="subtitle1">
              Explain it like a local:
              <AIWarningToolTip />
            </Typography>
            {isDev && <Typography className={styles.margin}>{message("Location")}</Typography>}
            {loading.openai.explainedLikeAlocal ? (
              <ParagraphSkeleton />
            ) : (
              <Typography className={styles.explainedLikeAlocal}>
                {separateMessage?.map((part, index) => (
                  <p className={styles.part} key={index}>
                    {part}
                  </p>
                ))}
              </Typography>
            )}
            <Box className={styles.margin}>
              <WalkscoreList />
            </Box>
          </Box>
        </Box>
        <Box className={styles.flags}>
          <Flags color="Green" flagsMessage={greenFlags || ""} loading={loading.openai.greenFlags} />
          <Flags color="Red" flagsMessage={redFlags || ""} loading={loading.openai.redFlags} />
        </Box>
      </Box>
    </TabLayout>
  );
};

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
import { openaiDropdownContext } from "context/openaiDropdownContext";
import { useOpenaiDropdownOptions } from "hooks/use-openai-dropdown-options-hook";

export const Location = () => {
  const [filterVal] = useRecoilState(filterState);
  const [loading] = useRecoilState(loadingContext);
  const { isDev, message } = useContext(IsDevContext);
  const [dropdownValue] = useRecoilState(openaiDropdownContext);
  const openaiResponse = useOpenAi({ preset: dropdownValue.value });
  const dropdownOptions = useOpenaiDropdownOptions();

  const separateMessage = useMemo(() => openaiResponse.living && openaiResponse.living.explainedLikeAlocal?.split("- ").filter((part) => part), [openaiResponse.living]);

  if (loading.walkscore) {
    return (
      <TabLayout loading={loading.walkscore}>
        <CircularProgress />
      </TabLayout>
    );
  }

  const FormattedMessage = ({ message }: { message?: string }) => {
    if (!message) return null;

    const formatPart = (part: string, index: number) => {
      const matchedParts = part.split(/^(\d+\.\s[^:]+):/).filter(Boolean);

      if (matchedParts.length === 1) {
        const numberSplit = matchedParts[0].split(/^(\d+\.\s)/).filter(Boolean);

        return (
          <p className={styles.part} key={index}>
            <strong>{numberSplit.length > 1 ? numberSplit[0] : null}</strong>
            {numberSplit.length > 1 ? numberSplit[1] : matchedParts[0]}
          </p>
        );
      } else if (matchedParts.length > 1) {
        return (
          <p className={styles.part} key={index}>
            <strong>{matchedParts[0]}:</strong>
            {matchedParts[1]}
          </p>
        );
      }
    };

    const parts = message.split("\n").map(formatPart);

    return <>{parts}</>;
  };

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
              {dropdownValue.value === "living" ? "Explained like a local" : dropdownOptions[dropdownValue.value]?.label}:
              <AIWarningToolTip />
            </Typography>
            {isDev && <Typography className={styles.margin}>{message("Location")}</Typography>}
            {(dropdownValue.value === "living" && loading.openai.living.explainedLikeAlocal) || (dropdownValue.value !== "living" && loading.openai[dropdownValue.value]) ? (
              <ParagraphSkeleton />
            ) : dropdownValue.value === "living" ? (
              separateMessage?.map((part, index) => (
                <p className={styles.part} key={index}>
                  {part}
                </p>
              ))
            ) : (
              <FormattedMessage message={openaiResponse[dropdownValue.value]} />
            )}
            <Box className={styles.margin}>
              <WalkscoreList />
            </Box>
          </Box>
        </Box>
        {dropdownValue.value === "living" && (
          <Box className={styles.flags}>
            <Flags color="Green" flagsMessage={openaiResponse.living?.greenFlags || ""} loading={loading.openai.living.greenFlags} />
            <Flags color="Red" flagsMessage={openaiResponse.living?.redFlags || ""} loading={loading.openai.living.redFlags} />
          </Box>
        )}
      </Box>
    </TabLayout>
  );
};

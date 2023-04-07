import { Box, Typography } from "@mui/material";
import { AIWarningToolTip } from "components/AIWarningTooltip/AIWarningTooltip";
import { ParagraphSkeleton } from "components/ParagraphSkeleton/ParagraphSkeleton";
import styles from "./Flags.module.css";

export const Flags = ({ color, flagsArr, loading }: { color: string; flagsArr: any[]; loading: boolean }) => {
  const Title = () => (
    <Box style={{ marginTop: "10px" }}>
      <Typography variant="subtitle2">
        {color} Flags
        <AIWarningToolTip />
      </Typography>
    </Box>
  );

  if (loading)
    return (
      <>
        <Title />
        <ParagraphSkeleton />
      </>
    );

  return (
    <>
      <Title />

      <Box className={styles.box}>
        <ul>
          {flagsArr.length ? (
            flagsArr.map((flagContent: string, index: number) => {
              return <li key={index}>{flagContent}</li>;
            })
          ) : (
            <></>
          )}
        </ul>
      </Box>
    </>
  );
};

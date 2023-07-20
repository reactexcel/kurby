import { Box } from "@mui/material";
import Gmap from "./Gmap/Gmap";
import { Tabs } from "./Tabs/Tabs";
import styles from "./BodyContent.module.scss";
import { useTenMinutesForVisitor, useFifthTeenMinutesForFreePlan } from "context/visitorContext";

/**
 * Body Content
 * @description: Displays everything below the filters
 */
export default function BodyContent() {
  useTenMinutesForVisitor();
  useFifthTeenMinutesForFreePlan();
  return (
    <Box className={styles.main}>
      <Box className={styles.map}>
        <Gmap />
      </Box>
      <Box className={styles.tabs}>
        <Tabs />
      </Box>
    </Box>
  );
}

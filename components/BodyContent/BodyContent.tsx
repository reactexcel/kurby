import { Box } from "@mui/material";
import Gmap from "./Gmap/Gmap";
import { Tabs } from "./Tabs/Tabs";
import styles from "./BodyContent.module.scss";
import { useTenMinutesForVisitor } from "context/visitorContext";
import { useMediaQuery } from "react-responsive";
import MobileGmap from "./Mobile/GmapActivity/MobileGmap";

/**
 * Body Content
 * @description: Displays everything below the filters
 */

function GmapManager() {
  const isMobile = useMediaQuery({ maxWidth: 600 });
  if (isMobile) {
    return <MobileGmap />;
  }
  return (
    <Box className={styles.map}>
      <Gmap />
    </Box>
  );
}

export default function BodyContent() {
  useTenMinutesForVisitor();

  return (
    <Box className={styles.main}>
      <GmapManager />
      <Box className={styles.tabs}>
        <Tabs />
      </Box>
    </Box>
  );
}

import { Box } from "@mui/material";
import styles from "./Facts.module.scss";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ThreeDRotation from "@mui/icons-material/ThreeDRotation";

export default function Facts() {
  return (
    <Box className={styles.main}>
      <Box className={styles.facts}>
        <div className={styles.fact}>
          <AccessAlarmIcon fontSize="large" color={"success"} />
          <div>Worldwide Location Insights</div>
        </div>

        <div className={styles.fact}>
          <AccessAlarmIcon fontSize="large" color={"success"} />
          <div>Worldwide Nearby Places</div>
        </div>
        <div className={styles.fact}>
          <AccessAlarmIcon fontSize="large" color={"success"} />
          <div>million properties</div>
        </div>
        <div className={styles.fact}>
          <AccessAlarmIcon fontSize="large" color={"success"} />
          <div>million sales transactions</div>
        </div>
        <div className={styles.fact}>
          <AccessAlarmIcon fontSize="large" color={"success"} />
          <div>millions morgages/deeds</div>
        </div>

        <div className={styles.fact}>
          <AccessAlarmIcon fontSize="large" color={"success"} />
          <div>Foreclosures</div>
        </div>
      </Box>
    </Box>
  );
}

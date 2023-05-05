import { Box, Typography } from "@mui/material";
import styles from "../Record.module.scss";
import { KBColor } from "constants/color";

export const AdditionalInfoField = ({ label, data }: { label: string; data: any }) => (
  <Box className={styles.box}>
    <Typography className={styles.font} color={KBColor.DRAK_GREY} sx={{ marginRight: 1 }}>
      {label}:
    </Typography>
    <Typography variant="h6" component="h6" className={styles.box}>
      {data}
    </Typography>
  </Box>
);

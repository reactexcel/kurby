import { Box, Typography } from "@mui/material";
import CircleBox from "components/CircleBox/CircleBox";
import styles from "../Record.module.scss";

export const HouseInfoField = ({ data, icon }: { icon: React.ReactNode; data: any }) => (
  <Box className={styles.box}>
    <CircleBox sx={{ marginRight: "10px" }}>{icon}</CircleBox>
    <Typography variant="h6" component="h6" className={styles.box}>
      {data}
    </Typography>
  </Box>
);

import { Box, Typography } from "@mui/material";
import CustomButton from "../CustomButton/CustomButton";
import styles from "./Chatgpt.module.scss";
import Image from "next/image";

export default function Chatgpt() {
  return (
    <Box className={styles.main}>
      <div className={styles.property}>Property Search Redefined: Get What You Want, Not What You're Given</div>
      <Box className={styles.generated_with}>
        {/* <div>generated with</div> */}
        <Typography className={styles.generated} variant="h6">
          generated with
        </Typography>
        <Image src="/images/chatgpt.png" alt="chatgpt-image" width={100} height={30} />
      </Box>
      <button className={styles.button}>Try Kurby Now</button>
    </Box>
  );
}

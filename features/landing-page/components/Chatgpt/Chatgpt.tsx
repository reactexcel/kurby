import { Box, Typography } from "@mui/material";
import CustomButton from "../CustomButton/CustomButton";
import styles from "./Chatgpt.module.scss";
import Image from "next/image";

export default function Chatgpt() {
  return (
    <Box className={styles.main}>
      <div className={styles.property}>Property Search Redefined: Get What You Want, Not What You're Given</div>
      <Box className={styles.generated_with}>
        <Typography className={styles.generated} variant="h6">
          generated with
        </Typography>
        <Image src="/images/chatgpt.png" alt="chatgpt-image" width={100} height={30} />
      </Box>
      <button className={styles.button}>
        <a style={{ textDecoration: "none", color: "white" }} href="https://kurby.ai/app/miami--usa">
          Try Kurby Now
        </a>
      </button>
    </Box>
  );
}

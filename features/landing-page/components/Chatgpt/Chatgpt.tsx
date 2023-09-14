import { Box, Typography } from "@mui/material";
import styles from "./Chatgpt.module.scss";
import Image from "next/image";
import CustomButton from "../CustomButton/CustomButton";

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

      <CustomButton text="Try Kurby Now" padding="1.2rem 3.1rem" font_size="1.12rem" link="https://kurby.ai/app/miami--usa" children={undefined} />
    </Box>
  );
}

import { Box } from "@mui/material";
import CustomButton from "../CustomButton/CustomButton";
import styles from "./Chatgpt.module.scss";
import Image from "next/image";

export default function Chatgpt() {
  return (
    <Box className={styles.main}>
      <div className={styles.property}>Property Search Redefined: Get What You Want, Not What You're Given</div>
      <Box className={styles.generated_with}>
        <div>generated with</div>
        <Image src="/images/chatgpt.webp" alt="chatgpt-image" width={170} height={100} />
      </Box>
      <CustomButton text="Discover all features" />
    </Box>
  );
}

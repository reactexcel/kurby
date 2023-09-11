import { Box } from "@mui/material";
import styles from "./Reviews.module.scss";
import Image from "next/image";
import { AbilityImage } from "../Abilities/Abilies";
import { ImageIcon } from "../Facts/Facts";

export default function Reviews() {
  return (
    <Box className={styles.main}>
      <Box className={styles.image_block}>
        <AbilityImage src="/images/reviews/review_1.png" alt="review_1" objectFit="contain" />
        {/* <Image src="/images/reviews/review_1.png" alt="review_1"  fill={true}/> */}
      </Box>
      <Box className={styles.review_block}>
        <div className={styles.review}>
          "Discovering the perfect property in my local area has always been a daunting task, until I stumbled upon Kurby.I was amazed at how quickly it learned my preferences
          and helped me refine my search, saving me time and energy."
        </div>
        <div className={styles.client_name}>Christine Ritz, Miami</div>
        <Box className={styles.page_navigation}>
          <Box className={styles.arrow}>
            <ImageIcon src="/icons/arrow-left.svg" alt="arrow-left" size={14} />
          </Box>
          <div className={styles.current_page}>1 of 16</div>
          <Box className={styles.arrow}>
            <ImageIcon src="/icons/arrow-right.svg" alt="arrow-right" size={14} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

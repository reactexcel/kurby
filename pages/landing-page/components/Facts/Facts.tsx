import { Box } from "@mui/material";
import styles from "./Facts.module.scss";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ThreeDRotation from "@mui/icons-material/ThreeDRotation";
import Image from "next/image";
import { useEffect, useState } from "react";

export function ImageIcon({ src, size, alt }: { src: string; size: number; alt: string }) {
  return <Image src={src} width={size} height={size * 0.8} alt={alt} />;
}

export default function Facts() {
  return (
    <Box className={styles.main}>
      <Box className={styles.facts}>
        <Box className={styles.fact}>
          <Image src="/icons/globe_search.png" width={50} height={40} alt="globe-image" />
          <div>Worldwide Location Insights</div>
        </Box>

        <Box className={styles.fact}>
          <Image src="/icons/globe_house.png" width={50} height={40} alt="globe-image" />
          <div>Worldwide Nearby Places</div>
        </Box>
        <Box className={styles.fact}>
          <div className={styles.stats}>150+</div>
          <div>Million properties</div>
        </Box>
        <Box className={styles.fact}>
          <div className={styles.stats}>100+</div>
          <div>Million sales transactions</div>
        </Box>
        <Box className={styles.fact}>
          <div className={styles.stats}>85+</div>
          <div>Millions morgages/deeds</div>
        </Box>

        <Box className={styles.fact}>
          <div className={styles.stats}>600k</div>
          <div>Foreclosures</div>
        </Box>
      </Box>
    </Box>
  );
}

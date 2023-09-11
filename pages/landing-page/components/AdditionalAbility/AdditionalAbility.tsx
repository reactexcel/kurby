import { Box } from "@mui/material";
import styles from "./AdditionalAbility.module.scss";
import { AbilityImage } from "../Abilities/Abilies";
import CustomButton from "../CustomButton/CustomButton";

export default function AdditionalAbility() {
  return (
    <Box className={styles.main}>
      <Box className={styles.info}>
        <div className={styles.header}>From First Homes to Fortune Building, Find Your Perfect Place with a Click.</div>
        <div className={styles.parag}>
          Discover a World Tailored to You: Whether you're diving into the homebuying journey or seeking your next big investment, our AI models have got your back. Dive in
          and let Kurby's real estate AI guide your every step with pinpoint precision.
        </div>
        <CustomButton text="Try it - it's free, forever." />
      </Box>
      <Box className={styles.image}>
        <AbilityImage src="/images/abilities_images/from.png" alt="from" objectFit="contain" />
      </Box>
    </Box>
  );
}

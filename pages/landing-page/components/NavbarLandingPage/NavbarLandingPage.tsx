import Image from "next/image";
import styles from "./NavbarLandingPage.module.scss";
import { Box, Button } from "@mui/material";

export default function NavbarLandingPage() {
  return (
    <>
      <nav className={styles.main}>
        <Image style={{ maxWidth: "40" }} alt="logo" src="/images/logo-dark.png" width={100} height={30} />
        <Box className={styles.icon_options}>
          <Image alt="options" src="/icons/list.svg" width={30} height={30} />
        </Box>
        <Box className={styles.nav_options}>
          <Box className={styles.options}>
            <div className={styles.option}>About</div>
            <div className={styles.option}>Features</div>
            <div className={styles.option}>Why Kurby</div>
            <div className={styles.option}>Blog</div>
            <div className={styles.option}>Contact</div>
          </Box>
          <button className={styles.try_kurby_button}>Try Kurby Now</button>
        </Box>
      </nav>
    </>
  );
}

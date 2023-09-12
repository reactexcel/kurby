import Image from "next/image";
import styles from "./NavbarLandingPage.module.scss";
import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import CustomButton from "../CustomButton/CustomButton";

export default function NavbarLandingPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mobileScreen, setMobileScreen] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
      console.log(window.innerWidth);

      if (window.innerWidth < 960) {
        setMobileScreen(true);
      } else {
        setMobileScreen(false);
      }
    });
  }, []);

  return (
    <>
      <nav className={styles.main}>
        <Image style={{ maxWidth: "40" }} alt="logo" src={mobileScreen ? "/images/logo.png" : "/images/logo-dark.png"} width={110} height={33} />
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
          <CustomButton text="Try Kurby Now" font_size="0.95rem" />
        </Box>
      </nav>
    </>
  );
}

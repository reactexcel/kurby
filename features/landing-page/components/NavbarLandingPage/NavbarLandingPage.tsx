import Image from "next/image";
import styles from "./NavbarLandingPage.module.scss";
import { Box, Button } from "@mui/material";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import CustomButton from "../CustomButton/CustomButton";
import SortIcon from "@mui/icons-material/Sort";

function Option({ link, option }: { link: string; option: string }) {
  return (
    <a className={styles.option} style={{ textDecoration: "none", color: "black" }} href={link}>
      {option}
    </a>
  );
}

export default function NavbarLandingPage({ mobileNavbar, setMobileNavbar }: { mobileNavbar: boolean; setMobileNavbar: Dispatch<SetStateAction<boolean>> }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [tabletScreen, setTabletScreen] = useState(false);

  useEffect(() => {
    // initial render
    setWindowWidth(window.innerWidth);

    if (window.innerWidth < 1290) {
      setTabletScreen(true);
    } else {
      setTabletScreen(false);
    }

    // every resize
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
      console.log(window.innerWidth);

      if (window.innerWidth < 1290) {
        setTabletScreen(true);
      } else {
        setTabletScreen(false);
      }
    });
  }, []);

  return (
    <>
      <nav className={styles.main}>
        <Image style={{ maxWidth: "40" }} alt="logo" src={tabletScreen ? "/images/logo_mobile.png" : "/images/logo_dark.png"} width={110} height={tabletScreen ? 40 : 35} />
        <Box onClick={() => setMobileNavbar(true)} className={styles.icon_options}>
          <SortIcon fontSize="large" />
        </Box>
        <Box className={styles.nav_options}>
          <Box className={styles.options}>
            <Option link="" option="About" />
            <Option link="" option="Features" />
            <Option link="" option="Why Kurby" />
            <Option link="http://blog.kurby.ai/" option="Blog" />
            <Option link="http://kurby.ai/pricing" option="Pricing" />
            <Option link="https://blog.kurby.ai/contact/" option="Contact" />
          </Box>
          <CustomButton text="Try Kurby Now" font_size="0.95rem" />
        </Box>
      </nav>
    </>
  );
}

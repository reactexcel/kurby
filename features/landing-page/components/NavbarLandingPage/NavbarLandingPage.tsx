import Image from "next/image";
import styles from "./NavbarLandingPage.module.scss";
import { Box } from "@mui/material";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import SortIcon from "@mui/icons-material/Sort";
import CustomLoginSignUpButton from "../CustomLoginSignupButton/CustomLoginSignupButton";

function Option({ link, option }: { link: string; option: string }) {
  return (
    <a href={link} className={styles.option} style={{ textDecoration: "none", color: "black" }}>
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
        setMobileNavbar(false);
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
            <Option link="#about" option="About" />
            <Option link="http://kurby.ai/pricing" option="Pricing" />
            <Option link="#questions" option="Why Kurby" />
            <Option link="http://blog.kurby.ai/" option="Blog" />
            <Option link="https://blog.kurby.ai/contact/" option="Contact" />
          </Box>
          <CustomLoginSignUpButton />
        </Box>
      </nav>
    </>
  );
}

import styles from "./landing-page.module.scss";
import { Raleway } from "next/font/google";
import NavbarLandingPage from "./components/NavbarLandingPage/NavbarLandingPage";
import { Box, Container } from "@mui/material";
import Intro from "./components/Intro/Intro";
import Facts from "./components/Facts/Facts";
import Chatgpt from "./components/Chatgpt/Chatgpt";
import Abilities from "./components/Abilities/Abilies";
import Reviews from "./components/Reviews/Reviews";
import AdditionalAbility from "./components/AdditionalAbility/AdditionalAbility";
import Questions from "./components/Questions/Questions";
import Neighborhoods from "./components/Neighborhoods/Neighborhoods";
import Footer from "./components/Footer/Footer";
import Image from "next/image";
import NavbarMobile from "./components/NavbarMobile/NavbarMobile";
import { useState } from "react";

export default function LandingPage() {
  const [mobileNavbar, setMobileNavbar] = useState(false);
  return (
    <Container style={mobileNavbar ? { height: "100vh", overflow: "hidden" } : {}} disableGutters={true} maxWidth={false} className={styles.main}>
      {mobileNavbar && <NavbarMobile {...{ mobileNavbar, setMobileNavbar }} />}
      <NavbarLandingPage {...{ mobileNavbar, setMobileNavbar }} />
      <Box className={styles.first_section}>
        <Intro />
        <Box className={styles.empty_box}>
          <Image className={styles.image} src="/images/googlemap.webp" fill objectFit="contain" alt="googlemap" />
        </Box>
      </Box>
      <Facts />
      <Box className={styles.third_section}>
        <Chatgpt />
      </Box>
      <Abilities />
      <Reviews />
      <AdditionalAbility />
      <Questions />
      <Neighborhoods />
      <Footer />
    </Container>
  );
}

import styles from "./landing-page.module.scss";

import { Raleway } from "next/font/google";
import NavbarLandingPage from "./components/NavbarLandingPage/NavbarLandingPage";
import GoogleMapBox from "./components/GoogleMapBox/GoogleMapBox";
import { Box, Container } from "@mui/material";
import Intro from "./components/Intro/Intro";
import Facts from "./components/Facts/Facts";

const raleway = Raleway({ subsets: ["latin"] });
const mainClassName = `${styles.main} ${raleway.className}`;

export default function LandingPage() {
  return (
    <Container disableGutters={true} maxWidth={false} className={styles.main}>
      <NavbarLandingPage />
      <Box className={styles.first_section}>
        <Intro />
        <Box className={styles.empty_box}></Box>
      </Box>
      {/* <GoogleMapBox /> */}
      <Facts />
      <div>bye</div>
    </Container>
  );
}

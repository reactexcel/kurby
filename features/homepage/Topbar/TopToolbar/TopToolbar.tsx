import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import darkLogo from "../../../../public/images/logo-dark.png";
import Image from "next/image";
import styles from "./TopToolbar.module.scss";
import { useWindowSize } from "hooks/use-window-size";
import HamburgerIcon from "@mui/icons-material/Menu";
import { Button } from "components/Button/Button";

const TopToolbar = () => {
  const router = useRouter();
  const { isMobile } = useWindowSize();

  const scrollToElement = () => {
    const element = document.getElementById("firstSection");
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <Toolbar className={styles.toolbar}>
      {isMobile ? (
        <>
          <Image src={darkLogo} alt="logo" className={styles.image} onClick={() => router.push("/")} />
          <HamburgerIcon className={styles.icon} />
        </>
      ) : (
        <>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image src={darkLogo} alt="logo" className={styles.image} onClick={() => router.push("/")} />
            <Box
              sx={{
                marginLeft: "1rem",
              }}
            >
              <Button variant="plain" onClick={() => scrollToElement()}>
                About Us
              </Button>
            </Box>
          </Box>
          <Box>
            <Box
              style={{
                display: "flex",
                gap: "1rem",
              }}
            >
              <Button variant="plain" onClick={() => router.push("https://blog.kurby.ai/")}>
                Blog
              </Button>
              <Button onClick={() => router.push("https://kurby.outseta.com/auth?widgetMode=register#o-anonymous")}>Login / Register</Button>
            </Box>
          </Box>
        </>
      )}
    </Toolbar>
  );
};

export default TopToolbar;

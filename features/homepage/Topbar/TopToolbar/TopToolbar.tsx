import { useContext, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import darkLogo from "../../../../public/images/logo-dark.png";
import Image from "next/image";
import styles from "./TopToolbar.module.scss";
import HamburgerIcon from "@mui/icons-material/Menu";
import { Button } from "components/Button/Button";
import { useAuth } from "providers/AuthProvider";
import { HamburguerMenu } from "components/HamburgerMenu/HamburgerMenu";
import { LoginSignupButton } from "components/LoginSignupButton/LoginSignupButton";
import { WindowSizeContext } from "context/windowSizeContext";

const TopToolbar = () => {
  const router = useRouter();
  const { isMobile } = useContext(WindowSizeContext);
  const { openLoginSignup, user, isLoading } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
          <HamburgerIcon className={styles.icon} onClick={() => setIsDrawerOpen(true)} />
          <HamburguerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
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
              <Button variant={window.location.href.includes("/pricing") ? "outlined" : "plain"} onClick={() => router.push("/pricing")}>
                Pricing
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
              <LoginSignupButton />
            </Box>
          </Box>
        </>
      )}
    </Toolbar>
  );
};

export default TopToolbar;

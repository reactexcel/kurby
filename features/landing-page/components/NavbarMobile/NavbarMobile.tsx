import { Box } from "@mui/material";
import styles from "./NavbarMobile.module.scss";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Dispatch, SetStateAction } from "react";
import CustomLoginSignUpButton from "../CustomLoginSignupButton/CustomLoginSignupButton";
import SocialMediaIcons from "../SocialMediaIcons/SocialMediaIcons";
import { useAuth } from "providers/AuthProvider";

function Option({ link, option, setMobileNavbar }: { link: string; option: string; setMobileNavbar: Dispatch<SetStateAction<boolean>> }) {
  return (
    <a onClick={() => (link[0] === "#" ? setMobileNavbar(false) : {})} className={styles.link} href={link}>
      <Box className={styles.option}>
        <div>{option}</div>
        <ArrowRightIcon fontSize="large" />
      </Box>
    </a>
  );
}

export default function NavbarMobile({ mobileNavbar, setMobileNavbar }: { mobileNavbar: boolean; setMobileNavbar: Dispatch<SetStateAction<boolean>> }) {
  const { user, logout } = useAuth();
  return (
    <Box className={styles.main}>
      <Box className={styles.first_section}>
        <Box className={styles.logo_close}>
          <div className={styles.logo}>
            <Image style={{ maxWidth: "40" }} alt="logo" src="/images/logo_mobile.png" width={110} height={40} />
          </div>
          <div onClick={() => setMobileNavbar(false)} className={styles.close}>
            <CloseIcon fontSize="large" />
          </div>
        </Box>
        <Box className={styles.options}>
          <Option setMobileNavbar={setMobileNavbar} link="#about" option="About" />
          <Option setMobileNavbar={setMobileNavbar} link="#questions" option="Why Kurby" />

          <Option link="http://blog.kurby.ai/" option="Blog" setMobileNavbar={setMobileNavbar} />
          <Option link="http://kurby.ai/pricing" option="Pricing" setMobileNavbar={setMobileNavbar} />
          <Option link="https://blog.kurby.ai/contact/" option="Contact" setMobileNavbar={setMobileNavbar} />
        </Box>

        {user ? (
          <button className={styles.logout_button} onClick={() => logout()}>
            Log out
          </button>
        ) : (
          <CustomLoginSignUpButton />
        )}
      </Box>
      <Box className={styles.second_section}>
        <SocialMediaIcons />
        <div className={styles.address}>7969 NW 2nd Street #1185, Miami, FL 33126, United States</div>
      </Box>
    </Box>
  );
}

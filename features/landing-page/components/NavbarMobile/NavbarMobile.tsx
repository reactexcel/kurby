import { Box } from "@mui/material";
import styles from "./NavbarMobile.module.scss";
import { SocialMediaIcons } from "../Footer/Footer";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Dispatch, SetStateAction } from "react";

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

        <button className={styles.button}>Try Kurby Now</button>
      </Box>
      <Box className={styles.second_section}>
        <Box className={styles.social_media_icons}>
          <Image className={styles.social_icon} src="/icons/social_media/discord.png" alt="discord-image" width={50} height={50} />
          <TwitterIcon className={styles.social_icon} />
          <FacebookIcon className={styles.social_icon} />
          <InstagramIcon className={styles.social_icon} />
        </Box>
        <div className={styles.address}>7969 NW 2nd Street #1185, Miami, FL 33126, United States</div>
      </Box>
    </Box>
  );
}

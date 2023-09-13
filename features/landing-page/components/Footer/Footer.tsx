import { Accordion, AccordionDetails, AccordionSummary, Box } from "@mui/material";
import styles from "./Footer.module.scss";
import { AccordionStyle } from "../Questions/Questions";

import ArrowDropDownTwoToneIcon from "@mui/icons-material/ArrowDropDownTwoTone";
import { useContext } from "react";
import { WindowSizeContext } from "context/windowSizeContext";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import Image from "next/image";
import CookieIcon from "@mui/icons-material/Cookie";

export function SocialMediaIcons() {
  return (
    <Box className={styles.social_media_icons}>
      <Image className={styles.social_icon} src="/icons/social_media/discord.png" alt="discord-image" width={50} height={50} />
      <TwitterIcon className={styles.social_icon} />
      <FacebookIcon className={styles.social_icon} />
      <InstagramIcon className={styles.social_icon} />
    </Box>
  );
}

function FooterContent({ options }: { options: string[] }) {
  return (
    <Box className={styles.content}>
      {options.map((option) => {
        return <div className={styles.option}>{option}</div>;
      })}
    </Box>
  );
}

function FooterAccordion({ summary, options }: { summary: string; options: string[] }) {
  return (
    <Accordion className={styles.footer_accordion} sx={AccordionStyle}>
      <AccordionSummary expandIcon={<ArrowDropDownTwoToneIcon fontSize="large" sx={{ color: "white" }} />} aria-controls="panel1a-content" id="panel1a-header">
        <div className={styles.summary}>
          <strong>{summary}</strong>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <FooterContent options={options} />
      </AccordionDetails>
    </Accordion>
  );
}

export default function Footer() {
  const { isDesktop } = useContext(WindowSizeContext);

  return (
    <Box className={styles.main}>
      <Box className={styles.first_section}>
        <Box className={styles.first_block}>
          <Box className={styles.text}>
            <div className={styles.stay_up}>Stay up to date</div>
            <div className={styles.subscribe}>Subscribe to our newsletter to receive best offers and latest news of real estate world</div>
          </Box>
          <Box className={styles.email_input}>
            <input placeholder="Email" className={styles.input} type="email" />
            <button className={styles.button}>Submit</button>
          </Box>
          <Box className={styles.social_media_icons}>
            <Image className={styles.social_icon} src="/icons/social_media/discord.png" alt="discord-image" width={50} height={50} />
            <TwitterIcon className={styles.social_icon} />
            <FacebookIcon className={styles.social_icon} />
            <InstagramIcon className={styles.social_icon} />
          </Box>
        </Box>
        <hr className={styles.line} />
        {isDesktop ? (
          <Box className={styles.second_block}>
            <Box className={styles.footer_accordion}>
              <div className={styles.summary}>Solutions</div>
              <FooterContent options={["Property Location Data", "Home Value Estimator"]} />
            </Box>
            <Box className={styles.footer_accordion}>
              <div className={styles.summary}>Kurby</div>
              <FooterContent options={["Blog", "Knowledge Base"]} />
            </Box>
            <Box className={styles.footer_accordion}>
              <div className={styles.summary}>Company</div>
              <FooterContent options={["Pricing", "Contact Us"]} />
            </Box>
          </Box>
        ) : (
          <Box className={styles.second_block}>
            <FooterAccordion summary="Solutions" options={["Property Location Data", "Home Value Estimator"]} />
            <FooterAccordion summary="Kurby" options={["Blog", "Knowledge Base"]} />
            <FooterAccordion summary="Company" options={["Pricing", "Contact Us"]} />
          </Box>
        )}
      </Box>
      <hr className={styles.line} />
      <Box className={styles.second_section}>
        <Box className={styles.kurby_privacy}>
          <div>@ 2023 Kurby</div>
          <div className={styles.privacy}>Privacy Policy</div>
        </Box>
        <hr className={styles.line} />
        <div className={styles.address}>7969 NW 2nd Street #1185, Miami, FL 33126, United States</div>
        <hr className={styles.line} />
        <Box className={styles.cookies}>
          <div>Cookies</div>
          <div className={styles.icon}>
            <CookieIcon color="action" />
          </div>
        </Box>
      </Box>
    </Box>
  );
}

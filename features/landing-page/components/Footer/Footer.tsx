import { useRouter } from "next/router";
import { Accordion, AccordionDetails, AccordionSummary, Box } from "@mui/material";
import styles from "./Footer.module.scss";
import { AccordionStyle } from "../Questions/Questions";

import ArrowDropDownTwoToneIcon from "@mui/icons-material/ArrowDropDownTwoTone";
import { useContext } from "react";
import { WindowSizeContext } from "context/windowSizeContext";
import CookieIcon from "@mui/icons-material/Cookie";
import SocialMediaIcons from "../SocialMediaIcons/SocialMediaIcons";

// export function SocialMediaIcons() {
//   return (
//     <Box className={styles.social_media_icons}>
//       <Image className={styles.social_icon} src="/icons/social_media/discord.png" alt="discord-image" width={50} height={50} />
//       <TwitterIcon className={styles.social_icon} />
//       <FacebookIcon className={styles.social_icon} />
//       <InstagramIcon className={styles.social_icon} />
//     </Box>
//   );
// }

function FooterContent({ options }: { options: Option[] }) {
  return (
    <Box className={styles.content}>
      {options.map((option) => {
        return (
          <a target="_blank" className={styles.option} href={option.link}>
            <div>{option.option}</div>
          </a>
        );
      })}
    </Box>
  );
}

type Option = {
  link: string;
  option: string;
};

interface Props {
  linkText: string;
  link?: string;
  onClick?: () => void;
  style?: object;
}

function FooterAccordion({ summary, options }: { summary: string; options: Option[] }) {
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
  const router = useRouter();

  const Link = ({ linkText, link, onClick, style }: Props) => {
    return (
      <div className={styles.privacy} onClick={() => (onClick ? onClick() : link && router.push(link))}>
        {linkText}
      </div>
    );
  };

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

          <SocialMediaIcons />
        </Box>
        <hr className={styles.line} />
        {isDesktop ? (
          <Box className={styles.second_block}>
            <Box className={styles.footer_accordion}>
              <div className={styles.summary}>Solutions</div>
              <FooterContent
                options={[
                  { link: "http://kurby.ai/location-data", option: "Property Location Data" },
                  { link: "http://kurby.ai/home-value-estimator", option: "Home Value Estimator" },
                ]}
              />
            </Box>
            <Box className={styles.footer_accordion}>
              <div className={styles.summary}>Kurby</div>
              <FooterContent
                options={[
                  { link: "http://blog.kurby.ai/", option: "Blog" },
                  { link: "http://help.kurby.ai/", option: "Knowledge Base" },
                ]}
              />
            </Box>
            <Box className={styles.footer_accordion}>
              <div className={styles.summary}>Company</div>
              <FooterContent
                options={[
                  { link: "http://kurby.ai/pricing", option: "Pricing" },
                  { link: "https://blog.kurby.ai/contact/", option: "Contact Us" },
                ]}
              />
            </Box>
          </Box>
        ) : (
          <Box className={styles.second_block}>
            <FooterAccordion
              summary="Solutions"
              options={[
                { link: "http://kurby.ai/location-data", option: "Property Location Data" },
                { link: "http://kurby.ai/home-value-estimator", option: "Home Value Estimator" },
              ]}
            />
            <FooterAccordion
              summary="Kurby"
              options={[
                { link: "http://blog.kurby.ai/", option: "Blog" },
                { link: "http://help.kurby.ai/", option: "Knowledge Base" },
              ]}
            />
            <FooterAccordion
              summary="Company"
              options={[
                { link: "http://kurby.ai/pricing", option: "Pricing" },
                { link: "https://blog.kurby.ai/contact/", option: "Contact Us" },
              ]}
            />
          </Box>
        )}
      </Box>
      <hr className={styles.line} />
      <Box className={styles.second_section}>
        <Box className={styles.kurby_privacy}>
          <div>@ 2023 Kurby</div>
          <Link linkText="Privacy Policy" link="https://blog.kurby.ai/privacy-policy/" />
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

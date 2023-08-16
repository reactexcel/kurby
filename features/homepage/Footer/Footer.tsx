import { useRouter } from "next/router";
import { IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { FaFacebookF } from "react-icons/fa";
import styles from "./Footer.module.scss";
import { Paragraph } from "components/Paragraph/Paragraph";

interface Props {
  linkText: string;
  link?: string;
  onClick?: () => void;
  style?: object;
}

export const HomepageFooter = () => {
  const router = useRouter();

  const Link = ({ linkText, link, onClick, style }: Props) => {
    return (
      <p style={style} className={styles.link} onClick={() => (onClick ? onClick() : link && router.push(link))}>
        <span
          style={{
            color: "#00A13D",
          }}
        />
        {linkText}
      </p>
    );
  };

  const privacyLinkStyle = { opacity: 1, textDecoration: "underline", fontWeight: 800 };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.upperSection}>
          <img draggable={false} src="/images/logo.png" className={styles.logo} onClick={() => router.push("/")} alt="" />
          <div className={styles.textWrapper}>
            <Paragraph className={styles.paragraph}>
              Kurby is the first and only real estate platform that provides AI-powered insights on any property or location in the world.
            </Paragraph>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <h4 className={styles.columnText}>Solutions</h4>
              <Link linkText="Property Location Data" link="https://kurby.ai/location-data" />
              <Link linkText="Home Value Estimator" link="https://kurby.ai/home-value-estimate" />
            </div>
            <div className={styles.column}>
              <h4 className={styles.columnText}>Resources</h4>
              <Link linkText="Blog" link="https://blog.kurby.ai" />
              <Link linkText="Knowledge Base" link="https://help.kurby.ai/" />
            </div>
            <div className={styles.column}>
              <h4 className={styles.columnText}>Company</h4>
              <Link linkText="Pricing" link="https://kurby.ai/pricing" />
              <Link linkText="Contact Us" link="https://kurby.ai/contact-us" />
            </div>
          </div>
          {/* <div className={styles.linksWrapper}>
            <Link linkText="Home" link="/" />
            <Link linkText="About Us" onClick={() => handleClick()} />
            <Link linkText="Blog" link="https://blog.kurby.ai/" />
            <Link linkText="Contact Us" link="https://blog.kurby.ai/contact/" />
            <Link linkText="Pricing" link="https://kurby.ai/pricing/" />
            <Link linkText="Privacy Policy" link="https://blog.kurby.ai/privacy-policy/" />
            <Link linkText="Terms & Conditions" link="https://blog.kurby.ai/terms-and-conditions/" />
          </div> */}
        </div>
        <div>
          <Paragraph className={styles.mailingAddress}>7969 NW 2nd Street #1185, Miami, FL 33126, United States</Paragraph>
          <div className={styles.links}>
            <Link style={privacyLinkStyle} linkText="Privacy Policy" link="https://blog.kurby.ai/privacy-policy/" />
            <Link style={privacyLinkStyle} linkText="Terms of Services" link="https://blog.kurby.ai/terms-and-conditions/" />
          </div>
        </div>
      </div>
      <div className={styles.social}>
        <IconButton className={styles.iconWrapper}>
          <TwitterIcon className={styles.icon} />
        </IconButton>
        <IconButton className={styles.iconWrapper}>
          <InstagramIcon className={styles.icon} />
        </IconButton>
        <IconButton className={styles.iconWrapper}>
          <FaFacebookF className={styles.icon} />
        </IconButton>
      </div>
    </>
  );
};

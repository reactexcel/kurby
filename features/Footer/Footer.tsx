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
}

export const Footer = () => {
  const router = useRouter();

  const handleClick = () => {
    const scrollToElement = document.getElementById("firstSection");

    if (scrollToElement) {
      window.scrollTo({
        top: scrollToElement.offsetTop - 40,
        behavior: "smooth",
      });
    }
  };

  const Link = ({ linkText, link, onClick }: Props) => {
    return (
      <p className={styles.link} onClick={() => (onClick ? onClick() : link && router.push(link))}>
        <span
          style={{
            color: "#00A13D",
          }}
        />
        {linkText}
      </p>
    );
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.upperSection}>
          <img src="/images/logo.png" className={styles.logo} onClick={() => router.push("/")} alt="" />
          <div className={styles.textWrapper}>
            <Paragraph className={styles.paragraph}>
              Find the most livable home in the neighborhood and save time and effort during the home-buying process with Kurby’s
              <span className={styles.homeValueLink}> home value </span>
              estimator tools.
            </Paragraph>
          </div>
          <div className={styles.linksWrapper}>
            <Link linkText="Home" link="/" />
            <Link linkText="About Us" onClick={() => handleClick()} />
            <Link linkText="Blog" link="https://blog.kurby.ai/" />
            <Link linkText="Contact Us" link="https://blog.kurby.ai/contact/" />
            <Link linkText="Privacy Policy" link="https://blog.kurby.ai/privacy-policy/" />
            <Link linkText="Terms & Conditions" link="https://blog.kurby.ai/terms-and-conditions/" />
          </div>
        </div>
        <Paragraph className={styles.mailingAddress}>7969 NW 2nd Street #1185, Miami, FL 33126, United States</Paragraph>
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

import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { IconButton, IconButtonProps } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { FaFacebookF } from "react-icons/fa";
import styles from "./HomepageFooter.module.scss";

const CustomFacebook = styled(FaFacebookF)(() => ({
  color: "white",
  padding: "3px",
  fontSize: "28px",
  "&:hover": { color: "#21C25E" },
}));

const CustomSocialIcon = styled(IconButton)<IconButtonProps>(() => ({
  border: "1px solid #818A94",
  borderRadius: "50%",
  transition: "all 0.3s",
  margin: "19px 6px",
  "&:hover": {
    transform: "scale(1.1)",
  },
}));

interface Props {
  linkText: string;
  link?: string;
  onClick?: () => void;
}

const LinkElem = ({ linkText, link, onClick }: Props) => {
  const router = useRouter();

  return (
    <div className={styles.link} onClick={() => (onClick ? onClick() : link && router.push(link))}>
      <span
        style={{
          color: "#21C25E",
        }}
      ></span>
      {linkText}
    </div>
  );
};

const HomepageFooter = () => {
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

  return (
    <>
      <div className={styles.container}>
        <div className={styles.upperSection}>
          <img src="/images/logo.png" className={styles.logo} onClick={() => router.push("/")} />
          <div className={styles.textWrapper}>
            <p className={styles.text}>
              Find the most livable home in the neighborhood and save time and effort during the home-buying process with Kurby’s
              <span className={styles.homeValueLink}> home value </span>
              estimator tools.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              margin: "20px 0px",
              justifyContent: "center",
            }}
          >
            <LinkElem linkText="Home" link="/" />
            <LinkElem linkText="About Us" onClick={() => handleClick()} />
            <LinkElem linkText="Blog" link="https://blog.kurby.ai/" />
            <LinkElem linkText="Contact Us" link="https://blog.kurby.ai/contact/" />
            <LinkElem linkText="Privacy Policy" link="https://blog.kurby.ai/privacy-policy/" />
            <LinkElem linkText="Terms & Conditions" link="https://blog.kurby.ai/terms-and-conditions/" />
          </div>
        </div>
      </div>
      <div className={styles.social}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <CustomSocialIcon>
            <TwitterIcon
              sx={{
                color: "white",
                padding: "3px",
                fontSize: "28px",
                "&:hover": { color: "#21C25E" },
              }}
            />
          </CustomSocialIcon>
          <CustomSocialIcon>
            <InstagramIcon
              sx={{
                color: "white",
                padding: "3px",
                fontSize: "28px",
                "&:hover": { color: "#21C25E" },
              }}
            />
          </CustomSocialIcon>
          <CustomSocialIcon>
            <CustomFacebook />
          </CustomSocialIcon>
        </div>
      </div>
    </>
  );
};

export default HomepageFooter;

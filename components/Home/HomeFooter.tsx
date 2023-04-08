import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { IconButton, IconButtonProps } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { FaFacebookF } from "react-icons/fa";

const Link = styled("p")(() => ({
  cursor: "pointer",
  color: "white",
  fontSize: "20px",
  fontWeight: "500",
  lineHeight: "24px",
  margin: "0px 20px",
  "&:hover": {
    color: "#21C25E",
  },
}));

const Container = styled("div")(() => ({
  width: "100%",
  backgroundColor: "#061A23",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const Social = styled("div")(() => ({
  width: "100%",
  backgroundColor: "#061A23",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderStyle: "dashed",
  borderWidth: "1px 0px 0px 0px",
  borderColor: "#86868666",
  transition: "background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s",
  padding: "20px 0px 20px 0px",
}));

const CustomFacebook = styled(FaFacebookF)(() => ({
  color: "white",
  padding: "3px",
  fontSize: "28px",
  "&:hover": { color: "#21C25E" },
}));

const HomeValueLink = styled("span")(() => ({
  color: "#00a13c",
  cursor: "pointer",
  transition: "all 0.2s",
  "&:hover": {
    color: "#203656",
  },
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
    <Link onClick={() => (onClick ? onClick() : link && router.push(link))}>
      <span
        style={{
          color: "#21C25E",
        }}
      ></span>
      {linkText}
    </Link>
  );
};

const HomeFooter = () => {
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
      <Container>
        <div
          style={{
            maxWidth: "1140px",
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/images/logo.png"
            style={{
              margin: "15px 0px",
              width: "150px",
              cursor: "pointer",
            }}
            onClick={() => router.push("/")}
          />
          <div
            style={{
              padding: "10px 180px 0px 180px",
            }}
          >
            <p
              style={{
                color: "#868686",
                fontSize: "20px",
                fontWeight: "300",
                lineHeight: "34px",
                marginTop: "0px",
              }}
            >
              Find the most livable home in the neighborhood and save time and effort during the home-buying process with Kurby’s
              <HomeValueLink> home value </HomeValueLink>
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
      </Container>
      <Social>
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
      </Social>
    </>
  );
};

export default HomeFooter;

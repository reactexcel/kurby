import { Container, ContainerProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import TopToolbar from "./Topbar/TopToolbar";
import HomeFooter from "./HomeFooter";
import Footer from "../Footer/Footer";
import styles from "./Home.module.css";
import SearchIcon from "@mui/icons-material/Search";
import GoogleAddressInput from "../GoogleAddressInput";
import { useRouter } from "next/router";
import { addressToUrl } from "utils/address";
import { FirstSection } from "features/homepage-sections/FirstSection/FirstSection";
import { Paragraph } from "components/Paragraph/Paragraph";
import { SecondSection } from "features/homepage-sections/SecondSection/SecondSection";
import { ThirdSection } from "features/homepage-sections/ThirdSection/ThirdSection";

const CustomContainer = styled("div")(() => ({
  position: "relative",
  display: "flex",
  flexWrap: "wrap",
  alignContent: "flex-start",
  flexDirection: "column",
  gap: "1rem",
  marginTop: "5rem",
  width: "65%",
}));

const CustomBody = styled(Container)<ContainerProps>(() => ({
  backgroundImage: 'url("/images/homepage-banner.png")',
  backgroundPosition: "right 75%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  width: "100%",
  maxWidth: "none !important",
  margin: "0 !important",
  transition: "background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s",
  height: "85vh",
  zIndex: "-1",
  top: "0",
  display: "flex",
  padding: "0rem 5rem !important",
}));

export default function Home({ mobile }: any) {
  const router = useRouter();
  return (
    <>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TopToolbar />
      </div>
      <CustomBody>
        <CustomContainer>
          <h1 className={styles.header}>
            UNLOCK THE <span className={styles.coloredText}>POWER</span> OF REAL ESTATE INTELLIGENCE
          </h1>

          <Paragraph text="Simplify your property search with our AI-powered app." className={styles.paragraph} />

          <div className={styles.formWrapper}>
            <div className={styles.formContainer}>
              <GoogleAddressInput
                label=""
                inputProps={{
                  sx: {
                    height: "50px",
                  },
                  autoComplete: "off",
                }}
                InputProps={{
                  sx: {
                    width: "95%",
                    height: "2rem",
                    borderBottom: "none !important",
                    margin: "0.25rem 0",
                    "&::before": {
                      borderBottom: "none !important",
                    },
                    "&::after": {
                      borderBottom: "none !important",
                    },
                  },
                }}
                className={styles.input}
                placeholder="Search a property address"
                handleSelectedAddress={(address: any) => {
                  const encodedAddress = addressToUrl(address.formatted_address);
                  router.push(`/app/${encodedAddress}`);
                }}
              />
              <button className={styles.searchButton}>
                <SearchIcon className={styles.searchIcon} />
              </button>
            </div>
          </div>
          <Paragraph text="Try it - it's free, forever." />
        </CustomContainer>
      </CustomBody>
      <FirstSection />
      <SecondSection />
      {/* <ThirdSection /> */}
      <HomeFooter mobile={mobile} />
      <Footer />
    </>
  );
}

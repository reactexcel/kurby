import { Container } from "@mui/material";
import TopToolbar from "./Topbar/TopToolbar";
import HomeFooter from "./HomeFooter";
import Footer from "../Footer/Footer";
import styles from "./Homepage.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import GoogleAddressInput from "../GoogleAddressInput";
import { useRouter } from "next/router";
import { addressToUrl } from "utils/address";
import { FirstSection } from "features/homepage-sections/FirstSection/FirstSection";
import { Paragraph } from "components/Paragraph/Paragraph";
import { SecondSection } from "features/homepage-sections/SecondSection/SecondSection";
import { ThirdSection } from "features/homepage-sections/ThirdSection/ThirdSection";

export const Homepage = () => {
  const router = useRouter();
  return (
    <>
      <div className={styles.main}>
        <TopToolbar />
      </div>
      <Container className={styles.container}>
        <div className={styles.wrapper}>
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
        </div>
      </Container>
      <FirstSection />
      <SecondSection />
      {/* <ThirdSection /> */}
      <HomeFooter />
      <Footer />
    </>
  );
};

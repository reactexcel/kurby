import { Container, ContainerProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import TopToolbar from "./Topbar/TopToolbar";
import Cards from "./Cards";
import HomeFooter from "./HomeFooter";
import Footer from "../Footer/Footer";
import styles from "./Home.module.css";
import SearchIcon from "@mui/icons-material/Search";
import GoogleAddressInput from "../GoogleAddressInput";
import { useRouter } from "next/router";
import { addressToUrl } from "utils/address";

const CustomContainer = styled("div")(() => ({
  position: "relative",
  display: "flex",
  flexWrap: "wrap",
  alignContent: "flex-start",
  flexDirection: "column",
  gap: "1rem",
  marginTop: "5rem",
  width: "60%",
}));

const CustomBody = styled(Container)<ContainerProps>(() => ({
  backgroundImage: 'url("/images/homepage-banner.png")',
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  width: "100%",
  maxWidth: "none !important",
  margin: "0 !important",
  transition: "background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s",
  height: "70vh",
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
          <h1
            style={{
              margin: "0",
            }}
          >
            UNLOCK THE <span style={{ color: "#21C25E" }}>POWER</span> OF REAL ESTATE INTELLIGENCE
          </h1>

          <h3
            style={{
              color: "#727272",
              fontWeight: "lighter",
            }}
          >
            Simplify your property search with our AI-powered app.
          </h3>

          <div className={styles.formWrapper}>
            <div className={styles.formContainer}>
              <GoogleAddressInput
                label=""
                inputProps={{
                  sx: {
                    height: "50px",
                    fontSize: "20px",
                  },
                  autoComplete: "off",
                }}
                InputProps={{
                  sx: {
                    width: "95%",
                    height: "2rem",
                    borderBottom: "none !important",
                    marginTop: "5px",
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

          <div
            style={{
              color: "#727272",
            }}
          >
            Try it - it's free, forever.
          </div>
        </CustomContainer>
      </CustomBody>
      <section
        style={{
          padding: "0",
        }}
      >
        <div
          style={{
            maxWidth: "1140px",
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2
            style={{
              fontSize: "40px",
              fontWeight: "500",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            How Kurby Improves The Home-Buying Process
          </h2>
          <Cards />
          <h2
            style={{
              fontSize: "40px",
              fontWeight: "500",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Explore Neighborhoods on Kurby
          </h2>
        </div>
      </section>
      <HomeFooter mobile={mobile} />
      <Footer />
    </>
  );
}

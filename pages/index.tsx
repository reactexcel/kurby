import Filters from "../components/Filters/Filters";
import Navbar from "../components/Navbar/Navbar";
import BodyContent from "../components/BodyContent/BodyContent";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { Box } from "@mui/material";
import Script from "next/script";
import { RecoilRoot } from "recoil";
import GLOBAL_SETTINGS from "../globals/GLOBAL_SETTINGS";
import { Container, ContainerProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import TopToolbar from "../components/Topbar/TopToolbar";
import Cards from '../components/Home/Cards';
import HomeFooter from "../components/Home/HomeFooter";
import Footer from "../components/Footer/Footer";
import AnimatedHeader from '../components/Home/AnimatedHeader';

const CustomBody = styled(Container)<ContainerProps>(() => ({
  backgroundImage:
    'url("/images/home-banner950.jpg")',
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  width: "100%",
  maxWidth: "none !important",
  margin: "0 !important",
  transition:
    "background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s",
  height: "92vh",
  zIndex: "-1",
  top: "0",
  display: "flex",
  marginTop: "-125px !important",
}));

const CustomContainer = styled("div")(() => ({
  position: "relative",
  display: "flex",
  flexWrap: "wrap",
  alignContent: "flex-start",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "100px",
  marginLeft: "auto",
  marginRight: "auto",
}));

/**
 * Home
 * @description: Landing page
 */
export default function Home({mobile}: any) {

  return ( 
    <>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px 0px",
        }}
      >
        <TopToolbar />
      </div>
      <CustomBody>
        <CustomContainer>
          <AnimatedHeader mobile={mobile} />
          <div>
            <h2
              style={{
                fontWeight: "300",
                fontSize: "30px",
                color: "#868686",
                textAlign: 'center'
              }}
            >
              Kurby uses location data to estimate property value like never
              before.
            </h2>
          </div>
        </CustomContainer>
      </CustomBody>
      <section
        style={{
          padding: '0'
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
              textAlign: 'center'
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
              textAlign: 'center'
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

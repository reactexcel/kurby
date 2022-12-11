import Filters from "../components/Filters/Filters";
import Navbar from "../components/Navbar/Navbar";
import BodyContent from "../components/BodyContent/BodyContent";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { Box } from "@mui/material";
import Script from "next/script";
import {
  RecoilRoot,
} from "recoil";

/**
 * Home
 * @description: Landing page
 */
export default function Home() {
  return (
    <>
      <RecoilRoot>
        <Script
          strategy="beforeInteractive"
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC-j4y1h-28ZVSr_YyTfPrOsQ1YxOVMygY&libraries=places"
        />
        <ThemeProvider theme={theme}>
          <Navbar />
          <Box style={{ padding: "32px" }}>
            <Filters />
            <BodyContent />
          </Box>
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}

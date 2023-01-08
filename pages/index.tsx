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
import GLOBAL_SETTINGS from "../globals/GLOBAL_SETTINGS";

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
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        />
        <ThemeProvider theme={theme}>
          <Navbar />
          <Box style={{ padding: "32px", paddingBottom: "0px", height: "92vh", display: "flex", flexDirection: "column", boxSizing: "border-box", }}>
            <Filters />
            <BodyContent />
          </Box>
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}

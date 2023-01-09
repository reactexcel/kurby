import Filters from "../components/Filters/Filters";
import Navbar from "../components/Navbar/Navbar";
import BodyContent from "../components/BodyContent/BodyContent";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { Box } from "@mui/material";
import Script from "next/script";
import { RecoilRoot } from "recoil";
import GLOBAL_SETTINGS from "../globals/GLOBAL_SETTINGS";
import { useEffect, useState } from "react";
import Homepage from "../components/Home/Homepage";
/**
 * Home
 * @description: Landing page
 */
export default function Home() {
  const [isHomepage, setHomepage] = useState(true);

  useEffect(() => {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let address = urlParams.get('address')

    if(address) setHomepage(false);
  }, [])
  
  
  return (
    <>
     
        <Script
          strategy="beforeInteractive"
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        />
        <ThemeProvider theme={theme}>
          {isHomepage ? (
             <Homepage setHomepage={setHomepage}/>
          ) : (
            <>
              <Navbar />
              <Box style={{ padding: "32px" }}>
                <Filters />
                <BodyContent />
              </Box>
            </>
          )}
        </ThemeProvider>
    </>
  );
}

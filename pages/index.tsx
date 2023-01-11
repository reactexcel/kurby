import Filters from "../components/Filters/Filters";
import Navbar from "../components/Navbar/Navbar";
import BodyContent from "../components/BodyContent/BodyContent";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { Box } from "@mui/material";
import Script from "next/script";
import { RecoilRoot, useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import Homepage from "../components/Home/Homepage";
import { addressState } from "../context/filterContext";
/**
 * Home
 * @description: Landing page
 */
export default function Home() {
  const [recoilAddress] = useRecoilState(addressState);
  const [isHomepage, setHomepage] = useState(true);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      console.log("address change", recoilAddress);
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const address = urlParams.get("address");
      if (address) setHomepage(false);
      setLoading(false);
    }, 500);
  }, [recoilAddress]);

  return (
<>
      <Script
        strategy="beforeInteractive"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
      />
      
      <ThemeProvider theme={theme}>
        {isLoading ? (
          <></>
        ) : isHomepage ? (
          <Homepage setHomepage={setHomepage} />
        ) : (
          <>
          
            <Navbar />
            <Box 
              style={{ 
                padding: '32px',
                paddingBottom: '0px',
                height: '92vh',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
              }}
            >
              <Filters />
              <BodyContent />
            </Box>
          </>
        )}
      </ThemeProvider>
    </>
  );
}

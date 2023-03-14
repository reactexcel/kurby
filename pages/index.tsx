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
import { NextSeo } from 'next-seo';
import MessageBar from "services/MessageBar";
import Resultspage from "components/Resultspage/Resultspage";
/**
 * Home
 * @description: Landing page
 */
export default function Home() {
  const [recoilAddress] = useRecoilState(addressState);
  const [isHomepage, setHomepage] = useState(true);


  return (
    <>
      <NextSeo title={recoilAddress || "Kurby.ai"} description="Kurby uses location data to estimate property value like never before." />

      <Script strategy="beforeInteractive" src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`} />

      <ThemeProvider theme={theme}>
        <Homepage setHomepage={setHomepage} />
        <MessageBar></MessageBar>
      </ThemeProvider>
    </>
  );
}

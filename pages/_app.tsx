import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Script from "next/script";
import Topbar from "../features/homepage/Topbar/Topbar";
import { RecoilRoot } from "recoil";
import { AuthProvider } from "providers/AuthProvider";
import { WindowSizeProvider } from "context/windowSizeContext";
import Head from "next/head";
import { IsDevProvider } from "context/isDevContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />
        <title>Real Estate AI - Kurby</title>
      </Head>
      {/* @next/next/no-before-interactive-script-outside-document */}
      <Script strategy="beforeInteractive" id="google-tag-manager">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-P4C8M7L');
      `}
      </Script>
      <Script id="outseta" strategy="beforeInteractive">
        {`var o_options = {
          domain: "kurby.outseta.com",
          tokenStorage: "local",
          load: "auth,profile,chat"
        }`}
      </Script>
      <Script src="https://cdn.outseta.com/outseta.min.js" data-options="o_options" strategy="beforeInteractive" />
      <Script strategy="beforeInteractive" id="initMap">
        {`
        function initMap() {
          sessionStorage.setItem("googleMapsLoaded", "true");
        }`}
      </Script>
      <Script
        strategy="beforeInteractive"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`}
      />
      <WindowSizeProvider>
        <IsDevProvider>
          <AuthProvider>
            <Topbar>
              <div
                style={{
                  position: "relative",
                }}
              >
                <RecoilRoot>
                  <Component {...pageProps} />
                </RecoilRoot>
              </div>
            </Topbar>
          </AuthProvider>
        </IsDevProvider>
      </WindowSizeProvider>
    </>
  );
}

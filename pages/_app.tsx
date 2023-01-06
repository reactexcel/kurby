import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import Topbar from "../components/Topbar/Topbar";
import {
  useState, 
  useEffect
} from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [mobile, setMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const handleResize = () => {
    if(typeof window == 'undefined') return;

    // const width = window.innerWidth;
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

    setWindowWidth(vw);
    vw <= 960 ? (setMobile(true)) : (setMobile(false));
  }

  useEffect(() => {
    if(typeof window !== 'undefined'){
      window.addEventListener('resize', handleResize);
      handleResize();
    }
  }, [])

  useEffect(() => {
    if(mobile){
      const dispatchResize = () => {
        const event = new Event('resize');
        window.dispatchEvent(event);
      }


      const interval = setInterval(dispatchResize, 50);

      setTimeout(() => {
        clearInterval(interval);
      }, 1500)
      
      return () => clearInterval(interval);
    }
  }, [mobile])

  return (
    <>
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
      <Script
        strategy="beforeInteractive"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
      />
      <Topbar>
        <div style={{
          position: 'relative', 
          width: windowWidth ? `${windowWidth}px` : '100%'
        }}>
          <Component mobile={mobile} {...pageProps} />
        </div>
      </Topbar>
    </>
  );
}

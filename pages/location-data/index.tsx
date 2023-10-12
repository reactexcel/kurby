import Head from "next/head";
import { LocationData } from "../../features/location-data/LocationData";

/**
 * Home
 * @description: Landing page
 */
export default function locationData() {
  return (
    <>
      <Head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6265800628963979" crossOrigin="anonymous" />
      </Head>
      <LocationData />
    </>
  );
}

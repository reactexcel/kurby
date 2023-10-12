import Head from "next/head";
import { HomeValueEstimate } from "../../features/home-value-estimate/HomeValueEstimate";

/**
 * Home
 * @description: Landing page
 */
export default function homeValueEstimate() {
  return (
    <>
      <Head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6265800628963979" crossOrigin="anonymous" />
      </Head>
      <HomeValueEstimate />
    </>
  );
}

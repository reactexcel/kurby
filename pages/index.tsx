import { Homepage } from "../features/homepage/Homepage/Homepage";
import { NextSeo } from "next-seo";
import Head from "next/head";
import MessageBar from "services/MessageBar";
import LandingPage from "../features/landing-page/landing-page";
/**
 * Home
 * @description: Landing page
 */
export default function Home() {
  return (
    <>
      <Head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6265800628963979" crossOrigin="anonymous" />
      </Head>
      <NextSeo title="Real Estate AI - Kurby" description="Simplify your property search with our real estate AI-powered app." />
      {/* <Homepage /> */}
      <LandingPage />
      <MessageBar />
    </>
  );
}

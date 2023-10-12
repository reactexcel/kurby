import Head from "next/head";
import { PricingPage } from "../../features/pricing-page/PricingPage";

/**
 * Home
 * @description: Landing page
 */
export default function pricingPage() {
  return (
    <>
      <Head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6265800628963979" crossOrigin="anonymous" />
      </Head>
      <PricingPage />
    </>
  );
}

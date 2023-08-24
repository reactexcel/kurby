import { Homepage } from "../features/homepage/Homepage/Homepage";
import { NextSeo } from "next-seo";
import MessageBar from "services/MessageBar";
/**
 * Home
 * @description: Landing page
 */
export default function Home() {
  return (
    <>
      <NextSeo title="Real Estate AI - Kurby" description="Simplify your property search with our real estate AI-powered app." />
      <Homepage />
      <MessageBar />
    </>
  );
}

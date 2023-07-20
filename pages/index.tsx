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
      <NextSeo title="Real Estate AI - Kurby" description="Kurby uses location data to estimate property value like never before." />
      <Homepage />
      <MessageBar />
    </>
  );
}

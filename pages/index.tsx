import { useRecoilState } from "recoil";
import { Homepage } from "../features/homepage/Homepage/Homepage";
import { addressState } from "../context/filterContext";
import { NextSeo } from "next-seo";
import MessageBar from "services/MessageBar";
/**
 * Home
 * @description: Landing page
 */
export default function Home() {
  const [recoilAddress] = useRecoilState(addressState);

  return (
    <>
      <NextSeo title={recoilAddress || "Kurby.ai"} description="Kurby uses location data to estimate property value like never before." />
      <Homepage />
      <MessageBar />
    </>
  );
}

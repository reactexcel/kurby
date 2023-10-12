import Head from "next/head";
import Navbar from "components/Navbar/Navbar";
import { PropertySearch } from "features/property-search-page/PropertySearchPage";

export default function PropertySearchPage() {
  return (
    <>
      <Head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6265800628963979" crossOrigin="anonymous" />
      </Head>
      <Navbar />
      <PropertySearch />
    </>
  );
}

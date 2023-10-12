import Head from "next/head";
import Resultspage from "components/Resultspage/Resultspage";
import { addressState, filterState } from "context/filterContext";
import { propertyDetailAvailable, propertyDetailContext, propertyInfoV2Context } from "context/propertyContext";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { urlToAddress } from "utils/address";

const Address = () => {
  const router = useRouter();
  const [address, setAddress] = useRecoilState(addressState);
  const [filterVal] = useRecoilState(filterState);
  const [, setPropertyInfoV2] = useRecoilState(propertyInfoV2Context);
  const [, setPropertyDetail] = useRecoilState(propertyDetailContext);
  const [, setTabAvailable] = useRecoilState(propertyDetailAvailable);

  useEffect(() => {
    const encodedAddress = router.query.address;
    if (encodedAddress) {
      const originalAddress = urlToAddress(encodedAddress.toString());
      setAddress(originalAddress);
    }
  }, [router.query]);

  useEffect(() => {
    setTabAvailable(true);
    setPropertyInfoV2(null);
    setPropertyDetail(null);
  }, [filterVal.address]);

  return (
    <>
      <Head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6265800628963979" crossOrigin="anonymous" />
      </Head>
      <NextSeo title={`Living In ${address}: Everything You Need to Know`} description={`Living In ${address}: Everything You Need to Know`} />
      <Resultspage />
    </>
  );
};

export default Address;

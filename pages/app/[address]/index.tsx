import Head from "next/head";
import Resultspage from "components/Resultspage/Resultspage";
import { addressState, filterState } from "context/filterContext";
import { propertyDetailAvailable, propertyDetailContext, propertyInfoV2Context } from "context/propertyContext";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { addressToUrl, urlToAddress } from "utils/address";
import { standardizeAddress } from "hooks/standardize-address";
import SiteMap from "../../sitemap.xml";

const Address = ({ seoTitle }: { seoTitle: string }) => {
  const router = useRouter();
  const [address, setAddress] = useRecoilState(addressState);
  const [filterVal] = useRecoilState(filterState);
  const [, setPropertyInfoV2] = useRecoilState(propertyInfoV2Context);
  const [, setPropertyDetail] = useRecoilState(propertyDetailContext);
  const [, setTabAvailable] = useRecoilState(propertyDetailAvailable);

  useEffect(() => {
    SiteMap();
    const encodedAddress = router.query.address;
    if (encodedAddress) {
      const originalAddress = urlToAddress(encodedAddress.toString());
      setAddress(originalAddress);
      const _address = standardizeAddress(originalAddress);
      const _encodedAddress = addressToUrl(_address);
      if (_address && encodedAddress !== _encodedAddress) {
        router.push({
          pathname: "/app/[address]",
          query: {
            address: _encodedAddress,
          },
        });
      }
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
      <NextSeo title={seoTitle} description={seoTitle} />
      <Resultspage />
    </>
  );
};

export const getServerSideProps = async (ctx: any) => {
  const { address } = ctx.query;

  const seoTitle = `Living In ${address}: Everything You Need to Know`;

  return {
    props: {
      seoTitle,
    },
  };
};

export default Address;

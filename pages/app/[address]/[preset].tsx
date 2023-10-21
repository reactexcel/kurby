/* eslint-disable react-hooks/rules-of-hooks */
import Resultspage from "components/Resultspage/Resultspage";
import { addressState, filterState } from "context/filterContext";
import { propertyDetailAvailable, propertyDetailContext, propertyInfoV2Context } from "context/propertyContext";
import { PresetType } from "context/openaiDropdownContext";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { addressToUrl, urlToAddress, covertIntoCamelCase } from "utils/address";
import { useOpenaiDropdownOptions, useSeoTitles } from "hooks/use-openai-dropdown-options";
import { standardizeAddress } from "hooks/standardize-address";

function AIPreset() {
  const router = useRouter();
  const [address, setAddress] = useRecoilState(addressState);
  const [filterVal] = useRecoilState(filterState);
  const [, setPropertyInfoV2] = useRecoilState(propertyInfoV2Context);
  const [, setPropertyDetail] = useRecoilState(propertyDetailContext);
  const [, setTabAvailable] = useRecoilState(propertyDetailAvailable);
  const [selectedSeo, setSelectedSeo] = useState<any>("AI for Real Estate - Kurby");
  const dropdownOptions = useOpenaiDropdownOptions();

  useEffect(() => {
    const encodedAddress = router.query.address;
    const _preset = router.query.preset as string;

    if (encodedAddress) {
      const originalAddress = urlToAddress(encodedAddress.toString());
      setAddress(originalAddress);
      const _address = standardizeAddress(originalAddress);
      const _encodedAddress = addressToUrl(_address);
      if (_address && encodedAddress !== _encodedAddress) {
        if (_preset !== "living") {
          router.push({
            pathname: "/app/[address]/[preset]",
            query: {
              address: _encodedAddress,
              preset: _preset,
            },
          });
        } else {
          router.push(`/app/${_encodedAddress}`);
        }
      } else {
        if (_preset === "living") {
          router.push(`/app/${_encodedAddress}`);
        }
      }

      if (_preset) {
        for (const key in dropdownOptions) {
          let item = dropdownOptions[key as PresetType];
          if (item?.url === _preset) {
            const selectedSeoTitle = useSeoTitles(item.value, originalAddress);
            setSelectedSeo(selectedSeoTitle);
            break;
          }
        }
      } else {
        setSelectedSeo(useSeoTitles("living", originalAddress));
      }
    }
  }, [router]);

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
      <NextSeo title={selectedSeo?.title} description={selectedSeo?.title || ""} />
      <Resultspage />
    </>
  );
}

export default AIPreset;

import Resultspage from "components/Resultspage/Resultspage";
import { addressState, filterState } from "context/filterContext";
import { propertyDetailAvailable, propertyDetailContext, propertyInfoV2Context } from "context/propertyContext";
import { PresetType } from "context/openaiDropdownContext";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { urlToAddress, covertIntoCamelCase } from "utils/address";
import { useOpenaiDropdownOptions } from "hooks/use-openai-dropdown-options";

function AIPreset() {
  const router = useRouter();
  const [address, setAddress] = useRecoilState(addressState);
  const [filterVal] = useRecoilState(filterState);
  const [, setPropertyInfoV2] = useRecoilState(propertyInfoV2Context);
  const [, setPropertyDetail] = useRecoilState(propertyDetailContext);
  const [, setTabAvailable] = useRecoilState(propertyDetailAvailable);
  const [selectedSeo, setSelectedSeo] = useState<any>(null);
  const dropdownOptions = useOpenaiDropdownOptions();

  /* SEO Tags */
  const seoTitles = [
    {
      value: "living",
      title: `Living In ${address}: Everything You Need to Know`,
    },
    {
      value: "domesticTourism",
      title: `${address} Vacation: Everything For The Perfect Trip`,
    },
    {
      value: "internationalTourism",
      title: `International Travel to ${address}: Everything to Know`,
    },
    {
      value: "vacationHome",
      title: `Buying A Vacation Home in ${address}: Here’s What to Know`,
    },
    {
      value: "corporateRelocation",
      title: `Relocating to ${address} For Work? Here’s What to Know`,
    },
    {
      value: "retireeLiving",
      title: `${address} Retirement Home: Everything You Need to Know`,
    },
    {
      value: "shortTermRental",
      title: `${address} Short-Term Rental: Everything You Need to Know to Be Profitable`,
    },
    {
      value: "buyAndHold",
      title: `Investing In Real Estate In ${address}: Everything You Need to Know`,
    },
    {
      value: "glamping",
      title: `${address} Glamping: Everything You Need to Know`,
    },
    {
      value: "realEstateDeveloper",
      title: `Real Estate Development In ${address}: Everything You Need to Know`,
    },
    {
      value: "luxuryEstates",
      title: `Luxury Homes in ${address}: Here’s What You Need to Know`,
    },
  ];

  useEffect(() => {
    const encodedAddress = router.query.address;
    const _preset = router.query.preset as string;
    if (encodedAddress) {
      const originalAddress = urlToAddress(encodedAddress.toString());
      setAddress(originalAddress);
    }
    if (_preset) {
      for (const key in dropdownOptions) {
        let item = dropdownOptions[key as PresetType];
        if (item?.url === _preset) {
          const _selectedSeo = seoTitles.find((x: any) => x.value === item.value);
          setSelectedSeo(_selectedSeo);
          break;
        }
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
      <NextSeo title={selectedSeo?.title || "AI for Real Estate - Kurby"} description={selectedSeo?.title || ""} />
      <Resultspage />
    </>
  );
}

export default AIPreset;

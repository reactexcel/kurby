import Resultspage from "components/Resultspage/Resultspage";
import { addressState, filterState } from "context/filterContext";
import { propertyDetailAvailable, propertyDetailContext, propertyInfoV2Context } from "context/propertyContext";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { urlToAddress } from "utils/address";

function AIPreset() {
  const router = useRouter();
  const [address, setAddress] = useRecoilState(addressState);
  const [filterVal] = useRecoilState(filterState);
  const [, setPropertyInfoV2] = useRecoilState(propertyInfoV2Context);
  const [, setPropertyDetail] = useRecoilState(propertyDetailContext);
  const [, setTabAvailable] = useRecoilState(propertyDetailAvailable);
  const [selectedSeo, setSelectedSeo] = useState<any>(null);

  /* SEO Tags */
  const seoTitles = [
    {
      value: "living",
      description: `Living In ${address}: Everything You Need to Know Living preset URL will stay the same`,
    },
    {
      value: "domesticTourism",
      description: `${address} Vacation: Everything For The Perfect Trip`,
    },
    {
      value: "internationalTourism",
      description: `Relocating to ${address} For Work? Here’s What to Know`,
    },
    {
      value: "vacationHome",
      description: `${address} Retirement Home: Everything You Need to Know`,
    },
    {
      value: "corporateRelocation",
      description: `Relocating to ${address} For Work? Here’s What to Know`,
    },
    {
      value: "retireeLiving",
      description: `${address} Retirement Home: Everything You Need to Know`,
    },
    {
      value: "shortTermRental",
      description: `${address} Short-Term Rental: Everything You Need to Know to Be Profitable`,
    },
    {
      value: "buyAndHold",
      description: `Investing In Real Estate In ${address}: Everything You Need to Know`,
    },
    {
      value: "glamping",
      description: `${address} Glamping: Everything You Need to Know`,
    },
    {
      value: "realEstateDeveloper",
      description: `Real Estate Development In ${address}: Everything You Need to Know`,
    },
    {
      value: "luxuryEstates",
      description: `Luxury Homes in ${address}: Here’s What You Need to Know`,
    },
  ];

  useEffect(() => {
    const encodedAddress = router.query.address;
    const preset = router.query.preset;
    if (encodedAddress) {
      const originalAddress = urlToAddress(encodedAddress.toString());
      setAddress(originalAddress);
    }
    if (preset) {
      const _selectedSeo = seoTitles.find((x: any) => x.value === preset);
      setSelectedSeo(_selectedSeo);
    }
  }, [router.query]);

  useEffect(() => {
    setTabAvailable(true);
    setPropertyInfoV2(null);
    setPropertyDetail(null);
  }, [filterVal.address]);

  return (
    <>
      <NextSeo title={"AI for Real Estate - Kurby"} description={selectedSeo?.description || ""} />
      <Resultspage />
    </>
  );
}

export default AIPreset;

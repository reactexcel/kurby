import Resultspage from "components/Resultspage/Resultspage";
import { addressState } from "context/filterContext";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { urlToAddress } from "utils/address";

const Address = () => {
    const router = useRouter();
    const [address, setAddress] = useRecoilState(addressState)

    useEffect(() => {
        const encodedAddress = router.query.address;
        if (encodedAddress) {
            const originalAddress = urlToAddress(encodedAddress.toString());
            setAddress(originalAddress)
        }
    }, [router.query])

    return (
        <>
            <NextSeo title={address || "Kurby.ai"} description="Kurby uses location data to estimate property value like never before." />
            <Resultspage />
        </>
    )
};

export default Address;
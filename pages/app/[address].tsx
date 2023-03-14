import Resultspage from "components/Resultspage/Resultspage";
import { addressState } from "context/filterContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { urlToAddress } from "utils/address";

const Address = () => {
    const router = useRouter();
    const [address, setAddress] = useRecoilState(addressState)

    useEffect(() => {
        const encodedAddress = router.query.address;
        if(encodedAddress){
            const originalAddress = urlToAddress(encodedAddress.toString());
            setAddress(originalAddress)
        }
    }, [router.query])

    return <Resultspage />;
};

export default Address;
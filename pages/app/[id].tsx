import Resultspage from "components/Resultspage/Resultspage";
import { addressState } from "context/filterContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const Post = () => {
    const router = useRouter();
    // const { address } = router.query;
    console.log('ooooo', router.query.address)
    const [address, setAddress] = useRecoilState(addressState)

    useEffect(() => {
        const encodedAddress = router.query.id;
        if(encodedAddress){
            const originalAddress = encodedAddress.toString().replace(/_/g, ', ').replace(/-/g, ' ');
            console.log("originalAddress =>> ", originalAddress)
            setAddress(originalAddress)
        }
    })

    return <Resultspage />;
};

export default Post;
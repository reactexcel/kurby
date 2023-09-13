import { Avatar, AvatarGroup, Box } from "@mui/material";
import styles from "./Intro.module.scss";
import { useContext } from "react";
import { WindowSizeContext } from "context/windowSizeContext";
import { useRouter } from "next/router";
import { addressToUrl } from "utils/address";
import GoogleAddressInput from "components/GoogleAddressInput";

function HappyInvestors() {
  const { isMobile } = useContext(WindowSizeContext);

  const avatar_size = isMobile ? { width: 30, height: 30 } : {};
  return (
    <Box className={styles.happy_investors}>
      <AvatarGroup style={{ alignItems: "center" }} spacing={4} total={103} max={5}>
        <Avatar
          sx={avatar_size}
          alt="Remy Sharp"
          src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNtaWxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60"
        />
        <Avatar
          sx={avatar_size}
          alt="Travis Howard"
          src="https://images.unsplash.com/photo-1564460576398-ef55d99548b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fHNtaWxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60"
        />
        <Avatar
          sx={avatar_size}
          alt="Cindy Baker"
          src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
        />
        <Avatar
          sx={avatar_size}
          alt="Agnes Walker"
          src="https://plus.unsplash.com/premium_photo-1670884442192-7b58d513cd55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHNtaWxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60"
        />
      </AvatarGroup>
      <div>happy investors using Kurby</div>
    </Box>
  );
}

function GoogleInput() {
  const router = useRouter();

  const handleSelectedAddress = (address: any) => {
    const encodedAddress = addressToUrl(address.formatted_address);
    router.push(`/app/${encodedAddress}`);
  };

  const inputPropsStyle = {
    width: "95%",
    height: "2rem",
    borderBottom: "none !important",
    margin: "0.25rem 0",
    "&::before": {
      borderBottom: "none !important",
    },
    "&::after": {
      borderBottom: "none !important",
    },
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.formContainer}>
        <GoogleAddressInput
          label=""
          inputProps={{
            autoComplete: "off",
          }}
          InputProps={{
            sx: inputPropsStyle,
          }}
          className={styles.input}
          placeholder="Search property, city, or state worldwide"
          handleSelectedAddress={handleSelectedAddress}
        />
        {/* <button className={styles.searchButton}>
          <SearchIcon className={styles.searchIcon} />
        </button> */}
      </div>
    </div>
  );
}

export default function Intro() {
  return (
    <Box className={styles.main}>
      <Box className={styles.text}>
        <div className={styles.its_free}>Try it, it's free, forever</div>
        <div className={styles.unlock}>Unlock The Power of Real Estate Intelligence</div>
        <div className={styles.simplify}>Simplify your property search with our real estate AI app.</div>
      </Box>
      <GoogleInput />
      {/* <input type="text" placeholder="Search property, city, or state worldwide" /> */}
      <HappyInvestors />
    </Box>
  );
}

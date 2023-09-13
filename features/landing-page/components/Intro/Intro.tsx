import { Avatar, AvatarGroup, Box } from "@mui/material";
import styles from "./Intro.module.scss";
import { useContext } from "react";
import { WindowSizeContext } from "context/windowSizeContext";
import { useRouter } from "next/router";
import { addressToUrl } from "utils/address";
import GoogleAddressInput from "components/GoogleAddressInput";

function HappyInvestors() {
  const { isMobile } = useContext(WindowSizeContext);

  const avatar_size = isMobile ? { width: 30, height: 30 } : { width: 50, height: 50 };
  return (
    <Box className={styles.happy_investors}>
      <AvatarGroup
        sx={{
          "& .MuiAvatarGroup-avatar": {
            bgcolor: "black",
            fontSize: "1rem",
            padding: "",
          },
        }}
        style={{ alignItems: "center" }}
        spacing={4}
        max={5}
      >
        <Avatar sx={avatar_size} alt="Agnes Walker" src="/images/investors/investor_5.jpg" />
        <Avatar sx={avatar_size} alt="Remy Sharp" src="/images/investors/investor_4.jpg" />
        <Avatar sx={avatar_size} alt="Travis Howard" src="/images/investors/investor_3.jpg" />
        <Avatar sx={avatar_size} alt="Cindy Baker" src="/images/investors/investor_6.jpg" />

        <Avatar style={isMobile ? { fontSize: "1.11rem" } : { fontSize: "1.15rem" }} key="500+" sx={isMobile ? { padding: "0.15rem" } : { padding: "0.4rem" }}>
          500+
        </Avatar>
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

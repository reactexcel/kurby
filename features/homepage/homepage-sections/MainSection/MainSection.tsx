import styles from "./MainSection.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import GoogleAddressInput from "components/GoogleAddressInput";
import { addressToUrl } from "utils/address";
import { Paragraph } from "components/Paragraph/Paragraph";
import { useRouter } from "next/router";
import { useWindowSize } from "hooks/use-window-size";
import { HomepageVideo } from "features/homepage/Homepage/HomepageVideo/HomepageVideo";

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

export const MainSection = () => {
  const router = useRouter();
  const { isMobileTablet } = useWindowSize();

  const handleSelectedAddress = (address: any) => {
    const encodedAddress = addressToUrl(address.formatted_address);
    router.push(`/app/${encodedAddress}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>
          UNLOCK THE <span className={styles.coloredText}>POWER</span> OF REAL ESTATE AI
        </h1>

        <Paragraph text="Simplify your property search with our AI-powered app." className={styles.paragraph} />

        {isMobileTablet && <HomepageVideo />}

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
              placeholder="Search a property address"
              handleSelectedAddress={handleSelectedAddress}
            />
            <button className={styles.searchButton}>
              <SearchIcon className={styles.searchIcon} />
            </button>
          </div>
        </div>
        <Paragraph text="Try it - it's free, forever." />
      </div>
      {!isMobileTablet && <HomepageVideo />}
    </div>
  );
};

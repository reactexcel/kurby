import styles from "./MainSection.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import GoogleAddressInput from "components/GoogleAddressInput";
import { addressToUrl } from "utils/address";
import { Paragraph } from "components/Paragraph/Paragraph";
import { useRouter } from "next/router";

export const MainSection = () => {
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
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>
          UNLOCK THE <span className={styles.coloredText}>POWER</span> OF REAL ESTATE INTELLIGENCE
        </h1>

        <Paragraph text="Simplify your property search with our AI-powered app." className={styles.paragraph} />

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
              placeholder="Search any address, city or landmark"
              handleSelectedAddress={handleSelectedAddress}
            />
            <button className={styles.searchButton}>
              <SearchIcon className={styles.searchIcon} />
            </button>
          </div>
        </div>
        <Paragraph text="Try it - it's free, forever." />
        <img src="/images/social-proof.svg" alt="" className={styles.socialProof} />
      </div>
    </div>
  );
};

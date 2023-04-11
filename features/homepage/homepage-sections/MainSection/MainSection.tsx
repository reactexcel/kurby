import styles from "./MainSection.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import GoogleAddressInput from "components/GoogleAddressInput";
import { addressToUrl } from "utils/address";
import { Paragraph } from "components/Paragraph/Paragraph";
import { useRouter } from "next/router";

export const MainSection = () => {
  const router = useRouter();

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
                sx: {
                  height: "50px",
                },
                autoComplete: "off",
              }}
              InputProps={{
                sx: {
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
                },
              }}
              className={styles.input}
              placeholder="Search a property address"
              handleSelectedAddress={(address: any) => {
                const encodedAddress = addressToUrl(address.formatted_address);
                router.push(`/app/${encodedAddress}`);
              }}
            />
            <button className={styles.searchButton}>
              <SearchIcon className={styles.searchIcon} />
            </button>
          </div>
        </div>
        <Paragraph text="Try it - it's free, forever." />
      </div>
    </div>
  );
};

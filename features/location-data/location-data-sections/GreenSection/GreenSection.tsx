import { Paragraph } from "components/Paragraph/Paragraph";
import GoogleAddressInput from "components/GoogleAddressInput";
import { addressToUrl } from "utils/address";
import { useRouter } from "next/router";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./GreenSection.module.scss";

export const GreenSection = () => {
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
    <div
      className={styles.greenSection}
      //  style={{ backgroundImage: 'url("/images/greenBackground.svg")' }}
    >
      <Paragraph
        text="Kurby is the first and only web app that provides location descriptions of any property in the world using AI. It’s a game-changer for the real estate industry, as it empowers investors with unprecedented access to information that was previously hard to find or unavailable."
        className={styles.whiteParagraph}
      />
      <Paragraph
        text="Don’t miss this opportunity to take your real estate investing to the next level. Try Kurby today and see for yourself how it can help you invest like a local."
        className={styles.whiteParagraph}
      />
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
            placeholder="Search any address, city, or landmark"
            handleSelectedAddress={handleSelectedAddress}
          />
          <button className={styles.searchButton}>
            <SearchIcon className={styles.searchIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

import styles from "./MainSection.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import GoogleAddressInput from "components/GoogleAddressInput";
import { addressToUrl } from "utils/address";
import { Paragraph } from "components/Paragraph/Paragraph";
import { useRouter } from "next/router";
import Image from "next/image";

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
          DISCOVER HIDDEN GEMS
          <br /> AND{" "}
          <span className={styles.coloredText}>
            UNDERVALUED
            <br /> PROPERTIES
          </span>{" "}
          WITH KURBY'S
          <br /> AI LOCATION ANALYSIS
        </h1>

        <Paragraph
          text="Tired of wasting time and money on researching property locations? Discover how Kurby can help you find the best properties in the world using AI."
          className={styles.paragraph}
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
      <div className={styles.pictureWrapper}>
        <div className={styles.bannerStar}>
          <img src="./images/starTop.svg" alt="" style={{ position: "absolute", top: "-90px", left: "50px" }}></img>
          <img src="./images/starBottomRight.svg" alt="" style={{ position: "absolute", bottom: "-410px", left: "-55px" }}></img>
          <img src="./images/starBottomLeft.svg" alt="" style={{ position: "absolute", bottom: "-410px", right: "0px" }}></img>
          <img src="./images/squareTop.svg" alt="" style={{ position: "absolute", bottom: "5px", right: "165px" }}></img>
          <img src="./images/squareLeft.svg" alt="" style={{ position: "absolute", top: "120px", left: "-150px" }}></img>
          <img src="./images/squareBottom.svg" alt="" style={{ position: "absolute", top: "440px", right: "240px" }}></img>
        </div>
        <Image alt="" src="./images/locationdata-banner.svg" width={550} height={370} />
      </div>
    </div>
  );
};

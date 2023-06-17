import styles from "./MainSection.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import GoogleAddressInput from "components/GoogleAddressInput";
import { addressToUrl } from "utils/address";
import { Paragraph } from "components/Paragraph/Paragraph";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "hooks/use-window-size";

export const MainSection = () => {
  const router = useRouter();
  const [isPlaying, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isMobileTablet } = useWindowSize();

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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("ended", () => {
        setPlaying(false);
      });
      videoRef.current.addEventListener("pause", () => {
        if (!videoRef.current!.seeking) {
          setPlaying(false);
        }
      });
    }
  }, []);

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isPlaying && videoRef.current.readyState === 4) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlaying(!isPlaying);
    }
  };

  const VideoComponent = () => (
    <div className={styles.videoSection}>
      <img src="/images/homepage/square-faded.svg" alt="" className={styles.squareFaded1} />
      <img src="/images/homepage/square-faded.svg" alt="" className={styles.squareFaded2} />
      <img src="/images/homepage/square-filled.svg" alt="" className={styles.squareFilled} />
      <img src="/images/homepage/star-faded.svg" alt="" className={styles.starFaded} />
      <img src="/images/homepage/star-filled.svg" alt="" className={styles.starFilled1} />
      <img src="/images/homepage/star-filled.svg" alt="" className={styles.starFilled2} />
      <div className={styles.videoWrapper}>
        <video src={"/videos/homepage-video.mp4"} autoPlay={false} className={styles.video} controls={isPlaying} ref={videoRef} />
        <img src="/images/homepage/bottom-edge.svg" alt="" className={styles.bottomEdge} />
        <img src="/images/homepage/top-edge.svg" alt="" className={styles.topEdge} />
      </div>
      {!isPlaying && (
        <button className={styles.playButton} onClick={toggleVideoPlayback}>
          <div className={styles.gradientBackground} />
          <img src="/icons/play.svg" alt="" />
        </button>
      )}
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>
          UNLOCK THE <span className={styles.coloredText}>POWER</span> OF REAL ESTATE AI
        </h1>

        <Paragraph text="Simplify your property search with our AI-powered app." className={styles.paragraph} />

        {isMobileTablet && <VideoComponent />}

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
      {!isMobileTablet && <VideoComponent />}
    </div>
  );
};

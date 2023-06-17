import { useRef, useState, useEffect } from "react";
import styles from "./HomepageVideo.module.scss";

export const HomepageVideo = () => {
  const [isPlaying, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const playingOff = () => {
    setPlaying(false);
  };

  const pauseCallback = () => {
    if (!videoRef.current!.seeking) {
      playingOff();
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("ended", playingOff);
      videoRef.current.addEventListener("pause", pauseCallback);
    }

    return () => {
      videoRef.current?.removeEventListener("ended", playingOff);
      videoRef.current?.removeEventListener("pause", pauseCallback);
    };
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

  return (
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
};

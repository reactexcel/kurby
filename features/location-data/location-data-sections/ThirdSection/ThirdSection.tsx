import { Paragraph } from "components/Paragraph/Paragraph";
import styles from "./ThirdSection.module.scss";

export const ThirdSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Find the Most Livable and Profitable Property Locations with Walk Score, Bike Score, and Transit Score</h1>
        <div className={styles.line}></div>
        <Paragraph text="One of the key factors that influence the value and attractiveness of a property is its location." className={styles.paragraph} />
        <Paragraph
          text="That’s where Walk Score, Bike Score, and Transit Score come in. These are data-driven metrics that show you how easy it is to get around a property without a car. They range from 0 to 100, where higher scores mean more walkable, bikeable, or transit-friendly locations."
          className={styles.paragraph}
        />
        <img alt="" src="./images/location-data-features.svg" className={styles.imageFeatures} />
      </div>
      <div className={styles.pictureWrapper}>
        <img alt="" src="./images/location-data-third-section-right.svg" className={styles.picture} />
      </div>
    </div>
  );
};

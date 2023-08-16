import { Paragraph } from "components/Paragraph/Paragraph";
import styles from "./ThirdSection.module.scss";
import Image from "next/image";

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
        <Image alt="" src="./images/location-data-features.svg" layout="responsive" className={styles.imageFeatures} width={550} height={370} />
      </div>
      <div className={styles.pictureWrapper}>
        <Image alt="" src="./images/location-data-third-section-right.svg" layout="responsive" className={styles.picture} width={550} height={370} />
      </div>
    </div>
  );
};

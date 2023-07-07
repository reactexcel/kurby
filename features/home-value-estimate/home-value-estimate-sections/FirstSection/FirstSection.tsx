import styles from "./FirstSection.module.scss";
import { Paragraph } from "components/Paragraph/Paragraph";

import Home from "../../../../public/images/newHome.svg";
import HomePrice from "../../../../public/images/home-price.svg";

export const FirstSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Find Undervalued Properties with Home Value Estimates</h1>
        <div className={styles.line}></div>
        <Paragraph
          text="As a real estate investor, you know that location is one of the most important factors that determine the value and profitability of a property. But how do you find reliable and relevant information about a property’s location, especially when investing in a different state or country?"
          className={styles.paragraph}
        />
        <Paragraph
          text="Our home value estimator uses advanced artificial intelligence (GPT-4) to generate home value estimates based on third-party data, public data, and market trends. You can enter any property address in the US and get a home value estimate that is accurate, reliable, and up-to-date."
          className={styles.paragraph}
        />

        <button className={styles.searchButton}>Learn More &#62; &#62;</button>
      </div>
      <div className={styles.pictureWrapper}>
        <div className={styles.wrap}>
          <Home className={styles.homeImg} />
          <HomePrice className={styles.homePriceImg} />
        </div>
      </div>
    </div>
  );
};

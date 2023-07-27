import { Paragraph } from "components/Paragraph/Paragraph";
import styles from "./FourthSection.module.scss";

export const FourthSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.pictureWrapper}>
        <img alt="" src="./images/home-value-fourthSection.svg" className={styles.picture} />
      </div>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Build a Diversified and Profitable Portfolio with Home Value Estimates</h1>
        <div className={styles.line}></div>
        <Paragraph
          text="As a real estate investor, you want to diversify your portfolio and reduce your risk. That’s why investing in different types of properties and locations is a smart move."
          className={styles.paragraph}
        />
        <Paragraph
          text="With our home value estimator, you can easily build a diversified and profitable portfolio. You can find properties that match your criteria and budget, whether they are single-family homes, multi-family homes, condos, townhouses, etc. You can also explore properties in different states and cities, and discover new opportunities and markets. Our home value estimator helps you expand your horizons and increase your returns."
          className={styles.paragraph}
        />
      </div>
    </div>
  );
};

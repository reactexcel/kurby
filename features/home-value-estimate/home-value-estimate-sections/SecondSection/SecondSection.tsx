import { Paragraph } from "components/Paragraph/Paragraph";
import styles from "./SecondSection.module.scss";

export const SecondSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.pictureWrapper}>
        <img alt="" src="./images/home-value-secondSection.svg" className={styles.picture} />
      </div>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Negotiate Better Deals and Increase Your Cash Flow with Home Value Estimates</h1>
        <div className={styles.line}></div>
        <Paragraph
          text="As a real estate investor, you want to buy low and sell high. That’s why negotiating the best price for your properties is crucial."
          className={styles.paragraph}
        />
        <Paragraph
          text="With our home value estimator, you can confidently negotiate better deals with sellers and buyers. You can use our home value estimate as a reference point to make lowball offers or counteroffers. You can also use our home value estimate to determine the optimal selling price or rental price for your properties. Our home value estimator helps you increase your cash flow and maximize your returns."
          className={styles.paragraph}
        />
      </div>
    </div>
  );
};

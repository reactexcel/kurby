import React, { useState } from "react";
import styles from "./LegendSection.module.scss";
import { Paragraph } from "components/Paragraph/Paragraph";
import { useMyContext } from "context/priceContext";

export const LegendSection: React.FC = () => {
  const [choice, setChoice] = useState<boolean>(true);

  const { setParam } = useMyContext();

  const handleClick1 = () => {
    setParam(false);
  };
  const handleClick2 = () => {
    setParam(true);
  };

  return (
    <div className={styles.background}>
      <h1 className={styles.mainTitle}>
        Choose the <span className={styles.greenWord}>plan</span> that fits your needs.
      </h1>

      <Paragraph text="Pay only for what you need. Select the features that align with your business goals and help you grow faster." className={styles.subTitle} />

      <div
        onClick={() => {
          setChoice(!choice);
        }}
        className={styles.switcherContainer}
      >
        <div onClick={handleClick1} className={choice ? `${styles.switcherTextContainer} ${styles.switcherTextContainerGreen}` : styles.switcherTextContain}>
          <p className={`${styles.switcherTitle} ${styles.switcherTitleMain}`}>Monthly</p>
          <p className={styles.switcherTitle}>No contracts, cancel anytime</p>
        </div>

        <div onClick={handleClick2} className={choice ? styles.switcherTextContainer : `${styles.switcherTextContainer} ${styles.switcherTextContainerGreen}`}>
          <p className={`${styles.switcherTitle} ${styles.switcherTitleMain}`}>Yearly</p>
          <p className={styles.switcherTitle}>Save 20%</p>
        </div>
      </div>
    </div>
  );
};

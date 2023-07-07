import React from "react";
import styles from "./TracingSection.module.scss";
import Tracing from "../../../../public/icons/tracing.svg";

export const TracingSection = () => {
  return (
    <div className={styles.background}>
      <div className={styles.leftBlock}>
        <h1 className={styles.title}>Skip tracing</h1>
        <div className={styles.text}>
          Find and connect with motivated sellers faster and easier. We use advanced data sources and algorithms to provide you with accurate and up-to-date contact
          information, demographic, and social people data for any property owner.
        </div>
      </div>
      <div className={styles.rightBlock}>
        <div className={styles.rightColumn}>
          <Tracing />
          <span className={styles.subtitle}>Skip Tracing with DNC Flagging</span>
        </div>
      </div>
    </div>
  );
};

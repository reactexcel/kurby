import React from "react";
import styles from "./TracingSection.module.scss";
import Image from "next/image";


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
          <Image alt="" src="./icons/tracing.svg" className={styles.tracingImg} layout="responsive" width={170} height={130} />
          <div className={styles.subtitle}>Skip Tracing with DNC Flagging</div>
        </div>
      </div>
    </div>
  );
};

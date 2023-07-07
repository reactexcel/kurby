import React, { FC } from "react";
import styles from "./ProsCons.module.scss";

type Props = {
  title: string;
  datas: string[];
};

export const ProsConsItem: FC<Props> = ({ title, datas }) => {
  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.featuresBlock}>
        <ul>
          {datas.map((feature) => (
            <li key={feature} className={styles.featureItem}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

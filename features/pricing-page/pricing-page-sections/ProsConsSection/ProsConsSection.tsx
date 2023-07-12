import React, { FC } from "react";
import styles from "./ProsCons.module.scss";

import { quickStats, addData, advancedData } from "./mockData";
import { ProsConsItem } from "./ProsConsItem";

import Vector from "../../../../public/icons/vector.svg";
import Minus from "../../../../public/icons/blackMinus.svg";

export const ProsConsSection = () => {
  return (
    <div className={styles.background}>
      <div className={styles.features}>
        <ProsConsItem title="Quick Stats" datas={quickStats} />
        <ProsConsItem title="Additional Data & Analytics" datas={addData} />
        <ProsConsItem title="Advanced Data & Intelligence" datas={advancedData} />
      </div>
      <div className={styles.starter}>
        <h1 className={styles.cardTitle}>Starter</h1>
        <button className={styles.starterBtn}>Get Started</button>
        <div className={styles.signs}>
          <div className={styles.quickSign}>
            <div className={styles.sign}>
              <Vector className={styles.signItem} />
            </div>
            <div className={styles.sign}>
              <Vector className={styles.signItem} />
            </div>
            <div className={styles.sign}>
              <Minus className={styles.signItem} />
            </div>
            <div className={styles.sign}>
              <Vector className={styles.signItem} />
            </div>
            <div className={styles.sign}>
              <Vector className={styles.signItem} />
            </div>
          </div>
          <p className={styles.preset}>1 Preset</p>
          <Vector className={styles.signItem} />
          <div className={styles.signMarg}>
            <div className={styles.sign}>
              <Minus className={styles.signItem} />
            </div>
            <div className={styles.sign}>
              <Vector className={styles.signItem} />
            </div>
            <div className={styles.sign}>
              <Vector className={styles.signItem} />
            </div>
          </div>

          <div className={styles.dataSign}>
            <div className={styles.sign}>
              <Minus className={styles.signItem} />
            </div>
            <div className={styles.sign}>
              <Vector className={styles.signItem} />
            </div>
            <div className={styles.sign}>
              <Vector className={styles.signItem} />
            </div>
            <div className={styles.sign}>
              <Vector className={styles.signItem} />
            </div>
            <div className={styles.sign}>
              <Vector className={styles.signItem} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.growth}>
        <h1 className={styles.cardTitle}>growth</h1>
        <button className={styles.growthBtn}>Get Started</button>
        <div className={styles.signs}>
          <div className={styles.quickSign}>
            <div className={styles.sign}>
              <Vector className={styles.signItem} />
            </div>
            <div className={styles.sign}>
              <Minus className={styles.signItem} />
            </div>
            <div className={styles.sign}>
              <Vector className={styles.signItem} />
            </div>
            <div className={styles.sign}>
              <Vector className={styles.signItem} />
            </div>
            <div className={styles.sign}>
              <Vector className={styles.signItem} />
            </div>
          </div>
          <p className={styles.preset}>3 Presets</p>
          <Vector className={styles.signItem} />
          <div className={styles.signMarg}>
            <div className={styles.sign}>
              <Vector className={styles.signItem} />
            </div>
            <div className={styles.sign}>
              <Vector className={styles.signItem} />
            </div>
            <div className={styles.sign}>
              <Minus className={styles.signItem} />
            </div>
          </div>
          <div className={styles.dataSign}>
            <div className={styles.sign}>
              <Vector className={styles.signItem} />
            </div>
            <Minus className={styles.signItemMinus} />
            <div className={styles.sign}>
              <Minus className={styles.signItem} />
            </div>
            <div className={styles.sign}>
              <Minus className={styles.signItem} /> 
            </div>
            <div className={styles.sign}>
              <Vector className={`${styles.signItem} ${styles.signPlus}`} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.professional}>
        <h1 className={styles.cardTitle}>professional</h1>
        <button className={styles.profBtn}>Get Started</button>
        <div className={styles.signs}>
          <div className={styles.quickSign}>
            <div className={styles.sign}>
              <Vector className={styles.signItem} />
            </div>
            <div className={styles.sign}>
              <Vector className={styles.signItem} />
            </div>
            <div className={styles.sign}>
              <Vector className={styles.signItem} />
            </div>
            <div className={styles.sign}>
              <Minus className={styles.signItem} />
            </div>
            <div className={styles.sign}>
              <Vector className={styles.signItem} />
            </div>
          </div>
          <p className={styles.preset}>5 Presets</p>
          <Minus className={styles.signItemMinus} />
          <div className={styles.signMarg}>
            <div className={styles.sign}>
              <Vector className={styles.signItem} />
            </div>
            <div className={styles.sign}>
              <Minus className={styles.signItem} />
            </div>
            <div className={styles.sign}>
              <Vector className={styles.signItem} />
            </div>
          </div>

          <div className={styles.dataSign}>
            <div className={styles.sign}>
              <Vector className={styles.signItem} />
            </div>
            <div className={styles.sign}>
              <Vector className={styles.signItem} />
            </div>
            <div className={styles.sign}>
              <Vector className={styles.signItem} />
            </div>
            <div className={styles.sign}>
              <Vector className={styles.signItem} />
            </div>
            <div className={styles.sign}>
              <Minus className={`${styles.signItem} ${styles.signMinus}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

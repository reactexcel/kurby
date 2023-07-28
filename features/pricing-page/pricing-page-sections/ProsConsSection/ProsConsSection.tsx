import React, { FC } from "react";
import styles from "./ProsCons.module.scss";

import { quickStats, addData, advancedData } from "./mockData";
import { ProsConsItem } from "./ProsConsItem";
import Image from "next/image";
import { usePlanWindow } from "hooks/use-plan-window";

export const ProsConsSection = () => {
  const planCheckout = usePlanWindow();
  return (
    <div className={styles.background}>
      <div className={styles.features}>
        <ProsConsItem title="Quick Stats" datas={quickStats} />
        <ProsConsItem title="Additional Data & Analytics" datas={addData} />
        <ProsConsItem title="Advanced Data & Intelligence" datas={advancedData} />
      </div>

      <div className={styles.starter}>
        <h1 className={styles.cardTitle}>Free</h1>
        <button onClick={() => planCheckout.openFree()} className={styles.starterBtn}>
          Get Started
        </button>
        <div className={styles.signs}>
          <div className={styles.quickSign}>
            <p className={styles.feat5}>5 Insights per day</p>
            <p className={`${styles.feat} ${styles.pFix} `}>5 Searches/ Clicks per day</p>
            <div className={`${styles.sign} ${styles.startSign} ${styles.addStartSign}`}>
              <Image src="/icons/blackMinus.svg" className={styles.signItem} width={30} height={22} alt="minus" />
            </div>
            <div className={styles.sign}>
              <Image src="/icons/blackMinus.svg" className={styles.signItem} width={30} height={22} alt="minus" />
            </div>
            <div className={styles.sign}>
              <Image src="/icons/vector.svg" className={styles.signItem} width={30} height={22} alt="plus" />
            </div>
          </div>
          <div className={styles.presetBlock}>
            <p className={styles.preset}>1 Preset</p>
            <ul className={styles.presetList1}>
              <li>Living</li>
            </ul>
          </div>
          <div className={styles.signPreset}>
            <Image src="/icons/blackMinus.svg" className={styles.signItem} width={30} height={22} alt="minus" />
          </div>
          <div>
            <div className={styles.sign}>
              <Image src="/icons/blackMinus.svg" className={styles.signItem} width={30} height={22} alt="minus" />
            </div>
            <div className={styles.sign}>
              <Image src="/icons/blackMinus.svg" className={styles.signItem} width={30} height={22} alt="minus" />
            </div>
            <div className={styles.sign}>
              <Image src="/icons/blackMinus.svg" className={styles.signItem} width={30} height={22} alt="minus" />
            </div>
          </div>
          <div className={styles.dataSign}>
            <div className={`${styles.sign} ${styles.signBot}`}>
              <Image src="/icons/blackMinus.svg" className={styles.signItem} width={30} height={22} alt="minus" />
            </div>
            <div className={`${styles.sign} ${styles.signBot}`}>
              <Image src="/icons/blackMinus.svg" className={styles.signItem} width={30} height={22} alt="minus" />
            </div>
            <div className={`${styles.sign} ${styles.signBot}`}>
              <Image src="/icons/blackMinus.svg" className={styles.signItem} width={30} height={22} alt="minus" />
            </div>
            <div className={`${styles.sign} ${styles.signBot}`}>
              <Image src="/icons/blackMinus.svg" className={styles.signItem} width={30} height={22} alt="minus" />
            </div>
            <div className={`${styles.sign} ${styles.signBot}`}>
              <Image src="/icons/blackMinus.svg" className={styles.signItem} width={30} height={22} alt="minus" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.cheaper}>
        <h1 className={styles.cardTitle}>Starter</h1>
        <button onClick={() => planCheckout.openStarter()} className={styles.starterBtn}>
          Get Started
        </button>
        <div className={styles.signs}>
          <div className={styles.quickSign}>
            <p className={styles.feat}>Unlimited</p>
            <p className={styles.feat}>Unlimited</p>
            <div className={`${styles.sign} ${styles.startSign} `}>
              <Image src="/icons/vector.svg" className={styles.signItem} width={30} height={22} alt="minus" />
            </div>
            <div className={styles.sign}>
              <Image src="/icons/blackMinus.svg" className={styles.signItem} width={30} height={22} alt="minus" />
            </div>
            <div className={styles.sign}>
              <Image src="/icons/vector.svg" className={styles.signItem} width={30} height={22} alt="plus" />
            </div>
          </div>
          <div className={styles.presetBlock}>
            <p className={styles.preset}>1 Preset</p>
            <ul className={styles.presetList1}>
              <li>Living</li>
            </ul>
          </div>
          <div className={styles.signPreset}>
            <Image src="/icons/blackMinus.svg" className={styles.signItem} width={30} height={22} alt="minus" />
          </div>
          <div>
            <div className={styles.sign}>
              <Image src="/icons/blackMinus.svg" className={styles.signItem} width={30} height={22} alt="minus" />
            </div>
            <div className={styles.sign}>
              <Image src="/icons/blackMinus.svg" className={styles.signItem} width={30} height={22} alt="minus" />
            </div>
            <div className={styles.sign}>
              <Image src="/icons/blackMinus.svg" className={styles.signItem} width={30} height={22} alt="minus" />
            </div>
          </div>
          <div className={styles.dataSign}>
            <div className={`${styles.sign} ${styles.signBot}`}>
              <Image src="/icons/blackMinus.svg" className={styles.signItem} width={30} height={22} alt="minus" />
            </div>
            <div className={`${styles.sign} ${styles.signBot}`}>
              <Image src="/icons/blackMinus.svg" className={styles.signItem} width={30} height={22} alt="minus" />
            </div>
            <div className={`${styles.sign} ${styles.signBot}`}>
              <Image src="/icons/blackMinus.svg" className={styles.signItem} width={30} height={22} alt="minus" />
            </div>
            <div className={`${styles.sign} ${styles.signBot}`}>
              <Image src="/icons/blackMinus.svg" className={styles.signItem} width={30} height={22} alt="minus" />
            </div>
            <div className={`${styles.sign} ${styles.signBot}`}>
              <Image src="/icons/blackMinus.svg" className={styles.signItem} width={30} height={22} alt="minus" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.growth}>
        <h1 className={styles.cardTitle}>growth</h1>
        <button onClick={() => planCheckout.openGrowth()} className={styles.growthBtn}>
          Get Started
        </button>
        <div className={styles.signs}>
          <div className={`${styles.quickSign}  ${styles.presetBlockRes}`}>
            <p className={styles.feat}>Unlimited</p>
            <p className={styles.feat}>Unlimited</p>
            <div className={`${styles.sign} ${styles.startSign}`}>
              <Image src="/icons/vector.svg" className={styles.signItem} width={30} height={22} alt="plus" />
            </div>
            <div className={styles.sign}>
              <Image src="/icons/vector.svg" className={styles.signItem} width={30} height={22} alt="plus" />
            </div>
            <div className={styles.sign}>
              <Image src="/icons/vector.svg" className={styles.signItem} width={30} height={22} alt="plus" />
            </div>
          </div>
          <div className={styles.presetBlock}>
            <p className={styles.preset}>5 Preset</p>
            <ul className={styles.presetList2}>
              <li>Buy & Hold</li>
              <li>Intl. Tourism</li>
            </ul>
          </div>
          <div className={styles.presetGrowth}>
            <Image src="/icons/vector.svg" className={styles.signItem} width={30} height={22} alt="plus" />
          </div>
          <div className={styles.signMarg}>
            <p className={`${styles.addData} ${styles.signMarg3}`}>30,000 Nearby-Places (50 Select-All Searches)</p>
            <div className={styles.sign}>
              <Image src="/icons/blackMinus.svg" className={styles.signItem} width={30} height={22} alt="minus" />
            </div>
            <div className={styles.sign}>
              <Image src="/icons/vector.svg" className={styles.signItem} width={30} height={22} alt="plus" />
            </div>
          </div>
          <div className={styles.bottomSign1}>
            <div className={`${styles.sign} ${styles.signBot}`}>
              <Image src="/icons/blackMinus.svg" className={styles.signItem} width={30} height={22} alt="minus" />
            </div>
            <div className={`${styles.sign} ${styles.signBot}`}>
              <Image src="/icons/blackMinus.svg" className={styles.signItem} width={30} height={22} alt="minus" />
            </div>
            <div className={`${styles.sign} ${styles.signBot}`}>
              <Image src="/icons/blackMinus.svg" className={styles.signItem} width={30} height={22} alt="minus" />
            </div>
            <div className={`${styles.sign} ${styles.signBot}`}>
              <Image src="/icons/blackMinus.svg" className={styles.signItem} width={30} height={22} alt="minus" />
            </div>
            <div className={`${styles.sign} ${styles.signBot}`}>
              <Image src="/icons/blackMinus.svg" className={styles.signItem} width={30} height={22} alt="minus" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.professional}>
        <h1 className={styles.cardTitle}>professional</h1>
        <button onClick={() => planCheckout.openPro()} className={styles.profBtn}>
          Get Started
        </button>
        <div className={styles.signs}>
          <div className={`${styles.quickSign}  ${styles.presetBlockRes}`}>
            <p className={styles.feat}>Unlimited</p>
            <p className={styles.feat}>Unlimited</p>
            <div className={`${styles.sign} ${styles.startSign}`}>
              <Image src="/icons/vector.svg" className={styles.signItem} width={30} height={22} alt="plus" />
            </div>
            <div className={styles.sign}>
              <Image src="/icons/vector.svg" className={styles.signItem} width={30} height={22} alt="plus" />
            </div>
            <div className={styles.sign}>
              <Image src="/icons/vector.svg" className={styles.signItem} width={30} height={22} alt="plus" />
            </div>
          </div>
          <div className={styles.presetBlock}>
            <p className={styles.preset}>7 Preset</p>
            <ul className={styles.presetList3}>
              <li>STR</li>
              <li>Buy & Flip</li>
              <li>RE Developer</li>
            </ul>
          </div>
          <Image src="/icons/vector.svg" className={styles.signItemPlus} width={30} height={22} alt="plus" />
          <div className={styles.signMarg}>
            <p className={`${styles.addData} ${styles.signMarg2}`}>60,000 Nearby-Places (100 Select-All Searches)</p>
            <div className={styles.sign}>
              <Image src="/icons/vector.svg" className={styles.signItem} width={30} height={22} alt="plus" />
            </div>
            <div className={styles.sign}>
              <Image src="/icons/vector.svg" className={styles.signItem} width={30} height={22} alt="plus" />
            </div>
          </div>

          <div className={styles.bottomSign2}>
            <div className={`${styles.sign} ${styles.signBot}`}>
              <Image src="/icons/vector.svg" className={styles.signItem} width={30} height={22} alt="plus" />
            </div>
            <div className={`${styles.sign} ${styles.signBot}`}>
              <Image src="/icons/vector.svg" className={styles.signItem} width={30} height={22} alt="plus" />
            </div>
            <div className={`${styles.sign} ${styles.signBot}`}>
              <Image src="/icons/vector.svg" className={styles.signItem} width={30} height={22} alt="plus" />
            </div>
            <div className={`${styles.sign} ${styles.signBot}`}>
              <Image src="/icons/vector.svg" className={styles.signItem} width={30} height={22} alt="plus" />
            </div>
            <div className={`${styles.sign} ${styles.signBot}`}>
              <Image src="/icons/vector.svg" className={`${styles.signItem} ${styles.signPM}`} width={30} height={22} alt="plus" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

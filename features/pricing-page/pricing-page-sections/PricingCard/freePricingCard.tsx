import React from "react";
import styles from "./freePricingCard.module.scss";
import { Paragraph } from "components/Paragraph/Paragraph";

import ItemIcon from "../../../../public/icons/item.svg";
import WhiteItem from "../../../../public/icons/whiteItem.svg";
import { usePlanWindow } from "./PricingCard";

type mainFeaturesType = {
  text: string;
  strikeLine: boolean;
};

type Props = {
  title: string;
  subTitle: string;
  price: string;
  pricePer?: string;
  mainFeatures: mainFeaturesType[];
  name: string;
  secondaryFeatures: string[];
};

export const FreePricingCard: React.FC<Props> = ({ title, subTitle, price, pricePer, mainFeatures, name, secondaryFeatures }) => {
  const planCheckout = usePlanWindow();
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.priceBlock}>
          <h1 className={styles.title}>{title}</h1>
          <Paragraph text={subTitle} className={styles.subTitle} />
          <div className={styles.priceContainer}>
            <p className={styles.price}>{price}</p>
            <p className={styles.greenPricePer}>{pricePer}</p>
          </div>
        </div>
        <button onClick={() => planCheckout.openFree()} className={styles.button} type="button">
          Get Started
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.featuresBlock}>
          <ul>
            {mainFeatures.map((feature) => (
              <li key={feature.text} className={styles.featureParams} style={feature.strikeLine ? { textDecoration: "line-through" } : {}}>
                <div className={styles.iconSign}>
                  <ItemIcon className={styles.icon} />
                </div>
                {feature.text}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.feature}>
          <h2 className={styles.featureTitle}>{name}</h2>
          <div className={styles.featuresList}>
            <ul className={styles.list}>
              {secondaryFeatures.map((feature) => (
                <li key={feature} className={styles.featureParams}>
                  <WhiteItem className={styles.icon} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

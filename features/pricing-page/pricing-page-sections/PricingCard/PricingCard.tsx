import React from "react";
import styles from "./PricingCard.module.scss";
import { Paragraph } from "components/Paragraph/Paragraph";

import ItemIcon from "../../../../public/icons/item.svg";
import WhiteItem from "../../../../public/icons/whiteItem.svg";
import GreenItem from "../../../../public/icons/greenItem.svg";
import Image from "next/image";
import { useOutseta } from "hooks/use-outseta";
import { IAppPlans } from "context/plansContext";

type mainFeaturesType = {
  text: string;
  strikeLine: boolean;
};

type Props = {
  readonly title: string;
  readonly subTitle: string;
  readonly price: string;
  readonly pricePer?: string;
  readonly mainFeatures: mainFeaturesType[];
  readonly name: string;
  readonly secondaryFeatures: string[];
  readonly greenType: boolean;
  readonly planId: IAppPlans;
};

const handlePlanSelect = (outsetaRef: any, planId: string) => {
  outsetaRef.current?.auth?.open({ widgetMode: "register", planUid: planId });
};

export const usePlanWindow = () => {
  const outsetaRef = useOutseta();

  return {
    openFree: () => handlePlanSelect(outsetaRef, IAppPlans.FREE_PLAN_UID),
    openStarter: () => handlePlanSelect(outsetaRef, IAppPlans.STARTER_PLAN_UID),
    openGrowth: () => handlePlanSelect(outsetaRef, IAppPlans.GROWTH_PLAN_UID),
    openPro: () => handlePlanSelect(outsetaRef, IAppPlans.PROFESSIONAL_PLAN_UID),
    openPlanWithUid: (uid: IAppPlans) => handlePlanSelect(outsetaRef, uid),
  };
};

export const PricingCard: React.FC<Props> = ({ title, subTitle, price, pricePer, mainFeatures, name, secondaryFeatures, greenType, planId }) => {
  const checkoutWindow = usePlanWindow();

  return (
    <div className={greenType ? styles.greenCard : styles.card}>
      <h1 className={greenType ? styles.greenTitle : styles.title}>{title}</h1>

      <Paragraph text={subTitle} className={greenType ? styles.greenSubTitle : styles.subTitle} />

      <div className={styles.priceContainer}>
        <p className={greenType ? styles.greenPrice : styles.price}>{price}</p>

        <p className={greenType ? styles.greenPricePer : ""}>{pricePer}</p>
      </div>

      <button onClick={() => checkoutWindow.openPlanWithUid(planId)} className={greenType ? styles.greenButton : styles.button} type="button">
        Get Started
      </button>

      <div className={styles.FeaturesBlock}>
        <ul>
          {mainFeatures.map((feature) => (
            <li
              key={feature.text}
              className={greenType ? styles.greenFeatureParams : styles.featureParams}
              style={feature.strikeLine ? { textDecoration: "line-through" } : {}}
            >
              <div className={styles.iconSign}>
                <ItemIcon className={styles.icon} />
              </div>
              {feature.text}
            </li>
          ))}
        </ul>
      </div>

      {greenType === true ? (
        <Image alt="" src="./icons/greenLine.svg" layout="responsive" className={styles.line} width={30} height={3} />
      ) : (
        <Image alt="" src="./icons/line.svg" layout="responsive" className={styles.line} width={30} height={3} />
      )}

      <h2 className={greenType ? styles.greenFeatureTitle : styles.featureTitle}>{name}</h2>
      <div className={styles.FeaturesBlock}>
        <ul>
          {secondaryFeatures.map((feature) => (
            <li key={feature} className={greenType ? styles.greenFeatureParams : styles.featureParams}>
              {greenType ? <WhiteItem className={styles.icon} /> : <GreenItem className={styles.icon} />}
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

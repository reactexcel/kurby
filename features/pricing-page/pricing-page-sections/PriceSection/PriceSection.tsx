import React from "react";
import styles from "./PriceSection.module.scss";
import { PricingCard } from "../PricingCard/PricingCard";
import { useMyContext } from "context/priceContext";
import { mainFeatures1, mainFeatures2, mainFeatures3, secondaryFeatures1, secondaryFeatures2, secondaryFeatures3 } from "./mockData";

export const PriceSection = () => {
  const { param } = useMyContext();

  return (
    <div className={styles.container}>
      <PricingCard
        title="starter"
        subTitle="quick stats"
        price="free forever"
        greenType={false}
        mainFeatures={mainFeatures1}
        name="key features"
        secondaryFeatures={secondaryFeatures1}
      />
      <PricingCard
        title="growth"
        subTitle="Additional Data & Analytics"
        price={param ? "$ 479.99" : "$ 49.99"}
        pricePer="/ month"
        greenType={true}
        mainFeatures={mainFeatures2}
        name="all of the features in starter, plus"
        secondaryFeatures={secondaryFeatures2}
      />
      <PricingCard
        title="professional "
        subTitle="Advanced Data & Intelligence"
        price={param ? "$ 959.99" : "$ 99.99"}
        pricePer="/ month"
        greenType={false}
        mainFeatures={mainFeatures3}
        name="all of the features in growth, plus"
        secondaryFeatures={secondaryFeatures3}
      />
    </div>
  );
};

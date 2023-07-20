import React from "react";
import styles from "./PriceSection.module.scss";
import { PricingCard } from "../PricingCard/PricingCard";
import { FreePricingCard } from "../PricingCard/freePricingCard";
import { useMyContext } from "context/priceContext";
import { freeFeatures, starterFeatures, growthFeatures, proffFeatures, freeSecFeatures, starterSecFeatures, growthSecFeatures, proffSecFeatures } from "./mockData";

export const PriceSection = () => {
  const { param } = useMyContext();

  return (
    <div className={styles.container}>
      <div className={styles.headCard}>
        <FreePricingCard
          title="free"
          subTitle="quick stats"
          price="free forever"
          mainFeatures={freeFeatures}
          name="key features"
          secondaryFeatures={freeSecFeatures}
        />
      </div>
      <div className={styles.bodyCard}>
        <PricingCard
          title="starter"
          subTitle="quick stats"
          price={param ? "$ 10" : "$ 12"}
          greenType={false}
          mainFeatures={starterFeatures}
          name="key features"
          secondaryFeatures={starterSecFeatures}
        />
        <PricingCard
          title="professional "
          subTitle="Advanced Data & Intelligence"
          price={param ? "$ 79" : "$ 99"}
          pricePer="/ month"
          greenType={true}
          mainFeatures={proffFeatures}
          name="all of the features in growth, plus"
          secondaryFeatures={proffSecFeatures}
        />
        <PricingCard
          title="growth"
          subTitle="Additional Data & Analytics"
          price={param ? "$ 39" : "$ 49"}
          pricePer="/ month"
          greenType={false}
          mainFeatures={growthFeatures}
          name="all of the features in starter, plus"
          secondaryFeatures={growthSecFeatures}
        />
      </div>
    </div>
  );
};

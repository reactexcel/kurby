import React from "react";
import styles from "./Faqs.module.scss";

import FaqLine from "../../../../public/icons/faqLine.svg";
import Minus from "../../../../public/icons/minus.svg";
import Plus from "../../../../public/icons/plus.svg";
import Image from "next/image";

export const FaqsSection = () => {
  return (
    <div className={styles.background}>
      <h1 className={styles.title}>faqs</h1>
      <div className={styles.faqs}>
        <div className={styles.faqHeader}>
          <p className={styles.faqTitle}>Are there different pricing tiers or options available within the plan?</p>
          {/* <Image alt="" src="./icons/minus.svg" className={styles.tracingImg} layout="responsive" width={10} height={3} /> */}
          <Minus className={styles.signPlMn} />
        </div>
        <FaqLine className={styles.faqLine} />
        <div className={styles.infoBlock}>
          <p className={styles.faqInfo}>A mortgage payment is the amount of money paid regularly to pay down, eventually paying off the borrowed mortgage balance.</p>
          <p className={styles.faqInfo}>
            At nesto, you can schedule your payment frequency as weekly, biweekly, monthly and accelerated weekly/biweekly payments. Typically represented as one sum, a
            mortgage payment is made up of 2 main components – principal and interest portions.
          </p>
        </div>
      </div>
      <div className={styles.faqItem}>
        <p className={styles.faqTitle}>Does the pricing plan offer any discounts or incentives for specific types of buyers?</p>
        <Plus />
      </div>
      <div className={styles.faqItem}>
        <p className={styles.faqTitle}>Are there any additional costs or fees associated with the pricing plan?</p>
        <Plus />
      </div>
      <div className={styles.faqItem}>
        <p className={styles.faqTitle}>Can I customize or tailor the pricing plan to better fit my budget and needs?</p>
        <Plus />
      </div>
      <div className={styles.faqItem}>
        <p className={styles.faqTitle}>What’s the cancellation policy?</p>
        <Plus />
      </div>
    </div>
  );
};

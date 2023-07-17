import React from "react";
import styles from "./Faqs.module.scss";

import { FaqItem } from "./FaqItem";

export const FaqsSection = () => {
  const faqItems = [
    {
      title: "Are there different pricing tiers or options available within the plan?",
      subtitle: "A mortgage payment is the amount of money paid regularly to pay down, eventually paying off the borrowed mortgage balance.",
      desc: `At nesto, you can schedule your payment frequency as weekly, biweekly, monthly and accelerated weekly/biweekly payments. Typically represented as one sum, a
mortgage payment is made up of 2 main components – principal and interest portions.`,
    },
    {
      title: "Does the pricing plan offer any discounts or incentives for specific types of buyers?",
      subtitle: "A mortgage payment is the amount of money paid regularly to pay down, eventually paying off the borrowed mortgage balance.",
      desc: `At nesto, you can schedule your payment frequency as weekly, biweekly, monthly and accelerated weekly/biweekly payments. Typically represented as one sum, a
mortgage payment is made up of 2 main components – principal and interest portions.`,
    },
    {
      title: "Are there any additional costs or fees associated with the pricing plan?",
      subtitle: "A mortgage payment is the amount of money paid regularly to pay down, eventually paying off the borrowed mortgage balance.",
      desc: `At nesto, you can schedule your payment frequency as weekly, biweekly, monthly and accelerated weekly/biweekly payments. Typically represented as one sum, a
mortgage payment is made up of 2 main components – principal and interest portions.`,
    },
    {
      title: "Can I customize or tailor the pricing plan to better fit my budget and needs?",
      subtitle: "A mortgage payment is the amount of money paid regularly to pay down, eventually paying off the borrowed mortgage balance.",
      desc: `At nesto, you can schedule your payment frequency as weekly, biweekly, monthly and accelerated weekly/biweekly payments. Typically represented as one sum, a
mortgage payment is made up of 2 main components – principal and interest portions.`,
    },
    {
      title: "What’s the cancellation policy?",
      subtitle: "A mortgage payment is the amount of money paid regularly to pay down, eventually paying off the borrowed mortgage balance.",
      desc: `At nesto, you can schedule your payment frequency as weekly, biweekly, monthly and accelerated weekly/biweekly payments. Typically represented as one sum, a
mortgage payment is made up of 2 main components – principal and interest portions.`,
    },
  ];

  return (
    <div className={styles.background}>
      <h1 className={styles.title}>faqs</h1>
      {faqItems.map((item, index) => (
        <FaqItem key={index} title={item.title} subtitle={item.subtitle} desc={item.desc} />
      ))}
    </div>
  );
};

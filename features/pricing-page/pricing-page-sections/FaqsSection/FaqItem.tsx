import React, { useState } from "react";
import styles from "./Faqs.module.scss";

import Minus from "../../../../public/icons/minus.svg";
import Plus from "../../../../public/icons/plus.svg";

interface Faq {
  title: string;
  subtitle: string;
  desc: string;
}

export const FaqItem: React.FC<Faq> = ({ title, subtitle, desc }) => {
  const [open, setOpen] = useState(false);

  const showDesc = () => {
    setOpen((open) => !open);
  };
  return (
    <div className={styles.faqs}>
      <div className={styles.faqHeader}>
        <p className={styles.faqTitle}>{title}</p>
        <div onClick={showDesc}>
          <Minus className={open ? styles.signPlMn : styles.close} />
          <Plus className={!open ? styles.signPlMn : styles.close} />
        </div>
      </div>
      <div className={open ? styles.infoFaq : styles.close}>
        <hr className={styles.faqLine} />
        <div className={styles.infoBlock}>
          <p className={styles.faqInfo}>{subtitle}</p>
          <p className={styles.faqInfo}>{desc}</p>
        </div>
      </div>
    </div>
  );
};

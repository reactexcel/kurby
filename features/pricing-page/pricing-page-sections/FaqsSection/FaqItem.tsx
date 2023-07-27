import React, { useState } from "react";
import styles from "./Faqs.module.scss";

import Minus from "../../../../public/icons/minus.svg";
import Plus from "../../../../public/icons/plus.svg";

interface Faq {
  title: string;
  subtitle?: string;
  desc?: string;
  subtitle1?: string;
  desc1?: string;
  subtitle2?: string;
  desc2?: string;
  subtitle3?: string;
  desc3?: string;
  subtitle4?: string;
  desc4?: string;
}

export const FaqItem: React.FC<Faq> = ({ title, subtitle, desc, subtitle1, desc1, subtitle2, desc2, subtitle3, desc3, subtitle4, desc4 }) => {
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
          <h3>{subtitle1}</h3>
          <p className={styles.faqInfo}>{desc}</p>
          <h3>{subtitle2}</h3>
          <p className={styles.faqInfo}>{desc1}</p>
          <h3>{subtitle3}</h3>
          <p className={styles.faqInfo}>{desc2}</p>
          <h3>{subtitle4}</h3>
          <p className={styles.faqInfo}>{desc3}</p>
          <p className={styles.faqInfo}>{desc4}</p>
        </div>
      </div>
    </div>
  );
};

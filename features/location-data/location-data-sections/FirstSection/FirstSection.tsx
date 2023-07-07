import styles from "./FirstSection.module.scss";
import { Paragraph } from "components/Paragraph/Paragraph";
import Image from "next/image";

export const FirstSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Invest Like a Local with Kurby’s AI-Powered Property Descriptions</h1>
        <div className={styles.line}></div>
        <Paragraph
          text="As a real estate investor, you know that location is one of the most important factors that determine the value and profitability of a property. But how do you find reliable and relevant information about a property’s location, especially when investing in a different state or country?"
          className={styles.paragraph}
        />
        <Paragraph
          text="That’s where Kurby comes in. Kurby uses advanced artificial intelligence (GPT-4) to generate location descriptions tailored to investors’ preferences. It’s like having a local expert on your side, who can tell you everything you need to know about any property location in the world."
          className={styles.paragraph}
        />

        <button className={styles.searchButton}>Learn More &#62; &#62;</button>
      </div>
      <div className={styles.pictureWrapper}>
        <Image alt="" src="./images/location-data-first.svg" width={650} height={450} />
      </div>
    </div>
  );
};

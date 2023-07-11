import styles from "./SecondSection.module.scss";
import { Paragraph } from "components/Paragraph/Paragraph";
import Image from "next/image";

export const SecondSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.pictureWrapper}>
        <Image alt="" src="./images/location-data-second-section-left.svg" className={styles.picture} layout="responsive" width={550} height={370} />
      </div>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Avoid Bad Deals and Risky Investments with Kurby’s Green and Red Flags</h1>
        <div className={styles.line}></div>
        <Paragraph
          text="Not all properties are created equal. Some have great potential and opportunities, while others have hidden problems and pitfalls."
          className={styles.paragraph}
        />
        <Paragraph text="But how can you tell the difference?" className={styles.paragraphTitle} />
        <Paragraph
          text="That’s where Kurby’s Green and Red Flags come in. Kurby’s Green and Red Flags are indicators that highlight the positive and negative aspects of any property location."
          className={styles.paragraph}
        />
        <Paragraph
          text="Green flags are signs that a property location is favorable for your investment goals. They include factors such as:"
          className={styles.paragraphTitle}
        />
        <div className={styles.listItem}>
          <img src="./images/greenFlag.svg" alt="" className={styles.listItemImg} />
          <Paragraph text="High demand and low supply" className={styles.paragraph} />
        </div>
        <div className={styles.listItem}>
          <img src="./images/greenFlag.svg" alt="" className={styles.listItemImg} />
          <Paragraph text="Strong appreciation and rental growth" className={styles.paragraph} />
        </div>
        <div className={styles.listItem}>
          <img src="./images/greenFlag.svg" alt="" className={styles.listItemImg} />
          <Paragraph text="Low crime and poverty rates" className={styles.paragraph} />
        </div>
        <div className={styles.listItem}>
          <img src="./images/greenFlag.svg" alt="" className={styles.listItemImg} />
          <Paragraph text="High education and income levels" className={styles.paragraph} />
        </div>
        <div className={styles.listItem}>
          <img src="./images/greenFlag.svg" alt="" className={styles.listItemImg} />
          <Paragraph text="Favorable zoning and development plans" className={styles.paragraph} />
        </div>
        <Paragraph
          text="Red flags are signs that a property location is unfavorable for your investment goals. They include factors such as:"
          className={styles.paragraphTitle}
        />
        <div className={styles.listItem}>
          <img src="./images/redFlag.svg" alt="" className={styles.listItemImg} />
          <Paragraph text="Low demand and high supply" className={styles.paragraph} />
        </div>
        <div className={styles.listItem}>
          <img src="./images/redFlag.svg" alt="" className={styles.listItemImg} />
          <Paragraph text="Weak appreciation and rental growth" className={styles.paragraph} />
        </div>
        <div className={styles.listItem}>
          <img src="./images/redFlag.svg" alt="" className={styles.listItemImg} />
          <Paragraph text="High crime and poverty rates" className={styles.paragraph} />
        </div>
        <div className={styles.listItem}>
          <img src="./images/redFlag.svg" alt="" className={styles.listItemImg} />
          <Paragraph text="Low education and income levels" className={styles.paragraph} />
        </div>
        <div className={styles.listItem}>
          <img src="./images/redFlag.svg" alt="" className={styles.listItemImg} />
          <Paragraph text="Unfavorable zoning and development plans" className={styles.paragraph} />
        </div>
        <Paragraph
          text="Kurby’s AI Green and Red Flags help you avoid bad deals and risky investments by showing you the pros and cons of any property location. You can use them to quickly evaluate and compare different properties, as well as to negotiate better prices and terms."
          className={styles.paragraph}
        />
      </div>
    </div>
  );
};

import styles from "./FirstSection.module.scss";
import { Paragraph } from "components/Paragraph/Paragraph";
import { SectionLayout } from "../SectionLayout/SectionLayout";
import { Button } from "@mui/material";
import { useWindowSize } from "hooks/use-window-size";

export const FirstSection = () => {
  const { isMobileTablet } = useWindowSize();

  const ImageComponent = () => {
    return (
      <div className={styles.imageWrapper}>
        <img className={styles.image} src="/images/laptop.png" alt="" />
      </div>
    );
  };

  return (
    <SectionLayout title="Make informed decisions" id="firstSection">
      <div className={styles.container}>
        <div className={styles.textWrapper}>
          <h3 className={styles.info}>Get the most accurate and up-to-date real estate data on any property worldwide with our ai-powered app.</h3>
          <div className={styles.line} />
          {isMobileTablet && <ImageComponent />}
          <div className={styles.paragraphWrapper}>
            <Paragraph text="Weather you're a homebuyer or an investor, Kurby offers a complete picture of any property and it's surroundings, including market trends, demographics and location-specific details that can help you make a smart investment decision." />
            <Paragraph text="With Kurby, you can unlock the power of real estate intelligence and simplify your property search like never before. Try it - it's free, forever." />
            <Button className={styles.button}>{"Learn More >>"}</Button>
          </div>
        </div>
        {!isMobileTablet && <ImageComponent />}
      </div>
    </SectionLayout>
  );
};

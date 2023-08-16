import { Paragraph } from "components/Paragraph/Paragraph";
import styles from "./ThirdSection.module.scss";

// import Home from '../../../../public/images/home-value-thirdSection.svg';
// import HomeProp from '../../../../public/images/home-property-third.svg'

import Image from "next/image";

export const ThirdSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Analyze the Market Trends and Forecast the Future Value of Properties with Home Value Estimates</h1>
        <div className={styles.line}></div>
        <Paragraph
          text="As a real estate investor, you want to stay ahead of the curve and spot the best opportunities in the market. That’s why analyzing the market trends and forecasting the future value of properties is essential."
          className={styles.paragraph}
        />
        <Paragraph
          text="Our home value estimator not only gives you the current value of any property in the US, but also shows you how the value has changed over time and how it is expected to change in the future. You can see the historical and projected trends for any property location, based on factors such as supply and demand, population growth, income level, etc."
          className={styles.paragraph}
        />
        <Paragraph
          text="With our home value estimator, you can easily analyze the market trends and forecast the future value of properties. You can identify properties that are in high-growth or low-growth areas, and adjust your investment strategy accordingly. You can also estimate your potential profit or loss from buying or selling a property at a given time. Our home value estimator helps you make smarter and faster investment decisions."
          className={styles.paragraph}
        />
        <button className={styles.searchButton}>Learn More &#62; &#62;</button>
      </div>
      <div className={styles.pictureWrapper}>
        <div className={styles.wrap}>
          {/* <Home className={styles.homeImg} />
          <HomeProp className={styles.homePropImg} /> */}
          <Image alt="" src="./images/home-value-thirdSection.svg" layout="responsive" width={550} height={370} />
        </div>
      </div>
    </div>
  );
};

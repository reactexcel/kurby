import styles from "./Cards.module.scss";
import Image from "next/image";
import homeIcon from "../../../public/icons/home.png";
import homeHands from "../../../public/icons/homehands.png";
import homePeople from "../../../public/icons/homepeople.png";
import { Button } from "components/Button/Button";
import { Paragraph } from "components/Paragraph/Paragraph";

const Cards = () => {
  return (
    <div className={styles["card-container"]}>
      <div className={styles.card}>
        <Image src={homeIcon} alt="home icon" />
        <h3 className={styles.cardHeader}>WHAT'S NEARBY</h3>
        <Paragraph className={styles.paragraph}>Kurby analyzes location data in an unprecedented way to find the best place for you to live.</Paragraph>
        <Button className={styles.button}>Find What's nearby</Button>
      </div>
      <div className={styles.card}>
        <Image src={homeHands} alt="home hands icon" />

        <h3 className={styles.cardHeader}>LOCATION SCORE</h3>
        <Paragraph className={styles.paragraph}>Our proprietary location score makes it easy to find the most comfortable, convenient, and livable home for you.</Paragraph>
        <Button className={styles.button}>Calculate location score</Button>
      </div>
      <div className={styles.card}>
        <Image src={homePeople} alt="home people icon" />
        <h3 className={styles.cardHeader}>EXPLAIN IT LIKE A LOCAL</h3>
        <Paragraph className={styles.paragraph}>Get local information on what a particular area is really like before spending any more time evaluating it.</Paragraph>
        <Button className={styles.button}>Get local information</Button>
      </div>
    </div>
  );
};

export default Cards;

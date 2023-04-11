import styles from "./Cards.module.scss";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import homeIcon from "../../../public/icons/home.png";
import homeHands from "../../../public/icons/homehands.png";
import homePeople from "../../../public/icons/homepeople.png";
import { Button } from "components/Button/Button";

const Body = styled("p")(() => ({
  color: "#868686",
  fontSize: "24px",
  fontWeight: "300",
  lineHeight: "28px",
  boxSizing: "border-box",
  margin: "0px",
  textAlign: "center",
}));

const Cards = () => {
  return (
    <div className={styles["card-container"]}>
      <div className={styles.card}>
        <Image src={homeIcon} alt="home icon" />
        <h2 className={styles.cardHeader}>WHAT'S NEARBY</h2>
        <Body>Kurby analyzes location data in an unprecedented way to find the best place for you to live.</Body>
        <Button className={styles.button}>Find What's nearby</Button>
      </div>
      <div className={styles.card}>
        <Image src={homeHands} alt="home hands icon" />

        <h2 className={styles.cardHeader}>LOCATION SCORE</h2>
        <Body>Our proprietary location score makes it easy to find the most comfortable, convenient, and livable home for you.</Body>
        <Button className={styles.button}>Calculate location score</Button>
      </div>
      <div className={styles.card}>
        <Image src={homePeople} alt="home people icon" />
        <h2 className={styles.cardHeader}>EXPLAIN IT LIKE A LOCAL</h2>
        <Body>Get local information on what a particular area is really like before spending any more time evaluating it.</Body>
        <Button className={styles.button}>Get local information</Button>
      </div>
    </div>
  );
};

export default Cards;

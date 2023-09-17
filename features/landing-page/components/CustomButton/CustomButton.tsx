import { Button } from "@mui/material";
import styles from "./CustomButton.module.scss";

export default function CustomButton({
  text,
  link = "https://kurby.ai/app/miami--usa",
  font_size = "1rem",
  padding = "0.9rem 2.3rem",
  children,
}: {
  text: string;
  link: string;
  font_size: string;
  padding: string;
  children: any | null | undefined;
}) {
  return (
    <a className={styles.link} style={{ textDecoration: "none", color: "white" }} href={link}>
      <button style={{ fontSize: font_size, padding: padding }} className={styles.main}>
        {text}
        {children}
      </button>
    </a>
  );
}

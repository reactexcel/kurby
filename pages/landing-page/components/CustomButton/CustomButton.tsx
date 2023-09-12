import styles from "./CustomButton.module.scss";

export default function CustomButton({ text, font_size = "1rem" }: { text: string; font_size: string }) {
  return (
    <button style={{ fontSize: font_size }} className={styles.main}>
      {text}
    </button>
  );
}

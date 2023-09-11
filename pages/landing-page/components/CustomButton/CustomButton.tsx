import styles from "./CustomButton.module.scss";

export default function CustomButton({ text }: { text: string }) {
  return <button className={styles.main}>{text}</button>;
}

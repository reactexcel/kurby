import styles from "./Paragraph.module.css";

export const Paragraph = ({ text, className }: { text: string; className?: string }) => {
  return <p className={`${styles.text} ${className || ""}`}>{text}</p>;
};

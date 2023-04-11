import styles from "./Paragraph.module.css";

interface ParagraphProps {
  text?: string;
  className?: string;
  children?: React.ReactNode;
}

export const Paragraph = ({ text, className, children }: ParagraphProps) => {
  return <p className={`${styles.text} ${className || ""}`}>{text || children}</p>;
};

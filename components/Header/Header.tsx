import styles from "./Header.module.css";

export const Header = ({ title }: { title: string }) => {
  return <h2 className={styles.main}>{title}</h2>;
};

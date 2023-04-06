import { Header } from "components/Header/Header";
import styles from "./SectionLayout.module.css";

export const SectionLayout = ({ children, title }: { children?: React.ReactNode; title: string }) => {
  return (
    <div className={styles.main}>
      <Header title={title} />
      {children}
    </div>
  );
};

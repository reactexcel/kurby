import { Header } from "components/Header/Header";
import styles from "./SectionLayout.module.css";

export const SectionLayout = ({ children, title, id = "" }: { children?: React.ReactNode; title: string; id?: string }) => {
  return (
    <div className={styles.main} id={id}>
      <Header title={title} />
      {children}
    </div>
  );
};

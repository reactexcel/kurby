import styles from "./TabLayout.module.scss";

interface TabLayoutProps {
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
}

export const TabLayout = ({ children, className, loading }: TabLayoutProps) => {
  return <div className={`${styles.main} ${className || ""} ${loading ? styles.loading : ""}`}>{children}</div>;
};

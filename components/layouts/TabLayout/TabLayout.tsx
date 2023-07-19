import styles from "./TabLayout.module.scss";

interface TabLayoutProps {
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  style?: object;
}

export const TabLayout = ({ children, className, loading, style }: TabLayoutProps) => {
  return (
    <div style={style} className={`${styles.main} ${className || ""} ${loading ? styles.loading : ""}`}>
      {children}
    </div>
  );
};

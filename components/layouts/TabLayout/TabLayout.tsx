import { forwardRef } from "react";
import styles from "./TabLayout.module.scss";

interface TabLayoutProps {
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  style?: React.CSSProperties;
  // Removed ref from here
}

// eslint-disable-next-line react/display-name
export const TabLayout = forwardRef<HTMLDivElement, TabLayoutProps>(({ children, className, loading, style }, ref) => {
  return (
    <div ref={ref} style={style} className={`${styles.main} ${className || ""} ${loading ? styles.loading : ""}`}>
      {children}
    </div>
  );
});

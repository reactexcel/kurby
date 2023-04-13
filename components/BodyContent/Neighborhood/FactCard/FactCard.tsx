import { Card, CardContent } from "@mui/material";
import styles from "./FactCard.module.scss";
import LaunchIcon from "@mui/icons-material/Launch";

interface FactCardProps {
  icon: JSX.Element;
  label: string;
  value: string | number | null | undefined;
  children?: JSX.Element | JSX.Element[];
  type: "string" | "percent";
  seeMoreOnClick?: () => void;
}

const FactCard = ({ icon, label, value = "", type, seeMoreOnClick }: FactCardProps) => {
  let formattedValue = type === "percent" ? `${value}%` : value;

  return (
    <Card className={styles.card}>
      <CardContent className={styles.cardContent}>
        <div className={styles.iconContainer}>{icon}</div>
        <div className={styles.dataContainer}>
          <div className={styles.label}>
            {label}
            {seeMoreOnClick ? <LaunchIcon className={styles.launchIcon} onClick={() => seeMoreOnClick()} /> : null}
          </div>
          <div className={styles.valueContainer}>
            <div className={styles.formattedValue}>{formattedValue || "N/A"}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FactCard;

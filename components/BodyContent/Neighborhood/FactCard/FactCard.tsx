import { Card, CardContent } from "@mui/material";
import styles from "./FactCard.module.css";

interface Props {
  icon: JSX.Element;
  label: string;
  value: string | number | null | undefined;
  children?: JSX.Element | JSX.Element[];
  type: "string" | "percent";
}

const FactCard = ({ icon, label, value = "", type, children }: Props) => {
  let formattedValue = type === "percent" ? `${value}%` : value;

  return (
    <Card className={styles.card}>
      <CardContent className={styles.cardContent}>
        <div className={styles.iconContainer}>{icon}</div>
        <div className={styles.dataContainer}>
          <div className={styles.label}>{label}</div>
          <div className={styles.valueContainer}>
            <div className={styles.formattedValue}>{formattedValue || "N/A"}</div>
            {children}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FactCard;

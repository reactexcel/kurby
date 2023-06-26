import styles from "./VersusCard.module.scss";
import Versus from "../../../../public/icons/versus.svg";

type SideType = {
  label: string;
  value?: number;
};

interface VersusCardProps {
  left: SideType;
  right: SideType;
}

export const VersusCard = ({ left, right }: VersusCardProps) => {
  return (
    <div className={styles.main}>
      <SideComponent label={left.label} value={left.value} />
      <Versus className={styles.icon} />
      <SideComponent label={right.label} value={right.value} />
    </div>
  );
};

const SideComponent = ({ label, value }: SideType) => {
  return (
    <div className={styles.sideMain}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}%</div>
    </div>
  );
};

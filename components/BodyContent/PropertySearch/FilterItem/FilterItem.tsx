import styles from "./FilterItem.module.scss";
import ArrowDown from "../../../../public/icons/arrow-down.svg";
interface IFilterItemProps {
  readonly title: string;
}

export function FilterItem({ title }: IFilterItemProps) {
  return (
    <div className={styles.filterItem}>
      {title}
      <ArrowDown />
    </div>
  );
}

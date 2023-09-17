import styles from "./Activity.module.scss";
import Back from "public/icons/back-white.svg";

interface IHeaderProps {
  readonly title: string;
}

interface IActivityProps {
  readonly children: React.ReactNode;
  readonly open: boolean;
  readonly header: IHeaderProps;
  readonly onClose: () => void;
  readonly headerOption?: React.ReactNode;
}

function Activity({ children, open, header, headerOption, onClose }: IActivityProps): JSX.Element {
  return (
    <div className={`${styles.activity} ${open ? styles.open : ""}`}>
      <div className={styles.header}>
        <div className={styles.backWithTitle}>
          <Back className={styles.back} onClick={onClose} />
          {header.title}
        </div>
        <div className={styles.activityOptions}>{headerOption}</div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export default Activity;

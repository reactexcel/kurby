import styles from "./KurbyPaidPlan.module.scss";

export enum TabLimitMessage {
  NEIGHBORHOOD_TAB,
  PROPERTY_DATA_TAB,
}

interface IKurbyPaidPlanLimitProps {
  type: TabLimitMessage;
}
export default function KurbyPaidPlanLimit({ type }: IKurbyPaidPlanLimitProps) {
  if (type === TabLimitMessage.NEIGHBORHOOD_TAB) {
    return <NeighborhoodBlurLimit />;
  }

  if (type === TabLimitMessage.PROPERTY_DATA_TAB) {
    return <PropertyDataBlurLimit />;
  }
  return <></>;
}

function NeighborhoodBlurLimit() {
  return (
    <div className={styles.blurOverlayLayer}>
      <h2 className={styles.title}>Sign Up For A Paid Plan</h2>
      <p className={styles.description}>
        Sign up for a paid plan to receive statistics on crime rate, average household income, % of residents with a bachelor degree, population growth, % of residents living
        under poverty, and more.
      </p>
    </div>
  );
}

function PropertyDataBlurLimit() {
  return (
    <div>
      <div className={styles.blurOverlayLayer}>
        <h2 className={styles.title}>Sign Up For A Paid Plan</h2>
        <p className={styles.description}>
          Sign up for a paid plan to receive property owner information, mortgage information, home value estimates, comparable homes, and more.
        </p>
      </div>
    </div>
  );
}

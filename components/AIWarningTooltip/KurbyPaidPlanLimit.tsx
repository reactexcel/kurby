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
      <h2>Sign Up</h2>
    </div>
  );
}

function PropertyDataBlurLimit() {
  return <div></div>;
}

import { Button } from "components/Button/Button";
import { FilterItem } from "../../FilterItem/FilterItem";
import styles from "./BedsBathsFilter.module.scss";

function BedsBathsFilterContent() {
  const spaceBottom = (marginBottom: number) => ({
    marginBottom,
  });

  return (
    <div className={styles.main}>
      <div style={spaceBottom(10)}>Bedrooms</div>
      <div style={spaceBottom(25)} className={styles.scrollViewSelector}>
        <div className={styles.scrollViewSelectorItem}>Any</div>
        <div className={styles.scrollViewSelectorItem}>1+</div>
        <div className={styles.scrollViewSelectorItem}>2+</div>
        <div className={styles.scrollViewSelectorItem}>3+</div>
        <div className={styles.scrollViewSelectorItem}>4+</div>
        <div className={styles.scrollViewSelectorItem}>5+</div>
      </div>
      <div style={spaceBottom(10)}>Number of Bathrooms</div>
      <div className={styles.scrollViewSelector}>
        <div className={styles.scrollViewSelectorItem}>Any</div>
        <div className={styles.scrollViewSelectorItem}>1+</div>
        <div className={styles.scrollViewSelectorItem}>1.5+</div>
        <div className={styles.scrollViewSelectorItem}>2+</div>
        <div className={styles.scrollViewSelectorItem}>3+</div>
        <div className={styles.scrollViewSelectorItem}>4+</div>
      </div>
      <Button className={styles.buttonWrapper}>Apply</Button>
    </div>
  );
}

export function BedBathsFilter() {
  return <FilterItem flex={1} title="Beds & Baths" renderContentPosition={"left"} renderContentWidth="420px" renderContent={<BedsBathsFilterContent />} />;
}

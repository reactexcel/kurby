import { TabLayout } from "components/layouts/TabLayout/TabLayout";
import { PropertyFilter } from "./Filters/FilterList";
import styles from "./PropertySearch.module.scss";
/**
 * Body Content
 * @description: Displays everything below the filters
 */
export default function CityStatePropertiesFilters() {
  return (
    <TabLayout className={styles.tabLayout}>
      <PropertyFilter />
      <div className={styles.filterInfoBody}>
        <p>Please select a filter to list properties in this zone.</p>
      </div>
    </TabLayout>
  );
}

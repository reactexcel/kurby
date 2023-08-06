import { TabLayout } from "components/layouts/TabLayout/TabLayout";
import { PropertyFilter } from "./Filters/FilterList";
import styles from "./PropertySearch.module.scss";

import { Properties } from "./Properties/Properties";
import { propertySearch } from "context/propertySearchContext";
import { useRecoilState } from "recoil";
/**
 * Body Content
 * @description: Displays everything below the filters
 */
export default function CityStatePropertiesFilters() {
  const [propertyData] = useRecoilState(propertySearch);
  return (
    <TabLayout className={styles.tabLayout}>
      <PropertyFilter />
      <Properties />
      {!propertyData.results && (
        <div className={styles.filterInfoBody}>
          <p>Please select a filter to list properties in this zone.</p>
        </div>
      )}
    </TabLayout>
  );
}

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
  const noResultsFound = Array.isArray(propertyData.results) && propertyData.results?.length;
  return (
    <TabLayout className={styles.tabLayout}>
      <PropertyFilter />
      <Properties />
      {!propertyData.results && (
        <div className={styles.filterInfoBody}>
          <p>Please select a filter to list properties in this zone.</p>
        </div>
      )}
      {noResultsFound === 0 && (
        <div className={styles.filterInfoBody}>
          <p>No results found according to your search criteria.</p>
        </div>
      )}
    </TabLayout>
  );
}

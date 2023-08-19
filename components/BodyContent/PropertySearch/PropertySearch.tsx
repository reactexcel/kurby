import { TabLayout } from "components/layouts/TabLayout/TabLayout";
import { PropertyFilter } from "./Filters/FilterList";
import styles from "./PropertySearch.module.scss";

import { Properties } from "./Properties/Properties";
import { propertySearch } from "context/propertySearchContext";
import { useRecoilState } from "recoil";
import { CircularProgress } from "@mui/material";
import KurbyPaidPlanLimit, { TabLimitMessage } from "components/AIWarningTooltip/KurbyPaidPlanLimit";
import { usePlanChecker } from "hooks/plans";
import { Button } from "components/Button/Button";
/**
 * Body Content
 * @description: Displays everything below the filters
 */
export default function CityStatePropertiesFilters() {
  const [propertyData] = useRecoilState(propertySearch);
  const noResultsFound = Array.isArray(propertyData.results) && propertyData.results?.length;
  const isPropertiesLoading = propertyData.results === true;
  const { isGrowth, isPro } = usePlanChecker();

  const handleLoadMore = () => {};

  return (
    <TabLayout className={styles.tabLayout}>
      {!isGrowth && !isPro && <KurbyPaidPlanLimit type={TabLimitMessage.FILTERS} />}
      <PropertyFilter />
      {Array.isArray(propertyData.results) && (
        <div className={styles.content}>
          <Properties />
          <div className={styles.buttonWrapper}>
            <Button className={styles.loadMoreButton} onClick={handleLoadMore}>
              Load more
            </Button>
          </div>
        </div>
      )}
      {!propertyData.results && (
        <div className={styles.filterInfoBody}>
          <p>Please select a filter to list properties in this zone.</p>
        </div>
      )}
      {isPropertiesLoading && (
        <div className={styles.filterInfoBody}>
          <CircularProgress sx={{ marginTop: 12 }} />
        </div>
      )}
      {noResultsFound === 0 && (
        <div className={styles.filterInfoBody}>
          <p>No results found</p>
        </div>
      )}
    </TabLayout>
  );
}

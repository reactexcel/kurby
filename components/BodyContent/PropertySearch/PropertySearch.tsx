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
import { IPropertySearchResponse } from "pages/api/core/reapi/propertySearch";
import axios from "axios";
import { filterState } from "context/filterContext";
import { useSearchCriteria } from "hooks/use-search-criteria";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
/**
 * Body Content
 * @description: Displays everything below the filters
 */
export default function CityStatePropertiesFilters() {
  const { searchCriteria } = useSearchCriteria();
  const [filterVal] = useRecoilState(filterState);
  const [, setPropertyData] = useRecoilState(propertySearch);
  const [propertyData] = useRecoilState(propertySearch);
  const noResultsFound = Array.isArray(propertyData.results) && propertyData.results?.length;
  const isPropertiesLoading = propertyData.isLoading;
  const { isGrowth, isPro } = usePlanChecker();

  const [isMaxResultsReached, setResultsReached] = useState<boolean>(false);
  const [isLoadMoreLoading, setLoadMoreLoading] = useState<boolean>(false);

  const handleLoadMore = async () => {
    setLoadMoreLoading(true);
    try {
      const {
        data: { data },
      } = await axios.post<IPropertySearchResponse>("/api/propertyV2", {
        filters: { latitude: filterVal.mapCenter?.lat, longitude: filterVal.mapCenter?.lng, ...searchCriteria },
        size: 50,
        resultIndex: 1,
        userToken: localStorage.getItem("Outseta.nocode.accessToken"),
      });
      setPropertyData({ results: data, isLoading: false, isError: false, isClientSideRendered: false });
      setResultsReached(true);
    } catch (e) {
      setPropertyData({ results: null, isLoading: false, isError: true, isClientSideRendered: false });
    }
  };

  const isMobile = useMediaQuery({ maxWidth: 600 });

  return (
    <TabLayout className={styles.tabLayout}>
      {!isGrowth && !isPro && <KurbyPaidPlanLimit type={TabLimitMessage.FILTERS} />}
      {!isMobile && <PropertyFilter />}
      {!isPropertiesLoading && Array.isArray(propertyData.results) && !propertyData.isError && (
        <div className={styles.content}>
          <Properties />
          {!isMaxResultsReached && propertyData.results.length > 20 && (
            <div className={styles.buttonWrapper}>
              {!isLoadMoreLoading ? (
                <Button className={styles.loadMoreButton} onClick={handleLoadMore}>
                  Load more
                </Button>
              ) : (
                <CircularProgress sx={{ marginTop: 12 }} />
              )}
            </div>
          )}
        </div>
      )}
      {!propertyData.isError && !isPropertiesLoading && !propertyData.results && (
        <div className={styles.filterInfoBody}>
          <p>Please select a filter to list properties in this zone.</p>
        </div>
      )}
      {isPropertiesLoading && (
        <div className={styles.filterInfoBody}>
          <CircularProgress sx={{ marginTop: 12 }} />
        </div>
      )}
      {noResultsFound === 0 && !isPropertiesLoading && (
        <div className={styles.filterInfoBody}>
          <p>No results found</p>
        </div>
      )}
      {!isPropertiesLoading && propertyData.isError && (
        <div className={styles.filterInfoBody}>
          <p>An error ocurred</p>
        </div>
      )}
    </TabLayout>
  );
}

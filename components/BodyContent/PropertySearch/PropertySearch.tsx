import { TabLayout } from "components/layouts/TabLayout/TabLayout";
import { PropertyFilter } from "./Filters/FilterList";

/**
 * Body Content
 * @description: Displays everything below the filters
 */
export default function CityStatePropertiesFilters() {
  return (
    <TabLayout>
      <PropertyFilter />
    </TabLayout>
  );
}

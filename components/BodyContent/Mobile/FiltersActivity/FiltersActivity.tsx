import { ForSaleFilter } from "components/BodyContent/PropertySearch/Filters/ForSaleFilter/ForSaleFilter";
import Activity from "../Activity/Activity";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { PriceFilter } from "components/BodyContent/PropertySearch/Filters/PriceFilter/PriceFilter";
import { BedBathsFilter } from "components/BodyContent/PropertySearch/Filters/BedsBathsFilter/BedsBathsFilter";
import { HomeTypeFilter } from "components/BodyContent/PropertySearch/Filters/HomeType/HomeType";
import { MoreFilter } from "components/BodyContent/PropertySearch/Filters/MoreFilter/MoreFilter";
import { useMediaQuery } from "react-responsive";

function FiltersActivity() {
  const router = useRouter();
  const viewFiltersFromUrl = router.query.viewFilters === "true";
  const isMobile = useMediaQuery({ maxWidth: 600 });

  const [isFiltersOpen, setFiltersOpen] = useState(false);

  // If the URL parameter viewMap is true, then update the state.
  React.useEffect(() => {
    setFiltersOpen(viewFiltersFromUrl);
  }, [viewFiltersFromUrl, setFiltersOpen]);

  const handleOnClose = () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, viewFilters: "false" },
    });
  };

  if (!isMobile) {
    return <></>;
  }

  return (
    <Activity onClose={handleOnClose} header={{ title: "Filters" }} open={isFiltersOpen}>
      <ForSaleFilter />
      <PriceFilter />
      <BedBathsFilter />
      <HomeTypeFilter />
      <MoreFilter />
    </Activity>
  );
}

export default FiltersActivity;

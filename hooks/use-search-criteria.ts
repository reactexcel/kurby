import { useRecoilState } from "recoil";
import { bedsBathsFilter, forSaleFilter, homeTypeFilter, moreFilter, priceFilter } from "context/propertySearchContext";

export function useSearchCriteria() {
  const [forSale] = useRecoilState(forSaleFilter);
  const [bedsFilter] = useRecoilState(bedsBathsFilter);
  const [price] = useRecoilState(priceFilter);
  const [homeFilter] = useRecoilState(homeTypeFilter);
  const [moreFilterState] = useRecoilState(moreFilter);

  const searchCriteria = {
    ...(forSale.__meta__.isFilterApplied ? { forSale } : { forSale: null }),
    ...(bedsFilter.__meta__.isFilterApplied ? { bedsFilter } : { bedsFilter: null }),
    ...(homeFilter.__meta__.isFilterApplied ? { homeFilter } : { homeFilter: null }),
    ...(price.__meta__.isFilterApplied ? { priceFilter: price } : { priceFilter: null }),
    ...(moreFilterState.__meta__.isFilterApplied ? { moreFilter: moreFilterState } : { moreFilter: null }),
  };

  return { searchCriteria };
}

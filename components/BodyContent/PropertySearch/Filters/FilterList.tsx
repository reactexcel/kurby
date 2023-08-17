import axios from "axios";
import { bedsBathsFilter, forSaleFilter, homeTypeFilter, moreFilter, priceFilter, propertySearch } from "context/propertySearchContext";
import { useRecoilState } from "recoil";
import styles from "./Filter.module.scss";
import { ForSaleFilter } from "./ForSaleFilter/ForSaleFilter";
import { PriceFilter } from "./PriceFilter/PriceFilter";
import { HomeTypeFilter } from "./HomeType/HomeType";
import { MoreFilter } from "./MoreFilter/MoreFilter";
import { BedBathsFilter } from "./BedsBathsFilter/BedsBathsFilter";
import { SearchButton } from "../SearchButton/SearchButton";
import { IPropertySearchResponse } from "pages/api/propertyV2";
import { filterState } from "context/filterContext";

export function PropertyFilter() {
  const [forSale] = useRecoilState(forSaleFilter);
  const [filterVal] = useRecoilState(filterState);
  const [bedsFilter] = useRecoilState(bedsBathsFilter);
  const [, setPropertyData] = useRecoilState(propertySearch);
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

  const handleSearch = async () => {
    setPropertyData({ results: true });
    const { data } = await axios.post<IPropertySearchResponse>("/api/propertyV2", {
      filters: { latitude: filterVal.mapCenter?.lat, longitude: filterVal.mapCenter?.lng, ...searchCriteria },
      userToken: localStorage.getItem("Outseta.nocode.accessToken"),
    });
    setPropertyData({ results: data.data });
  };

  // const searchObject = {
  //   forSale,
  //   price,
  //   homeType,
  //   moreFilterState,
  // };
  return (
    <div className={styles.propertyFilter}>
      <ForSaleFilter />
      <PriceFilter />
      <BedBathsFilter />
      <HomeTypeFilter />
      <MoreFilter />
      <SearchButton onSearch={handleSearch} />
    </div>
  );
}

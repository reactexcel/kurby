import axios from "axios";
import { propertySearch } from "context/propertySearchContext";
import { useRecoilState } from "recoil";
import styles from "./Filter.module.scss";
import { ForSaleFilter } from "./ForSaleFilter/ForSaleFilter";
import { PriceFilter } from "./PriceFilter/PriceFilter";
import { HomeTypeFilter } from "./HomeType/HomeType";
import { MoreFilter } from "./MoreFilter/MoreFilter";
import { BedBathsFilter } from "./BedsBathsFilter/BedsBathsFilter";
import { SearchButton } from "../SearchButton/SearchButton";
import { filterState } from "context/filterContext";
import { IPropertySearchResponse } from "pages/api/core/reapi/propertySearch";
import { useSearchCriteria } from "hooks/use-search-criteria";
import { useMediaQuery } from "react-responsive";

export function PropertyFilter() {
  const { searchCriteria } = useSearchCriteria();
  const [filterVal] = useRecoilState(filterState);
  const [, setPropertyData] = useRecoilState(propertySearch);

  const isMobile = useMediaQuery({ maxWidth: 600 });

  const handleSearch = async () => {
    setPropertyData((prev) => ({ ...prev, isLoading: true }));
    try {
      const {
        data: { data },
      } = await axios.post<IPropertySearchResponse>("/api/propertyV2", {
        filters: { latitude: filterVal.mapCenter?.lat, longitude: filterVal.mapCenter?.lng, ...searchCriteria },
        userToken: localStorage.getItem("Outseta.nocode.accessToken"),
      });

      if (searchCriteria.homeFilter?.multiFamily) {
        setPropertyData({ results: data, isLoading: false, isError: false, isClientSideRendered: false });
      } else if (searchCriteria.homeFilter?.duplex) {
        const duplexdata = data.filter((val) => val.unitsCount == 2 && val.propertyUseCode == 362);
        setPropertyData({ results: duplexdata, isLoading: false, isError: false, isClientSideRendered: false });
      } else if (searchCriteria.homeFilter?.triplex) {
        const triplexdata = data.filter((val) => val.unitsCount == 3 && val.propertyUseCode == 388);
        setPropertyData({ results: triplexdata, isLoading: false, isError: false, isClientSideRendered: false });
      } else if (searchCriteria.homeFilter?.quadplex) {
        const quadplexdata = data.filter((val) => val.unitsCount == 4 && val.propertyUseCode == 378);
        setPropertyData({ results: quadplexdata, isLoading: false, isError: false, isClientSideRendered: false });
      } else if (searchCriteria.homeFilter?.mfh_5plus) {
        const mfh_5plusdata = data.filter((val) => val.unitsCount >= 5);
        setPropertyData({ results: mfh_5plusdata, isLoading: false, isError: false, isClientSideRendered: false });
      } else {
        setPropertyData({ results: data, isLoading: false, isError: false, isClientSideRendered: false });
      }
    } catch (e) {
      setPropertyData({ results: null, isLoading: false, isError: true, isClientSideRendered: true });
    }
  };
  if (isMobile) {
    return <SearchButton onSearch={handleSearch} />;
  }
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

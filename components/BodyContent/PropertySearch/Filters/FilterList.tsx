import { useRecoilState } from "recoil";
import { FilterRadioOption, FilterItem } from "../FilterItem/FilterItem";
import styles from "./Filter.module.scss";
import { forSaleFilter } from "context/propertySearchContext";

export function PropertyFilter() {
  return (
    <div className={styles.propertyFilter}>
      <ForSaleFilter />
      <PriceFilter />
      <BedBathsFilter />
      <HomeTypeFilter />
      <MoreFilter />
    </div>
  );
}

const ForSaleContents = () => {
  const [search, setSearch] = useRecoilState(forSaleFilter);
  return (
    <div>
      <FilterRadioOption
        id={"for_sale"}
        onSelect={() =>
          setSearch({
            for_sale: !search.for_sale,
          })
        }
        isSelected={search.for_sale}
      >
        For Sale
      </FilterRadioOption>
    </div>
  );
};

function ForSaleFilter() {
  return <FilterItem title="For sale" renderContent={<ForSaleContents />} />;
}

function PriceFilter() {
  return <FilterItem title="Price" />;
}

function BedBathsFilter() {
  return <FilterItem title="Beds & Baths" />;
}

function HomeTypeFilter() {
  return <FilterItem title="Home Type" />;
}

function MoreFilter() {
  return <FilterItem title="More" />;
}

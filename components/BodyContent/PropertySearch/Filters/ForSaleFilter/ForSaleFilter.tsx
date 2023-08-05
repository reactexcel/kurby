import { useRecoilState } from "recoil";
import { FilterItem, FilterRadioOption } from "../../FilterItem/FilterItem";
import { forSaleFilter } from "context/propertySearchContext";

const ForSaleContents = () => {
  const [search, setSearch] = useRecoilState(forSaleFilter);
  const handleSelect = (key: string) => ({
    // eslint-disable-next-line camelcase
    for_sale: false,
    // eslint-disable-next-line camelcase
    off_market: false,
    sold: false,
    // @ts-ignore
    [key]: !search[key],
  });

  return (
    <div>
      <FilterRadioOption id={"for_sale"} onSelect={() => setSearch(handleSelect("for_sale"))} isSelected={search.for_sale}>
        For Sale
      </FilterRadioOption>

      <FilterRadioOption id={"off_market"} onSelect={() => setSearch(handleSelect("off_market"))} isSelected={search.off_market}>
        Off Market
      </FilterRadioOption>

      <FilterRadioOption id={"sold"} onSelect={() => setSearch(handleSelect("sold"))} isSelected={search.sold}>
        Sold
      </FilterRadioOption>
    </div>
  );
};

export function ForSaleFilter() {
  return <FilterItem renderContentPosition="left" flex={1} title="For sale" renderContent={ForSaleContents()} />;
}

import { useRecoilState } from "recoil";
import { FilterItem, FilterRadioOption } from "../../FilterItem/FilterItem";
import { forSaleFilter } from "context/propertySearchContext";
import { Button } from "components/Button/Button";
import styles from "./ForSaleFilter.module.scss";

const ForSaleContents = () => {
  const [search, setSearch] = useRecoilState(forSaleFilter);
  const prepareObject = (key: string) => ({
    // eslint-disable-next-line camelcase
    for_sale: false,
    // eslint-disable-next-line camelcase
    off_market: false,
    sold: false,
    // @ts-ignore
    [key]: !search[key],
  });

  const handleSelect = (key: string) => {
    setSearch((prevState) => {
      return { ...prevState, ...prepareObject(key) };
    });
  };

  const handleApply = () => {
    setSearch((prevState) => ({
      ...prevState,
      __meta__: {
        createdAt: new Date(),
        isFilterApplied: !prevState.__meta__.isFilterApplied,
      },
    }));
  };

  const isFilterApplied = search.__meta__.isFilterApplied;

  return (
    <div>
      <FilterRadioOption id={"for_sale"} onSelect={() => handleSelect("for_sale")} isSelected={search.for_sale}>
        For Sale
      </FilterRadioOption>

      <FilterRadioOption id={"off_market"} onSelect={() => handleSelect("off_market")} isSelected={search.off_market}>
        Off Market
      </FilterRadioOption>

      <FilterRadioOption id={"sold"} onSelect={() => handleSelect("sold")} isSelected={search.sold}>
        Sold
      </FilterRadioOption>
      {(search.for_sale || search.off_market || search.sold) && (
        <Button variant={isFilterApplied ? "outlined" : "filled"} onClick={handleApply} className={styles.buttonWrapper}>
          {isFilterApplied ? "Applied" : "Apply"}
        </Button>
      )}
    </div>
  );
};

export function ForSaleFilter() {
  return <FilterItem renderContentPosition="left" flex={1} title="For sale" renderContent={ForSaleContents()} />;
}

import { atom, useRecoilState } from "recoil";
import { FilterCheckboxOption, FilterItem, FilterRadioOption } from "../../FilterItem/FilterItem";
import { forSaleFilter } from "context/propertySearchContext";
import { Button } from "components/Button/Button";
import styles from "./ForSaleFilter.module.scss";

const forSaleSelector = {
  key: "forSaleSelector",
  default: {
    isOpen: false,
  },
};

export const forSalePopover = atom(forSaleSelector);

const ForSaleContents = () => {
  const [, setPopover] = useRecoilState(forSalePopover);
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
      return {
        ...prevState,
        __meta__: {
          createdAt: new Date(),
          isFilterApplied: false,
        },
        ...prepareObject(key),
      };
    });
  };

  const handleApply = () => {
    // Hide the popover on apply
    setPopover({
      isOpen: search.__meta__.isFilterApplied === true,
    });
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
    <div className={styles.main}>
      {/* Property Status  */}
      <div style={{ marginTop: 10 }}>
        <div>Property Status</div>
        <div className={styles.row}>
          <div className={styles.column}>
            <FilterCheckboxOption id="propertyStatusActive" onSelect={() => {}} isSelected={false}>
              Active
            </FilterCheckboxOption>
            <FilterCheckboxOption id="propertyStatusPending" onSelect={() => {}} isSelected={false}>
              Pending
            </FilterCheckboxOption>
            <FilterCheckboxOption id="propertyStatusCancelled" onSelect={() => {}} isSelected={false}>
              Cancelled
            </FilterCheckboxOption>
          </div>
          <div className={styles.column}>
            <FilterCheckboxOption id="propertyStatusFailed" onSelect={() => {}} isSelected={false}>
              Failed
            </FilterCheckboxOption>
          </div>
        </div>
      </div>
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
  const [search] = useRecoilState(forSaleFilter);
  const renderThumbText = () => {
    if (search.for_sale) {
      return "For sale";
    }
    if (search.off_market) {
      return "Off market";
    }

    if (search.sold) {
      return "Sold";
    }

    return "For sale";
  };
  return <FilterItem recoilOpenState={forSalePopover as any} renderContentPosition="left" flex={1} title={renderThumbText()} renderContent={ForSaleContents()} />;
}

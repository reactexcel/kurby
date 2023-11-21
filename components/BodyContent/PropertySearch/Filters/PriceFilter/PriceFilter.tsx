import { FilterCheckboxOption, FilterItem } from "../../FilterItem/FilterItem";
import styles from "./PriceFilter.module.scss";
import { Button } from "components/Button/Button";
import { atom, useRecoilState } from "recoil";
import { priceFilter } from "context/propertySearchContext";
import { Collapse, Fade } from "@mui/material";
import { toUSDField } from "components/BodyContent/Property/utils";

export enum IPriceFilterCurrentTab {
  LIST_PRICE_TAB,
  MONTHLY_PAYMENT_TAB,
}

export enum IPriceFilterDownPayment {
  NO_DOWN_PAYMENT = "no-down-payment",
  FIVE = 5,
  TEN = 10,
  FIFTHTEEN = 15,
  TWENTY = 20,
}

const priceFilterSelector = {
  key: "priceFilterSelector",
  default: {
    isOpen: false,
  },
};

export const priceFilterPopover = atom(priceFilterSelector);

const PriceFilterContents = () => {
  const [, setPopover] = useRecoilState(priceFilterPopover);
  const [priceFilterState, setPriceFilter] = useRecoilState(priceFilter);
  // const currentTab = priceFilterState.tab;

  // const setCurrentTab = (tab: IPriceFilterCurrentTab) => {
  //   setPriceFilter({
  //     ...priceFilterState,
  //     tab,
  //   });
  // };

  type InputKeyTypes = "min" | "max";
  const handleInputChange = (value: string, key: InputKeyTypes) => {
    const numericValue = parseFloat(value);
    const keyToUse = key === "min" ? "value_min" : "value_max";

    setPriceFilter({
      ...priceFilterState,
      __meta__: {
        createdAt: new Date(),
        isFilterApplied: false,
      },
      [keyToUse]: isNaN(numericValue) ? 0 : numericValue,
    });
  };

  const handleSortChange = (value: string) => {
    setPriceFilter({
      ...priceFilterState,
      priceSort: value,
    });
  };

  // const setDownPayment = (selectOption: IPriceFilterDownPayment) => {
  //   setPriceFilter({
  //     ...priceFilterState,
  //     downPayment: selectOption,
  //   });
  // };

  // const activeTabStyle = {
  //   color: "white",
  //   background: "#00A13C",
  // };

  // const inactiveTab = {
  //   background: "#F1F4F6",
  //   color: "black",
  // };

  const handleApply = () => {
    // Hide the popover on apply
    setPopover({
      isOpen: priceFilterState.__meta__.isFilterApplied === true,
    });
    setPriceFilter((prevState) => ({
      ...prevState,
      __meta__: {
        isFilterApplied: !prevState.__meta__.isFilterApplied,
        createdAt: new Date(),
      },
    }));
  };

  const isFilterApplied = priceFilterState.__meta__.isFilterApplied;

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div className={styles.priceSelector}>
          <div className={styles.min}>
            <small className={styles.priceSelectorText}>Minimum</small>
            <input
              value={priceFilterState.value_min && priceFilterState.value_min !== 0 ? priceFilterState.value_min.toString() : ""}
              onChange={(event) => handleInputChange(event.target.value, "min")}
              placeholder="Eg. $200,000"
              className={styles.input}
            />
          </div>
          <small className={styles.priceSelectorTo}>to</small>
          <div className={styles.max}>
            <small className={styles.priceSelectorText}>Maximum</small>
            <input
              value={priceFilterState.value_max && priceFilterState.value_max !== 0 ? priceFilterState.value_max.toString() : ""}
              onChange={(event) => handleInputChange(event.target.value, "max")}
              placeholder="Eg. $450,000"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.priceSorts}>
          <div className={styles.sortTitle}>Sort by Price:</div>
          <div className={styles.sortOptions}>
            <FilterCheckboxOption id={"lowToHeigh"} onSelect={() => handleSortChange("lowToHigh")} isSelected={priceFilterState.priceSort === "lowToHigh"}>
              Low to High
            </FilterCheckboxOption>
            <FilterCheckboxOption id={"lowToHeigh"} onSelect={() => handleSortChange("highToLow")} isSelected={priceFilterState.priceSort === "highToLow"}>
              High to Low
            </FilterCheckboxOption>
          </div>
        </div>

        <div className={styles.buttonParentLayout}>
          <Collapse timeout={200} in={Boolean(priceFilterState.value_min || priceFilterState.value_max)}>
            <Button variant={isFilterApplied ? "outlined" : "filled"} onClick={handleApply} className={styles.buttonWrapper}>
              {isFilterApplied ? "Applied" : "Apply"}
            </Button>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export function PriceFilter() {
  const [priceFilterState] = useRecoilState(priceFilter);

  const renderThumb = () => {
    if (!priceFilterState.__meta__.isFilterApplied) {
      return "Price";
    }

    if (priceFilterState.value_min && !priceFilterState.value_max) {
      return `${toUSDField(priceFilterState.value_min)}`;
    }

    if (!priceFilterState.value_min && priceFilterState.value_max) {
      return `${toUSDField(priceFilterState.value_max)}`;
    }

    if (priceFilterState.value_min && priceFilterState.value_max) {
      return `${toUSDField(priceFilterState.value_min)} to ${toUSDField(priceFilterState.value_max)}`;
    }

    return "Price";
  };
  return (
    <FilterItem
      recoilOpenState={priceFilterPopover as any}
      renderContentPosition="left"
      flex={1}
      title={renderThumb()}
      renderContentWidth="700px"
      renderContent={<PriceFilterContents />}
    />
  );
}

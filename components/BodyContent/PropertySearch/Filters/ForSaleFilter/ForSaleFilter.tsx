import { atom, useRecoilState } from "recoil";
import { FilterCheckboxOption, FilterItem } from "../../FilterItem/FilterItem";
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

  const { __meta__, ...fields } = search;

  return (
    <div className={styles.main}>
      <FilterCheckboxOption id={"forSaleByAgent"} onSelect={() => handleSelect("forSaleByAgent")} isSelected={search.forSaleByAgent}>
        For Sale by agent
      </FilterCheckboxOption>
      <FilterCheckboxOption id={"forSaleByOwner"} onSelect={() => handleSelect("forSaleByOwner")} isSelected={search.forSaleByOwner}>
        For Sale by owner
      </FilterCheckboxOption>

      <FilterCheckboxOption id={"offMarket"} onSelect={() => handleSelect("offMarket")} isSelected={search.offMarket}>
        Off Market
      </FilterCheckboxOption>

      <FilterCheckboxOption id={"sold"} onSelect={() => handleSelect("sold")} isSelected={search.sold}>
        Sold
      </FilterCheckboxOption>
      <FilterCheckboxOption id="propertyStatusPending" onSelect={() => handleSelect("propertyStatusPending")} isSelected={search.propertyStatusPending}>
        Pending
      </FilterCheckboxOption>
      <FilterCheckboxOption id="propertyStatusCancelled" onSelect={() => handleSelect("propertyStatusCancelled")} isSelected={search.propertyStatusCancelled}>
        Cancelled
      </FilterCheckboxOption>
      {/* <FilterCheckboxOption id="propertyStatusFailed" onSelect={() => handleSelect("propertyStatusFailed")} isSelected={search.propertyStatusFailed}>
        Failed
      </FilterCheckboxOption> */}
      {Object.values(search).some((field) => field === true) && (
        <Button variant={isFilterApplied ? "outlined" : "filled"} onClick={handleApply} className={styles.buttonWrapper}>
          {isFilterApplied ? "Applied" : "Apply"}
        </Button>
      )}
    </div>
  );
};

export function ForSaleFilter() {
  const [search] = useRecoilState(forSaleFilter);
  const defaultValue = "Status";
  const renderThumbText = () => {
    const { __meta__, ...fields } = search;
    const fieldsActiveValue = Object.values(fields).filter((field) => Boolean(field));
    const fieldsActive = fieldsActiveValue.length;

    const isMoreThanOne = fieldsActive > 1;

    if (fieldsActive === 0) {
      return defaultValue;
    }

    if (search.forSaleByAgent) {
      if (isMoreThanOne) {
        return `For sale by agent +${fieldsActive - 1}`;
      }
      return "For sale by agent";
    }
    if (search.forSaleByOwner) {
      if (isMoreThanOne) {
        return `For sale by owner +${fieldsActive - 1}`;
      }
      return "For sale by owner";
    }

    if (search.offMarket) {
      if (isMoreThanOne) {
        return `Off market + ${fieldsActive - 1} more`;
      }
      return "Off market";
    }

    if (search.sold) {
      if (isMoreThanOne) {
        return `Sold + ${fieldsActive - 1} more`;
      }
      return "Sold";
    }

    if (search.propertyStatusPending) {
      if (isMoreThanOne) {
        return `Pending + ${fieldsActive - 1} more`;
      }
      return "Pending";
    }

    if (search.propertyStatusCancelled) {
      if (isMoreThanOne) {
        return `Cancelled + ${fieldsActive - 1} more`;
      }
      return "Cancelled";
    }

    // if (search.propertyStatusFailed) {
    //   if (isMoreThanOne) {
    //     return `Failed + ${fieldsActive - 1} more`;
    //   }
    //   return "Failed";
    // }

    return defaultValue;
  };
  return <FilterItem recoilOpenState={forSalePopover as any} renderContentPosition="left" flex={1} title={renderThumbText()} renderContent={ForSaleContents()} />;
}

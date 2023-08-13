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
      <FilterCheckboxOption id={"for_sale_by_agent"} onSelect={() => handleSelect("for_sale_by_agent")} isSelected={search.for_sale_by_agent}>
        For Sale by agent
      </FilterCheckboxOption>
      <FilterCheckboxOption id={"for_sale_by_owner"} onSelect={() => handleSelect("for_sale_by_owner")} isSelected={search.for_sale_by_owner}>
        For Sale by owner
      </FilterCheckboxOption>

      <FilterCheckboxOption id={"off_market"} onSelect={() => handleSelect("off_market")} isSelected={search.off_market}>
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
      <FilterCheckboxOption id="propertyStatusFailed" onSelect={() => handleSelect("propertyStatusFailed")} isSelected={search.propertyStatusFailed}>
        Failed
      </FilterCheckboxOption>
      {Object.values(fields).filter((field) => field === true).length > 0 && (
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

    if (search.for_sale_by_agent || search.for_sale_by_owner) {
      if (isMoreThanOne) {
        return `For sale + ${fieldsActive} more`;
      }
      return "For sale";
    }

    if (search.off_market) {
      if (isMoreThanOne) {
        return `Off market + ${fieldsActive} more`;
      }
      return "Off market";
    }

    if (search.sold) {
      if (isMoreThanOne) {
        return `Sold + ${fieldsActive} more`;
      }
      return "Sold";
    }

    if (search.propertyStatusPending) {
      if (isMoreThanOne) {
        return `Pending + ${fieldsActive} more`;
      }
      return "Pending";
    }

    if (search.propertyStatusCancelled) {
      if (isMoreThanOne) {
        return `Cancelled + ${fieldsActive} more`;
      }
      return "Cancelled";
    }

    if (search.propertyStatusFailed) {
      if (isMoreThanOne) {
        return `Failed + ${fieldsActive} more`;
      }
      return "Failed";
    }

    return defaultValue;
  };
  return <FilterItem recoilOpenState={forSalePopover as any} renderContentPosition="left" flex={1} title={renderThumbText()} renderContent={ForSaleContents()} />;
}

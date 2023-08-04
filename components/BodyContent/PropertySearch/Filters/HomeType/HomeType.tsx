import React from "react";
import { FilterCheckboxOption, FilterItem, FilterRadioOption } from "../../FilterItem/FilterItem";
import { useRecoilState } from "recoil";
import { homeTypeFilter } from "context/propertySearchContext";

const HomeTypeContents = () => {
  const [filter, setFilter] = useRecoilState(homeTypeFilter);

  const handleSelect = (id: string) => {
    setFilter({
      ...filter,
      // @ts-ignore
      [id]: !filter[id],
      all: false,
    });
  };

  const handleSelectAll = () => {
    setFilter({
      all: true,
      houses: false,
      townHouse: false,
      multiFamily: false,
      condosCoOps: false,
      lotsLands: false,
      apartment: false,
      manufactured: false,
    });
  };

  return (
    <div>
      <FilterRadioOption id={"sold"} onSelect={() => handleSelectAll()} isSelected={filter.all}>
        All
      </FilterRadioOption>
      <FilterCheckboxOption id={"for_sale"} onSelect={() => handleSelect("houses")} isSelected={filter.houses}>
        Houses
      </FilterCheckboxOption>

      <FilterCheckboxOption id={"off_market"} onSelect={() => handleSelect("townHouse")} isSelected={filter.townHouse}>
        Town House
      </FilterCheckboxOption>

      <FilterCheckboxOption id={"sold"} onSelect={() => handleSelect("multiFamily")} isSelected={filter.multiFamily}>
        Multi family
      </FilterCheckboxOption>

      <FilterCheckboxOption id={"sold"} onSelect={() => handleSelect("condosCoOps")} isSelected={filter.condosCoOps}>
        Condos/co-ops
      </FilterCheckboxOption>
      <FilterCheckboxOption id={"sold"} onSelect={() => handleSelect("lotsLands")} isSelected={filter.lotsLands}>
        Lots/land
      </FilterCheckboxOption>
      <FilterCheckboxOption id={"sold"} onSelect={() => handleSelect("apartment")} isSelected={filter.apartment}>
        Apartment
      </FilterCheckboxOption>
      <FilterCheckboxOption id={"sold"} onSelect={() => handleSelect("manufactured")} isSelected={filter.manufactured}>
        Manufactured
      </FilterCheckboxOption>
    </div>
  );
};

export function HomeTypeFilter() {
  return <FilterItem flex={1} title="Home Type" renderContent={<HomeTypeContents />} />;
}

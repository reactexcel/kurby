import styles from "./FilterItem.module.scss";
import ArrowDown from "../../../../public/icons/arrow-down.svg";
import { useState } from "react";
import Selected from "../../../../public/icons/button-selected.svg";
import UnSelected from "../../../../public/icons/button-unselected.svg";
import Checkmark from "../../../../public/icons/checkmark.svg";
import CheckmarkUnchecked from "../../../../public/icons/checkmark-unchecked.svg";

interface IFilterItemProps {
  readonly title: string;
  readonly renderContentWidth?: string;
  readonly renderContent?: React.ReactNode;
  readonly renderContentPosition: "left" | "right";
  readonly flex: number;
}

export function FilterItem({ title, renderContent, renderContentWidth, renderContentPosition, flex }: IFilterItemProps) {
  const [isOpen, setOpen] = useState<boolean>(false);

  const renderStyle = {
    ...(flex && { flex }),
  };

  const renderContentCore = {
    ...(renderContentWidth && { width: renderContentWidth }),
    ...(renderContentPosition && { [renderContentPosition]: 0 }),
  };
  return (
    <div style={renderStyle} className={styles.root}>
      <div
        onClick={() => {
          setOpen(!isOpen);
        }}
        className={styles.filterItem}
      >
        {title}
        <div className={styles.arrowContent} style={isOpen ? { rotate: "180deg", marginTop: -10 } : {}}>
          <ArrowDown />
        </div>
      </div>
      {isOpen && renderContent ? (
        <div style={renderContentCore} className={styles.content}>
          {renderContent}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
export function FilterRadioOption({ id, onSelect, isSelected, children }: { id: string; onSelect: (id: string) => void; isSelected: boolean; children: React.ReactNode }) {
  return (
    <FilterOption id={id} onSelect={onSelect} isSelected={isSelected} selectedIcon={<Selected />} unselectedIcon={<UnSelected />}>
      {children}
    </FilterOption>
  );
}

export function FilterOption({
  id,
  onSelect,
  isSelected,
  children,
  selectedIcon,
  unselectedIcon,
}: {
  id: string;
  onSelect: (id: string) => void;
  isSelected: boolean;
  children: React.ReactNode;
  selectedIcon: React.ReactNode;
  unselectedIcon: React.ReactNode;
}) {
  return (
    <div onClick={() => onSelect(id)} className={styles.filterOptionContent}>
      <div className={styles.filterOptionSelect}>{isSelected ? selectedIcon : unselectedIcon}</div>
      {children}
    </div>
  );
}

export function FilterCheckboxOption({
  id,
  onSelect,
  isSelected,
  children,
}: {
  id: string;
  onSelect: (id: string) => void;
  isSelected: boolean | null;
  children: React.ReactNode;
}) {
  return (
    <FilterOption id={id} onSelect={onSelect} isSelected={Boolean(isSelected)} selectedIcon={<Checkmark />} unselectedIcon={<CheckmarkUnchecked />}>
      {children}
    </FilterOption>
  );
}

// eslint-disable-next-line no-unused-vars
export function FilterItems({ id, onSelect, isSelected, children }: { id: string; onSelect: (id: string) => void; isSelected: boolean; children: React.ReactNode }) {
  return (
    <div onClick={() => onSelect(id)} className={styles.filterOptionContent}>
      <div className={styles.filterOptionSelect}>{isSelected ? <Selected /> : <UnSelected />}</div>
      {children}
    </div>
  );
}

import styles from "./FilterItem.module.scss";
import ArrowDown from "../../../../public/icons/arrow-down.svg";
import { useState } from "react";
import Selected from "../../../../public/icons/button-selected.svg";
import UnSelected from "../../../../public/icons/button-unselected.svg";
interface IFilterItemProps {
  readonly title: string;
  readonly renderContent?: React.ReactNode;
}

export function FilterItem({ title, renderContent }: IFilterItemProps) {
  const [isOpen, setOpen] = useState<boolean>(false);
  return (
    <div className={styles.root}>
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
      {isOpen && renderContent ? <div className={styles.content}>{renderContent}</div> : <></>}
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
export function FilterRadioOption({ id, onSelect, isSelected, children }: { id: string; onSelect: (id: string) => void; isSelected: boolean; children: React.ReactNode }) {
  return (
    <div onClick={() => onSelect(id)} className={styles.filterOptionContent}>
      <div className={styles.filterOptionSelect}>{isSelected ? <Selected /> : <UnSelected />}</div>
      {children}
    </div>
  );
}

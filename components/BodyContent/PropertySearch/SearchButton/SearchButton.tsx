import SearchIcon from "@mui/icons-material/Search";
import styles from "./SearchButton.module.scss";

interface ISearchButtonProps {
  onSearch: () => void;
}

export function SearchButton({ onSearch }: ISearchButtonProps) {
  return (
    <div onClick={onSearch} className={styles.searchButton}>
      <SearchIcon />
    </div>
  );
}

import { Box } from "@mui/material";
import styles from "./PropertySearchPage.module.scss";
import SearchLoupe from "../../public/icons/loupe.svg";
import { Button } from "components/Button/Button";

export const PropertySearch = () => {
  return (
    <Box className={styles.main}>
      <h2 className={styles.title}>
        Discover <span className={styles.green}>Properties</span>
      </h2>
      <p className={styles.description}>Conversational AI Search Engine for the Real Estate Industry</p>
      <SearchBox />
      <Button className={styles.submitButton}>Submit</Button>
      <SuggestionsSection />
    </Box>
  );
};

function SearchBox() {
  return (
    <div className={styles.searchBoxMain}>
      <input className={styles.searchBoxStyle} placeholder="Can I help you with your property search?" />
      <div className={styles.searchBox}>
        <SearchLoupe />
      </div>
    </div>
  );
}

function SuggestionsSection() {
  const suggestions = [
    "Find absentee owner properties in Fairfax Virginia that are high equity and built after 1980.",
    "Find investor buyer properties purchased before 2015 that are high equity with out of state owners in Boston Massachusetts.",
    "Find vacant properties with high equity and out of state owners in Cleveland Ohio.",
  ];
  return (
    <div className={styles.suggestionsSection}>
      {suggestions.map((value, index) => {
        return <GPTSuggestion key={index}>{value}</GPTSuggestion>;
      })}
    </div>
  );
}

function GPTSuggestion({ children }: { children: React.ReactNode }) {
  return <div className={styles.searchSuggestion}>{children}</div>;
}

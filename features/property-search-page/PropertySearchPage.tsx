import { Box } from "@mui/material";
import styles from "./PropertySearchPage.module.scss";
import SearchLoupe from "../../public/icons/loupe.svg";
import { Button } from "components/Button/Button";
import { useRecoilState } from "recoil";
import { propertySearch } from "context/propertySearchPage";
import axios from "axios";
import { Sparkles } from "./Sparkles";
import Typewriter from "typewriter-effect";
import { useEffect, useState } from "react";

export const PropertySearch = () => {
  return (
    <Box className={styles.main}>
      <Sparkles />
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
  // const router = useRouter();
  const [payload, setPayload] = useRecoilState(propertySearch);

  const handleInputChange = (event: any) => {
    setPayload({ searchPayload: event.target.value });
  };

  const fetchGPTPropertyData = async (query: string) => {
    const url = new URL(`https://www.propgpt.com/query/?query=${query}`);
    const response = await axios.get(url.toString());
    return response;
  };

  const handleSearch = async () => {
    try {
      const result = await fetchGPTPropertyData(payload.searchPayload);

      // router.push("/app/");
    } catch (error) {
      console.error("Failed to fetch property data:", error);
    }
  };
  return (
    <div className={styles.searchBoxMain}>
      <input value={payload.searchPayload} onChange={handleInputChange} className={styles.searchBoxStyle} placeholder="Can I help you with your property search?" />
      <div onClick={handleSearch} className={styles.searchBox}>
        <SearchLoupe />
      </div>
    </div>
  );
}

function SuggestionsSection() {
  const [, setPayload] = useRecoilState(propertySearch);
  const allSuggestions = [
    "Find absentee owner properties in Fairfax Virginia that are high equity and built after 1980.",
    "Find investor buyer properties purchased before 2015 that are high equity with out of state owners in Boston Massachusetts.",
    "Find vacant properties with high equity and out of state owners in Cleveland Ohio.",
  ];

  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setSuggestions((prevSuggestions) => [...prevSuggestions, allSuggestions[index]]);
      index += 1;
      if (index >= allSuggestions.length) {
        clearInterval(interval);
      }
    }, 5000);
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    setPayload({
      searchPayload: suggestion,
    });
  };

  return (
    <div className={styles.suggestionsSection}>
      {suggestions.map((value, index) => {
        return <GPTSuggestion onClick={() => handleSuggestionClick(value)} key={index} value={value} />;
      })}
    </div>
  );
}

function GPTSuggestion({ value, onClick }: { value: string; onClick: () => void }) {
  return (
    <div onClick={onClick} className={styles.searchSuggestion}>
      <Typewriter
        options={{ delay: 50 }} // reduce delay for faster typing
        onInit={(typewriter) => {
          typewriter.typeString(value).changeDelay("natural").start();
        }}
      />
    </div>
  );
}

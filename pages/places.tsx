import Filters from "../components/Filters/Filters";
import Navbar from "../components/Navbar/Navbar";
import BodyContent from "../components/BodyContent/BodyContent";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { Box } from "@mui/material";
import Script from "next/script";
import {
  RecoilRoot,
} from "recoil";
import GLOBAL_SETTINGS from "../globals/GLOBAL_SETTINGS";

/**
 * Places
 * @description: Places
 */
export default function Places() {
  return (
    <>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <Navbar />
          <Box style={{ padding: "32px" }}>
            <Filters />
            <BodyContent />
          </Box>
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}

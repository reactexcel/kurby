import Filters from "../components/Filters/Filters";
import Navbar from "../components/Navbar/Navbar";
import BodyContent from "../components/BodyContent/BodyContent";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { Box } from "@mui/material";
import Script from "next/script";
import {
  RecoilRoot,
  RecoilEnv
} from "recoil";
import GLOBAL_SETTINGS from "../globals/GLOBAL_SETTINGS";
import { RecoilURLSyncJSONNext } from 'recoil-sync-next'
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false
/**
 * Places
 * @description: Places
 */
export default function Places() {
  return (
    <>
      <RecoilRoot>
        <RecoilURLSyncJSONNext
          storeKey="url-json-store"
          location={{ part: 'queryParams' }}
        >
        <ThemeProvider theme={theme}>
          <Navbar />
          <Box style={{ padding: "32px" }}>
            <Filters />
            <BodyContent />
          </Box>
        </ThemeProvider>
        </RecoilURLSyncJSONNext>
      </RecoilRoot>
    </>
  );
}

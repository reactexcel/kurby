import { Box } from "@mui/system";
import { useRecoilState } from "recoil";
import {filterState} from "../../../context/filterContext";
import MessageBar, { MessageType } from "../../../services/MessageBar";
import Walkscore from "./Walkscore";



export default function WalkscoreList() {
  const [filterVal] = useRecoilState(filterState);
  if (!filterVal.walkscore) {
    return null
  }

  return (
    <>
      <Box style={{ display: "flex" }}>
        {
          Object.keys(filterVal.walkscore).map((type: string) => {
            if (!filterVal.walkscore || !(filterVal.walkscore as any)[type]) { return }
            return <Walkscore key={type} type={type} score={(filterVal as any).walkscore[type]} error={filterVal.walkscore.error} />;
          })}
      </Box>
    </>
  );
}
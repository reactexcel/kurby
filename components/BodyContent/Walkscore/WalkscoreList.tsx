import { Box } from "@mui/system";
import { useRecoilState } from "recoil";
import filterContext from "../../../context/filterContext";

import Walkscore from "./Walkscore";



export default function WalkscoreList() {
  const [filterVal] = useRecoilState(filterContext);
  if (!filterVal.walkscore) {
    return null
  }
  return (
    <>
      <Box style={{ display: "flex" }}>
        {
          Object.keys(filterVal.walkscore).map((type: any) => {
            if (!filterVal.walkscore) { return }
            return <Walkscore key={type} type={type} score={(filterVal as any).walkscore[type]} />;
          })}
      </Box>
    </>
  );
}
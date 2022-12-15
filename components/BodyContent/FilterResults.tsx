import { Box, Skeleton, Typography } from "@mui/material";
import styles from "./BodyContent.module.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import filterContext from "../../context/filterContext";
import StreetView from "./StreetView";
import Nearby from "./Nearby/Nearby";
/**
 * FilterResults
 * @description: Displays right side of the home page. Will show home information and nearby places
 */

export default function FilterResults() {
  const [isHomeTab, setIsHomeTab] = useState(true);
  const [explainedLikeAlocal, setExplainedLikeAlocal] = useState("");
  const [greenFlags, setGreenFlags] = useState<any[]>([]);
  const [redFlags, setRedFlags] = useState<any[]>([]);
  const [loading, isLoading] = useState(false);

  //TODO should this be sent in via PROPs????
  const [filterVal] = useRecoilState(filterContext);

  const handleTabChange = () => setIsHomeTab(!isHomeTab);

  useEffect(() => {
    const getOpenAiData = async () => {
      if (!filterVal.address) return;

      isLoading(true);

      //* the entire selected place is sent in so we can validate the address
      const request = await fetch(`/api/openai/`, {
        method:"POST",
        body: JSON.stringify(filterVal.selectedPlace),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const response = await request.json();

      setExplainedLikeAlocal(response.explained_like_a_local);
      console.log("res", response);
      setGreenFlags(response.greenFlags);
      setRedFlags(response.redFlags);
      isLoading(false);
    };

    getOpenAiData();
  }, [filterVal.address]);

  const Flags = ({color, flagsArr}: {color:string, flagsArr: any[]}) => {
    const Title = ()=> (
    <Box style={{marginTop:"10px"}}>
      <Typography variant="subtitle2">{color} Flags</Typography>
    </Box>
  )
    
    if(loading) return (
    <>
      <Title />
      <ParagraphSkeleton />
    </>
    )
    
    return (
      <>
        <Title />
        <Box className={styles.box}>
            <ul>
              {flagsArr.length &&
                flagsArr.map((flagContent: string, index: number) => {
                  return <li key={index}>{flagContent}</li>;
                })}
            </ul>
          
        </Box>
      </>
    );
  };

  const ParagraphSkeleton = () => {
    return (
      <>
        <Skeleton
          variant="rectangular"
          height={10}
          style={{ marginBottom: 6 }}
        />
        <Skeleton
          variant="rectangular"
          height={10}
          style={{ marginBottom: 6 }}
        />
        <Skeleton variant="rectangular" height={10} />
      </>
    );
  };

  //TODO add to style sheet
  const resultsContentStyle = {
    padding: "20px",
    border: "1px solid rgba(38,75,92,.2)",
    boxShadow: "0 4px 4px #00000040",
    borderRadius: "14px",
    marginTop: "25px",
    display: "flex",
  };
  return (
    <Box style={{ width: "100%", marginLeft: "12.5px" }}>
      <ToggleButtonGroup
        color="primary"
        value={isHomeTab ? "home" : "nearby"}
        exclusive
        onChange={handleTabChange}
        aria-label="Platform"
      >
        <ToggleButton style={{ width: "220px" }} value="home">
          Home
        </ToggleButton>
        <ToggleButton style={{ width: "220px" }} value="nearby">
          Nearby Places
        </ToggleButton>
      </ToggleButtonGroup>

      {filterVal.address && (
        <Box>
          {isHomeTab ? (
            <>
              <Box style={resultsContentStyle}>
                <Box>
                  <Box style={{ display: "flex" }}>
                    <StreetView />
                    <Box>
                      <Typography variant="h5" component="h5">
                        {filterVal.address}
                      </Typography>
                      <Typography
                        style={{ marginTop: "10px" }}
                        variant="subtitle2"
                      >
                        Explain it like a local:
                      </Typography>
                      {loading ? (
                        <ParagraphSkeleton />
                        ) : (
                        <Typography>{explainedLikeAlocal}</Typography>
                      )}
                    </Box>
                  </Box>
                  <Box style={{ marginTop: "24px" }}>
                    <Flags
                     color="Green"
                     flagsArr={greenFlags}
                    />

                    <Flags
                     color="Red"
                     flagsArr={redFlags}
                    />
                    
                  </Box>
                </Box>
              </Box>
            </>
          ) : (
            <Nearby />
          )}
        </Box>
      )}
    </Box>
  );
}

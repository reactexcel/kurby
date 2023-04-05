import * as React from "react";
import { useState, useEffect } from "react";
import AppBar, { AppBarProps } from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Slide } from "@mui/material";
import { styled } from "@mui/material/styles";
import TopToolbar from "./TopToolbar";

const CustomTopBar = styled(AppBar)<AppBarProps>(() => ({
  backgroundColor: "white",
  minheight: "90px",
  height: "90px",
  maxHeight: "90px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
}));

export default function Topbar(props: any) {
  const [trigger, setTrigger] = useState(false);

  const scrollTrigger = useScrollTrigger({
    threshold: 150,
  });

  const { children } = props;

  useEffect(() => {
    setTrigger(scrollTrigger);
  }, [scrollTrigger]);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <CssBaseline />
      <Slide in={trigger}>
        <CustomTopBar>
          <TopToolbar />
        </CustomTopBar>
      </Slide>
      {children}
    </div>
  );
}

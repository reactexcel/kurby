import * as React from "react";
import { useState, useEffect } from "react";
import AppBar, { AppBarProps } from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Slide, Button, ButtonProps, Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import TopToolbar from './TopToolbar';

const CustomTopBar = styled(AppBar)<AppBarProps>(() => ({
  backgroundColor: "white",
  minheight: "90px",
  height: "90px",
  maxHeight: "90px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: '100%'
}));

const CustomButton = styled(Button)<ButtonProps>(() => ({
  color: "#79889e",
  // fontFamily: '"FilsonProRegular" !important',
  fontSize: "14px",
  padding: "0.439rem 1rem",
  fontWeight: "400",
  "&:hover": {
    backgroundColor: "white",
    color: "black",
  },
}));

export default function Topbar(props: any) {
  const [trigger, setTrigger] = useState(false);

  const scrollTrigger = useScrollTrigger({
    threshold: 150,
  });

  const { children } = props;
  const router = useRouter();

  useEffect(() => {
    setTrigger(scrollTrigger);
  }, [scrollTrigger]);

  return (
    <div style={{
      width: '100%'
    }}>
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

import { useState, useEffect, useMemo } from "react";
import AppBar, { AppBarProps } from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Slide } from "@mui/material";
import { styled } from "@mui/material/styles";
import TopToolbar from "./TopToolbar/TopToolbar";
import styles from "./Topbar.module.scss";
import { useRouter } from "next/router";
import Navbar from "components/Navbar/Navbar";

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
  const router = useRouter();

  const scrollTrigger = useScrollTrigger({
    threshold: 150,
  });

  const isHomepage = useMemo(() => router.pathname === "/", [router.pathname]);

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
      <Slide in={trigger} className={styles.slide}>
        <CustomTopBar>{isHomepage ? <TopToolbar /> : <Navbar />}</CustomTopBar>
      </Slide>
      {children}
    </div>
  );
}

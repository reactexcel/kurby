import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import { Button, ButtonProps, Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import SearchIcon from "@mui/icons-material/Search";
import DragHandleIcon from "@mui/icons-material/DragHandle";

const CustomButton = styled(Button)<ButtonProps>(() => ({
  color: "#79889e",
  // fontFamily: '"FilsonProRegular" !important',
  fontSize: "14px",
  padding: "0.439rem 1rem",
  fontWeight: "400",
  textTransform: "none",
  background: 'none !important',
  "&:hover": {
    backgroundColor: "none !important",
    color: "black",
  },
}));

const TopToolbar = () => {
  const router = useRouter();
 
  const imageStyle = {
    background:
      "linear-gradient(to top, #7ed9a1 0%, #00a13c 51%, #7ed9a1 100%)",
    color: "white",
    borderRadius: "50%",
    padding: "5px",
    width: "35px",
    height: "35px",
    transition: "all 0.2s ease-in-out",
    backgroundSize: "auto 200%",
    "&:hover": {
      backgroundPosition: "bottom center !important",
    },
  };
  return (
    <Toolbar>
      <img
        src="https://kurby.ai/wp-content/uploads/2022/10/kurby_main_logo.png"
        style={{
          cursor: "pointer",
          width: "120px",
        }}
        onClick={() => router.push("/")}
      />
      <Box
        sx={{
          marginLeft: "50px",
          width: "45vw",
        }}
      >
        <CustomButton>App</CustomButton>
        <CustomButton>Blog</CustomButton>
      </Box>
      <Box>
        <IconButton
          style={{
            padding: "0",
            marginRight: "15px",
            boxShadow: '0px 2px 4px 0px rgb(0 0 0 / 15%)'
          }}
        >
          <SearchIcon sx={imageStyle} />
        </IconButton>

        <IconButton
          style={{
            padding: "0",
            boxShadow: '0px 2px 4px 0px rgb(0 0 0 / 15%)'
          }}
        >
          <DragHandleIcon sx={imageStyle} />
        </IconButton>
      </Box>
    </Toolbar>
  );
};

export default TopToolbar;

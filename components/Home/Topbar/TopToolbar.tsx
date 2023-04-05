import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import { Button, ButtonProps, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import darkLogo from "../../../public/images/logo-dark.png";
import Image from "next/image";

const CustomButton = styled(Button)<ButtonProps>(() => ({
  display: "inline-block",
  color: "#79889e",
  fontSize: "14px",
  padding: "0.439rem 1rem",
  fontWeight: "400",
  textTransform: "none",
  background: "none !important",
  "&:hover": {
    backgroundColor: "none !important",
    color: "black",
  },
}));

const ButtonLogin = styled(Button)<ButtonProps>(() => ({
  backgroundColor: "#21C25E",
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: "#21C25E",
  borderRadius: "10px",
  color: "white",
  padding: "5px 20px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "white",
    color: "#21C25E",
  },
}));

const TopToolbar = () => {
  const router = useRouter();

  return (
    <Toolbar
      style={{
        backgroundColor: "white",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        padding: "0rem 5rem",
      }}
    >
      <Box
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          src={darkLogo}
          alt="logo"
          style={{
            cursor: "pointer",
            width: "100px",
            height: "30px",
          }}
          onClick={() => router.push("/")}
        />
        <Box
          sx={{
            marginLeft: "1rem",
          }}
        >
          <CustomButton>About Us</CustomButton>
        </Box>
      </Box>
      <Box>
        <Box
          style={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <CustomButton>Blog</CustomButton>
          <ButtonLogin>Login / Register</ButtonLogin>
        </Box>
      </Box>
    </Toolbar>
  );
};

export default TopToolbar;

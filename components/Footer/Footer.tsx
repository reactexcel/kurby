import { Divider, Button, IconButton } from "@mui/material";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { styled } from "@mui/material/styles";
import { FaTiktok, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";

const CustomLinkedIn = styled(FaLinkedin)(() => ({
  color: "#203656",
  fontSize: "18px",
  cursor: 'pointer',
  margin: "0px 5px",
  "&:hover": {
    color: "#01A13B",
  },
}));

const CustomTwitter = styled(FaTwitter)(() => ({
  color: "#203656",
  fontSize: "18px",
  cursor: 'pointer',
  margin: "0px 5px",
  "&:hover": {
    color: "#01A13B",
  },
}));

const CustomTikTok = styled(FaTiktok)(() => ({
  color: "#203656",
  fontSize: "18px",
  cursor: 'pointer',  
  margin: "0px 5px",
  "&:hover": {
    color: "#01A13B",
  },
}));

const CustomYouTube = styled(FaYoutube)(() => ({
  color: "#203656",
  fontSize: "18px",
  cursor: 'pointer',  
  margin: "0px 5px",
  "&:hover": {
    color: "#01A13B",
  },
}));

const Footer = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "1140px",
        }}
      >
        <Divider sx={{ marginTop: "50px" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
            minWidth: "800px",
            margin: "50px 0px",
          }}
        >
          <span style={{ width: "33%", margin: "0" }}>© 2023 Kurby.</span>
          <div
            style={{
              width: "33%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CustomLinkedIn />
            <CustomTwitter />
            <CustomTikTok />
            <CustomYouTube />
          </div>
          <div
            style={{
              width: "33%",
              display: 'flex', 
              justifyContent: 'flex-end'
            }}
          >
            <Button
              sx={{
                width: "180px",
                textTransform: "none",
                color: "#8F9BAD",
                fontSize: "13px",
                border: "solid 1px #EBEBEB",
                transition: "all 0.3s ease-in-out",
                padding: "6px 0px",
                borderRadius: "25px",
                textDecoration: "none",
                "&:hover": {
                  borderColor: "#00a13c",
                  color: "#00a13c",
                  background: "none !important",
                },
              }}
              onClick={() => {
                if(typeof window !== 'undefined'){
                    window.scrollTo({
                        top: 0, 
                        left: 0, 
                        behavior: 'smooth'
                    })
                }
              }}
            >
              <KeyboardArrowUpOutlinedIcon sx={{ marginRight: "10px" }} />
              Back to Top
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

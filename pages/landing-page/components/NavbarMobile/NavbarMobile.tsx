import { Box } from "@mui/material";
import styles from "./NavbarMobile.module.scss";
import { SocialMediaIcons } from "../Footer/Footer";

export default function NavbarMobile() {
  return (
    <Box className={styles.main}>
      <Box>
        <div>logo</div>
        <div>close</div>
      </Box>
      <Box>
        <Box>
          <div>About</div>
          <div>+</div>
        </Box>
        <Box>
          <div>Features</div>
          <div>+</div>
        </Box>
        <Box>
          <div>Why Kurby</div>
          <div>+</div>
        </Box>
        <Box>
          <div>Blog</div>
          <div>+</div>
        </Box>
        <Box>
          <div>Contact</div>
          <div>+</div>
        </Box>
        <button>Try Kurby Now</button>
      </Box>

      <Box>
        <SocialMediaIcons />
      </Box>
    </Box>
  );
}

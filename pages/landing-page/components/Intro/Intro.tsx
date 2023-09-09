import { Avatar, AvatarGroup, Box } from "@mui/material";
import styles from "./Intro.module.scss";

function HappyInvestors() {
  return (
    <Box className={styles.happy_investors}>
      <AvatarGroup spacing={4} total={103} max={5}>
        <Avatar
          alt="Remy Sharp"
          src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNtaWxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60"
        />
        <Avatar
          alt="Travis Howard"
          src="https://images.unsplash.com/photo-1564460576398-ef55d99548b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fHNtaWxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60"
        />
        <Avatar
          alt="Cindy Baker"
          src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
        />
        <Avatar
          alt="Agnes Walker"
          src="https://plus.unsplash.com/premium_photo-1670884442192-7b58d513cd55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHNtaWxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60"
        />
      </AvatarGroup>
    </Box>
  );
}

export default function Intro() {
  return (
    <Box className={styles.main}>
      <Box className={styles.text}>
        <div className={styles.its_free}>Try it, it's free, forever</div>
        <div className={styles.unlock}>Unlock The Power of Real Estate Intelligence</div>
        <div className={styles.simplify}>Simplify your property search with our real estate AI app.</div>
      </Box>
      <input type="text" placeholder="Search property, city, or state worldwide" />
      <HappyInvestors />
    </Box>
  );
}

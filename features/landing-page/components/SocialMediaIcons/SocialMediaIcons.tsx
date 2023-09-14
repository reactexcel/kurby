import { Box } from "@mui/material";
import styles from "./SocialMediaIcons.module.scss";
import Image from "next/image";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function SocialMediaIcons() {
  return (
    <Box className={styles.main}>
      <Image className={styles.icon} src="/icons/social_media/discord.png" alt="discord-image" width={50} height={50} />
      <TwitterIcon className={styles.icon} />
      <FacebookIcon className={styles.icon} />
      <InstagramIcon className={styles.icon} />
    </Box>
  );
}

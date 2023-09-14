import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import styles from "./Neighborhoods.module.scss";
import { ImageIcon } from "../Facts/Facts";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomButton from "../CustomButton/CustomButton";

function Neighborhood({ img_src, city, link }: { img_src: string; city: string; link: string }) {
  return (
    <Card className={styles.neighborhood}>
      <Box className={styles.image_container}>
        <CardMedia className={styles.image} component="img" image={img_src} title="Picture" alt="pic" />
      </Box>
      <CardContent className={styles.below_image}>
        <Box className={styles.text}>
          <Typography className={styles.city} gutterBottom variant="h5" component="div">
            {city}
          </Typography>
          <Typography className={styles.properties} variant="body2" color="text.secondary">
            <a style={{ textDecoration: "none", color: "gray" }} href={link}>
              Search Properties
            </a>
          </Typography>
        </Box>
        <Box className={styles.arrow}>
          <ImageIcon src="/icons/arrow-right.svg" alt="arrow-right" size={14} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default function Neighborhoods() {
  return (
    <Box className={styles.main}>
      <Box className={styles.header_with_button}>
        <div className={styles.header}>Explore Neighborhoods on Kurby</div>

        <button className={styles.button}>
          <div>View all</div>
          <ArrowForwardIcon />
        </button>
      </Box>
      <Box className={styles.scroll_body}>
        <Box className={styles.neighborhoods}>
          <Neighborhood img_src="/images/neighborhoods/chicago.webp" link="https://kurby.ai/app/Chicago--IL--USA" city="Chicago" />
          <Neighborhood img_src="/images/neighborhoods/miami.webp" link="https://kurby.ai/app/Miami--FL--USA" city="Miami" />
          <Neighborhood img_src="/images/neighborhoods/boston.webp" link="https://kurby.ai/app/Boston--MA--USA" city="Boston" />
          <Neighborhood img_src="/images/neighborhoods/austin.webp" link="https://kurby.ai/app/Austin--TX--USA" city="Austin" />
        </Box>
      </Box>
    </Box>
  );
}

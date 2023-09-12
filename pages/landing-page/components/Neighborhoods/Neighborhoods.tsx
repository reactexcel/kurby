import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import styles from "./Neighborhoods.module.scss";
import { ImageIcon } from "../Facts/Facts";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Neighborhood({ img_src, city, properties }: { img_src: string; city: string; properties: number }) {
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
            {properties} properties
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
          <Neighborhood img_src="/images/neighborhoods/chicago.webp" city="Chicago" properties={1234} />
          <Neighborhood img_src="/images/neighborhoods/miami.webp" city="Miami" properties={1234} />
          <Neighborhood img_src="/images/neighborhoods/boston.webp" city="Boston" properties={1234} />
          <Neighborhood img_src="/images/neighborhoods/austin.webp" city="Austin" properties={1234} />
        </Box>
      </Box>
    </Box>
  );
}

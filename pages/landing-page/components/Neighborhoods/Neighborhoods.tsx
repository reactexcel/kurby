import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import styles from "./Neighborhoods.module.scss";
import CustomButton from "../CustomButton/CustomButton";
import { ImageIcon } from "../Facts/Facts";

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
        <button className={styles.button}>View all</button>
        {/* <CustomButton text="View All" font_size="1.5rem" /> */}
      </Box>
      <Box className={styles.scroll_body}>
        <Box className={styles.neighborhoods}>
          <Neighborhood img_src="/images/neighborhoods/chicago.png" city="Chicago" properties={1234} />
          <Neighborhood img_src="/images/neighborhoods/chicago.png" city="Miami" properties={1234} />
          <Neighborhood img_src="/images/neighborhoods/chicago.png" city="Boston" properties={1234} />
          <Neighborhood img_src="/images/neighborhoods/chicago.png" city="Austin" properties={1234} />
        </Box>
      </Box>
    </Box>
  );
}

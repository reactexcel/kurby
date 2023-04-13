import { Card, CardContent, Typography, Box } from "@mui/material";
import styles from "./MapDetailCard.module.scss";

interface Props {
  label: string;
  value: string;
}

const MapDetailCard = ({ label, value }: Props) => {
  return (
    <Card className={styles.card}>
      <CardContent className={styles.cardContent}>
        <Box className={styles.wrapper}>
          <Typography variant="body1" style={{ fontSize: "32px", fontWeight: "bold" }}>
            {label}
          </Typography>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>{value}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MapDetailCard;

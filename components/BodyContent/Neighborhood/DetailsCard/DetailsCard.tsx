import { Card, CardContent, Typography, Box } from "@mui/material";
import styles from "./DetailsCard.module.scss";

interface DetailsCardProps {
  label?: string;
  value?: string | number;
}

export const DetailsCard = ({ label, value }: DetailsCardProps) => {
  return (
    <Card className={styles.card}>
      <CardContent className={styles.cardContent}>
        <Box className={styles.wrapper}>
          <Typography variant="body1" style={{ fontSize: "18px", fontWeight: "bold" }}>
            {label}
          </Typography>
          <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>{Math.round(Number(value || 0))}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

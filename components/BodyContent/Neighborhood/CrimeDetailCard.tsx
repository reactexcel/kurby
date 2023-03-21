import { Card, CardContent, Typography, Box } from "@mui/material";

interface Props {
  label?: string;
  value?: string;
}

const CrimeDetailCard = ({ label, value }: Props) => {
  return (
    <Card style={{ minWidth: 275, width: "24%", maxWidth: 350, border: "1px solid lightgray", boxShadow: "none", borderRadius: "10px", margin: "5px" }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "10px 20px !important",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1" style={{ fontSize: "18px", fontWeight: "bold" }}>
            {label}
          </Typography>
          <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>{Math.round(value)}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CrimeDetailCard;

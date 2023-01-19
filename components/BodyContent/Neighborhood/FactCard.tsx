import { Card, CardContent, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const IconContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
  background: "#F1F4F6",
  borderRadius: "10px",
  marginRight: "25px",
}));

interface Props {
  icon: JSX.Element;
  label: string;
  value: string;
  children?: JSX.Element | JSX.Element[];
}

const FactCard = ({ icon, label, value, children }: Props) => {
  return (
    <Card style={{ minWidth: 275, width: "24%", maxWidth: 350, border: "1px solid lightgray", boxShadow: "none", borderRadius: "10px", margin: "5px" }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "10px 20px !important",
          height: "100%",
        }}
      >
        <IconContainer>{icon}</IconContainer>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1" style={{ fontSize: "18px" }}>
            {label}
          </Typography>
          <Typography sx={{ fontSize: "32px", fontWeight: "bold" }}>{value}</Typography>
          {children}
        </Box>
      </CardContent>
    </Card>
  );
};

export default FactCard;

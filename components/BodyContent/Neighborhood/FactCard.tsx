import { Card, CardContent, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const IconContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "5px",
  background: "#F1F4F6",
  borderRadius: "10px",
  marginRight: "25px",
}));

interface Props {
  icon: JSX.Element;
  label: string;
  value: string | number | null | undefined;
  children?: JSX.Element | JSX.Element[];
  type: "string" | "percent";
}

const FactCard = ({ icon, label, value, type, children }: Props) => {
  let formattedValue = type === "percent" ? `${value}%` : value;
  if (!value) value = "";

  return (
    <Card style={{ minWidth: 200, width: "24%", maxWidth: 250, border: "1px solid lightgray", boxShadow: "none", borderRadius: "10px", margin: "5px", overflow: "visible" }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "5px 15px !important",
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
          <Typography variant="body1" style={{ fontSize: "14px" }}>
            {label}
          </Typography>
          <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>{formattedValue || "N/A"}</Typography>
          {children}
        </Box>
      </CardContent>
    </Card>
  );
};

export default FactCard;

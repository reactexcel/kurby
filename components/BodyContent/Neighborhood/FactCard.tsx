import { Card, CardContent, Typography, Box, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

const IconContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#F1F4F6",
  borderRadius: "10px",
  marginRight: "25px",
  minWidth: "64px",
  width: "64px",
  height: "64px",
  maxHeight: "64px",
  maxWidth: "64px",
}));

interface Props {
  icon: JSX.Element;
  loading: boolean;
  label: string;
  value: string | number | null | undefined;
  children?: JSX.Element | JSX.Element[];
  type: "string" | "percent";
}

const FactCard = ({ icon, label, value, type, children, loading }: Props) => {
  let formattedValue = type === "percent" ? `${value}%` : value;
  if (!value) value = "";

  return (
    <Card style={{ minWidth: 215, width: "24%", maxWidth: 250, border: "1px solid lightgray", boxShadow: "none", borderRadius: "10px", margin: "5px", overflow: "visible" }}>
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
          <Typography variant="body1" style={{ fontSize: "14px", wordWrap: "break-word" }}>
            {label}
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Typography sx={{ fontSize: "24px", fontWeight: "bold", minWidth: "100%" }}>{formattedValue || "N/A"}</Typography>
              {children}
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default FactCard;

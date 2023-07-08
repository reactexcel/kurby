import { Stack, Typography } from "@mui/material";
import styles from "./Legends.module.scss";

const MapLegendColorItem = ({ backgroundColor }: { backgroundColor: string }) => <div className={styles.mapLegendColorItem} style={{ backgroundColor }} />;

export function HouseholdMapLegend() {
  const demographicColorRepresentation = ["#A30123", "#D12F26", "#EE6941", "#EEAF72", "#F4D589", "#F6F6B9", "#D6EAEF", "#ADD2E3", "#6FA7C7", "#4873AF", "#2B368C", "purple"];
  const mapTextItem = { fontStyle: "italic" };
  return (
    <div className={styles.mapLegend}>
      <Typography marginBottom={1} fontSize={18} fontWeight={800}>
        Median Household Income
      </Typography>
      <Stack direction={"row"}>
        {demographicColorRepresentation.map((color: string, index: number) => (
          <Stack flex={1} textAlign={"center"} direction={"column"}>
            <MapLegendColorItem backgroundColor={color} />
            {index === 11 ? (
              <Typography style={mapTextItem}>200k+</Typography>
            ) : (
              <Typography style={mapTextItem}>
                {index}
                {index !== 0 && "0"}k
              </Typography>
            )}
          </Stack>
        ))}
      </Stack>
      <Typography fontSize={"13px"} className={styles.legendSource}>
        Source: 2021 US Census Data
      </Typography>
    </div>
  );
}

export function HomevalueMapLegend() {
  const demographicColorRepresentation = ["#A30123", "#D12F26", "#EE6941", "#EEAF72", "#F4D589", "#F6F6B9", "#D6EAEF", "#ADD2E3", "#6FA7C7", "#4873AF", "purple"];
  const mapTextItem = { fontStyle: "italic" };
  return (
    <div className={styles.mapLegend}>
      <Typography marginBottom={1} fontSize={18} fontWeight={800}>
        Median Home value
      </Typography>
      <Stack direction={"row"}>
        {demographicColorRepresentation.map((color: string, index: number) => (
          <Stack flex={1} textAlign={"center"} direction={"column"}>
            <MapLegendColorItem backgroundColor={color} />
            {index === 10 ? (
              <Typography style={mapTextItem}>1M+</Typography>
            ) : (
              <Typography style={mapTextItem}>
                {index}
                {index !== 0 && "00"}k
              </Typography>
            )}
          </Stack>
        ))}
      </Stack>
      <Typography fontSize={"13px"} className={styles.legendSource}>
        Source: 2021 US Census Data
      </Typography>
    </div>
  );
}

export function PovertyRateLegend() {
  const povertyColorRepresentation = [
    "rgb(255, 247, 243)",
    "rgb(253, 224, 221)",
    "rgb(252, 197, 194)",
    "rgb(252, 197, 192)",
    "rgb(250, 159, 181)",
    "rgb(247, 104, 161)",
    "rgb(221, 52, 151)",
    "rgb(174, 3, 126)",
    "rgb(122, 3, 119)",
    "rgb(73, 0, 106)",
  ];
  const povertyColorLabels = ["<10%", "10", "15", "20", "25", "25", "30", "35", "40", "45+"];
  const mapTextItem = { fontStyle: "italic" };
  return (
    <div className={styles.mapLegend}>
      <Typography marginBottom={1} fontSize={18} fontWeight={800}>
        Percent below federal poverty line
      </Typography>
      <Stack direction={"row"}>
        {povertyColorRepresentation.map((color: string, index: number) => (
          <Stack flex={1} textAlign={"center"} direction={"column"}>
            <MapLegendColorItem backgroundColor={color} />
            <Typography style={mapTextItem}>{povertyColorLabels[index]}</Typography>
          </Stack>
        ))}
      </Stack>
      <Stack direction={"row"}></Stack>
      <Typography fontSize={"13px"} className={styles.legendSource}>
        Source: 2021 US Census Data
      </Typography>
    </div>
  );
}

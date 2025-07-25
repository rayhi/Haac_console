import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { desktopOS, valueFormatter } from "../data/WebUsageStats";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";


export default function PieArcLabel() {
  // const theme = useTheme();
const colors = [
  "hsla(174, 33%, 22%, 1)",
  "hsla(27, 96%, 49%, 1)",
  "hsla(190, 51%, 19%, 1)",
  "hsla(41, 100%, 55%, 1)",
];

  const chartData = {
    data: desktopOS.map((item, index) => ({
      ...item,
      color: colors[index % colors.length], // ✅ Assign color here
    })),
    valueFormatter,
  };

  return (
    <Card
      sx={{
        width: "100%",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "16px",
        backgroundColor: "#fcfcfc",
        padding: 2,
      }}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Premiums
        </Typography>

        <Stack sx={{ justifyContent: "space-between" }}>
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              1.3M
            </Typography>
            <Chip size="small" color="error" label="-8%" />
          </Stack>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Page views and downloads for the last 6 months
          </Typography>
        </Stack>

        <PieChart
          series={[
            {
              arcLabel: (item) => `${item.value}%`,
              arcLabelMinAngle: 35,
              arcLabelRadius: "60%",
              data: chartData.data, // ✅ Use colored data
              valueFormatter: chartData.valueFormatter,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fontWeight: "bold",
            },
          }}
          width={400}
          height={250}
        />
      </CardContent>
    </Card>
  );
}


import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import icon from "../../assets/Icon.png";

export type StatCardProps = {
  title: string;
  value: string;
  interval: string;
  trend: "up" | "down" | "neutral";
  data: number[]; // We'll use the last value here for progress %
};

export default function StatCard({
  title,
  value,
  interval,
  trend,
  data,
}: StatCardProps) {
  const labelColors = {
    up: "success" as const,
    down: "error" as const,
    neutral: "default" as const,
  };

  const color = labelColors[trend];
  const trendValues = { up: "+25%", down: "-25%", neutral: "+5%" };

  const progressValue = data.length > 0 ? data[data.length - 1] : 0; // Example: use last value as progress

  return (
    <Card
      sx={{
        height: "100%",
        flexGrow: 1,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "16px",
        backgroundColor: "primary.main",
        color: "white",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography component="h2" variant="subtitle2" gutterBottom>
            {title}
          </Typography>
          <img src={icon} alt="icon" width="30" />
        </Stack>

        <Stack spacing={2} sx={{ mt: 2 }}>
          <Typography variant="h4" component="p" sx={{ color: "#A2FFF5" }}>
            {value}
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>{interval}</Typography>
            <Chip size="small" color={color} label={trendValues[trend]} />
          </Stack>
        </Stack>
      </CardContent>

      <LinearProgress
        variant="determinate"
        value={progressValue}
        sx={{
          height: 8,
          borderRadius: 5,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "warning.main", // White progress bar (or pick a theme color)
          },
        }}
      />
    </Card>
  );
}

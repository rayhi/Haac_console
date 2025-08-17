
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedDataGrid from './CustomizedDataGrid';
import SessionsChart from './SessionsChart';
import StatCard, { StatCardProps } from './StatCard';
import BarsDataset from '../Chart/Barchart';
import PieArcLabel from '../Chart/PieChart';

const data: StatCardProps[] = [
  {
    title: "🧑‍🤝‍🧑 Clients ",
    value: "14k",
    interval: "Last 30 days",
    trend: "up",
    data: [5, 10, 15, 20, 25],
  },
  {
    title: "📝 Policies",
    value: "325",
    interval: "Last 30 days",
    trend: "down",
    data: [5, 10, 15, 20, 25, 30, 60],
  },
  {
    title: "💸 Premiums",
    value: "200k",
    interval: "Last 30 days",
    trend: "neutral",
    data: [5, 10, 15, 20, 25, 30, 50],
  },
  {
    title: "💸 Claims",
    value: "20k",
    interval: "Last 30 days",
    trend: "up",
    data: [5, 10, 15, 20],
  },
];

export default function MainGrid() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { sm: "100%", md: "1700px" },
        // backgroundColor: "background.paper",
      }}
    >
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        {/* <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HighlightedCard />
        </Grid> */}
        <Grid size={{ xs: 12, md: 4 }}>
          <SessionsChart />
        </Grid>
        <Grid size={{ xs: 12, md: 4}}>
          <BarsDataset/>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <PieArcLabel/>
          {/* <PageViewsBarChart /> */}
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Products
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: "column", sm: "row", lg: "column" }}>
            {/* <CustomizedTreeView /> */}
            <ChartUserByCountry />
          </Stack>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}

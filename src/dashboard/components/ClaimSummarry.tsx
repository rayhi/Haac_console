import { Box, Typography, Stack, Button, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { claimTotals, claimCategories } from "../internals/data/ClaimSummaryData";

export default function ClaimSummarySection() {
    const maxAmount = Math.max(...claimCategories.map((item) => item.amount));
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
        backgroundColor: "#fff",
        mb: 3,
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h6">All Claims</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          New Claim
        </Button>
      </Stack>
      {/* Totals Row */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        rowGap={2}
      >
        <Typography variant="subtitle1">
          Total Amount Claimed:{" "}
          <strong>${claimTotals.totalClaimed.toLocaleString()}</strong>
        </Typography>
        <Typography variant="subtitle1">
          Total Amount Settled:{" "}
          <strong>${claimTotals.totalSettled.toLocaleString()}</strong>
        </Typography>
        <Typography variant="subtitle1">
          Total Claims: <strong>{claimTotals.totalClaims}</strong>
        </Typography>
      </Stack>
      {/* Category Breakdown */}
 

<Stack direction="row" spacing={2} mt={2} width="100%" alignItems="flex-end">
  {claimCategories.map((item) => {
    const widthPercent = (item.amount / maxAmount) * 100;

    return (
      <Box
        key={item.id}
        sx={{
          flex: 1, // all take equal space in the row
          minWidth: 160,
        }}
      >
        {/* Label */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={0.5}
        >
          <Typography variant="body2" fontWeight={600}>
            {item.label}
          </Typography>
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{ color: item.color }}
          >
            ${item.amount.toLocaleString()}
          </Typography>
        </Stack>

        {/* Bar */}
        <Box
          sx={{
            height: 6,
            borderRadius: 2,
            backgroundColor: "hsl(0, 0%, 92%)",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: `${widthPercent}%`,
              backgroundColor: item.color,
              borderRadius: 2,
              transition: "width 0.4s ease",
            }}
          />
        </Box>
      </Box>
    );
  })}
</Stack>  
    </Paper>
  );
}






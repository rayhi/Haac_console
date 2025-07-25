import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Layout from "../components/Layout";
import ClaimSummarySection from "../components/ClaimSummarry";
import SmartDataGrid from "../components/SmartDataGrid";
import { claimsColumns, claimsRows } from "../internals/data/ClaimsData";
function Claims() {
  return (
    <Layout title="Claims">
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ md: 12, lg: 12 }}>
          <Box sx={{ width: "100%" }}>
            {/* content here */}
            <ClaimSummarySection />
            <SmartDataGrid columns={claimsColumns} rows={claimsRows} />
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Claims
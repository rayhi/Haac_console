
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Layout from "../../components/Layout";

function UserBrokers() {
  return (
    <Layout title="Brokers Management">
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ md: 12, lg: 12 }}>
          <Box sx={{ width: "100%" }}>{/* content here */}</Box>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default UserBrokers;




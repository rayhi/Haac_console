

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Layout from "../components/Layout";
import { Typography } from "@mui/material";
import CustomizedDataGrid from "../components/CustomizedDataGrid";
function  Agents() {
  return (
    <Layout title="Users">
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ md: 12, lg: 12 }}>
          <Box
            sx={{
              
              width: "100%",
              maxWidth: "1700px", // ✅ Control max width for big screens
             
            }}
          >
            {/* content here */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
              Details
            </Typography>
            <Grid container spacing={2} columns={12}>
              <Grid size={{ xs: 12, lg: 9 }}>
                <CustomizedDataGrid />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Agents

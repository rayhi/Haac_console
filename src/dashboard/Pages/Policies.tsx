import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import {  
  Typography,
  Card,
  CardContent,
  
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import Layout from "../components/Layout";
import CustomButton from "../components/CustomButton";
import PoliciesTable from "../components/Tables/PolicyTable";
import BarsDataset from "../Chart/Barchart";
function Policies() {
  return (
    <Layout
      title="Policies"
      actions={<CustomButton startIcon={<AddIcon />}>Add Policy</CustomButton>}
    >
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ md: 12, lg: 12 }}>
          {/* content here */}
          <Box sx={{ width: "100" }}>
            <Grid container spacing={2}>
              {/* Summary Cards */}
              <Grid size={{ sm: 4, xs: 12 }}>
                {/* <Card> */}
                <Card
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    mb: 3,
                  }}
                >
                  <CardContent>
                    <Typography variant="subtitle2">No. of Policies</Typography>
                    <Typography variant="h6" sx={{ color: "warning.main" }}>
                      05
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ sm: 4, xs: 12 }}>
                <Card
                  sx={{ backgroundColor: "primary.main", color: "#fff", mb: 3 }}
                >
                  <CardContent>
                    <Typography variant="subtitle2">
                      Active Policies
                    </Typography>
                    <Typography variant="h6" sx={{ color: "warning.main" }}>
                      ₹8,50,000
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ sm: 4, xs: 12 }}>
                <Card
                  sx={{ backgroundColor: "primary.main", color: "#fff", mb: 3 }}
                >
                  <CardContent>
                    <Typography variant="subtitle2">Inactive Policies</Typography>
                    <Typography variant="h6" sx={{ color: "warning.main" }}>
                      02
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Policies List */}
              <Grid size={{ md: 8, xs: 12 }}>
                <PoliciesTable />
           
              </Grid>

              {/* Policy Chart */}
              <Grid size={{ md: 4, xs: 12 }}>
                 <BarsDataset/>
               
              </Grid>
            </Grid>
          </Box>
          {/* </Box> */}
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Policies
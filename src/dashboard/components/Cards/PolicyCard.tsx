import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import {  
  Typography,
  Card,
  CardContent,
  List,
  ListItemIcon,
  ListItemText,
  Chip,
  ListItemButton,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import DescriptionIcon from "@mui/icons-material/Description";
import ShieldIcon from "@mui/icons-material/Shield";
import Layout from "../Layout";
import CustomButton from "../CustomButton";
function PolicyCard() {
  return (
    <Layout title="PolicyCard">
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ md: 12, lg: 12 }}>
          {/* <Box sx={{ width: "100%" }}> */}
          {/* content here */}
          <Box sx={{ width: "100" }}>
            {/* Header */}
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Hello Johnson!
            </Typography>

            {/* Alert Card */}
            <Card
              sx={{
                background:
                  "linear-gradient(90deg, #FFB518 , #f47105 , #FFB518 )",
                color: "#fff",
                mb: 3,
                borderRadius: 2,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent>
                <Typography variant="body1">
                  An Premium amount of ₹12,000 is due for Policy No 156896656
                  till Feb 26 2026 (4 days left).
                </Typography>
                <CustomButton>Pay Now</CustomButton>
                {/* <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: "#fff",
                    color: "#F47105",
                    fontWeight: 600,
                  }}
                >
                  Pay Now
                </Button> */}
              </CardContent>
            </Card>

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
                      Total Premium Paid
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
                    <Typography variant="subtitle2">Open Claims</Typography>
                    <Typography variant="h6" sx={{ color: "warning.main" }}>
                      02
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Policies List */}
              <Grid size={{ md: 8, xs: 12 }}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle2" gutterBottom>
                      My Policies (05)
                    </Typography>
                    <Box>
                      <Typography fontWeight={500}>
                        Group Health Insurance
                      </Typography>
                      <Typography variant="body2">
                        Sum Assured: ₹3,58,633
                      </Typography>
                      <Typography variant="body2">
                        Premium: ₹12,000 per year
                      </Typography>
                      <Chip
                        label="Active"
                        color="success"
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Quick Access */}
              <Grid size={{ md: 4, xs: 12 }}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle2" gutterBottom>
                      Quick Access
                    </Typography>
                    <List>
                      <ListItemButton>
                        <ListItemIcon>
                          <PaymentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Pay Premium" />
                      </ListItemButton>
                      <ListItemButton>
                        <ListItemIcon>
                          <DescriptionIcon />
                        </ListItemIcon>
                        <ListItemText primary="Download Documents" />
                      </ListItemButton>
                      <ListItemButton>
                        <ListItemIcon>
                          <ShieldIcon />
                        </ListItemIcon>
                        <ListItemText primary="Renew Policy" />
                      </ListItemButton>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
          {/* </Box> */}
        </Grid>
      </Grid>
    </Layout>
  );
}

export default PolicyCard
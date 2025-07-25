import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Typography, Button, Stack, Card, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { BarChart } from '@mui/x-charts/BarChart';
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

// Mock data for demonstration
const mockProviders = [
  { id: 1, name: "City Hospital", location: "Nairobi, Kenya", status: "Active", createdAt: "2021-01-01" },
  { id: 2, name: "Green Valley Clinic", location: "Mombasa, Kenya", status: "Inactive", createdAt: "2021-02-15" },
  { id: 3, name: "Sunrise Medical Center", location: "Kisumu, Kenya", status: "Active", createdAt: "2021-03-10" },
];

const summary = {
  claims: 120,
  patients: 3500,
  departments: 12,
  doctors: 45,
};

const analyticsData = {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  claims: [20, 18, 22, 15, 25, 20],
  patients: [500, 600, 550, 700, 650, 500],
};

const claims = [
  { id: 1, claimNo: "C-2001", amount: 8000, status: "Approved", date: "2023-01-10", patient: "John Doe" },
  { id: 2, claimNo: "C-2002", amount: 12000, status: "Pending", date: "2023-02-15", patient: "Jane Smith" },
];
const patients = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", admitted: "2023-01-01", status: "Discharged" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", admitted: "2023-02-01", status: "Admitted" },
];
const initialServices = [
  { id: 1, service: "MRI Scan", cost: 5000, status: "Active" },
  { id: 2, service: "X-Ray", cost: 1500, status: "Active" },
  { id: 3, service: "Blood Test", cost: 800, status: "Inactive" },
];

function exportToCSV<T extends Record<string, unknown>>(data: T[], filename: string) {
  const replacer = (_key: string, value: unknown) => (value === null ? '' : value);
  const header = Object.keys(data[0]);
  const csv = [
    header.join(','),
    ...data.map((row) => header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(','))
  ].join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function ServiceProviderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const provider = mockProviders.find((p) => p.id.toString() === id);

  const [showPatients, setShowPatients] = useState(false);
  const [showClaims, setShowClaims] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [services, setServices] = useState(initialServices);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<null | { id?: number; service: string; cost: number; status: string }>(null);

  const handleAddService = () => {
    setEditingService({ service: "", cost: 0, status: "Active" });
    setServiceModalOpen(true);
  };

  const handleEditService = (service: typeof services[0]) => {
    setEditingService(service);
    setServiceModalOpen(true);
  };

  const handleServiceModalClose = () => {
    setServiceModalOpen(false);
    setEditingService(null);
  };

  const handleServiceModalSave = () => {
    if (!editingService) return;
    if (editingService.id) {
      // Edit existing
      setServices((prev) => prev.map((s) => (s.id === editingService.id ? { ...editingService, id: editingService.id as number } : s)));
    } else {
      // Add new
      setServices((prev) => [
        ...prev,
        { ...editingService, id: prev.length ? Math.max(...prev.map((s) => s.id)) + 1 : 1 } as { id: number; service: string; cost: number; status: string },
      ]);
    }
    setServiceModalOpen(false);
    setEditingService(null);
  };

  if (!provider) {
    return <Typography>Service Provider not found.</Typography>;
  }

  return (
    <Layout title="Service Provider Details">
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back to List
      </Button>
      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="subtitle2">Claims Handled</Typography>
              <Typography variant="h6">{summary.claims}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="subtitle2">Patients Served</Typography>
              <Typography variant="h6">{summary.patients}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="subtitle2">Departments</Typography>
              <Typography variant="h6">{summary.departments}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="subtitle2">Doctors</Typography>
              <Typography variant="h6">{summary.doctors}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* Performance Analytics Section */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Performance Analytics</Typography>
      <BarChart
        height={250}
        colors={["#1976d2", "#ff9800"]}
        xAxis={[
          {
            scaleType: "band",
            data: analyticsData.months,
          },
        ]}
        series={[
          {
            id: "claims",
            label: "Claims Handled",
            data: analyticsData.claims,
          },
          {
            id: "patients",
            label: "Patients Served",
            data: analyticsData.patients,
          },
        ]}
        margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
        grid={{ horizontal: true }}
        slotProps={{
          legend: {
            hidden: false,
          },
        }}
      />
      {/* Toggle Buttons */}
      <Stack direction="row" spacing={2} sx={{ mt: 3, mb: 2 }}>
        <Button variant={showPatients ? "contained" : "outlined"} onClick={() => setShowPatients((v) => !v)}>
          {showPatients ? "Hide Patients" : "Show Patients"}
        </Button>
        <Button variant={showClaims ? "contained" : "outlined"} onClick={() => setShowClaims((v) => !v)}>
          {showClaims ? "Hide Claims" : "Show Claims"}
        </Button>
        <Button variant={showServices ? "contained" : "outlined"} onClick={() => setShowServices((v) => !v)}>
          {showServices ? "Hide Services" : "Show Services"}
        </Button>
      </Stack>
      {/* Claims Table */}
      {showClaims && <>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h6">Claims</Typography>
          <IconButton onClick={() => exportToCSV(claims, 'claims.csv')}><FileDownloadIcon /></IconButton>
        </Stack>
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Claim No</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Patient</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {claims.slice(0, 10).map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell>{claim.claimNo}</TableCell>
                  <TableCell>{claim.amount}</TableCell>
                  <TableCell>{claim.status}</TableCell>
                  <TableCell>{claim.date}</TableCell>
                  <TableCell>{claim.patient}</TableCell>
                  <TableCell>
                    <IconButton size="small"><VisibilityIcon fontSize="inherit" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>}
      {/* Patients Table */}
      {showPatients && <>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h6">Patients</Typography>
          <IconButton onClick={() => exportToCSV(patients, 'patients.csv')}><FileDownloadIcon /></IconButton>
        </Stack>
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Date Admitted</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.slice(0, 10).map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>{patient.admitted}</TableCell>
                  <TableCell>{patient.status}</TableCell>
                  <TableCell>
                    <IconButton size="small"><VisibilityIcon fontSize="inherit" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>}
      {/* Services Table */}
      {showServices && <>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h6">Services</Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={handleAddService}>Add Service</Button>
            <IconButton onClick={() => exportToCSV(services, 'services.csv')}><FileDownloadIcon /></IconButton>
          </Stack>
        </Stack>
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Service</TableCell>
                <TableCell>Cost</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.slice(0, 10).map((service) => (
                <TableRow key={service.id}>
                  <TableCell>{service.service}</TableCell>
                  <TableCell>{service.cost}</TableCell>
                  <TableCell>{service.status}</TableCell>
                  <TableCell>
                    <IconButton size="small"><VisibilityIcon fontSize="inherit" /></IconButton>
                    <IconButton size="small" onClick={() => handleEditService(service)}><EditIcon fontSize="inherit" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Service Modal */}
        <Dialog open={serviceModalOpen} onClose={handleServiceModalClose}>
          <DialogTitle>{editingService?.id ? "Edit Service" : "Add Service"}</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                label="Service Name"
                value={editingService?.service || ""}
                onChange={e => setEditingService(s => s ? { ...s, service: e.target.value } : s)}
                fullWidth
              />
              <TextField
                label="Cost"
                type="number"
                value={editingService?.cost || 0}
                onChange={e => setEditingService(s => s ? { ...s, cost: Number(e.target.value) } : s)}
                fullWidth
              />
              <TextField
                label="Status"
                select
                value={editingService?.status || "Active"}
                onChange={e => setEditingService(s => s ? { ...s, status: e.target.value } : s)}
                fullWidth
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleServiceModalClose}>Cancel</Button>
            <Button onClick={handleServiceModalSave} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>
      </>}
    </Layout>
  );
} 
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Typography, Button, Stack, Card, CardContent, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useState } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import VisibilityIcon from "@mui/icons-material/Visibility";

const mockCustomers = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", country: "Kenya", status: "Active", createdAt: "2021-01-01" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", country: "Kenya", status: "Inactive", createdAt: "2021-02-15" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", phone: "555-123-4567", country: "Kenya", status: "Active", createdAt: "2021-03-10" },
];

const summary = {
  policies: 3,
  claims: 5,
  payments: 8,
  complaints: 2
};

const policies = [
  { id: 1, policyNo: "P-1001", type: "Health", status: "Active", start: "2023-01-01", end: "2023-12-31" },
  { id: 2, policyNo: "P-1002", type: "Dental", status: "Expired", start: "2022-01-01", end: "2022-12-31" },
];
const claims = [
  { id: 1, claimNo: "C-3001", claimType: "Medical", provider: "City Hospital", amount: 5000, status: "Approved", date: "2023-02-10", policy: "P-1001" },
  { id: 2, claimNo: "C-3002", claimType: "Dental", provider: "Green Valley Clinic", amount: 2000, status: "Pending", date: "2023-03-15", policy: "P-1002" },
];
const payments = [
  { id: 1, date: "2023-01-15", amount: 1200, type: "Premium", status: "Paid" },
  { id: 2, date: "2023-02-15", amount: 1200, type: "Premium", status: "Paid" },
];
const complaints = [
  { id: 1, date: "2023-04-01", subject: "Delayed claim", status: "Resolved", resolution: "Paid" },
  { id: 2, date: "2023-05-10", subject: "Coverage issue", status: "Open", resolution: "" },
];
const healthHistory = [
  { id: 1, date: "2023-01-10", diagnosis: "Flu", treatment: "Medication", provider: "City Hospital" },
  { id: 2, date: "2023-03-20", diagnosis: "Dental Checkup", treatment: "Cleaning", provider: "Green Valley Clinic" },
];

const analyticsData = {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  claims: [1, 2, 0, 3, 1, 2],
  payments: [1200, 1200, 0, 1200, 1200, 1200],
};

function exportToCSV<T extends Record<string, unknown>>(data: T[], filename: string) {
  const replacer = (key: string, value: unknown) => (value === null ? '' : value);
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

export default function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const customer = mockCustomers.find((c) => c.id.toString() === id);

  const [showPolicies, setShowPolicies] = useState(false);
  const [showClaims, setShowClaims] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const [showComplaints, setShowComplaints] = useState(false);
  const [showHealthHistory, setShowHealthHistory] = useState(false);

  if (!customer) {
    return <Typography>Customer not found.</Typography>;
  }

  return (
    <Layout title="Customer Details">
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back to List
      </Button>
      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="subtitle2">Total Policies</Typography>
              <Typography variant="h6">{summary.policies}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="subtitle2">Total Claims</Typography>
              <Typography variant="h6">{summary.claims}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="subtitle2">Total Payments</Typography>
              <Typography variant="h6">{summary.payments}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="subtitle2">Total Complaints</Typography>
              <Typography variant="h6">{summary.complaints}</Typography>
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
            label: "Claims",
            data: analyticsData.claims,
          },
          {
            id: "payments",
            label: "Payments",
            data: analyticsData.payments,
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
        <Button variant={showPolicies ? "contained" : "outlined"} onClick={() => setShowPolicies((v) => !v)}>
          {showPolicies ? "Hide Policies" : "Show Policies"}
        </Button>
        <Button variant={showClaims ? "contained" : "outlined"} onClick={() => setShowClaims((v) => !v)}>
          {showClaims ? "Hide Claims" : "Show Claims"}
        </Button>
        <Button variant={showPayments ? "contained" : "outlined"} onClick={() => setShowPayments((v) => !v)}>
          {showPayments ? "Hide Payments" : "Show Payments"}
        </Button>
        <Button variant={showComplaints ? "contained" : "outlined"} onClick={() => setShowComplaints((v) => !v)}>
          {showComplaints ? "Hide Complaints" : "Show Complaints"}
        </Button>
        <Button variant={showHealthHistory ? "contained" : "outlined"} onClick={() => setShowHealthHistory((v) => !v)}>
          {showHealthHistory ? "Hide Health History" : "Show Health History"}
        </Button>
      </Stack>
      {/* Policies Table */}
      {showPolicies && <>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h6">Policies</Typography>
          <IconButton onClick={() => exportToCSV(policies, 'policies.csv')}><FileDownloadIcon /></IconButton>
        </Stack>
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Policy No</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {policies.slice(0, 10).map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell>{policy.policyNo}</TableCell>
                  <TableCell>{policy.type}</TableCell>
                  <TableCell>{policy.status}</TableCell>
                  <TableCell>{policy.start}</TableCell>
                  <TableCell>{policy.end}</TableCell>
                  <TableCell>
                    <IconButton size="small"><VisibilityIcon fontSize="inherit" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>}
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
                <TableCell>Claim Type</TableCell>
                <TableCell>Provider</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Policy</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {claims.slice(0, 10).map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell>{claim.claimNo}</TableCell>
                  <TableCell>{claim.claimType}</TableCell>
                  <TableCell>{claim.provider}</TableCell>
                  <TableCell>{claim.amount}</TableCell>
                  <TableCell>{claim.status}</TableCell>
                  <TableCell>{claim.date}</TableCell>
                  <TableCell>{claim.policy}</TableCell>
                  <TableCell>
                    <IconButton size="small"><VisibilityIcon fontSize="inherit" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>}
      {/* Payments Table */}
      {showPayments && <>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h6">Payments</Typography>
          <IconButton onClick={() => exportToCSV(payments, 'payments.csv')}><FileDownloadIcon /></IconButton>
        </Stack>
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.slice(0, 10).map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.type}</TableCell>
                  <TableCell>{payment.status}</TableCell>
                  <TableCell>
                    <IconButton size="small"><VisibilityIcon fontSize="inherit" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>}
      {/* Complaints Table */}
      {showComplaints && <>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h6">Complaints</Typography>
          <IconButton onClick={() => exportToCSV(complaints, 'complaints.csv')}><FileDownloadIcon /></IconButton>
        </Stack>
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Resolution</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {complaints.slice(0, 10).map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell>{complaint.date}</TableCell>
                  <TableCell>{complaint.subject}</TableCell>
                  <TableCell>{complaint.status}</TableCell>
                  <TableCell>{complaint.resolution}</TableCell>
                  <TableCell>
                    <IconButton size="small"><VisibilityIcon fontSize="inherit" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>}
      {/* Health History Table */}
      {showHealthHistory && <>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h6">Health History</Typography>
          <IconButton onClick={() => exportToCSV(healthHistory, 'health_history.csv')}><FileDownloadIcon /></IconButton>
        </Stack>
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Diagnosis</TableCell>
                <TableCell>Treatment</TableCell>
                <TableCell>Provider</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {healthHistory.slice(0, 10).map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.diagnosis}</TableCell>
                  <TableCell>{record.treatment}</TableCell>
                  <TableCell>{record.provider}</TableCell>
                  <TableCell>
                    <IconButton size="small"><VisibilityIcon fontSize="inherit" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>}
    </Layout>
  );
} 
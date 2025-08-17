import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Typography, Button, Stack, Card, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { BarChart } from '@mui/x-charts/BarChart';

// Mock data for demonstration
const mockBrokers = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", country: "India", company: "Company 1", status: "Active", createdAt: "2021-01-01", updatedAt: "2021-01-01" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", country: "India", company: "Company 2", status: "Inactive", createdAt: "2021-01-01", updatedAt: "2021-01-01" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", phone: "555-123-4567", country: "India", company: "Company 3", status: "Active", createdAt: "2021-01-01", updatedAt: "2021-01-01" },
];

// CSV export utility
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

export default function BrokerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const broker = mockBrokers.find((b) => b.id.toString() === id);

  // Mock summary data
  const summary = {
    clients: 12,
    claims: 8,
    policies: 20,
    commission: 15000,
    transactions: 25,
  };

  // Mock data for tables
  const clients = [
    { id: 1, name: "Client A", email: "clienta@example.com", phone: "111-222-3333", policy: "P-102938", onboarded: "2022-01-01", status: "Active" },
    { id: 2, name: "Client B", email: "clientb@example.com", phone: "222-333-4444", policy: "P-304958", onboarded: "2022-02-01", status: "Inactive" },
  ];
  const claims = [
    { id: 1, claimNo: "C-1001", amount: 5000, status: "Approved", date: "2023-01-10", policyholder: "Client A" },
    { id: 2, claimNo: "C-1002", amount: 2000, status: "Pending", date: "2023-02-15", policyholder: "Client B" },
  ];
  const policies = [
    { id: 1, policyNo: "P-102938", type: "Motor", premium: 12000, status: "Active", customer: "Client A" },
    { id: 2, policyNo: "P-304958", type: "Health", premium: 18500, status: "Expired", customer: "Client B" },
  ];
  const commissions = [
    { id: 1, date: "2023-01-31", amount: 2000, type: "Monthly", status: "Paid" },
    { id: 2, date: "2023-02-28", amount: 1800, type: "Monthly", status: "Pending" },
  ];
  const transactions = [
    { id: 1, date: "2023-01-15", type: "Commission", amount: 2000, status: "Paid" },
    { id: 2, date: "2023-02-20", type: "Payout", amount: 5000, status: "Completed" },
  ];

  // Mock data for performance analytics
  const analyticsData = {
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    policies: [5, 8, 6, 10, 7, 9],
    claims: [2, 3, 1, 4, 2, 3],
    commission: [1200, 1500, 1100, 1800, 1400, 1600],
  };

  if (!broker) {
    return <Typography>Broker not found.</Typography>;
  }

  return (
    <Layout title="Broker Details">
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back to Brokers
      </Button>
      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ backgroundColor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="subtitle2">Total Clients</Typography>
              <Typography variant="h6">{summary.clients}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ backgroundColor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="subtitle2">Total Claims</Typography>
              <Typography variant="h6">{summary.claims}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ backgroundColor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="subtitle2">Policies Sold</Typography>
              <Typography variant="h6">{summary.policies}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ backgroundColor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="subtitle2">Commission</Typography>
              <Typography variant="h6">₹{summary.commission.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ backgroundColor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="subtitle2">Transactions</Typography>
              <Typography variant="h6">{summary.transactions}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* Performance Analytics Section */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Performance Analytics</Typography>
      <BarChart
        height={250}
        colors={["#1976d2", "#ff9800", "#388e3c"]}
        xAxis={[
          {
            scaleType: "band",
            data: analyticsData.months,
          },
        ]}
        series={[
          {
            id: "policies",
            label: "Policies Sold",
            data: analyticsData.policies,
          },
          {
            id: "claims",
            label: "Claims Handled",
            data: analyticsData.claims,
          },
          {
            id: "commission",
            label: "Commission Earned",
            data: analyticsData.commission,
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
      {/* Clients Onboarded Table */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h6">Clients Onboarded</Typography>
        <IconButton onClick={() => exportToCSV(clients, 'clients.csv')}><FileDownloadIcon /></IconButton>
      </Stack>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Policy</TableCell>
              <TableCell>Date Onboarded</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.slice(0, 10).map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{client.policy}</TableCell>
                <TableCell>{client.onboarded}</TableCell>
                <TableCell>{client.status}</TableCell>
                <TableCell>
                  <IconButton size="small"><VisibilityIcon fontSize="inherit" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Claims Handled Table */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h6">Claims Handled</Typography>
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
              <TableCell>Policyholder</TableCell>
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
                <TableCell>{claim.policyholder}</TableCell>
                <TableCell>
                  <IconButton size="small"><VisibilityIcon fontSize="inherit" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Policies Sold Table */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h6">Policies Sold</Typography>
        <IconButton onClick={() => exportToCSV(policies, 'policies.csv')}><FileDownloadIcon /></IconButton>
      </Stack>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Policy No</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Premium</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {policies.slice(0, 10).map((policy) => (
              <TableRow key={policy.id}>
                <TableCell>{policy.policyNo}</TableCell>
                <TableCell>{policy.type}</TableCell>
                <TableCell>{policy.premium}</TableCell>
                <TableCell>{policy.status}</TableCell>
                <TableCell>{policy.customer}</TableCell>
                <TableCell>
                  <IconButton size="small"><VisibilityIcon fontSize="inherit" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Commission Transactions Table */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h6">Commission Transactions</Typography>
        <IconButton onClick={() => exportToCSV(commissions, 'commissions.csv')}><FileDownloadIcon /></IconButton>
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
            {commissions.slice(0, 10).map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.date}</TableCell>
                <TableCell>{c.amount}</TableCell>
                <TableCell>{c.type}</TableCell>
                <TableCell>{c.status}</TableCell>
                <TableCell>
                  <IconButton size="small"><VisibilityIcon fontSize="inherit" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Other Transactions Table */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h6">Other Transactions</Typography>
        <IconButton onClick={() => exportToCSV(transactions, 'transactions.csv')}><FileDownloadIcon /></IconButton>
      </Stack>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.slice(0, 10).map((t) => (
              <TableRow key={t.id}>
                <TableCell>{t.date}</TableCell>
                <TableCell>{t.type}</TableCell>
                <TableCell>{t.amount}</TableCell>
                <TableCell>{t.status}</TableCell>
                <TableCell>
                  <IconButton size="small"><VisibilityIcon fontSize="inherit" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
} 
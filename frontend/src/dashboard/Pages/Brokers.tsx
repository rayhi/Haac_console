import SmartDataGrid from "../components/SmartDataGrid";
import { Box, Typography, Stack, Button } from "@mui/material";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import CustomButton from "../components/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useState } from "react";

const brokerColumns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "phone", headerName: "Phone", flex: 1 },
  { field: "country", headerName: "Country", flex: 1 },
  { field: "company", headerName: "Company", flex: 1 },
  {field: "status", headerName: "Status", flex: 1},
  {field: "createdAt", headerName: "Created At", flex: 1},
  {field: "updatedAt", headerName: "Updated At", flex: 1},



  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    filterable: false,
    flex: 0.7,
    renderCell: (params) => (
      <Button
        variant="contained"
        size="small"
        onClick={() => alert(`View details for broker ID: ${params.id}`)}
      >
        View More
      </Button>
    ),
  },
];

const brokerRows: GridRowsProp = [
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

export default function Brokers() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Array<number | string>>([]);
  return (
    <Layout
      title="Brokers"
      actions={
        <CustomButton startIcon={<AddIcon />}>Add Broker</CustomButton>
      }
    >
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ md: 12, lg: 12 }}>
          <Box sx={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid size={{ md: 12, xs: 12 }}>
                <Stack
                  sx={{ mb: 2, justifyContent: "space-between", width: "100%" }}
                  direction="row"
                  alignItems="center"
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    All Brokers
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => exportToCSV([...brokerRows], 'brokers.csv')}><FileDownloadIcon /></IconButton>
                    <IconButton
                      onClick={() => {
                        const selectedRows = brokerRows.filter(row => selected.includes(row.id));
                        exportToCSV(selectedRows, 'selected_brokers.csv');
                      }}
                      disabled={selected.length === 0}
                    >
                      <FileDownloadIcon />
                    </IconButton>
                  </Stack>
                </Stack>
                <SmartDataGrid
                  columns={brokerColumns.map(col =>
                    col.field === 'actions' ? {
                      ...col,
                      renderCell: (params) => (
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => navigate(`/brokers/${params.id}`)}
                        >
                          View More
                        </Button>
                      )
                    } : col
                  )}
                  rows={brokerRows}
                  rowSelectionModel={selected}
                  onRowSelectionModelChange={(newSelection) => setSelected(newSelection)}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
}
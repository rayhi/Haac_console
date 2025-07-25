import SmartDataGrid from "../components/SmartDataGrid";
import { Box, Typography, Stack, Button } from "@mui/material";
import { GridColDef, GridRowsProp, GridRenderCellParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import CustomButton from "../components/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";

const customerColumns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "phone", headerName: "Phone", flex: 1 },
  { field: "country", headerName: "Country", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
  { field: "createdAt", headerName: "Date Created", flex: 1 },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    filterable: false,
    flex: 0.7,
    renderCell: (params: GridRenderCellParams) => (
      <Button
        variant="contained"
        size="small"
        // @ts-ignore
        onClick={() => navigate(`/customers/${params.id}`)}
      >
        View More
      </Button>
    ),
  },
];

const customerRows: GridRowsProp = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", country: "Kenya", status: "Active", createdAt: "2021-01-01" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", country: "Kenya", status: "Inactive", createdAt: "2021-02-15" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", phone: "555-123-4567", country: "Kenya", status: "Active", createdAt: "2021-03-10" },
];

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

export default function Customers() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Array<number | string>>([]);

  const columnsWithActions = customerColumns.map(col =>
    col.field === 'actions' ? {
      ...col,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate(`/customers/${params.id}`)}
        >
          View More
        </Button>
      ),
    } : col
  );
  return (
    <Layout
      title="Customers"
      actions={
        <CustomButton startIcon={<AddIcon />}>Add Customer</CustomButton>
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
                    All Customers
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Tooltip title="Export All Customers">
                      <span>
                        <IconButton onClick={() => exportToCSV([...customerRows], 'customers.csv')} sx={{ display: 'flex', alignItems: 'center', height: 36 }}>
                          <Stack direction="row" alignItems="center" spacing={0.5}>
                            <FileDownloadIcon />
                          </Stack>
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Export Selected Customers">
                      <span>
                        <IconButton
                          onClick={() => {
                            const selectedRows = customerRows.filter(row => selected.includes(row.id));
                            exportToCSV(selectedRows, 'selected_customers.csv');
                          }}
                          disabled={selected.length === 0}
                          sx={{ display: 'flex', alignItems: 'center', height: 36 }}
                        >
                          <Stack direction="row" alignItems="center" spacing={0.5}>
                            <FileDownloadIcon color="primary" />
                          </Stack>
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Stack>
                </Stack>
                <SmartDataGrid
                  columns={columnsWithActions}
                  rows={customerRows}
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
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

export const policyColumns: GridColDef[] = [
  { field: "policyNumber", headerName: "Policy No", flex: 1 },
  { field: "holderName", headerName: "Holder", flex: 1 },
  { field: "type", headerName: "Type", flex: 1 },
  { field: "premium", headerName: "Premium", flex: 0.7 },
  {
    field: "status",
    headerName: "Status",
    flex: 0.8,
    renderCell: (params) => (
      <Chip
        label={params.value}
        color={params.value === "Active" ? "success" : "default"}
        size="small"
      />
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    filterable: false,
    flex: 0.9,
    renderCell: (params) => (
      <>
        <IconButton size="small" onClick={() => alert("View " + params.id)}>
          <VisibilityIcon fontSize="inherit" />
        </IconButton>
        <IconButton size="small" onClick={() => alert("Edit " + params.id)}>
          <EditIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          size="small"
          color="error"
          onClick={() => alert("Delete " + params.id)}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </>
    ),
  },
];

export const policyRows: GridRowsProp = [
  {
    id: 1,
    policyNumber: "P-102938",
    holderName: "Jane Wanjiku",
    type: "Motor",
    premium: "KES 12,000",
    status: "Active",
  },
  {
    id: 2,
    policyNumber: "P-304958",
    holderName: "John Otieno",
    type: "Health",
    premium: "KES 18,500",
    status: "Expired",
  },
  {
    id: 3,
    policyNumber: "P-384029",
    holderName: "Grace Muli",
    type: "Home",
    premium: "KES 25,000",
    status: "Active",
  },
  {
    id: 4,
    policyNumber: "P-102938",
    holderName: "Jane Wanjiku",
    type: "Motor",
    premium: "KES 12,000",
    status: "Active",
  },
  {
    id: 5,
    policyNumber: "P-304958",
    holderName: "John Otieno",
    type: "Health",
    premium: "KES 18,500",
    status: "Expired",
  },
  {
    id: 6,
    policyNumber: "P-384029",
    holderName: "Grace Muli",
    type: "Home",
    premium: "KES 25,000",
    status: "Active",
  },
  {
    id: 7,
    policyNumber: "P-102938",
    holderName: "Jane Wanjiku",
    type: "Motor",
    premium: "KES 12,000",
    status: "Active",
  },
  {
    id: 8,
    policyNumber: "P-304958",
    holderName: "John Otieno",
    type: "Health",
    premium: "KES 18,500",
    status: "Expired",
  },
  {
    id: 9,
    policyNumber: "P-384029",
    holderName: "Grace Muli",
    type: "Home",
    premium: "KES 25,000",
    status: "Active",
  },
];

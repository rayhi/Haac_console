import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Chip from "@mui/material/Chip";
import CustomButton from "../../components/CustomButton";





export const claimsColumns: GridColDef[] = [
  { field: "description", headerName: "Claim Description", flex: 1.5 },
  { field: "claimId", headerName: "Claim ID", flex: 1 },
  { field: "initiationDate", headerName: "Initiation", flex: 1 },
  { field: "claimAmount", headerName: "Claim Amount", flex: 1 },
  { field: "settledAmount", headerName: "Amount Settled", flex: 1 },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        color={
          params.value === "Approved"
            ? "success"
            : params.value === "Declined"
            ? "error"
            : "warning"
        }
      />
    ),
  },
  {
    field: "actions",
    headerName: "",
    sortable: false,
    filterable: false,
    flex: 0.7,
    renderCell: () => (
      <CustomButton
        style={{
          padding: "6px 14px",
          fontSize: "0.85rem",
          borderRadius: "8px",
          backgroundColor: "transparent",
          color: "hsl(168, 76%, 27%)",
          border: "1px solid hsl(168, 76%, 27%)",
        }}
      >
        View EOB
      </CustomButton>
    ),
  },
];

export const claimsRows: GridRowsProp = [
  {
    id: 1,
    description: "Provider visit at Medbay",
    claimId: "2342-7454-3453",
    initiationDate: "11/10/2022",
    claimAmount: "$480.00",
    settledAmount: "$480.00",
    status: "Pending",
  },
  {
    id: 2,
    description: "Recurring monthly prescription",
    claimId: "8789-6778-9123",
    initiationDate: "10/01/2022",
    claimAmount: "$620.00",
    settledAmount: "$620.00",
    status: "Approved",
  },
  {
    id: 3,
    description: "Half-yearly checkup",
    claimId: "4587-6543-9876",
    initiationDate: "12/01/2022",
    claimAmount: "$600.00",
    settledAmount: "$0.00",
    status: "Declined",
  },
  {
    id: 4,
    description: "Provider visit at Medbay",
    claimId: "2342-7454-3453",
    initiationDate: "11/10/2022",
    claimAmount: "$480.00",
    settledAmount: "$480.00",
    status: "Pending",
  },
  {
    id: 5,
    description: "Recurring monthly prescription",
    claimId: "8789-6778-9123",
    initiationDate: "10/01/2022",
    claimAmount: "$620.00",
    settledAmount: "$620.00",
    status: "Approved",
  },
  {
    id: 6,
    description: "Half-yearly checkup",
    claimId: "4587-6543-9876",
    initiationDate: "12/01/2022",
    claimAmount: "$600.00",
    settledAmount: "$0.00",
    status: "Declined",
  },
  {
    id: 7,
    description: "Provider visit at Medbay",
    claimId: "2342-7454-3453",
    initiationDate: "11/10/2022",
    claimAmount: "$480.00",
    settledAmount: "$480.00",
    status: "Pending",
  },
  {
    id: 8,
    description: "Recurring monthly prescription",
    claimId: "8789-6778-9123",
    initiationDate: "10/01/2022",
    claimAmount: "$620.00",
    settledAmount: "$620.00",
    status: "Approved",
  },
  {
    id: 9,
    description: "Half-yearly checkup",
    claimId: "4587-6543-9876",
    initiationDate: "12/01/2022",
    claimAmount: "$600.00",
    settledAmount: "$0.00",
    status: "Declined",
  },
  {
    id: 10,
    description: "Half-yearly checkup",
    claimId: "4587-6543-9876",
    initiationDate: "12/01/2022",
    claimAmount: "$600.00",
    settledAmount: "$0.00",
    status: "Declined",
  },
  {
    id: 11,
    description: "Provider visit at Medbay",
    claimId: "2342-7454-3453",
    initiationDate: "11/10/2022",
    claimAmount: "$480.00",
    settledAmount: "$480.00",
    status: "Pending",
  },
  {
    id: 12,
    description: "Recurring monthly prescription",
    claimId: "8789-6778-9123",
    initiationDate: "10/01/2022",
    claimAmount: "$620.00",
    settledAmount: "$620.00",
    status: "Approved",
  },
  {
    id: 13,
    description: "Half-yearly checkup",
    claimId: "4587-6543-9876",
    initiationDate: "12/01/2022",
    claimAmount: "$600.00",
    settledAmount: "$0.00",
    status: "Declined",
  },
];

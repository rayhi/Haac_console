import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbar,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import AddUserModal from ".././Modals/UserModal";
import api from "../../../hooks/api";
import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  role: string;
  email: string;
}

export default function UsersTable() {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const Navigate = useNavigate();
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleUserAdded = (newUser: User) => {
    setRows((prevRows) => [...prevRows, newUser]);
  };
  //  Modal code above

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No token found, please log in.");
          Navigate("/");
          return;
        }
        const response = await api.get("users/getall", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.result;
        console.log(data);

        const formattedRows = data.map((item: any, index: number) => ({
          id: item.id,
          ID: index + 1,
          firstname: item.firstname,
          othernames: item.othernames,
          email: item.email,
          role: item.role,
          verified: item.is_verified || "Null",
          // status: item.status === 1 ? "Active" : "Inactive", // Assuming status 1 = Active Format createdAt
        }));

        setRows(formattedRows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [Navigate]);
  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ID", width: 100 },
    {
      field: "firstname",
      headerName: "FirstName",
      width: 150,
    },
    {
      field: "othernames",
      headerName: "Name",
      width: 150,
    },

    {
      field: "email",
      headerName: "Email",

      align: "left",
      minWidth: 200,
      editable: true,
    },

    {
      field: "role",
      headerName: "Role",
      width: 100,
      editable: true,
    },
    { field: "verified", headerName: "Verified", width: 100 },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <Box
        sx={{
          height: 500,
          width: "100%",
        }}
      >
        <Stack
          sx={{ mb: 2, justifyContent: "space-between", width: "100%" }}
          direction="row"
        >
          <Typography component="h2" variant="h6">
            Users
          </Typography>
          <Button
            variant="contained"
            size="small"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenModal}
            // onClick={handleClick}
          >
            Add new User
          </Button>
        </Stack>
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            //   toolbar: EditToolbar as GridSlots["toolbar"],
            toolbar: GridToolbar,
          }}
          slotProps={{
            // toolbar: { setRows, setRowModesModel },
          }}
        />
        <AddUserModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onUserAdded={handleUserAdded}
        />
      </Box>
    </Box>
  );
}

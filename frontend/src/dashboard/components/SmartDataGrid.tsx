import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

interface SmartDataGridProps {
  columns: GridColDef[];
  rows: GridRowsProp;
  rowSelectionModel?: (number | string)[];
  onRowSelectionModelChange?: (newSelection: (number | string)[]) => void;
}

export default function SmartDataGrid({ columns, rows, rowSelectionModel, onRowSelectionModelChange }: SmartDataGridProps) {
  return (
    <DataGrid
      checkboxSelection
      sx={{
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "16px",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
      columns={columns}
      rows={rows}
      rowSelectionModel={rowSelectionModel}
      onRowSelectionModelChange={(newSelection) => {
        if (onRowSelectionModelChange) {
          onRowSelectionModelChange(newSelection as (number | string)[]);
        }
      }}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      density="compact"
    />
  );
}

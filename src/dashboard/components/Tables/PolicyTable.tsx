import SmartDataGrid from "../SmartDataGrid";
import { policyColumns, policyRows } from "../../internals/data/PolicyData";
import { Box, Typography ,Stack} from "@mui/material";
import CustomButton from "../CustomButton";

export default function PoliciesTable() {
  return (
    <Box>
      <Stack
        sx={{ mb: 2, justifyContent: "space-between", width: "100%" }}
        direction="row"
        alignItems="center"
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          All Policies
        </Typography>
        <CustomButton >View All</CustomButton>
      </Stack>

      <SmartDataGrid columns={policyColumns} rows={policyRows} />
      
    </Box>
  );
}

import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";
import AppNavbar from "./AppNavbar";
import Header from "./Header";
import SideMenu from "./SideMenu";
import PageHeader from "./PageHeader"; 
import Copyright from "../internals/components/Copyright";
import AppTheme from "../../shared-theme/AppTheme";
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "../theme/customizations";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

type LayoutProps = {
  title?: string;
  actions?: React.ReactNode; 
  children: React.ReactNode;
  disableCustomTheme?: boolean;
};


export default function Layout({
  title,
  actions,
  children,
  disableCustomTheme,
}: // fullWidth = false,
LayoutProps) {
  return (
    <AppTheme
      disableCustomTheme={disableCustomTheme}
      themeComponents={xThemeComponents}
    >
      <CssBaseline enableColorScheme />

      <Box sx={{ display: "flex", minHeight: "100vh", minWidth: "100vw" }}>
        {/* Sidebar */}
        <SideMenu />

        {/* Main Content Area */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
          })}
        >
          {/* Top Navbar */}
          <AppNavbar />

          {/* Page Content + Footer */}
          <Stack
  spacing={2}
  sx={{
    height: "100vh",
    mx: 3,
    mt: { xs: 8, md: 0 },
  }}
>
  <Header />

  <Box
    sx={{
      flexGrow: 1, // 🪄 Push footer down
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      width: "100%",
      maxWidth: { sm: "100%", md: "1700px" },
    }}
  >
    <PageHeader title={title} actions={actions} />
    {children}
  </Box>

  <Box sx={{ py: 3, textAlign: "center" }}>
    <Copyright />
  </Box>
</Stack>

      
        </Box>
      </Box>
    </AppTheme>
  );
}

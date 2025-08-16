
import Stack from '@mui/material/Stack';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
// import CustomDatePicker from './CustomDatePicker';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import MenuButton from './MenuButton';
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import Search from './Search';

export default function Header() {
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: "none", md: "flex" },
        width: "100%",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        maxWidth: { sm: "100%", md: "1700px" },
        pt: 1.5,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs />
      <Stack direction="row" sx={{ gap: 1 }}>
        <Search />
        {/* <CustomDatePicker /> */}
        <MenuButton
          showBadge
          aria-label="Open notifications"
          onClick={() => navigate("/notifications")}
        >
          {/* <MenuButton showBadge > */}
          <NotificationsRoundedIcon />
        </MenuButton>
        <MenuButton
          showBadge
          aria-label="Open settings"
          onClick={() => navigate("/settings")}
        >
          {/* <MenuButton showBadge > */}
          <SettingsIcon />
        </MenuButton>
      </Stack>
    </Stack>
  );
}

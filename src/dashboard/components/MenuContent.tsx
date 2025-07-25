import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Stack,
} from "@mui/material";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import CollectionsIcon from "@mui/icons-material/Collections";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import AutoGraphRoundedIcon from "@mui/icons-material/AutoGraphRounded";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

//  Navigation config
const navItems = [
  { label: "Dashboard", icon: <HomeRoundedIcon />, href: "/dashboard" },
  { label: "Policies", icon: <FactCheckIcon />, href: "/policies" },
  { label: "Brokers", icon: <PeopleOutlineRoundedIcon />, href: "/brokers" },
  {
    label: "Service Providers",
    icon: <PeopleOutlineRoundedIcon />,
    href: "/service-providers",
  },
  {
    label: "Customers",
    icon: <PeopleOutlineRoundedIcon />,
    href: "/customers",
  },
  { label: "Insurance Products", icon: <CollectionsIcon />, href: "/insurance" },
  { label: "Claims", icon: <VerifiedRoundedIcon />, href: "/claims" },
  {
    label: "Users",
    icon: <PeopleOutlineRoundedIcon />,
    children: [
      {
        label: "Brokers",
        icon: <PeopleOutlineRoundedIcon />,
        href: "/users/brokers",
      },
      {
        label: "Service Providers",
        icon: <PeopleOutlineRoundedIcon />,
        href: "/users/service-providers",
      },
      {
        label: "Customers",
        icon: <PeopleOutlineRoundedIcon />,
        href: "/users/customers",
      },
    ],
  },
  {
    label: "Payments",
    icon: <PaymentsRoundedIcon />,
    children: [
      {
        label: "Payment History",
        icon: <PaymentsRoundedIcon />,
        href: "/payments/history",
      },
      {
        label: "Reconciliation Reports",
        icon: <PaymentsRoundedIcon />,
        href: "/payments/reports",
      },
    ],
  },
  {
    label: "Reports & Analytics",
    icon: <AutoGraphRoundedIcon />,
    children: [
      {
        label: "General reports",
        icon: <AutoGraphRoundedIcon />,
        href: "/reports/general-reports",
      },
      {
        label: "Claims Reports",
        icon: <VerifiedRoundedIcon />,
        href: "/reports/claimsReport",
      },
      {
        label: "Payment Trends",
        icon: <PaymentsRoundedIcon />,
        href: "/reports/payment-trends",
      },
    ],
  },
];


//NavItem
const NavItem = ({ item, level = 0 }: { item: any; level?: number }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => location.pathname.startsWith(path);

  const handleToggle = () => setOpen(!open);

  if (item.children) {
    const isParentActive = item.children.some((child: any) =>
      isActive(child.href)
    );
    return (
      <>
        <ListItem disablePadding>
          <ListItemButton onClick={handleToggle} selected={isParentActive}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.label}
              sx={{ color: "#254A46", font: "bold" }}
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child: any, index: number) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  component={Link}
                  to={child.href}
                  selected={isActive(child.href)}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "#254A46 !important",
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "#18424A !important",
                    },
                    pl: 4 + level * 2,
                  }}
                >
                  {/* <ListItemIcon>
                    {child.icon || <PeopleOutlineRoundedIcon />}{" "}
                    {/* Fallback icon if none */}
                  {/* </ListItemIcon>  */}
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    {React.cloneElement(
                      child.icon || <PeopleOutlineRoundedIcon />,
                      {
                        sx: {
                          color:
                            location.pathname === child.href
                              ? "#FFFFFF !important"
                              : "#F47105 !important", // Add !important
                          fontSize: 24,
                        },
                      }
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={child.label}
                    sx={{
                      color:
                        location.pathname === child.href
                          ? "#FFFFFF "
                          : "primary.main",
                      fontWeight: "bold",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItem disablePadding>
      <ListItemButton
        component={Link}
        to={item.href}
        selected={isActive(item.href)}
        sx={{
          "&.Mui-selected": {
            backgroundColor: "#254A46 !important",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "#254A46",
          },
          // "&:hover .MuiSvgIcon-root": {
          //   color: "#F47105", // hover icon
          // },
        }}
      >
        <ListItemIcon sx={{ minWidth: 32 }}>
         {React.cloneElement(item.icon, {
            sx: {
              color:
                location.pathname === item.href
                  ? "#FFFFFF !important"
                  :  "#F47105 !important", // Add !important
              fontSize: 24,
            },
          })}
        </ListItemIcon>
        <ListItemText
          primary={item.label}
          sx={{
            color:
              location.pathname === item.href ? "#FFFFFF " : "primary.main",
            fontWeight: "bold",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

// 👉 Main MenuContent component
const MenuContent: React.FC = () => {
  return (
    <Stack sx={{ flexGrow: 1, p: 1 }}>
      <List dense>
        {navItems.map((item, index) => (
          <NavItem key={index} item={item} />
        ))}
      </List>
    </Stack>
  );
};

export default MenuContent;

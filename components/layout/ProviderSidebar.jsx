import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";

import logo from "../../assets/LOGO.png";

export const providerSidebarWidth = 280;

export default function ProviderSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/provider/dashboard",
      icon: <DashboardRoundedIcon sx={{ fontSize: 22 }} />,
    },
    {
      label: "Profile",
      path: "/provider/profile",
      icon: <PersonRoundedIcon sx={{ fontSize: 22 }} />,
    },
    {
      label: "My Services",
      path: "/provider/my-services",
      icon: <WorkRoundedIcon sx={{ fontSize: 22 }} />,
    },
    {
      label: "Create Service",
      path: "/provider/create-service",
      icon: <AddCircleRoundedIcon sx={{ fontSize: 22 }} />,
    },
    {
      label: "Browse Requests",
      path: "/provider/browse-requests",
      icon: <StorefrontRoundedIcon sx={{ fontSize: 22 }} />,
    },
    {
      label: "Provider Bookings",
      path: "/provider/bookings",
      icon: <CalendarMonthRoundedIcon sx={{ fontSize: 22 }} />,
    },
    {
      label: "Earnings",
      path: "/provider/earning",
      icon: <AccountBalanceWalletRoundedIcon sx={{ fontSize: 22 }} />,
    },
    {
      label: "Chat",
      path: "/provider/chat",
      icon: <ChatRoundedIcon sx={{ fontSize: 22 }} />,
    },
    {
      label: "Switch to User",
      path: "/user/dashboard",
      icon: <PersonRoundedIcon sx={{ fontSize: 22 }} />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        width: providerSidebarWidth,
        minHeight: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        px: 2.3,
        py: 3,
        bgcolor: "#FBF8FE",
        borderRight: "1px solid #EEE6F5",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        zIndex: 1200,
      }}
    >
      <Box>
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.6,
            mb: 4,
            px: 1,
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="SkillSwap"
            sx={{
              width: 56,
              height: 56,
              borderRadius: "18px",
              objectFit: "cover",
              boxShadow: "0 10px 20px rgba(141,111,232,0.10)",
              bgcolor: "#fff",
            }}
          />
          <Box>
            <Typography
              sx={{
                fontSize: "2rem",
                fontWeight: 900,
                color: "#5D46A4",
                lineHeight: 1,
                letterSpacing: "-0.5px",
              }}
            >
              SkillSwap
            </Typography>
          </Box>
        </Box>

        {/* Menu */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
  <Button
    key={item.path}
    component={Link}
    to={item.path}
    startIcon={item.icon}
    sx={{
      justifyContent: "flex-start",
      textTransform: "none",
      borderRadius: "20px",
      px: 1.8,
      py: 1.7,
      fontSize: "1rem",
      fontWeight: 800,
      ...(item.label === "Switch to User"
        ? {
            color: "#7b4cff",
            bgcolor: "#f0e8ff",
            border: "1px solid #d4bfff",
            mt: 1,
            "& .MuiButton-startIcon": { mr: 1.2, color: "#7b4cff" },
            "&:hover": { bgcolor: "#e6d9ff" },
          }
        : {
            color: isActive ? "#6E54D7" : "#5E5674",
            bgcolor: isActive ? "#EDE1FF" : "transparent",
            boxShadow: isActive ? "0 10px 20px rgba(141,111,232,0.10)" : "none",
            "& .MuiButton-startIcon": { mr: 1.2, color: isActive ? "#6E54D7" : "#6A627E" },
            "&:hover": { bgcolor: isActive ? "#E9DBFF" : "#F4EEFB" },
          }),
    }}
  >
    {item.label}
  </Button>
);
          })}
        </Box>
      </Box>

      {/* Logout */}
      <Button
        onClick={handleLogout}
        startIcon={<LogoutRoundedIcon />}
        sx={{
          justifyContent: "flex-start",
          textTransform: "none",
          borderRadius: "20px",
          px: 1.8,
          py: 1.6,
          fontSize: "1rem",
          fontWeight: 800,
          color: "#7A4A63",
          bgcolor: "#FBE3EC",
          "& .MuiButton-startIcon": {
            mr: 1.2,
          },
          "&:hover": {
            bgcolor: "#F8D7E5",
          },
        }}
      >
        Logout
      </Button>
    </Box>
  );
}

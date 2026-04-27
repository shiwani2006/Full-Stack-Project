import React from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Avatar,
  Button,
  Grid,
  Badge,
  InputBase,
  Divider,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import HomeRepairServiceRoundedIcon from "@mui/icons-material/HomeRepairServiceRounded";
import BookOnlineRoundedIcon from "@mui/icons-material/BookOnlineRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const sidebarWidth = 290;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    name: "Shiwani",
    role: "admin",
  };

  const adminMenu = [
    { icon: <DashboardRoundedIcon />, label: "Dashboard", path: "/admin" },
    { icon: <PersonRoundedIcon />, label: "Users", path: "/admin/users" },
    { icon: <HomeRepairServiceRoundedIcon />, label: "Services", path: "/admin/services" },
    { icon: <BookOnlineRoundedIcon />, label: "Bookings", path: "/admin/bookings" },
    { icon: <AccountBalanceWalletRoundedIcon />, label: "Payments", path: "/admin/payments" },
    { icon: <ChatRoundedIcon />, label: "Support", path: "/chat" },
  ];

  const statCards = [
    {
      title: "Total Services",
      value: "20",
      subtitle: "Live service listings",
      icon: <StorefrontRoundedIcon />,
      bg: "#DDECF8",
    },
    {
      title: "Total Bookings",
      value: "120",
      subtitle: "Completed + pending",
      icon: <AssignmentTurnedInRoundedIcon />,
      bg: "#F3DDEB",
    },
    {
      title: "Payment Logs",
      value: "35",
      subtitle: "Recent transactions",
      icon: <PaymentsRoundedIcon />,
      bg: "#DDECC0",
    },
  ];

  const activities = [
    {
      title: "New provider account",
      desc: "A provider has requested a provider account",
      time: "10 min ago",
      bg: "#E9DCF6",
    },
    {
      title: "Service approved",
      desc: "A plumbing service was approved",
      time: "25 min ago",
      bg: "#DDECF8",
    },
    {
      title: "Booking issue",
      desc: "A user raised an issue with a booking",
      time: "1 hour ago",
      bg: "#F2DCE9",
    },
  ];

  const approvals = [
    {
      title: "Kitchen Cleaning",
      name: "Rohit Sharma",
      status: "Pending",
      statusBg: "#F2E2A8",
    },
    {
      title: "Animal Care",
      name: "Priya Thakur",
      status: "Pending",
      statusBg: "#F2E2A8",
    },
    {
      title: "Repair Service",
      name: "Aman Sood",
      status: "Review",
      statusBg: "#D8E5FB",
    },
  ];

  const alerts = [
    {
      icon: <WarningAmberRoundedIcon />,
      title: "3 unresolved disputes",
      subtitle: "Needs review by admin",
      bg: "#F5E4B0",
      iconColor: "#E68A00",
    },
    {
      icon: <VerifiedRoundedIcon />,
      title: "8 services verified",
      subtitle: "Approved today",
      bg: "#D7F0D8",
      iconColor: "#1E9B4F",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        bgcolor: "#F8F5FC",
        backgroundImage: `
          radial-gradient(circle at 5% 10%, rgba(233,213,255,0.75) 0, transparent 18%),
          radial-gradient(circle at 92% 8%, rgba(219,234,254,0.85) 0, transparent 22%),
          radial-gradient(circle at 88% 82%, rgba(220,252,231,0.65) 0, transparent 18%)
        `,
      }}
    >
      {/* SIDEBAR */}
      <Box
        sx={{
          width: sidebarWidth,
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          p: 2.2,
          bgcolor: "rgba(255,255,255,0.74)",
          backdropFilter: "blur(18px)",
          borderRight: "1px solid #EEE6F5",
          boxShadow: "10px 0 30px rgba(120,100,160,0.05)",
          zIndex: 20,
          overflowY: "auto",
        }}
      >
        <Typography
          sx={{
            fontSize: "2.35rem",
            fontWeight: 900,
            color: "#5B4B8A",
            px: 1,
            pt: 2,
            pb: 3,
            letterSpacing: "-0.8px",
          }}
        >
          SkillSwap
        </Typography>

        <Stack spacing={1.2}>
          {adminMenu.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <Box
                key={index}
                onClick={() => navigate(item.path)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.6,
                  px: 2,
                  py: 1.5,
                  borderRadius: "20px",
                  cursor: "pointer",
                  color: isActive ? "#6B4FD3" : "#615978",
                  bgcolor: isActive ? "#EDE3FB" : "transparent",
                  fontWeight: isActive ? 700 : 500,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "#F4EEFB",
                    color: "#6B4FD3",
                    transform: "translateX(4px)",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>{item.icon}</Box>
                <Typography sx={{ fontSize: "1rem" }}>{item.label}</Typography>
              </Box>
            );
          })}
        </Stack>
      </Box>

      {/* MAIN */}
      <Box
        sx={{
          flex: 1,
          ml: `${sidebarWidth}px`,
          p: { xs: 2, md: 3 },
        }}
      >
        {/* TOPBAR */}
        <Paper
          elevation={0}
          sx={{
            mb: 3,
            px: { xs: 2, md: 3.5 },
            py: 2.4,
            borderRadius: "32px",
            bgcolor: "rgba(255,255,255,0.74)",
            backdropFilter: "blur(18px)",
            border: "1px solid #EEE6F5",
            boxShadow: "0 14px 30px rgba(163,135,194,0.10)",
          }}
        >
          <Stack spacing={2}>
            <Typography
              sx={{
                fontSize: { xs: "1.9rem", md: "2.4rem" },
                fontWeight: 900,
                color: "#54486E",
                lineHeight: 1.05,
                letterSpacing: "-0.8px",
              }}
            >
              Service Marketplace
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flexWrap: "wrap",
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.2,
                    px: 2.2,
                    height: 68,
                    borderRadius: "22px",
                    bgcolor: "#F4EEF7",
                    minWidth: { xs: "100%", sm: 320, md: 380 },
                    flex: { xs: "1 1 100%", md: "0 1 390px" },
                    border: "1px solid #EEE5F4",
                  }}
                >
                  <SearchRoundedIcon sx={{ color: "#8C7FA4", fontSize: 26 }} />
                  <InputBase
                    fullWidth
                    placeholder="Search users, services, bookings..."
                    sx={{
                      color: "#5A536B",
                      fontSize: "1rem",
                      "& input::placeholder": {
                        color: "#A79CB7",
                        opacity: 1,
                      },
                    }}
                  />
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    width: 68,
                    height: 68,
                    borderRadius: "22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#F6F1F9",
                    border: "1px solid #EEE5F4",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 10px 24px rgba(155,125,190,0.14)",
                    },
                  }}
                >
                  <Badge badgeContent={3} color="error">
                    <NotificationsRoundedIcon sx={{ color: "#5A536B", fontSize: 26 }} />
                  </Badge>
                </Paper>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 1.2, md: 1.8 },
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Avatar
                    sx={{
                      width: 52,
                      height: 52,
                      mx: "auto",
                      mb: 0.5,
                      bgcolor: "#C9B3EF",
                      color: "#4E425D",
                      fontWeight: 800,
                    }}
                  >
                    {(storedUser.name || "S").charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography
                    sx={{
                      color: "#6A5D85",
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      lineHeight: 1.1,
                    }}
                  >
                    Hi, {storedUser.name || "Shiwani"}
                  </Typography>
                </Box>

                <Button
                  onClick={() => navigate("/admin")}
                  sx={{
                    color: "#4F4662",
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "1rem",
                    borderRadius: "14px",
                    px: 2,
                    py: 1.1,
                    "&:hover": { bgcolor: "#F3E8FF" },
                  }}
                >
                  Dashboard
                </Button>

                <Button
                  onClick={() => navigate("/profile")}
                  sx={{
                    color: "#4F4662",
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "1rem",
                    borderRadius: "14px",
                    px: 2,
                    py: 1.1,
                    "&:hover": { bgcolor: "#F3E8FF" },
                  }}
                >
                  Profile
                </Button>

                <Button
                  variant="contained"
                  startIcon={<LogoutRoundedIcon />}
                  onClick={handleLogout}
                  sx={{
                    bgcolor: "#F2C8D0",
                    color: "#5A4452",
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "1rem",
                    borderRadius: "18px",
                    px: 3,
                    py: 1.2,
                    minWidth: 140,
                    boxShadow: "none",
                    "&:hover": {
                      bgcolor: "#EFBAC5",
                    },
                  }}
                >
                  Logout
                </Button>
              </Box>
            </Box>
          </Stack>
        </Paper>

        {/* PAGE HEADER */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            mb: 3,
            borderRadius: "32px",
            bgcolor: "rgba(255,255,255,0.65)",
            backdropFilter: "blur(14px)",
            border: "1px solid #EEE6F5",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 900,
              color: "#1F1C2E",
              lineHeight: 1.08,
              mb: 1.5,
              letterSpacing: "-0.8px",
            }}
          >
            Admin Dashboard
          </Typography>

          <Typography
            sx={{
              fontSize: "1.02rem",
              color: "#657084",
              lineHeight: 1.9,
              maxWidth: "760px",
            }}
          >
            Manage users, verify services, monitor bookings, and keep the SkillSwap
            community running smoothly with a cleaner premium admin panel.
          </Typography>
        </Paper>

        {/* STATS */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {statCards.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: "28px",
                  bgcolor: item.bg,
                  border: "1px solid rgba(120,100,160,0.08)",
                  minHeight: 190,
                  boxShadow: "0 10px 24px rgba(120,100,160,0.06)",
                }}
              >
                <Box
                  sx={{
                    width: 54,
                    height: 54,
                    borderRadius: "18px",
                    bgcolor: "rgba(255,255,255,0.55)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#4D4961",
                    mb: 2.5,
                  }}
                >
                  {item.icon}
                </Box>

                <Typography
                  sx={{
                    fontSize: "1rem",
                    color: "#37496A",
                    mb: 1,
                    fontWeight: 500,
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "2.6rem",
                    color: "#0F2240",
                    fontWeight: 500,
                    lineHeight: 1,
                    mb: 1.5,
                  }}
                >
                  {item.value}
                </Typography>

                <Typography
                  sx={{
                    color: "#5B6A7F",
                    fontSize: "0.98rem",
                  }}
                >
                  {item.subtitle}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* LOWER SECTION */}
        <Grid container spacing={3}>
          {/* RECENT ACTIVITY */}
          <Grid item xs={12} lg={4}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "30px",
                bgcolor: "rgba(255,255,255,0.72)",
                border: "1px solid #EAE2F3",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2.5,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: 800,
                    color: "#201B2E",
                  }}
                >
                  Recent Activity
                </Typography>

                <Typography
                  sx={{
                    color: "#6A53F5",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  View all
                </Typography>
              </Box>

              <Stack spacing={2.2}>
                {activities.map((item, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      p: 2.2,
                      borderRadius: "22px",
                      bgcolor: item.bg,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 800,
                          color: "#2A2440",
                          fontSize: "1.02rem",
                        }}
                      >
                        {item.title}
                      </Typography>

                      <Box
                        sx={{
                          px: 1.4,
                          py: 0.55,
                          borderRadius: "999px",
                          bgcolor: "rgba(255,255,255,0.75)",
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          color: "#37496A",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.time}
                      </Box>
                    </Box>

                    <Typography
                      sx={{
                        color: "#4F5D75",
                        lineHeight: 1.7,
                        fontSize: "0.97rem",
                      }}
                    >
                      {item.desc}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </Paper>
          </Grid>

          {/* APPROVALS */}
          <Grid item xs={12} lg={4}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "30px",
                bgcolor: "rgba(255,255,255,0.72)",
                border: "1px solid #EAE2F3",
                height: "100%",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  color: "#201B2E",
                  mb: 2.5,
                }}
              >
                Pending Approvals
              </Typography>

              <Stack spacing={2}>
                {approvals.map((item, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      p: 2.1,
                      borderRadius: "22px",
                      bgcolor: "#F8F8FB",
                      border: "1px solid #EEEAF4",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 1,
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "1rem",
                            fontWeight: 700,
                            color: "#1F1A2D",
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#687488",
                            mt: 0.4,
                          }}
                        >
                          {item.name}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          px: 1.6,
                          py: 0.7,
                          borderRadius: "999px",
                          bgcolor: item.statusBg,
                          color: "#2D3B57",
                          fontWeight: 800,
                          fontSize: "0.9rem",
                        }}
                      >
                        {item.status}
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Stack>

              <Divider sx={{ my: 2.4 }} />

              <Button
                fullWidth
                variant="outlined"
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  textTransform: "none",
                  borderRadius: "16px",
                  py: 1.2,
                  fontWeight: 700,
                  borderColor: "#D7CEE8",
                  color: "#514A67",
                  "&:hover": {
                    borderColor: "#BFB4DA",
                    bgcolor: "#FAF7FF",
                  },
                }}
              >
                Review All Requests
              </Button>
            </Paper>
          </Grid>

          {/* ALERTS */}
          <Grid item xs={12} lg={4}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "30px",
                bgcolor: "rgba(255,255,255,0.72)",
                border: "1px solid #EAE2F3",
                height: "fit-content",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  color: "#201B2E",
                  mb: 2.5,
                }}
              >
                Admin Alerts
              </Typography>

              <Stack spacing={2.2}>
                {alerts.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        bgcolor: item.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: item.iconColor,
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </Box>

                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: "#1E1A2B",
                          fontSize: "1rem",
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#697487",
                          mt: 0.3,
                        }}
                      >
                        {item.subtitle}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
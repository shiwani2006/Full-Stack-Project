import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  InputBase,
  Button,
  Badge,
  Avatar,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

export default function Topbar({ title = "Dashboard" }) {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Shiwani",
    role: "user",
  };

  const handleSearch = () => {
    const value = searchText.trim();
    if (!value) {
      navigate("/services");
      return;
    }
    navigate(`/services?search=${encodeURIComponent(value)}`);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Paper
      elevation={0}
      sx={{
        mb: 3,
        px: { xs: 2, sm: 2.5, md: 3.5 },
        py: { xs: 2, md: 2.2 },
        borderRadius: "32px",
        bgcolor: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(18px)",
        border: "1px solid #EEE6F5",
        boxShadow: "0 14px 30px rgba(163,135,194,0.10)",
      }}
    >
      <Stack spacing={2}>
        <Typography
          sx={{
            fontSize: { xs: "1.8rem", md: "2.2rem" },
            fontWeight: 800,
            color: "#54486E",
            lineHeight: 1.1,
          }}
        >
          {title}
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
                bgcolor: "#F3EDF7",
                minWidth: { xs: "100%", sm: 320, md: 400 },
                flex: { xs: "1 1 100%", md: "0 1 420px" },
                border: "1px solid #EEE5F4",
              }}
            >
              <SearchRoundedIcon sx={{ color: "#8C7FA4", fontSize: 28 }} />
              <InputBase
                fullWidth
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search skills, chats, bookings..."
                sx={{
                  color: "#5A536B",
                  fontSize: "1.05rem",
                  "& input::placeholder": {
                    color: "#A79CB7",
                    opacity: 1,
                  },
                }}
              />
              <Button
                onClick={handleSearch}
                variant="contained"
                sx={{
                  minWidth: "auto",
                  px: 2,
                  py: 1,
                  borderRadius: "14px",
                  textTransform: "none",
                  fontWeight: 700,
                  bgcolor: "#8D6FE8",
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: "#7C5FE0",
                  },
                }}
              >
                Search
              </Button>
            </Paper>

            <Paper
              elevation={0}
              onClick={() => navigate("/chat")}
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
                <NotificationsRoundedIcon sx={{ color: "#5A536B", fontSize: 28 }} />
              </Badge>
            </Paper>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "flex-start", md: "flex-end" },
              gap: { xs: 1.2, md: 1.8 },
              flexWrap: "wrap",
            }}
          >
            <Typography
              sx={{
                color: "#6A5D85",
                fontSize: { xs: "1rem", md: "1.05rem" },
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              Hi, {user.name || "Shiwani"}
            </Typography>

            <Avatar
              sx={{
                width: 58,
                height: 58,
                bgcolor: "#B494F0",
                color: "#fff",
                fontWeight: 800,
                fontSize: "1.5rem",
                boxShadow: "0 10px 24px rgba(183,155,232,0.34)",
              }}
            >
              {(user.name || "S").charAt(0).toUpperCase()}
            </Avatar>

            <Button
              onClick={() =>
                navigate(user.role === "provider" ? "/provider/dashboard" : "/user/dashboard")
              }
              sx={{
                color: "#4F4662",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "1rem",
                borderRadius: "14px",
                px: 2,
                py: 1.2,
                minWidth: "auto",
                "&:hover": { bgcolor: "#F3E8FF" },
              }}
            >
              Dashboard
            </Button>

            <Button
              onClick={() =>
                navigate(user.role === "provider" ? "/provider/profile" : "/user/profile")
              }
              sx={{
                color: "#4F4662",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "1rem",
                borderRadius: "14px",
                px: 2,
                py: 1.2,
                minWidth: "auto",
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
                bgcolor: "#EFC5CC",
                color: "#5A4452",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "1rem",
                borderRadius: "20px",
                px: 3,
                py: 1.4,
                minWidth: 150,
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "#E9B7C0",
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
}
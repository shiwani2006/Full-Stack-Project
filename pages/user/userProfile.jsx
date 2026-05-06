import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Grid,
  Button,
  Stack,
  TextField,
  Chip,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import UserSidebar, { sidebarWidth } from "../../components/layout/UserSidebar";
import UserTopbar from "../../components/layout/UserTopbar";
import axiosInstance from "../../services/axiosInstance";

export default function UserProfile() {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    name: "User",
    email: "user@example.com",
    role: "user",
    creditBalance: 0,
    bio: "I love exchanging useful local services and discovering trustworthy providers around my neighbourhood.",
  };

  const [userData, setUserData] = useState(storedUser);
  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState(storedUser);

  useEffect(() => {
    axiosInstance.get("/users/me")
      .then((res) => {
        const fresh = res.data.user;
        localStorage.setItem("user", JSON.stringify(fresh));
        setUserData(fresh);
        setTempData(fresh);
      })
      .catch(() => {
        // fallback to localStorage
      });
  }, []);

  const handleEditClick = () => {
    setTempData(userData);
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setTempData(userData);
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = async () => {
    try {
      const res = await axiosInstance.patch("/users/me", {
        name: tempData.name,
      });
      const updatedUser = res.data.user;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUserData(updatedUser);
      setEditMode(false);
    } catch (err) {
      alert("Failed to save profile. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        bgcolor: "#F8F5FC",
        backgroundImage: `
          radial-gradient(circle at 5% 10%, rgba(233,213,255,0.75) 0, transparent 18%),
          radial-gradient(circle at 92% 8%, rgba(219,234,254,0.85) 0, transparent 22%)
        `,
      }}
    >
      <UserSidebar />

      <Box sx={{ flex: 1, ml: `${sidebarWidth}px`, p: { xs: 2, md: 3 } }}>
        <UserTopbar title="Profile" />

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: "30px",
                bgcolor: "rgba(255,255,255,0.76)",
                border: "1px solid #EEE6F5",
                textAlign: "center",
                height: "100%",
              }}
            >
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mx: "auto",
                  mb: 2,
                  bgcolor: "#C9B3EF",
                  color: "#4E425D",
                  fontWeight: 800,
                  fontSize: "2.6rem",
                  boxShadow: "0 10px 24px rgba(140,110,190,0.16)",
                }}
              >
                {(userData.name || "U").charAt(0).toUpperCase()}
              </Avatar>

              <Typography sx={{ fontSize: "2rem", fontWeight: 900, color: "#54486E", mb: 1 }}>
                {userData.name || "User"}
              </Typography>

              <Typography sx={{ color: "#7B718F", mt: 1, fontSize: "1.05rem" }}>
                {userData.email || "user@example.com"}
              </Typography>

              <Chip
                label={`${userData.role === "provider" ? "Provider" : "User"} Account`}
                sx={{
                  mt: 3,
                  px: 1.2,
                  py: 1.2,
                  borderRadius: "999px",
                  bgcolor: "#F3E8FF",
                  color: "#6B4FD3",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                }}
              />

              <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography sx={{ fontWeight: 800, color: "#2B253A", fontSize: "1.3rem" }}>
                    {userData.creditBalance || 0}
                  </Typography>
                  <Typography sx={{ color: "#8A839C", fontSize: "0.85rem" }}>Credits</Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Typography sx={{ fontWeight: 800, color: "#2B253A", fontSize: "1.3rem" }}>
                    {userData.trustScore || 100}
                  </Typography>
                  <Typography sx={{ color: "#8A839C", fontSize: "0.85rem" }}>Trust Score</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: "30px",
                bgcolor: "rgba(255,255,255,0.76)",
                border: "1px solid #EEE6F5",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 2,
                  mb: 3,
                }}
              >
                <Typography sx={{ fontSize: "1.9rem", fontWeight: 900, color: "#1F1A2D" }}>
                  Profile Details
                </Typography>

                {!editMode ? (
                  <Button
                    variant="contained"
                    startIcon={<EditRoundedIcon />}
                    onClick={handleEditClick}
                    sx={{
                      bgcolor: "#8D6FE8",
                      textTransform: "none",
                      borderRadius: "14px",
                      px: 3,
                      py: 1.2,
                      fontWeight: 700,
                      boxShadow: "none",
                      "&:hover": { bgcolor: "#7C5FE0" },
                    }}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Stack direction="row" spacing={1.5}>
                    <Button
                      variant="outlined"
                      startIcon={<CloseRoundedIcon />}
                      onClick={handleCancelClick}
                      sx={{
                        borderColor: "#D7CEE8",
                        color: "#514A67",
                        textTransform: "none",
                        borderRadius: "14px",
                        px: 2.5,
                        py: 1.1,
                        fontWeight: 700,
                        bgcolor: "#fff",
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      variant="contained"
                      startIcon={<SaveRoundedIcon />}
                      onClick={handleSaveClick}
                      sx={{
                        bgcolor: "#8D6FE8",
                        textTransform: "none",
                        borderRadius: "14px",
                        px: 2.5,
                        py: 1.1,
                        fontWeight: 700,
                        boxShadow: "none",
                        "&:hover": { bgcolor: "#7C5FE0" },
                      }}
                    >
                      Save Changes
                    </Button>
                  </Stack>
                )}
              </Box>

              {!editMode ? (
                <Stack spacing={3}>
                  <Box>
                    <Typography sx={{ color: "#8A839C", mb: 0.6, fontSize: "1rem" }}>Full Name</Typography>
                    <Typography sx={{ fontWeight: 800, color: "#2B253A", fontSize: "1.1rem" }}>
                      {userData.name}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{ color: "#8A839C", mb: 0.6, fontSize: "1rem" }}>Email</Typography>
                    <Typography sx={{ fontWeight: 800, color: "#2B253A", fontSize: "1.1rem" }}>
                      {userData.email}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{ color: "#8A839C", mb: 0.6, fontSize: "1rem" }}>Role</Typography>
                    <Typography sx={{ fontWeight: 800, color: "#2B253A", fontSize: "1.1rem" }}>
                      {userData.role === "user" ? "User" : userData.role === "provider" ? "Provider" : userData.role}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{ color: "#8A839C", mb: 0.6, fontSize: "1rem" }}>Credit Balance</Typography>
                    <Typography sx={{ fontWeight: 800, color: "#2B253A", fontSize: "1.1rem" }}>
                      {userData.creditBalance || 0} credits
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{ color: "#8A839C", mb: 0.6, fontSize: "1rem" }}>Trust Score</Typography>
                    <Typography sx={{ fontWeight: 800, color: "#2B253A", fontSize: "1.1rem" }}>
                      {userData.trustScore || 100} / 100
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{ color: "#8A839C", mb: 0.6, fontSize: "1rem" }}>Bio</Typography>
                    <Typography sx={{ color: "#5F5870", lineHeight: 1.9, fontSize: "1.05rem" }}>
                      {userData.bio || "No bio added yet."}
                    </Typography>
                  </Box>
                </Stack>
              ) : (
                <Stack spacing={2.5}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={tempData.name || ""}
                    onChange={handleChange}
                  />

                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={tempData.email || ""}
                    disabled
                  />

                  <TextField
                    fullWidth
                    label="Role"
                    name="role"
                    value={tempData.role || ""}
                    disabled
                  />

                  <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    multiline
                    minRows={4}
                    value={tempData.bio || ""}
                    onChange={handleChange}
                  />
                </Stack>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
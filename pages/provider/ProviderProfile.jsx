import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  Stack,
  TextField,
  Chip,
  Divider,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import ProviderSidebar, {
  providerSidebarWidth,
} from "../../components/layout/ProviderSidebar";
import ProviderTopbar from "../../components/layout/ProviderTopbar";
import logo from "../../assets/LOGO.png";

export default function ProviderProfile() {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    name: "Provider",
    email: "provider@gmail.com",
    role: "provider",
    bio: "I provide trusted local services and help people in my neighbourhood.",
    phone: "+91 98765 43210",
    serviceCategory: "Home Services",
    experience: "3 Years",
    address: "Himachal Pradesh, India",
    pricing: "₹499 / visit",
    availability: "Available",
    profileImage: "",
  };

  const [userData, setUserData] = useState({
    name: storedUser.name || "Provider",
    email: storedUser.email || "provider@gmail.com",
    role: storedUser.role || "provider",
    bio:
      storedUser.bio ||
      "I provide trusted local services and help people in my neighbourhood.",
    phone: storedUser.phone || "+91 98765 43210",
    serviceCategory: storedUser.serviceCategory || "Home Services",
    experience: storedUser.experience || "3 Years",
    address: storedUser.address || "Himachal Pradesh, India",
    pricing: storedUser.pricing || "₹499 / visit",
    availability: storedUser.availability || "Available",
    profileImage: storedUser.profileImage || "",
  });

  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState(userData);

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
    setTempData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload PNG, JPG, JPEG, or WEBP image only.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setTempData((prev) => ({
        ...prev,
        profileImage: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveClick = () => {
    const updatedUser = {
      ...storedUser,
      ...tempData,
    };

    setUserData(tempData);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    const allUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const updatedUsers = allUsers.map((u) =>
      u.email === storedUser.email ? { ...u, ...tempData } : u
    );
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    setEditMode(false);
    alert("Profile updated successfully");
  };

  const currentImage = editMode ? tempData.profileImage : userData.profileImage;
  const displayName = editMode ? tempData.name : userData.name;
  const displayEmail = editMode ? tempData.email : userData.email;
  const displayInitial = (displayName || "P").charAt(0).toUpperCase();

  const StatCard = ({ icon, label, value, gradient }) => (
    <Paper
      elevation={0}
      sx={{
        p: 2.2,
        borderRadius: "22px",
        background: gradient,
        border: "1px solid #EEE6F5",
        boxShadow: "0 10px 22px rgba(160,130,190,0.05)",
      }}
    >
      <Box
        sx={{
          width: 46,
          height: 46,
          borderRadius: "14px",
          bgcolor: "rgba(255,255,255,0.72)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#6E54D7",
          mb: 1.5,
        }}
      >
        {icon}
      </Box>
      <Typography sx={{ color: "#8A839C", fontSize: "0.92rem", mb: 0.6 }}>
        {label}
      </Typography>
      <Typography sx={{ fontWeight: 800, color: "#342A4C", fontSize: "1.05rem" }}>
        {value}
      </Typography>
    </Paper>
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#F8F5FC",
        backgroundImage: `
          radial-gradient(circle at 0% 100%, rgba(224,236,255,0.85) 0, transparent 22%),
          radial-gradient(circle at 100% 0%, rgba(255,214,231,0.75) 0, transparent 20%),
          radial-gradient(circle at 50% 20%, rgba(230,220,255,0.45) 0, transparent 24%)
        `,
      }}
    >
      <ProviderSidebar />

      <Box
        sx={{
          ml: `${providerSidebarWidth}px`,
          flex: 1,
          p: { xs: 2, md: 3 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="bg-logo"
          sx={{
            position: "absolute",
            right: 30,
            bottom: 30,
            width: 320,
            opacity: 0.04,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 80,
            right: 40,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(205,183,255,0.35) 0%, rgba(205,183,255,0) 70%)",
            filter: "blur(18px)",
            zIndex: 0,
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <ProviderTopbar title="Provider Profile" />

          <Box
            sx={{
              display: "flex",
              gap: 3,
              alignItems: "stretch",
              flexDirection: { xs: "column", xl: "row" },
            }}
          >
            {/* LEFT PANEL */}
            <Paper
              elevation={0}
              sx={{
                width: { xs: "100%", xl: 390 },
                minWidth: { xl: 390 },
                borderRadius: "34px",
                overflow: "hidden",
                bgcolor: "rgba(255,255,255,0.82)",
                border: "1px solid #EEE6F5",
                boxShadow: "0 16px 34px rgba(160,130,190,0.08)",
              }}
            >
              <Box
                sx={{
                  height: 140,
                  background:
                    "linear-gradient(135deg, #D7C3FF 0%, #FFD6EB 50%, #DCEBFF 100%)",
                }}
              />

              <Box sx={{ px: 3, pb: 3, mt: "-58px", textAlign: "center" }}>
                <Box sx={{ position: "relative", width: "fit-content", mx: "auto", mb: 2 }}>
                  <Avatar
                    src={currentImage}
                    sx={{
                      width: 132,
                      height: 132,
                      mx: "auto",
                      bgcolor: "#C9B3EF",
                      color: "#4E425D",
                      fontWeight: 800,
                      fontSize: "2.8rem",
                      border: "5px solid rgba(255,255,255,0.95)",
                      boxShadow: "0 18px 30px rgba(141,111,232,0.14)",
                    }}
                  >
                    {!currentImage ? displayInitial : ""}
                  </Avatar>

                  {editMode && (
                    <Button
                      component="label"
                      variant="contained"
                      sx={{
                        minWidth: 0,
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        p: 0,
                        position: "absolute",
                        right: -4,
                        bottom: 4,
                        bgcolor: "#8D6FE8",
                        boxShadow: "0 10px 18px rgba(141,111,232,0.22)",
                        "&:hover": { bgcolor: "#7C5FE0" },
                      }}
                    >
                      <PhotoCameraRoundedIcon sx={{ fontSize: 20 }} />
                      <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
                    </Button>
                  )}
                </Box>

                <Typography
                  sx={{
                    fontSize: { xs: "2rem", md: "2.35rem" },
                    fontWeight: 900,
                    color: "#54486E",
                    lineHeight: 1.15,
                    mb: 0.8,
                  }}
                >
                  {displayName}
                </Typography>

                <Typography
                  sx={{
                    color: "#7B718F",
                    fontSize: "1.02rem",
                    wordBreak: "break-word",
                    mb: 2.1,
                  }}
                >
                  {displayEmail}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  flexWrap="wrap"
                  useFlexGap
                  sx={{ mb: 2.4 }}
                >
                  <Chip
                    label="Provider Account"
                    icon={<WorkspacePremiumRoundedIcon />}
                    sx={{
                      bgcolor: "#F3E8FF",
                      color: "#6B4FD3",
                      fontWeight: 700,
                      px: 0.5,
                    }}
                  />
                  <Chip
                    label={editMode ? tempData.serviceCategory : userData.serviceCategory}
                    sx={{
                      bgcolor: "#EAF2FF",
                      color: "#5B5A85",
                      fontWeight: 700,
                    }}
                  />
                </Stack>

                {editMode && (
                  <Stack
                    direction="row"
                    spacing={1.2}
                    justifyContent="center"
                    flexWrap="wrap"
                    useFlexGap
                    sx={{ mb: 2.5 }}
                  >
                    <Button
                      component="label"
                      variant="contained"
                      sx={{
                        bgcolor: "#8D6FE8",
                        textTransform: "none",
                        borderRadius: "14px",
                        px: 2.2,
                        fontWeight: 700,
                        boxShadow: "none",
                        "&:hover": { bgcolor: "#7C5FE0" },
                      }}
                    >
                      Change Photo
                      <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
                    </Button>

                    <Button
                      variant="outlined"
                      onClick={() =>
                        setTempData((prev) => ({
                          ...prev,
                          profileImage: "",
                        }))
                      }
                      sx={{
                        borderColor: "#D7CEE8",
                        color: "#514A67",
                        textTransform: "none",
                        borderRadius: "14px",
                        px: 2.2,
                        fontWeight: 700,
                        bgcolor: "#fff",
                      }}
                    >
                      Remove
                    </Button>
                  </Stack>
                )}

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 1.5,
                    mb: 2.2,
                  }}
                >
                  <StatCard
                    icon={<CategoryRoundedIcon fontSize="small" />}
                    label="Category"
                    value={editMode ? tempData.serviceCategory : userData.serviceCategory}
                    gradient="linear-gradient(135deg, #F7F0FF 0%, #FFF1F8 100%)"
                  />
                  <StatCard
                    icon={<AccessTimeRoundedIcon fontSize="small" />}
                    label="Experience"
                    value={editMode ? tempData.experience : userData.experience}
                    gradient="linear-gradient(135deg, #EEF7FF 0%, #F5F0FF 100%)"
                  />
                </Box>

                <Paper
                  elevation={0}
                  sx={{
                    p: 2.2,
                    borderRadius: "24px",
                    bgcolor: "#FAF8FD",
                    border: "1px solid #EEE6F5",
                    textAlign: "left",
                  }}
                >
                  <Stack spacing={2}>
                    <Box>
                      <Typography sx={{ color: "#8A839C", fontSize: "0.92rem", mb: 0.6 }}>
                        Pricing
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CurrencyRupeeRoundedIcon sx={{ color: "#8D6FE8", fontSize: 18 }} />
                        <Typography sx={{ fontWeight: 800, color: "#514074", fontSize: "1.02rem" }}>
                          {editMode ? tempData.pricing : userData.pricing}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ borderColor: "#EEE6F5" }} />

                    <Box>
                      <Typography sx={{ color: "#8A839C", fontSize: "0.92rem", mb: 0.6 }}>
                        Phone
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CallRoundedIcon sx={{ color: "#8D6FE8", fontSize: 18 }} />
                        <Typography sx={{ fontWeight: 800, color: "#514074", fontSize: "1.02rem" }}>
                          {editMode ? tempData.phone : userData.phone}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ borderColor: "#EEE6F5" }} />

                    <Box>
                      <Typography sx={{ color: "#8A839C", fontSize: "0.92rem", mb: 0.6 }}>
                        Location
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                        <LocationOnRoundedIcon sx={{ color: "#8D6FE8", fontSize: 18, mt: 0.2 }} />
                        <Typography sx={{ fontWeight: 700, color: "#625B77", lineHeight: 1.7 }}>
                          {editMode ? tempData.address : userData.address}
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Paper>
              </Box>
            </Paper>

            {/* RIGHT PANEL */}
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                p: { xs: 3, md: 4 },
                borderRadius: "34px",
                bgcolor: "rgba(255,255,255,0.82)",
                border: "1px solid #EEE6F5",
                boxShadow: "0 16px 34px rgba(160,130,190,0.08)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", md: "center" },
                  flexDirection: { xs: "column", md: "row" },
                  gap: 2,
                  mb: 3,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: { xs: "2rem", md: "2.35rem" },
                      fontWeight: 900,
                      color: "#4E416D",
                    }}
                  >
                    Profile Details
                  </Typography>

                  <Typography sx={{ color: "#7B7390", mt: 0.7 }}>
                    Manage your provider information and public profile details.
                  </Typography>
                </Box>

                {!editMode ? (
                  <Button
                    variant="contained"
                    startIcon={<EditRoundedIcon />}
                    onClick={handleEditClick}
                    sx={{
                      bgcolor: "#8D6FE8",
                      textTransform: "none",
                      borderRadius: "16px",
                      px: 3,
                      py: 1.25,
                      fontWeight: 700,
                      boxShadow: "none",
                      "&:hover": { bgcolor: "#7C5FE0" },
                    }}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap" }}>
                    <Button
                      variant="outlined"
                      startIcon={<CloseRoundedIcon />}
                      onClick={handleCancelClick}
                      sx={{
                        borderColor: "#D7CEE8",
                        color: "#514A67",
                        textTransform: "none",
                        borderRadius: "14px",
                        px: 2.6,
                        py: 1.15,
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
                        px: 2.8,
                        py: 1.15,
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
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: 2.3,
                  }}
                >
                  {[
                    { label: "Full Name", value: userData.name },
                    { label: "Email", value: userData.email },
                    { label: "Role", value: "Provider" },
                    { label: "Service Category", value: userData.serviceCategory },
                    { label: "Experience", value: userData.experience },
                    { label: "Pricing", value: userData.pricing },
                    { label: "Phone", value: userData.phone },
                    { label: "Availability", value: userData.availability },
                  ].map((item, index) => (
                    <Paper
                      key={index}
                      elevation={0}
                      sx={{
                        p: 2.3,
                        borderRadius: "22px",
                        bgcolor: "#FAF8FD",
                        border: "1px solid #EEE6F5",
                      }}
                    >
                      <Typography sx={{ color: "#8A839C", mb: 0.7, fontSize: "0.95rem" }}>
                        {item.label}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 800,
                          color: "#2B253A",
                          fontSize: "1.06rem",
                          wordBreak: "break-word",
                        }}
                      >
                        {item.value}
                      </Typography>
                    </Paper>
                  ))}

                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.4,
                      borderRadius: "22px",
                      bgcolor: "#FAF8FD",
                      border: "1px solid #EEE6F5",
                      gridColumn: { xs: "auto", md: "1 / -1" },
                    }}
                  >
                    <Typography sx={{ color: "#8A839C", mb: 0.7, fontSize: "0.95rem" }}>
                      Bio
                    </Typography>
                    <Typography sx={{ color: "#5F5870", lineHeight: 1.9, fontSize: "1.02rem" }}>
                      {userData.bio}
                    </Typography>
                  </Paper>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: 2.5,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "16px",
                      bgcolor: "#fff",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#6D6484",
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={tempData.name}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={tempData.email}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={tempData.phone}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Experience"
                    name="experience"
                    value={tempData.experience}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Service Category"
                    name="serviceCategory"
                    value={tempData.serviceCategory}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Pricing"
                    name="pricing"
                    value={tempData.pricing}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Availability"
                    name="availability"
                    value={tempData.availability}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={tempData.address}
                    onChange={handleChange}
                  />
                  <Box sx={{ gridColumn: { xs: "auto", md: "1 / -1" } }}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={5}
                      label="Bio"
                      name="bio"
                      value={tempData.bio}
                      onChange={handleChange}
                    />
                  </Box>
                </Box>
              )}
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
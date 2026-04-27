import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  MenuItem,
  TextField,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import ProviderSidebar, {
  providerSidebarWidth,
} from "../../components/layout/ProviderSidebar";
import ProviderTopbar from "../../components/layout/ProviderTopbar";
import logo from "../../assets/LOGO.png";
import { useNavigate } from "react-router-dom";

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "18px",
    background: "rgba(255,255,255,0.72)",
    transition: "all 0.25s ease",
    "& fieldset": {
      borderColor: "#E8DDF4",
    },
    "&:hover fieldset": {
      borderColor: "#CDAEF3",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#9D7AE9",
      borderWidth: "1.5px",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#7E7592",
    fontWeight: 600,
  },
  "& .MuiInputBase-input": {
    color: "#44385C",
    fontWeight: 500,
  },
};

const glassCard = {
  background: "rgba(255,255,255,0.74)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  border: "1px solid rgba(235,224,246,0.95)",
  boxShadow: "0 18px 45px rgba(159, 129, 194, 0.10)",
};

export default function CreateService() {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    role: "provider",
    name: "Provider",
    email: "provider@gmail.com",
  };

  const [formData, setFormData] = useState({
    title: "",
    category: "Cleaning",
    creditsRate: "",
    cashRate: "",
    description: "",
    availabilityDate: "",
    availabilityTime: "",
    status: "Active",
  });

  const [message, setMessage] = useState("");

  const categories = [
    "Cleaning",
    "Repair",
    "Education",
    "Home",
    "Outdoor",
    "Animal",
    "Utility",
    "Cooking",
  ];

  const statusColors = {
    Active: {
      bg: "#EEF8F1",
      color: "#2E7D4F",
    },
    Popular: {
      bg: "#FFF2E8",
      color: "#C56B1D",
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage("");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (
      !formData.title.trim() ||
      !formData.category.trim() ||
      !formData.creditsRate.toString().trim()
    ) {
      setMessage("Please fill title, category, and credits rate.");
      return;
    }

    const existingServices =
      JSON.parse(localStorage.getItem("providerServices")) || [];

    const bgOptions = [
      "#EAF7F8",
      "#F9F1E6",
      "#F8ECF4",
      "#EAF2FF",
      "#ECF8F0",
      "#FFF3E8",
      "#F1EDFF",
      "#FDF0F5",
      "#EDF7FF",
    ];

    const cleanedCashRate = formData.cashRate.toString().replace(/₹/g, "").trim();

    const newService = {
      id: Date.now(),
      title: formData.title.trim(),
      category: formData.category,
      credits: `${formData.creditsRate} credits / hour`,
      cashRate: cleanedCashRate,
      description: formData.description.trim(),
      availabilityDate: formData.availabilityDate,
      availabilityTime: formData.availabilityTime.trim(),
      status: formData.status,
      bg: bgOptions[existingServices.length % bgOptions.length],
      providerEmail: storedUser.email || "provider@gmail.com",
      providerName: storedUser.name || "Provider",
      role: "provider",
    };

    localStorage.setItem(
      "providerServices",
      JSON.stringify([...existingServices, newService])
    );

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...storedUser,
        role: "provider",
      })
    );

    setMessage("Service created successfully!");

    setTimeout(() => {
      navigate("/provider/services");
    }, 800);
  };

  const handleCancel = () => {
    navigate("/provider/services");
  };

  const previewData = useMemo(() => {
    const cleanedCashRate = formData.cashRate.toString().replace(/₹/g, "").trim();

    return {
      title: formData.title || "Your service title will appear here",
      category: formData.category || "Category",
      creditsRate: formData.creditsRate
        ? `${formData.creditsRate} credits / hour`
        : "Add credits rate",
      cashRate: cleanedCashRate ? `₹${cleanedCashRate}` : "Optional cash rate",
      description:
        formData.description ||
        "Your service description preview will be shown here so you can see how polished your listing looks before saving.",
      availabilityDate: formData.availabilityDate || "Select date",
      availabilityTime: formData.availabilityTime || "Select time",
      status: formData.status || "Active",
    };
  }, [formData]);

  const completion = useMemo(() => {
    let score = 0;
    if (formData.title.trim()) score += 20;
    if (formData.category.trim()) score += 15;
    if (formData.creditsRate.toString().trim()) score += 20;
    if (formData.cashRate.toString().trim()) score += 10;
    if (formData.description.trim()) score += 20;
    if (formData.availabilityDate) score += 10;
    if (formData.availabilityTime.trim()) score += 5;
    return score;
  }, [formData]);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#F8F4FD",
        backgroundImage: `
          radial-gradient(circle at top left, rgba(232,218,255,0.92) 0%, transparent 24%),
          radial-gradient(circle at bottom right, rgba(255,220,236,0.88) 0%, transparent 22%),
          linear-gradient(180deg, #FCFAFF 0%, #F8F4FD 100%)
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
          overflowY: "auto",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 20,
            right: 40,
            width: 260,
            height: 260,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(189,156,255,0.20) 0%, rgba(189,156,255,0.03) 60%, transparent 75%)",
            filter: "blur(10px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: 30,
            left: 30,
            width: 210,
            height: 210,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,190,220,0.18) 0%, rgba(255,190,220,0.03) 60%, transparent 75%)",
            filter: "blur(8px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <Box
          component="img"
          src={logo}
          alt="bg-logo"
          sx={{
            position: "absolute",
            right: 40,
            bottom: 40,
            width: 300,
            opacity: 0.035,
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 0,
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <ProviderTopbar title="Create Service" />

          <Paper
            elevation={0}
            sx={{
              ...glassCard,
              p: { xs: 2.5, md: 3.5 },
              borderRadius: "30px",
              mb: 3,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.03))",
                pointerEvents: "none",
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 3,
                alignItems: "center",
                flexDirection: { xs: "column", lg: "row" },
                position: "relative",
                zIndex: 1,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Chip
                  icon={<AutoAwesomeRoundedIcon />}
                  label="Premium Service Creator"
                  sx={{
                    mb: 1.8,
                    borderRadius: "999px",
                    bgcolor: "#F4EAFF",
                    color: "#7D55D8",
                    fontWeight: 800,
                    px: 1,
                  }}
                />

                <Typography
                  sx={{
                    fontSize: { xs: "2rem", md: "2.75rem" },
                    fontWeight: 900,
                    color: "#4B3F68",
                    lineHeight: 1.08,
                    mb: 1.1,
                  }}
                >
                  Create a beautiful
                  <br />
                  service listing
                </Typography>

                <Typography
                  sx={{
                    color: "#766B89",
                    fontSize: "1rem",
                    lineHeight: 1.9,
                    maxWidth: 760,
                  }}
                >
                  Add your service details in a polished premium layout so your
                  profile feels attractive, professional, and easy to trust.
                </Typography>
              </Box>

              <Paper
                elevation={0}
                sx={{
                  width: { xs: "100%", md: 280 },
                  p: 2.2,
                  borderRadius: "24px",
                  bgcolor: "rgba(255,255,255,0.68)",
                  border: "1px solid #EEE2FA",
                  boxShadow: "0 10px 30px rgba(160,130,190,0.08)",
                }}
              >
                <Typography
                  sx={{
                    color: "#7C7290",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  Form Completion
                </Typography>

                <Typography
                  sx={{
                    fontSize: "2rem",
                    fontWeight: 900,
                    color: "#5B4692",
                    mb: 1.2,
                  }}
                >
                  {completion}%
                </Typography>

                <Box
                  sx={{
                    width: "100%",
                    height: 10,
                    borderRadius: "999px",
                    bgcolor: "#EFE7F7",
                    overflow: "hidden",
                    mb: 1.2,
                  }}
                >
                  <Box
                    sx={{
                      width: `${completion}%`,
                      height: "100%",
                      borderRadius: "999px",
                      background:
                        "linear-gradient(90deg, #C89DFF 0%, #A57CFF 50%, #FF9AB6 100%)",
                    }}
                  />
                </Box>

                <Typography sx={{ color: "#867C97", fontSize: "0.92rem" }}>
                  Complete more fields to make your service listing stronger.
                </Typography>
              </Paper>
            </Box>
          </Paper>

          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexDirection: { xs: "column", xl: "row" },
              alignItems: "stretch",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                ...glassCard,
                flex: 1.3,
                p: { xs: 2.4, md: 3.5 },
                borderRadius: "30px",
              }}
            >
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{ mb: 2.5 }}
              >
                <Box
                  sx={{
                    width: 54,
                    height: 54,
                    borderRadius: "18px",
                    background:
                      "linear-gradient(135deg, #F3E6FF 0%, #EAF2FF 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AddCircleRoundedIcon sx={{ color: "#6B4FD3", fontSize: 28 }} />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: { xs: "1.7rem", md: "2.2rem" },
                      fontWeight: 900,
                      color: "#4E416D",
                      lineHeight: 1.1,
                    }}
                  >
                    Service Details
                  </Typography>
                  <Typography
                    sx={{
                      color: "#776D8E",
                      mt: 0.5,
                      fontSize: "0.98rem",
                    }}
                  >
                    Fill your details in this premium form layout.
                  </Typography>
                </Box>
              </Stack>

              {message && (
                <Chip
                  label={message}
                  sx={{
                    mb: 2.5,
                    bgcolor: message.includes("success")
                      ? "#EEF8F1"
                      : "#FDEBEC",
                    color: message.includes("success") ? "#2E7D4F" : "#C74A62",
                    fontWeight: 800,
                    borderRadius: "999px",
                  }}
                />
              )}

              <Grid container spacing={2.3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Service Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Home Cleaning Service"
                    sx={inputSx}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    select
                    fullWidth
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    sx={inputSx}
                  >
                    {categories.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    select
                    fullWidth
                    label="Status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    sx={inputSx}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Popular">Popular</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Credits Rate"
                    name="creditsRate"
                    value={formData.creditsRate}
                    onChange={handleChange}
                    placeholder="e.g. 15"
                    sx={inputSx}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Cash Rate (optional)"
                    name="cashRate"
                    value={formData.cashRate}
                    onChange={handleChange}
                    placeholder="e.g. 300"
                    sx={inputSx}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Availability Time"
                    name="availabilityTime"
                    value={formData.availabilityTime}
                    onChange={handleChange}
                    placeholder="e.g. 10:00 AM"
                    sx={inputSx}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Available Date"
                    name="availabilityDate"
                    value={formData.availabilityDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    sx={inputSx}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={6}
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your service, what you offer, experience, and why users should book you."
                    sx={inputSx}
                  />
                </Grid>
              </Grid>

              <Stack
                direction="row"
                spacing={1.6}
                sx={{ mt: 3.2, flexWrap: "wrap" }}
              >
                <Button
                  variant="contained"
                  startIcon={<SaveRoundedIcon />}
                  onClick={handleSave}
                  sx={{
                    background: "linear-gradient(135deg,#A37BFF 0%, #FF8CB0 100%)",
                    color: "#fff",
                    borderRadius: "18px",
                    px: 3.2,
                    py: 1.35,
                    textTransform: "none",
                    fontWeight: 800,
                    fontSize: "0.98rem",
                    boxShadow: "0 14px 28px rgba(163,123,255,0.22)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg,#946BFA 0%, #FF7AA3 100%)",
                    },
                  }}
                >
                  Save Service
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<CloseRoundedIcon />}
                  onClick={handleCancel}
                  sx={{
                    borderRadius: "18px",
                    px: 3,
                    py: 1.35,
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "0.98rem",
                    borderColor: "#D7CEE8",
                    color: "#5A526E",
                    bgcolor: "rgba(255,255,255,0.72)",
                    "&:hover": {
                      borderColor: "#CBB9E6",
                      bgcolor: "#fff",
                    },
                  }}
                >
                  Cancel
                </Button>
              </Stack>
            </Paper>

            <Box
              sx={{
                width: { xs: "100%", xl: 390 },
                minWidth: { xl: 390 },
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  ...glassCard,
                  p: 2.6,
                  borderRadius: "30px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.35rem",
                    fontWeight: 900,
                    color: "#4B3F68",
                    mb: 2,
                  }}
                >
                  Live Preview
                </Typography>

                <Paper
                  elevation={0}
                  sx={{
                    p: 2.3,
                    borderRadius: "24px",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(249,245,255,0.95) 100%)",
                    border: "1px solid #EEE5F7",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    sx={{ mb: 1.4 }}
                  >
                    <Chip
                      label={previewData.category}
                      sx={{
                        bgcolor: "#F3E8FF",
                        color: "#7048D6",
                        fontWeight: 800,
                        borderRadius: "999px",
                      }}
                    />

                    <Chip
                      label={previewData.status}
                      sx={{
                        bgcolor: statusColors[previewData.status]?.bg || "#EEF8F1",
                        color: statusColors[previewData.status]?.color || "#2E7D4F",
                        fontWeight: 800,
                        borderRadius: "999px",
                      }}
                    />
                  </Stack>

                  <Typography
                    sx={{
                      fontWeight: 900,
                      color: "#392F52",
                      fontSize: "1.2rem",
                      lineHeight: 1.35,
                      mb: 1,
                    }}
                  >
                    {previewData.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#6E6680",
                      lineHeight: 1.8,
                      fontSize: "0.97rem",
                      mb: 2,
                    }}
                  >
                    {previewData.description}
                  </Typography>

                  <Divider sx={{ borderColor: "#F0E8F8", mb: 2 }} />

                  <Stack spacing={1.4}>
                    <Stack direction="row" spacing={1.2} alignItems="center">
                      <BoltRoundedIcon sx={{ color: "#7B5BE4", fontSize: 20 }} />
                      <Typography sx={{ color: "#52486A", fontWeight: 700 }}>
                        {previewData.creditsRate}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1.2} alignItems="center">
                      <CurrencyRupeeRoundedIcon
                        sx={{ color: "#7B5BE4", fontSize: 20 }}
                      />
                      <Typography sx={{ color: "#52486A", fontWeight: 700 }}>
                        {previewData.cashRate}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1.2} alignItems="center">
                      <EventAvailableRoundedIcon
                        sx={{ color: "#7B5BE4", fontSize: 20 }}
                      />
                      <Typography sx={{ color: "#52486A", fontWeight: 700 }}>
                        {previewData.availabilityDate} • {previewData.availabilityTime}
                      </Typography>
                    </Stack>
                  </Stack>
                </Paper>
              </Paper>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", xl: "1fr" },
                  gap: 2,
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    ...glassCard,
                    p: 2.2,
                    borderRadius: "24px",
                    background:
                      "linear-gradient(135deg, #F8E8FF 0%, #F3ECFF 100%)",
                  }}
                >
                  <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 1 }}>
                    <CategoryRoundedIcon sx={{ color: "#6C57A8" }} />
                    <Typography sx={{ color: "#7A7390", fontWeight: 700 }}>
                      Category
                    </Typography>
                  </Stack>
                  <Typography sx={{ color: "#463B61", fontWeight: 800 }}>
                    {previewData.category}
                  </Typography>
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    ...glassCard,
                    p: 2.2,
                    borderRadius: "24px",
                    background:
                      "linear-gradient(135deg, #EAF4FF 0%, #F2F8FF 100%)",
                  }}
                >
                  <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 1 }}>
                    <BoltRoundedIcon sx={{ color: "#6C57A8" }} />
                    <Typography sx={{ color: "#7A7390", fontWeight: 700 }}>
                      Credits
                    </Typography>
                  </Stack>
                  <Typography sx={{ color: "#463B61", fontWeight: 800 }}>
                    {previewData.creditsRate}
                  </Typography>
                </Paper>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
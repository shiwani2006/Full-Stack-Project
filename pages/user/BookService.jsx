import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import UserSidebar, { sidebarWidth } from "../../components/layout/UserSidebar";
import UserTopbar from "../../components/layout/UserTopbar";

export default function BookService() {
  const [formData, setFormData] = useState({
    service: "AC Repair",
    provider: "Rohit Sharma",
    date: "",
    time: "",
    paymentMode: "Credits",
    address: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBook = () => {
    alert("Service booked successfully!");
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
        <UserTopbar title="Book Service" />

        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: "32px",
                bgcolor: "rgba(255,255,255,0.76)",
                border: "1px solid #EEE6F5",
              }}
            >
              <Typography
                sx={{
                  fontSize: "2rem",
                  fontWeight: 900,
                  color: "#211C30",
                  mb: 1,
                }}
              >
                Book Your Service
              </Typography>

              <Typography sx={{ color: "#687488", lineHeight: 1.8, mb: 3 }}>
                Fill in the details below to confirm your booking with the provider.
              </Typography>

              <Grid container spacing={2.5}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Service Name"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Provider Name"
                    name="provider"
                    value={formData.provider}
                    onChange={handleChange}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Booking Date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="time"
                    label="Booking Time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    label="Payment Mode"
                    name="paymentMode"
                    value={formData.paymentMode}
                    onChange={handleChange}
                  >
                    <MenuItem value="Credits">Credits</MenuItem>
                    <MenuItem value="Cash">Cash</MenuItem>
                    <MenuItem value="Hybrid">Hybrid</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Service Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    multiline
                    minRows={2}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Additional Notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    multiline
                    minRows={4}
                    placeholder="Mention any special requirement..."
                  />
                </Grid>
              </Grid>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  onClick={handleBook}
                  sx={{
                    bgcolor: "#8D6FE8",
                    textTransform: "none",
                    borderRadius: "16px",
                    px: 3.5,
                    py: 1.3,
                    fontWeight: 800,
                    boxShadow: "none",
                    "&:hover": { bgcolor: "#7C5FE0" },
                  }}
                >
                  Confirm Booking
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#D7CEE8",
                    color: "#514A67",
                    textTransform: "none",
                    borderRadius: "16px",
                    px: 3.5,
                    py: 1.3,
                    fontWeight: 700,
                    bgcolor: "#fff",
                  }}
                >
                  Cancel
                </Button>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "32px",
                bgcolor: "rgba(255,255,255,0.76)",
                border: "1px solid #EEE6F5",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 900,
                  color: "#231E34",
                  mb: 2.3,
                }}
              >
                Booking Summary
              </Typography>

              <Stack spacing={1.5} sx={{ mb: 2.5 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: "20px",
                    bgcolor: "#F8F6FB",
                    border: "1px solid #EEE6F5",
                  }}
                >
                  <Typography sx={{ color: "#8A839C", mb: 0.4 }}>Service</Typography>
                  <Typography sx={{ fontWeight: 700, color: "#312B49" }}>
                    {formData.service}
                  </Typography>
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: "20px",
                    bgcolor: "#F8F6FB",
                    border: "1px solid #EEE6F5",
                  }}
                >
                  <Typography sx={{ color: "#8A839C", mb: 0.4 }}>Provider</Typography>
                  <Typography sx={{ fontWeight: 700, color: "#312B49" }}>
                    {formData.provider}
                  </Typography>
                </Paper>
              </Stack>

              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2.5 }}>
                <Chip label="₹800" sx={{ bgcolor: "#FFF3E8", fontWeight: 700 }} />
                <Chip label="75 Credits" sx={{ bgcolor: "#E9F5EC", fontWeight: 700 }} />
                <Chip label={formData.paymentMode} sx={{ bgcolor: "#F3ECF6", fontWeight: 700 }} />
              </Box>

              <Paper
                elevation={0}
                sx={{
                  p: 2.2,
                  borderRadius: "22px",
                  bgcolor: "#EEF8F0",
                  border: "1px solid #DCEEDC",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.6 }}>
                  <CheckCircleRoundedIcon sx={{ color: "#2E9B4F" }} />
                  <Typography sx={{ fontWeight: 800, color: "#2D6B43" }}>
                    Booking Protection
                  </Typography>
                </Box>
                <Typography sx={{ color: "#52745D", lineHeight: 1.7 }}>
                  Your booking details stay saved and you can manage status from the
                  bookings page anytime.
                </Typography>
              </Paper>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
import { Box, Paper, Typography, Grid, TextField, Button, MenuItem } from "@mui/material";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function EditService() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <Box sx={{ p: 3, backgroundColor: "#F8FAFC", minHeight: "100vh" }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 5,
            border: "1px solid #E5E7EB",
            maxWidth: 900,
            mx: "auto",
          }}
        >
          <Typography variant="h4" fontWeight={700} mb={1}>
            Edit Service
          </Typography>
          <Typography sx={{ color: "#6B7280", mb: 4 }}>
            Update your existing service details
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Service Title" defaultValue="Cleaning" />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField select fullWidth label="Category" defaultValue="Home cleaning">
                <MenuItem value="Cleaning">Cleaning</MenuItem>
                <MenuItem value="Repair">Repair</MenuItem>
                <MenuItem value="Field Work">Field work</MenuItem>
                <MenuItem value="Home Services">Home Services</MenuItem>
                <MenuItem value="Animal Care">Animal Care</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Credits Rate" defaultValue="2 credits / hour" />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Cash Rate (optional)" defaultValue="₹300 / hour" />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                defaultValue="I teach Python basics, loops, functions, and mini projects."
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Availability"
                defaultValue="Mon - Sat, 10 AM - 6 PM"
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              sx={{
                borderRadius: 3,
                textTransform: "none",
                backgroundColor: "#6366F1",
              }}
            >
              Update Service
            </Button>

            <Button
              variant="outlined"
              sx={{ borderRadius: 3, textTransform: "none" }}
              onClick={() => navigate("/provider/services")}
            >
              Cancel
            </Button>
          </Box>
        </Paper>
      </Box>
    </DashboardLayout>
  );
}
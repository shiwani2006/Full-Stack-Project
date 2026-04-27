import {
  Box,
  Paper,
  Typography,
  Stack,
  Chip,
  Grid,
  Button,
} from "@mui/material";
import DashboardLayout from "../../components/layout/DashboardLayout";

export default function BookingsAdmin() {
  const bookings = [
    { user: "Shiwani Dhalari", service: "Kitchen Cleaning", provider: "Rohit Sharma", status: "Completed" },
    { user: "Aman Sood", service: "Animal Care", provider: "Priya Thakur", status: "Pending" },
    { user: "Riya Kapoor", service: "Repair Service", provider: "Aman Sood", status: "Cancelled" },
  ];

  return (
    <DashboardLayout>
      <Box sx={{ p: 3, minHeight: "100vh", background: "linear-gradient(135deg, #fdf4ff 0%, #f8fafc 40%, #ecfeff 100%)" }}>
        <Paper elevation={0} sx={{ p: 3, borderRadius: 5, border: "1px solid #E9D5FF", mb: 3, background: "linear-gradient(135deg, #ede9fe, #fae8ff, #ecfeff)" }}>
          <Typography variant="h4" fontWeight={700} sx={{ color: "#4C1D95" }}>
            Bookings Admin
          </Typography>
          <Typography sx={{ color: "#6B7280", mt: 1 }}>
            Track and manage all booking activity on the platform.
          </Typography>
        </Paper>

        <Grid container spacing={3}>
          {bookings.map((booking, index) => (
            <Grid item xs={12} key={index}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 5, border: "1px solid #E5E7EB" }}>
                <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} spacing={2}>
                  <Box>
                    <Typography fontWeight={700}>{booking.service}</Typography>
                    <Typography sx={{ color: "#6B7280" }}>User: {booking.user}</Typography>
                    <Typography sx={{ color: "#6B7280" }}>Provider: {booking.provider}</Typography>
                  </Box>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      label={booking.status}
                      sx={{
                        backgroundColor:
                          booking.status === "Completed"
                            ? "#DCFCE7"
                            : booking.status === "Pending"
                            ? "#FEF3C7"
                            : "#FEE2E2",
                        fontWeight: 700,
                      }}
                    />
                    <Button variant="outlined" sx={{ textTransform: "none", borderRadius: 3 }}>
                      View Details
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </DashboardLayout>
  );
}
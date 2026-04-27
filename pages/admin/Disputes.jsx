import {
  Box,
  Paper,
  Typography,
  Stack,
  Chip,
  Button,
} from "@mui/material";
import DashboardLayout from "../../components/layout/DashboardLayout";

export default function Disputes() {
  const disputes = [
    {
      issue: "Service not completed properly",
      booking: "Kitchen Cleaning",
      user: "Shiwani Dhalari",
      status: "Open",
    },
    {
      issue: "Late arrival complaint",
      booking: "Animal Care",
      user: "Aman Sood",
      status: "In Review",
    },
  ];

  return (
    <DashboardLayout>
      <Box sx={{ p: 3, minHeight: "100vh", background: "linear-gradient(135deg, #fdf4ff 0%, #f8fafc 40%, #ecfeff 100%)" }}>
        <Paper elevation={0} sx={{ p: 3, borderRadius: 5, border: "1px solid #E9D5FF", mb: 3, background: "linear-gradient(135deg, #ede9fe, #fae8ff, #ecfeff)" }}>
          <Typography variant="h4" fontWeight={700} sx={{ color: "#4C1D95" }}>
            Disputes
          </Typography>
          <Typography sx={{ color: "#6B7280", mt: 1 }}>
            Review user complaints and resolve conflicts.
          </Typography>
        </Paper>

        <Stack spacing={3}>
          {disputes.map((item, index) => (
            <Paper key={index} elevation={0} sx={{ p: 3, borderRadius: 5, border: "1px solid #E5E7EB" }}>
              <Typography fontWeight={700} variant="h6">
                {item.issue}
              </Typography>
              <Typography sx={{ color: "#6B7280", mt: 1 }}>
                Booking: {item.booking}
              </Typography>
              <Typography sx={{ color: "#6B7280" }}>
                Raised by: {item.user}
              </Typography>

              <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
                <Chip
                  label={item.status}
                  sx={{
                    backgroundColor: item.status === "Open" ? "#FEF3C7" : "#DBEAFE",
                    fontWeight: 700,
                  }}
                />
                <Button variant="contained" sx={{ textTransform: "none", borderRadius: 3, backgroundColor: "#A78BFA" }}>
                  Resolve
                </Button>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Box>
    </DashboardLayout>
  );
}
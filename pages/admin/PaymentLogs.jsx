import {
  Box,
  Paper,
  Typography,
  Stack,
  Chip,
  Grid,
} from "@mui/material";
import DashboardLayout from "../../components/layout/DashboardLayout";

export default function PaymentLogs() {
  const logs = [
    { user: "Shiwani Dhalari", amount: "₹300", type: "Cash", status: "Success" },
    { user: "Rohit Sharma", amount: "2 Credits", type: "Credits", status: "Success" },
    { user: "Priya Thakur", amount: "₹500", type: "Cash", status: "Pending" },
  ];

  return (
    <DashboardLayout>
      <Box sx={{ p: 3, minHeight: "100vh", background: "linear-gradient(135deg, #fdf4ff 0%, #f8fafc 40%, #ecfeff 100%)" }}>
        <Paper elevation={0} sx={{ p: 3, borderRadius: 5, border: "1px solid #E9D5FF", mb: 3, background: "linear-gradient(135deg, #ede9fe, #fae8ff, #ecfeff)" }}>
          <Typography variant="h4" fontWeight={700} sx={{ color: "#4C1D95" }}>
            Payment Logs
          </Typography>
          <Typography sx={{ color: "#6B7280", mt: 1 }}>
            Review recent cash and credit-based transactions.
          </Typography>
        </Paper>

        <Grid container spacing={3}>
          {logs.map((log, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 5, border: "1px solid #E5E7EB" }}>
                <Typography fontWeight={700}>{log.user}</Typography>
                <Typography sx={{ color: "#6B7280", mt: 0.5 }}>
                  Amount: {log.amount}
                </Typography>
                <Typography sx={{ color: "#6B7280" }}>
                  Type: {log.type}
                </Typography>

                <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
                  <Chip
                    label={log.status}
                    sx={{
                      backgroundColor:
                        log.status === "Success" ? "#DCFCE7" : "#FEF3C7",
                      fontWeight: 700,
                    }}
                  />
                  <Chip label={log.type} size="small" sx={{ backgroundColor: "#F3E8FF" }} />
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </DashboardLayout>
  );
}
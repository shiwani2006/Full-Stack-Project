import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import ProviderSidebar, {
  providerSidebarWidth,
} from "../../components/layout/ProviderSidebar";
import ProviderTopbar from "../../components/layout/ProviderTopbar";

export default function Earnings() {
  const cards = [
    { title: "Total Earnings", value: "₹12,500", bg: "#F4ECF8" },
    { title: "This Month", value: "₹4,200", bg: "#E8F0F9" },
    { title: "Credits Earned", value: "180", bg: "#EAF6EA" },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F8F5FC" }}>
      <ProviderSidebar />

      <Box sx={{ ml: `${providerSidebarWidth}px`, flex: 1, p: 3 }}>
        <ProviderTopbar title="Earnings" />

        <Grid container spacing={3}>
          {cards.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                sx={{
                  p: 4,
                  borderRadius: "28px",
                  bgcolor: item.bg,
                  border: "1px solid #EEE6F5",
                }}
              >
                <Typography sx={{ color: "#8A839C", mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "2.2rem",
                    fontWeight: 900,
                    color: "#6B4FD3",
                  }}
                >
                  {item.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Paper
          sx={{
            mt: 3,
            p: 4,
            borderRadius: "28px",
            bgcolor: "#fff",
            border: "1px solid #EEE6F5",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.6rem",
              fontWeight: 900,
              color: "#54486E",
              mb: 2,
            }}
          >
            Earnings Overview
          </Typography>
          <Typography sx={{ color: "#7A7291", lineHeight: 1.8 }}>
            Here you can track total income, recent payouts, service-based earnings,
            and credits received from completed provider bookings.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
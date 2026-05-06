import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography, Stack, Chip } from "@mui/material";
import ProviderSidebar, { providerSidebarWidth } from "../../components/layout/ProviderSidebar";
import ProviderTopbar from "../../components/layout/ProviderTopbar";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import axiosInstance from "../../services/axiosInstance";

export default function Earnings() {
  const [wallet, setWallet] = useState({ creditBalance: 0, cashBalance: 0 });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [walletRes, bookingsRes] = await Promise.all([
          axiosInstance.get("/wallet"),
          axiosInstance.get("/bookings/my"),
        ]);
        setWallet(walletRes.data);
        setBookings(bookingsRes.data.bookings || []);
      } catch (err) {
        console.error("Failed to fetch earnings data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const completedBookings = bookings.filter((b) => b.status === "completed");

  const totalCashEarned = completedBookings
    .filter((b) => b.paymentMethod === "cash" || b.paymentMethod === "hybrid")
    .reduce((sum, b) => sum + (b.cashAmount || 0), 0);

  const totalCreditsEarned = completedBookings
    .filter((b) => b.paymentMethod === "credits" || b.paymentMethod === "hybrid")
    .reduce((sum, b) => sum + (b.creditAmount || 0), 0);

  const thisMonthBookings = completedBookings.filter((b) => {
    const bookingDate = new Date(b.createdAt);
    const now = new Date();
    return bookingDate.getMonth() === now.getMonth() && bookingDate.getFullYear() === now.getFullYear();
  });

  const thisMonthCash = thisMonthBookings
    .filter((b) => b.paymentMethod === "cash" || b.paymentMethod === "hybrid")
    .reduce((sum, b) => sum + (b.cashAmount || 0), 0);

  const cards = [
    {
      title: "Total Cash Earned",
      value: loading ? "..." : `₹${totalCashEarned}`,
      bg: "linear-gradient(135deg, #F4ECF8 0%, #EDE2FF 100%)",
      icon: <CurrencyRupeeRoundedIcon sx={{ color: "#6B4FD3" }} />,
    },
    {
      title: "This Month",
      value: loading ? "..." : `₹${thisMonthCash}`,
      bg: "linear-gradient(135deg, #E8F0F9 0%, #DFECFF 100%)",
      icon: <TrendingUpRoundedIcon sx={{ color: "#4F79C8" }} />,
    },
    {
      title: "Credits Earned",
      value: loading ? "..." : totalCreditsEarned,
      bg: "linear-gradient(135deg, #EAF6EA 0%, #DEF5E5 100%)",
      icon: <SavingsRoundedIcon sx={{ color: "#4E9660" }} />,
    },
    {
      title: "Cash Balance",
      value: loading ? "..." : `₹${wallet.cashBalance || 0}`,
      bg: "linear-gradient(135deg, #FFF5E9 0%, #FFEACC 100%)",
      icon: <CurrencyRupeeRoundedIcon sx={{ color: "#C78637" }} />,
    },
    {
      title: "Credit Balance",
      value: loading ? "..." : wallet.creditBalance || 0,
      bg: "linear-gradient(135deg, #F7F0FF 0%, #FFF1F8 100%)",
      icon: <SavingsRoundedIcon sx={{ color: "#6B4FD3" }} />,
    },
    {
      title: "Completed Jobs",
      value: loading ? "..." : completedBookings.length,
      bg: "linear-gradient(135deg, #E8FFF4 0%, #DEF5EA 100%)",
      icon: <TrendingUpRoundedIcon sx={{ color: "#4E9660" }} />,
    },
  ];

  const getBg = (index) => {
    const bgs = [
      "linear-gradient(135deg, #efe5ff 0%, #e8dcff 100%)",
      "linear-gradient(135deg, #e8fff4 0%, #def5ea 100%)",
      "linear-gradient(135deg, #fff1d9 0%, #fde9bf 100%)",
      "linear-gradient(135deg, #e7f3ff 0%, #dcecff 100%)",
    ];
    return bgs[index % bgs.length];
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F8F5FC" }}>
      <ProviderSidebar />

      <Box sx={{ ml: `${providerSidebarWidth}px`, flex: 1, p: 3 }}>
        <ProviderTopbar title="Earnings" />

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {cards.map((item, index) => (
            <Grid item xs={12} sm={6} xl={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: "28px",
                  background: item.bg,
                  border: "1px solid #EEE6F5",
                  boxShadow: "0 10px 24px rgba(160,130,190,0.06)",
                }}
              >
                <Box sx={{ width: 48, height: 48, borderRadius: "16px", bgcolor: "rgba(255,255,255,0.76)", display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                  {item.icon}
                </Box>
                <Typography sx={{ color: "#8A839C", mb: 1, fontSize: "0.95rem" }}>
                  {item.title}
                </Typography>
                <Typography sx={{ fontSize: "2.2rem", fontWeight: 900, color: "#6B4FD3" }}>
                  {item.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Recent Completed Bookings */}
        <Paper elevation={0} sx={{ p: 4, borderRadius: "28px", bgcolor: "rgba(255,255,255,0.84)", border: "1px solid #EEE6F5", boxShadow: "0 12px 28px rgba(160,130,190,0.06)" }}>
          <Typography sx={{ fontSize: "1.6rem", fontWeight: 900, color: "#54486E", mb: 0.8 }}>
            Earnings History
          </Typography>
          <Typography sx={{ color: "#7A7291", lineHeight: 1.8, mb: 3, fontSize: "0.95rem" }}>
            All completed bookings and their payment details.
          </Typography>

          {loading ? (
            <Typography sx={{ color: "#8A839C" }}>Loading...</Typography>
          ) : completedBookings.length === 0 ? (
            <Typography sx={{ color: "#8A839C" }}>No completed bookings yet.</Typography>
          ) : (
            <Stack spacing={2}>
              {completedBookings.map((booking, index) => (
                <Paper
                  key={booking.id}
                  elevation={0}
                  sx={{ p: 2.3, borderRadius: "22px", background: getBg(index), border: "1px solid rgba(255,255,255,0.82)" }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
                    <Box>
                      <Typography sx={{ fontWeight: 800, color: "#3F3558", fontSize: "1.05rem" }}>
                        {booking.service?.title || "Service"}
                      </Typography>
                      <Typography sx={{ color: "#7C7593", fontSize: "0.92rem", mt: 0.5 }}>
                        {booking.requester?.name || "User"} • {new Date(booking.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>

                    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                      <Chip
                        label={booking.paymentMethod}
                        size="small"
                        sx={{ bgcolor: "rgba(255,255,255,0.8)", color: "#654b8d", fontWeight: 700 }}
                      />
                      <Typography sx={{ fontWeight: 900, color: "#221e43", fontSize: "1.1rem" }}>
                        {booking.paymentMethod === "credits"
                          ? `${booking.creditAmount} credits`
                          : booking.paymentMethod === "hybrid"
                          ? `₹${booking.cashAmount} + ${booking.creditAmount} cr`
                          : `₹${booking.cashAmount}`}
                      </Typography>
                    </Stack>
                  </Box>
                </Paper>
              ))}
            </Stack>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

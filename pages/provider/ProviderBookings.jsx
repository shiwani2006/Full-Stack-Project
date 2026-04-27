import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Stack,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import ProviderSidebar, {
  providerSidebarWidth,
} from "../../components/layout/ProviderSidebar";
import ProviderTopbar from "../../components/layout/ProviderTopbar";
import logo from "../../assets/LOGO.png";

const initialBookings = [
  {
    id: 1,
    service: "Home Cleaning",
    customer: "Shiwani Dhalari",
    date: "23 Apr 2026",
    time: "10:00 AM",
    payment: "Credits",
    status: "Pending",
    amount: 0,
  },
  {
    id: 2,
    service: "AC Repair",
    customer: "Aman Sharma",
    date: "24 Apr 2026",
    time: "12:30 PM",
    payment: "Cash",
    status: "Confirmed",
    amount: 1500,
  },
  {
    id: 3,
    service: "Tutoring",
    customer: "Riya Thakur",
    date: "25 Apr 2026",
    time: "04:00 PM",
    payment: "Hybrid",
    status: "Completed",
    amount: 800,
  },
  {
    id: 4,
    service: "Pet Care",
    customer: "Karan Mehta",
    date: "26 Apr 2026",
    time: "09:30 AM",
    payment: "Credits",
    status: "Pending",
    amount: 0,
  },
];

export default function ProviderBookings() {
  const [bookings, setBookings] = useState(initialBookings);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const pendingBookings = useMemo(
    () => bookings.filter((b) => b.status === "Pending"),
    [bookings]
  );

  const confirmedBookings = useMemo(
    () => bookings.filter((b) => b.status === "Confirmed"),
    [bookings]
  );

  const completedBookings = useMemo(
    () => bookings.filter((b) => b.status === "Completed"),
    [bookings]
  );

  const totalBookings = bookings.length;
  const pendingCount = pendingBookings.length;
  const completedCount = completedBookings.length;
  const cashEarned = bookings
    .filter((b) => b.payment === "Cash" || b.payment === "Hybrid")
    .reduce((sum, b) => sum + (b.amount || 0), 0);

  const weeklySuccessRate = useMemo(() => {
    if (!bookings.length) return 0;
    const positive = bookings.filter(
      (b) => b.status === "Confirmed" || b.status === "Completed"
    ).length;
    return Math.round((positive / bookings.length) * 100);
  }, [bookings]);

  const handleAccept = (id) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: "Confirmed" } : booking
      )
    );
  };

  const handleDecline = (id) => {
    setBookings((prev) => prev.filter((booking) => booking.id !== id));
  };

  const handleMarkCompleted = (id) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: "Completed" } : booking
      )
    );
  };

  const handleOpenReschedule = (id) => {
    const booking = bookings.find((b) => b.id === id);
    setSelectedBookingId(id);
    setNewDate(booking?.date || "");
    setNewTime(booking?.time || "");
    setDialogOpen(true);
  };

  const handleSaveReschedule = () => {
    if (!selectedBookingId || !newDate || !newTime) return;

    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === selectedBookingId
          ? {
              ...booking,
              date: newDate,
              time: newTime,
              status: "Confirmed",
            }
          : booking
      )
    );

    setDialogOpen(false);
    setSelectedBookingId(null);
    setNewDate("");
    setNewTime("");
  };

  const getPaymentChip = (payment) => {
    if (payment === "Cash") {
      return { bg: "#EAF2FF", color: "#536B96" };
    }
    if (payment === "Hybrid") {
      return { bg: "#F3E8FF", color: "#71569F" };
    }
    return { bg: "#F8F1D8", color: "#7E6932" };
  };

  const statusChip = (status) => {
    if (status === "Completed") return { bg: "#E7F7EA", color: "#4F7457" };
    if (status === "Confirmed") return { bg: "#EAF1FF", color: "#4D6691" };
    return { bg: "#FAF0D6", color: "#7A6731" };
  };

  const stats = [
    {
      title: "Total Bookings",
      value: totalBookings,
      sub: "Live requests",
      icon: <CalendarMonthRoundedIcon />,
      bg: "#F5ECFB",
    },
    {
      title: "Pending",
      value: pendingCount,
      sub: "Need response",
      icon: <PendingActionsRoundedIcon />,
      bg: "#FFF5E8",
    },
    {
      title: "Completed",
      value: completedCount,
      sub: "Finished jobs",
      icon: <CheckCircleRoundedIcon />,
      bg: "#EEF7EA",
    },
    {
      title: "Cash Earned",
      value: `₹${cashEarned}`,
      sub: "From bookings",
      icon: <CurrencyRupeeRoundedIcon />,
      bg: "#EAF2FF",
    },
  ];

  const renderBookingCard = (booking, type = "pending") => {
    const paymentStyle = getPaymentChip(booking.payment);
    const statusStyle = statusChip(booking.status);

    return (
      <Paper
        key={booking.id}
        elevation={0}
        sx={{
          p: 2.3,
          borderRadius: "22px",
          bgcolor: "#FAF8FD",
          border: "1px solid #EEE6F5",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ flex: 1, minWidth: 240 }}>
            <Typography
              sx={{
                fontWeight: 900,
                color: "#3F3558",
                fontSize: "1.08rem",
                mb: 0.6,
              }}
            >
              {booking.service}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 0.7, sm: 1.5 }}
              sx={{ color: "#7C7593" }}
              useFlexGap
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
                <PersonRoundedIcon sx={{ fontSize: 17 }} />
                <Typography sx={{ fontSize: "0.93rem" }}>
                  {booking.customer}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
                <CalendarMonthRoundedIcon sx={{ fontSize: 17 }} />
                <Typography sx={{ fontSize: "0.93rem" }}>
                  {booking.date}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
                <AccessTimeRoundedIcon sx={{ fontSize: 17 }} />
                <Typography sx={{ fontSize: "0.93rem" }}>
                  {booking.time}
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
            justifyContent={{ xs: "flex-start", sm: "flex-end" }}
          >
            <Chip
              label={booking.payment}
              size="small"
              sx={{
                bgcolor: paymentStyle.bg,
                color: paymentStyle.color,
                fontWeight: 700,
              }}
            />
            <Chip
              label={booking.status}
              size="small"
              sx={{
                bgcolor: statusStyle.bg,
                color: statusStyle.color,
                fontWeight: 700,
              }}
            />
          </Stack>
        </Box>

        {type === "pending" && (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.2}
            sx={{ mt: 2.1 }}
          >
            <Button
              variant="contained"
              onClick={() => handleAccept(booking.id)}
              sx={{
                textTransform: "none",
                borderRadius: "14px",
                px: 2.2,
                py: 1,
                fontWeight: 700,
                minWidth: 110,
                bgcolor: "#8D6FE8",
                boxShadow: "none",
                "&:hover": { bgcolor: "#7C5FE0" },
              }}
            >
              Accept
            </Button>

            <Button
              variant="outlined"
              onClick={() => handleOpenReschedule(booking.id)}
              sx={{
                textTransform: "none",
                borderRadius: "14px",
                px: 2.2,
                py: 1,
                fontWeight: 700,
                minWidth: 130,
                borderColor: "#D7CEE8",
                color: "#5A526E",
                bgcolor: "#fff",
              }}
            >
              Reschedule
            </Button>

            <Button
              variant="outlined"
              onClick={() => handleDecline(booking.id)}
              sx={{
                textTransform: "none",
                borderRadius: "14px",
                px: 2.2,
                py: 1,
                fontWeight: 700,
                minWidth: 110,
                borderColor: "#E3CDD3",
                color: "#9A5D6A",
                bgcolor: "#fff",
              }}
            >
              Decline
            </Button>
          </Stack>
        )}

        {type === "confirmed" && (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.2}
            sx={{ mt: 2.1 }}
          >
            <Button
              variant="contained"
              startIcon={<TaskAltRoundedIcon />}
              onClick={() => handleMarkCompleted(booking.id)}
              sx={{
                textTransform: "none",
                borderRadius: "14px",
                px: 2.2,
                py: 1,
                fontWeight: 700,
                minWidth: 150,
                bgcolor: "#8D6FE8",
                boxShadow: "none",
                "&:hover": { bgcolor: "#7C5FE0" },
              }}
            >
              Mark Completed
            </Button>

            <Button
              variant="outlined"
              onClick={() => handleOpenReschedule(booking.id)}
              sx={{
                textTransform: "none",
                borderRadius: "14px",
                px: 2.2,
                py: 1,
                fontWeight: 700,
                minWidth: 130,
                borderColor: "#D7CEE8",
                color: "#5A526E",
                bgcolor: "#fff",
              }}
            >
              Reschedule
            </Button>
          </Stack>
        )}
      </Paper>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#F8F5FC",
        backgroundImage: `
          radial-gradient(circle at 0% 100%, rgba(224,236,255,0.82) 0, transparent 22%),
          radial-gradient(circle at 100% 0%, rgba(255,214,231,0.72) 0, transparent 20%)
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
          component="img"
          src={logo}
          alt="bg-logo"
          sx={{
            position: "absolute",
            right: 30,
            bottom: 30,
            width: 300,
            opacity: 0.035,
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 0,
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <ProviderTopbar title="Provider Bookings" />

          <Grid container spacing={2.5} sx={{ mb: 3 }}>
            {stats.map((item, index) => (
              <Grid item xs={12} sm={6} xl={3} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.6,
                    borderRadius: "26px",
                    bgcolor: item.bg,
                    border: "1px solid #E9E1F3",
                    boxShadow: "0 10px 24px rgba(160,130,190,0.05)",
                    minHeight: 155,
                  }}
                >
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "16px",
                      bgcolor: "rgba(255,255,255,0.72)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#5A5D78",
                      mb: 1.8,
                    }}
                  >
                    {item.icon}
                  </Box>

                  <Typography sx={{ color: "#7A7391", fontSize: "0.92rem", mb: 0.6 }}>
                    {item.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "1.9rem",
                      fontWeight: 900,
                      color: "#4E416D",
                      lineHeight: 1.1,
                    }}
                  >
                    {item.value}
                  </Typography>

                  <Typography sx={{ color: "#8A839C", fontSize: "0.88rem", mt: 0.9 }}>
                    {item.sub}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3} alignItems="stretch">
            <Grid item xs={12} lg={8}>
              <Stack spacing={3}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2.4, md: 3 },
                    borderRadius: "30px",
                    bgcolor: "rgba(255,255,255,0.84)",
                    border: "1px solid #EEE6F5",
                    boxShadow: "0 12px 28px rgba(160,130,190,0.06)",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "1.8rem", md: "2.1rem" },
                      fontWeight: 900,
                      color: "#4E416D",
                      lineHeight: 1.1,
                      mb: 0.7,
                    }}
                  >
                    Pending Requests
                  </Typography>

                  <Typography
                    sx={{
                      color: "#7B7390",
                      lineHeight: 1.7,
                      fontSize: "0.96rem",
                      mb: 2.6,
                    }}
                  >
                    Accept or reschedule incoming booking requests. Declined requests are removed.
                  </Typography>

                  <Stack spacing={2}>
                    {pendingBookings.length ? (
                      pendingBookings.map((booking) => renderBookingCard(booking, "pending"))
                    ) : (
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2.5,
                          borderRadius: "22px",
                          bgcolor: "#FAF8FD",
                          border: "1px solid #EEE6F5",
                        }}
                      >
                        <Typography sx={{ color: "#7B7390", fontSize: "0.96rem" }}>
                          No pending requests right now.
                        </Typography>
                      </Paper>
                    )}
                  </Stack>
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2.4, md: 3 },
                    borderRadius: "30px",
                    bgcolor: "rgba(255,255,255,0.84)",
                    border: "1px solid #EEE6F5",
                    boxShadow: "0 12px 28px rgba(160,130,190,0.06)",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "1.6rem", md: "1.9rem" },
                      fontWeight: 900,
                      color: "#4E416D",
                      lineHeight: 1.1,
                      mb: 2,
                    }}
                  >
                    Confirmed Bookings
                  </Typography>

                  <Stack spacing={2}>
                    {confirmedBookings.length ? (
                      confirmedBookings.map((booking) => renderBookingCard(booking, "confirmed"))
                    ) : (
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2.5,
                          borderRadius: "22px",
                          bgcolor: "#FAF8FD",
                          border: "1px solid #EEE6F5",
                        }}
                      >
                        <Typography sx={{ color: "#7B7390", fontSize: "0.96rem" }}>
                          No confirmed bookings yet.
                        </Typography>
                      </Paper>
                    )}
                  </Stack>
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2.4, md: 3 },
                    borderRadius: "30px",
                    bgcolor: "rgba(255,255,255,0.84)",
                    border: "1px solid #EEE6F5",
                    boxShadow: "0 12px 28px rgba(160,130,190,0.06)",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "1.6rem", md: "1.9rem" },
                      fontWeight: 900,
                      color: "#4E416D",
                      lineHeight: 1.1,
                      mb: 2,
                    }}
                  >
                    Completed Bookings
                  </Typography>

                  <Stack spacing={2}>
                    {completedBookings.length ? (
                      completedBookings.map((booking) => renderBookingCard(booking, "completed"))
                    ) : (
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2.5,
                          borderRadius: "22px",
                          bgcolor: "#FAF8FD",
                          border: "1px solid #EEE6F5",
                        }}
                      >
                        <Typography sx={{ color: "#7B7390", fontSize: "0.96rem" }}>
                          No completed bookings yet.
                        </Typography>
                      </Paper>
                    )}
                  </Stack>
                </Paper>
              </Stack>
            </Grid>

            <Grid item xs={12} lg={4}>
              <Stack spacing={3} sx={{ height: "100%" }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.6,
                    borderRadius: "30px",
                    bgcolor: "rgba(255,255,255,0.84)",
                    border: "1px solid #EEE6F5",
                    boxShadow: "0 12px 28px rgba(160,130,190,0.06)",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.3rem",
                      fontWeight: 900,
                      color: "#4E416D",
                      mb: 2,
                    }}
                  >
                    Today’s Schedule
                  </Typography>

                  <Stack spacing={1.5}>
                    {confirmedBookings.length ? (
                      confirmedBookings.map((item) => (
                        <Paper
                          key={item.id}
                          elevation={0}
                          sx={{
                            p: 2,
                            borderRadius: "20px",
                            bgcolor: "#FAF8FD",
                            border: "1px solid #EEE6F5",
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 800,
                              color: "#3F3558",
                              fontSize: "1rem",
                            }}
                          >
                            {item.service}
                          </Typography>

                          <Typography sx={{ color: "#7B7390", mt: 0.5, fontSize: "0.92rem" }}>
                            {item.customer}
                          </Typography>

                          <Chip
                            label={`${item.date} • ${item.time}`}
                            size="small"
                            sx={{
                              mt: 1.2,
                              bgcolor: "#F3E8FF",
                              color: "#6B4FD3",
                              fontWeight: 700,
                            }}
                          />
                        </Paper>
                      ))
                    ) : (
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2.2,
                          borderRadius: "20px",
                          bgcolor: "#FAF8FD",
                          border: "1px solid #EEE6F5",
                        }}
                      >
                        <Typography sx={{ color: "#7B7390", fontSize: "0.94rem" }}>
                          No confirmed schedule for now.
                        </Typography>
                      </Paper>
                    )}
                  </Stack>
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    p: 2.6,
                    borderRadius: "30px",
                    bgcolor: "rgba(255,255,255,0.84)",
                    border: "1px solid #EEE6F5",
                    boxShadow: "0 12px 28px rgba(160,130,190,0.06)",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.3rem",
                      fontWeight: 900,
                      color: "#4E416D",
                      mb: 1.4,
                    }}
                  >
                    Booking Insights
                  </Typography>

                  <Typography
                    sx={{
                      color: "#7B7390",
                      lineHeight: 1.8,
                      fontSize: "0.94rem",
                      mb: 2,
                    }}
                  >
                    Accepted bookings move into confirmed section. Declined bookings are removed from the page instantly.
                  </Typography>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.1,
                      borderRadius: "22px",
                      background: "linear-gradient(135deg, #F2E8FF, #FFEAF3)",
                      border: "1px solid #EEDFF7",
                    }}
                  >
                    <Typography sx={{ color: "#7D6A9A", fontSize: "0.92rem" }}>
                      Weekly Success Rate
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "1.9rem",
                        fontWeight: 900,
                        color: "#6B4FD3",
                        mt: 0.5,
                      }}
                    >
                      {weeklySuccessRate}%
                    </Typography>
                  </Paper>

                  <Paper
                    elevation={0}
                    sx={{
                      mt: 2,
                      p: 2.1,
                      borderRadius: "22px",
                      bgcolor: "#FAF8FD",
                      border: "1px solid #EEE6F5",
                    }}
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <EventAvailableRoundedIcon sx={{ color: "#6B4FD3" }} />
                      <Typography sx={{ color: "#5F5870", fontSize: "0.94rem" }}>
                        Confirmed bookings appear in Today’s Schedule automatically.
                      </Typography>
                    </Stack>
                  </Paper>
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: "24px",
            p: 1,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, color: "#4E416D" }}>
          Reschedule Booking
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="New Date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
            <TextField
              fullWidth
              label="New Time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 2, pb: 2 }}>
          <Button
            onClick={() => setDialogOpen(false)}
            sx={{
              textTransform: "none",
              color: "#5A526E",
              fontWeight: 700,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveReschedule}
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: "12px",
              bgcolor: "#8D6FE8",
              fontWeight: 700,
              boxShadow: "none",
              "&:hover": { bgcolor: "#7C5FE0" },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
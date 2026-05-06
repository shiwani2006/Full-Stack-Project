import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  Chip,
  Button,
  Avatar,
  LinearProgress,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import HomeRepairServiceRoundedIcon from "@mui/icons-material/HomeRepairServiceRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import ProviderSidebar, { providerSidebarWidth } from "../../components/layout/ProviderSidebar";
import ProviderTopbar from "../../components/layout/ProviderTopbar";
import logo from "../../assets/LOGO.png";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function ProviderDashboard() {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    name: "Provider",
    email: "provider@gmail.com",
    role: "provider",
    creditBalance: 0,
    cashBalance: 0,
  };

  const [profile, setProfile] = useState(storedUser);
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, servicesRes, bookingsRes] = await Promise.all([
          axiosInstance.get("/users/me"),
          axiosInstance.get(`/services?providerId=${storedUser.id}`),
          axiosInstance.get("/bookings/my"),
        ]);

        const freshProfile = profileRes.data.user;
        localStorage.setItem("user", JSON.stringify(freshProfile));
        setProfile(freshProfile);
        setServices(servicesRes.data.services || []);
        setBookings(bookingsRes.data.bookings || []);

        // Fetch reviews for this provider
        if (freshProfile.id) {
          const reviewRes = await axiosInstance.get(`/reviews/provider/${freshProfile.id}`);
          setReviews(reviewRes.data.reviews || []);
        }
      } catch (err) {
        console.error("Failed to fetch provider data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const displayName = profile?.name || "Provider";
  const displayImage = profile?.profileImage || "";
  const displayInitial = displayName.charAt(0).toUpperCase();

  const completedBookings = bookings.filter((b) => b.status === "completed");
  const pendingBookings = bookings.filter((b) => b.status === "pending");
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed");

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "N/A";

  const stats = [
    {
      title: "Active Services",
      value: services.length.toString(),
      sub: "Live service listings",
      icon: <HomeRepairServiceRoundedIcon />,
      bg: "linear-gradient(135deg, #F4EAFF 0%, #EDE2FF 100%)",
      valueColor: "#6B4FD3",
    },
    {
      title: "Bookings",
      value: bookings.length.toString(),
      sub: "Pending + completed",
      icon: <EventAvailableRoundedIcon />,
      bg: "linear-gradient(135deg, #EAF4FF 0%, #DFECFF 100%)",
      valueColor: "#4F79C8",
    },
    {
      title: "Credits Earned",
      value: profile?.creditBalance?.toString() || "0",
      sub: "Current credit balance",
      icon: <SavingsRoundedIcon />,
      bg: "linear-gradient(135deg, #ECFAEE 0%, #E1F5E5 100%)",
      valueColor: "#4E9660",
    },
    {
      title: "Cash Balance",
      value: `₹${profile?.cashBalance || 0}`,
      sub: "Available cash",
      icon: <CurrencyRupeeRoundedIcon />,
      bg: "linear-gradient(135deg, #FFF5E9 0%, #FFEACC 100%)",
      valueColor: "#C78637",
    },
  ];

  const recentBookings = bookings.slice(0, 3);

  const getStatusStyle = (status) => {
    if (status === "completed") return { bg: "#E7F7EA", color: "#297A43" };
    if (status === "confirmed") return { bg: "#E8F0FF", color: "#4B6FC9" };
    return { bg: "#FAF0D8", color: "#A57517" };
  };

  const getStatusLabel = (status) => {
    if (status === "completed") return "Completed";
    if (status === "confirmed") return "Confirmed";
    if (status === "cancelled") return "Cancelled";
    return "Pending";
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#F8F5FC",
        backgroundImage: `
          radial-gradient(circle at 0% 100%, rgba(224,236,255,0.88) 0, transparent 22%),
          radial-gradient(circle at 100% 0%, rgba(255,214,231,0.82) 0, transparent 20%),
          radial-gradient(circle at 50% 20%, rgba(230,220,255,0.40) 0, transparent 26%)
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
            right: 40,
            bottom: 40,
            width: 320,
            opacity: 0.05,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 90,
            right: 50,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(205,183,255,0.35) 0%, rgba(205,183,255,0) 70%)",
            filter: "blur(22px)",
            zIndex: 0,
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <ProviderTopbar title="Provider Dashboard" />

          {/* HERO */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              mb: 3,
              borderRadius: "34px",
              bgcolor: "rgba(255,255,255,0.82)",
              border: "1px solid #EEE6F5",
              boxShadow: "0 16px 34px rgba(160,130,190,0.08)",
            }}
          >
            <Grid container spacing={3} alignItems="stretch">
              <Grid item xs={12} xl={7.5}>
                <Chip
                  label="Your premium provider workspace"
                  sx={{ mb: 2, bgcolor: "#F3E8FF", color: "#6B4FD3", fontWeight: 700, px: 0.8, borderRadius: "999px" }}
                />

                <Typography
                  sx={{
                    fontSize: { xs: "2.2rem", md: "4rem" },
                    fontWeight: 900,
                    color: "#2D2342",
                    lineHeight: 1.02,
                    letterSpacing: "-1.2px",
                    mb: 1.5,
                  }}
                >
                  Welcome back,
                  <Box component="span" sx={{ color: "#7A57E6", ml: 1 }}>
                    {displayName}
                  </Box>
                </Typography>

                <Typography
                  sx={{ color: "#756C8C", lineHeight: 1.9, fontSize: "1.03rem", maxWidth: 760, mb: 3 }}
                >
                  Manage your services, track provider bookings, monitor earnings,
                  and reply faster to users from one premium dashboard designed for daily work.
                </Typography>

                <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap" sx={{ mb: 2.5 }}>
                  <Button
                    variant="contained"
                    startIcon={<AddRoundedIcon />}
                    onClick={() => navigate("/provider/create-service")}
                    sx={{
                      bgcolor: "#8D6FE8",
                      textTransform: "none",
                      borderRadius: "16px",
                      px: 3,
                      py: 1.25,
                      fontWeight: 700,
                      boxShadow: "0 14px 28px rgba(141,111,232,0.16)",
                      "&:hover": { bgcolor: "#7C5FE0" },
                    }}
                  >
                    Add New Service
                  </Button>

                  <Button
  variant="outlined"
  startIcon={<ChatRoundedIcon />}
  onClick={() => navigate("/provider/chat")}
  sx={{
    borderColor: "#D7CEE8",
    color: "#514A67",
    textTransform: "none",
    borderRadius: "16px",
    px: 3,
    py: 1.25,
    fontWeight: 700,
    bgcolor: "#fff",
  }}
>
  Open Chats
</Button>

<Button
  variant="outlined"
  startIcon={<PersonRoundedIcon />}
  onClick={() => navigate("/user/dashboard")}
  sx={{
    borderColor: "#D7CEE8",
    color: "#7b4cff",
    textTransform: "none",
    borderRadius: "16px",
    px: 3,
    py: 1.25,
    fontWeight: 700,
    bgcolor: "#f5f0ff",
    "&:hover": { bgcolor: "#ebe3ff", borderColor: "#b58cff" },
  }}
>
  Switch to User
</Button>
                </Stack>

                <Stack direction="row" spacing={1.2} flexWrap="wrap" useFlexGap>
                  <Chip
                    icon={<VerifiedRoundedIcon sx={{ color: "#6B4FD3 !important" }} />}
                    label="Verified Provider"
                    sx={{ bgcolor: "#F7F0FF", color: "#5B4A80", fontWeight: 700, px: 0.8 }}
                  />
                  <Chip
                    icon={<BoltRoundedIcon sx={{ color: "#6B4FD3 !important" }} />}
                    label="Fast Response"
                    sx={{ bgcolor: "#EEF5FF", color: "#5B4A80", fontWeight: 700, px: 0.8 }}
                  />
                  <Chip
                    icon={<StarRoundedIcon sx={{ color: "#6B4FD3 !important" }} />}
                    label={`Avg Rating: ${avgRating}`}
                    sx={{ bgcolor: "#FFF1F7", color: "#5B4A80", fontWeight: 700, px: 0.8 }}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} xl={4.5}>
                <Paper
                  elevation={0}
                  sx={{
                    height: "100%",
                    p: 2.4,
                    borderRadius: "28px",
                    background: "linear-gradient(135deg, #F1E8FF 0%, #EAF2FF 55%, #FFEAF3 100%)",
                    border: "1px solid #EEE6F5",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                    <Avatar
                      src={displayImage}
                      sx={{
                        width: 62,
                        height: 62,
                        bgcolor: "#C9B3EF",
                        color: "#4E425D",
                        fontWeight: 800,
                        fontSize: "1.4rem",
                      }}
                    >
                      {!displayImage ? displayInitial : ""}
                    </Avatar>

                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 900, color: "#43345F", fontSize: "1.15rem", wordBreak: "break-word" }}>
                        {displayName}
                      </Typography>
                      <Typography sx={{ color: "#7E7694", fontSize: "0.95rem" }}>
                        {profile?.email || "provider@example.com"}
                      </Typography>
                    </Box>
                  </Box>

                  <Paper elevation={0} sx={{ p: 2, borderRadius: "20px", bgcolor: "rgba(255,255,255,0.76)", mb: 1.8 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                      <Typography sx={{ color: "#7D6A9A", fontSize: "0.92rem" }}>Profile Strength</Typography>
                      <Typography sx={{ color: "#6B4FD3", fontWeight: 800 }}>
                        {profile?.trustScore || 100}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={profile?.trustScore || 100}
                      sx={{
                        height: 10,
                        borderRadius: 999,
                        bgcolor: "#E6DAFF",
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 999,
                          background: "linear-gradient(135deg, #8D6FE8, #BE8BFF)",
                        },
                      }}
                    />
                  </Paper>

                  <Grid container spacing={1.5}>
                    <Grid item xs={6}>
                      <Paper elevation={0} sx={{ p: 1.8, borderRadius: "18px", bgcolor: "rgba(255,255,255,0.76)", height: "100%" }}>
                        <Typography sx={{ color: "#8A839C", fontSize: "0.85rem", mb: 0.5 }}>Services</Typography>
                        <Typography sx={{ color: "#4A3D67", fontWeight: 800 }}>{services.length}</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper elevation={0} sx={{ p: 1.8, borderRadius: "18px", bgcolor: "rgba(255,255,255,0.76)", height: "100%" }}>
                        <Typography sx={{ color: "#8A839C", fontSize: "0.85rem", mb: 0.5 }}>Avg Rating</Typography>
                        <Typography sx={{ color: "#4A3D67", fontWeight: 800 }}>{avgRating}</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Paper>

          {/* STATS */}
          <Grid container spacing={3}>
            {stats.map((item, index) => (
              <Grid item xs={12} sm={6} xl={3} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: "30px",
                    background: item.bg,
                    border: "1px solid #EDE3F7",
                    boxShadow: "0 10px 24px rgba(160,130,190,0.06)",
                    minHeight: 190,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Box sx={{ position: "absolute", top: -24, right: -18, width: 100, height: 100, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.28)" }} />
                  <Box sx={{ width: 54, height: 54, borderRadius: "18px", bgcolor: "rgba(255,255,255,0.76)", display: "flex", alignItems: "center", justifyContent: "center", color: item.valueColor, mb: 2, position: "relative", zIndex: 1 }}>
                    {item.icon}
                  </Box>
                  <Typography sx={{ color: "#7C7393", fontSize: "1rem", mb: 1, position: "relative", zIndex: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ fontSize: "2.5rem", fontWeight: 900, color: item.valueColor, lineHeight: 1.1, position: "relative", zIndex: 1 }}>
                    {item.value}
                  </Typography>
                  <Typography sx={{ mt: 1.2, color: "#847A97", fontSize: "0.95rem", position: "relative", zIndex: 1 }}>
                    {item.sub}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* LOWER CONTENT */}
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid item xs={12} xl={7}>
              <Paper
                elevation={0}
                sx={{ p: 3.5, borderRadius: "30px", bgcolor: "rgba(255,255,255,0.84)", border: "1px solid #EEE6F5", boxShadow: "0 14px 28px rgba(160,130,190,0.06)", mb: 3 }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, flexWrap: "wrap", mb: 2.4 }}>
                  <Box>
                    <Typography sx={{ fontSize: "1.7rem", fontWeight: 900, color: "#4E416D" }}>
                      Recent Bookings
                    </Typography>
                    <Typography sx={{ color: "#7D7592", mt: 0.6 }}>
                      Latest user requests and service activity
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/provider/bookings")}
                    sx={{ borderColor: "#D7CEE8", color: "#514A67", textTransform: "none", borderRadius: "14px", px: 2.5, py: 1, fontWeight: 700, bgcolor: "#fff" }}
                  >
                    View All
                  </Button>
                </Box>

                <Stack spacing={2}>
                  {loading ? (
                    <Typography sx={{ color: "#8A839C" }}>Loading bookings...</Typography>
                  ) : recentBookings.length === 0 ? (
                    <Typography sx={{ color: "#8A839C" }}>No bookings yet.</Typography>
                  ) : (
                    recentBookings.map((item, index) => {
                      const statusStyle = getStatusStyle(item.status);
                      return (
                        <Paper key={index} elevation={0} sx={{ p: 2.3, borderRadius: "24px", bgcolor: "#FAF8FD", border: "1px solid #EEE6F5" }}>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.6 }}>
                              <Box sx={{ width: 52, height: 52, borderRadius: "16px", bgcolor: "#F2E8FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.45rem" }}>
                                📋
                              </Box>
                              <Box>
                                <Typography sx={{ fontWeight: 800, color: "#514074", fontSize: "1.05rem" }}>
                                  {item.service?.title || "Service"}
                                </Typography>
                                <Typography sx={{ color: "#7D7592", mt: 0.5 }}>
                                  {item.requester?.name || "User"} • {new Date(item.createdAt).toLocaleDateString()}
                                </Typography>
                              </Box>
                            </Box>
                            <Chip
                              label={getStatusLabel(item.status)}
                              sx={{ fontWeight: 700, bgcolor: statusStyle.bg, color: statusStyle.color }}
                            />
                          </Box>
                        </Paper>
                      );
                    })
                  )}
                </Stack>
              </Paper>

              <Paper elevation={0} sx={{ p: 3, borderRadius: "30px", bgcolor: "rgba(255,255,255,0.84)", border: "1px solid #EEE6F5", boxShadow: "0 14px 28px rgba(160,130,190,0.06)" }}>
                <Typography sx={{ fontSize: "1.55rem", fontWeight: 900, color: "#4E416D", mb: 1.3 }}>
                  Provider Insight
                </Typography>
                <Typography sx={{ color: "#7A7290", lineHeight: 1.85, mb: 2.5 }}>
                  Your profile is performing well this month. Keep services updated,
                  reply quickly, and maintain great reviews to improve visibility and booking conversions.
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Paper elevation={0} sx={{ p: 2.4, borderRadius: "22px", background: "linear-gradient(135deg, #F2E8FF, #FFEAF3)", border: "1px solid #EEDFF7" }}>
                      <Typography sx={{ color: "#7D6A9A", mb: 0.7 }}>Completed</Typography>
                      <Typography sx={{ fontSize: "2rem", fontWeight: 900, color: "#6B4FD3" }}>
                        {completedBookings.length} bookings
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper elevation={0} sx={{ p: 2.4, borderRadius: "22px", background: "linear-gradient(135deg, #EAF3FF, #F1F8FF)", border: "1px solid #E4ECF8" }}>
                      <Typography sx={{ color: "#6B799A", mb: 0.7 }}>Avg. Rating</Typography>
                      <Typography sx={{ fontSize: "2rem", fontWeight: 900, color: "#4A77B8" }}>
                        {avgRating}/5
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12} xl={5}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: "30px", bgcolor: "rgba(255,255,255,0.84)", border: "1px solid #EEE6F5", boxShadow: "0 14px 28px rgba(160,130,190,0.06)", mb: 3 }}>
                <Typography sx={{ fontSize: "1.5rem", fontWeight: 900, color: "#4E416D", mb: 2.3 }}>
                  My Services
                </Typography>
                <Stack spacing={2}>
                  {loading ? (
                    <Typography sx={{ color: "#8A839C" }}>Loading services...</Typography>
                  ) : services.length === 0 ? (
                    <Typography sx={{ color: "#8A839C" }}>No services yet. Add your first service!</Typography>
                  ) : (
                    services.slice(0, 3).map((item, index) => (
                      <Paper key={index} elevation={0} sx={{ p: 2.2, borderRadius: "22px", bgcolor: "#FAF8FD", border: "1px solid #EEE6F5" }}>
                        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 1.5 }}>
                          <Box sx={{ display: "flex", gap: 1.2 }}>
                            <Box sx={{ width: 42, height: 42, borderRadius: "14px", bgcolor: "#F3E8FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>
                              🛠️
                            </Box>
                            <Box>
                              <Typography sx={{ fontWeight: 700, color: "#5A4B7A", fontSize: "1rem" }}>
                                {item.title}
                              </Typography>
                              <Typography sx={{ color: "#8A839C", mt: 0.4, fontSize: "0.92rem" }}>
                                {item.category || "General"}
                              </Typography>
                            </Box>
                          </Box>
                          <Chip
                            label={item.cashRate ? `₹${item.cashRate}` : `${item.creditRate} cr`}
                            sx={{ bgcolor: "#F3E8FF", color: "#5C5470", fontWeight: 700 }}
                          />
                        </Box>
                      </Paper>
                    ))
                  )}
                </Stack>
              </Paper>

              <Paper elevation={0} sx={{ p: 3, borderRadius: "30px", bgcolor: "rgba(255,255,255,0.84)", border: "1px solid #EEE6F5", boxShadow: "0 14px 28px rgba(160,130,190,0.06)" }}>
                <Typography sx={{ fontSize: "1.5rem", fontWeight: 900, color: "#4E416D", mb: 2 }}>
                  Quick Health Check
                </Typography>
                <Stack spacing={1.5}>
                  {[
                    "Fast replies are improving conversions",
                    "Best booking time: 11 AM to 4 PM",
                    "Update top services to stay visible",
                  ].map((text, idx) => (
                    <Box key={idx} sx={{ p: 1.8, borderRadius: "18px", bgcolor: "#FAF8FD", border: "1px solid #EEE6F5", display: "flex", alignItems: "center", gap: 1.2 }}>
                      {idx === 0 ? (
                        <TrendingUpRoundedIcon sx={{ color: "#6B4FD3" }} />
                      ) : idx === 1 ? (
                        <AccessTimeRoundedIcon sx={{ color: "#6B4FD3" }} />
                      ) : (
                        <PersonRoundedIcon sx={{ color: "#6B4FD3" }} />
                      )}
                      <Typography sx={{ color: "#615871", fontWeight: 600 }}>{text}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

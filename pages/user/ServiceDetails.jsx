import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Avatar,
  Grid,
  Stack,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import UserSidebar, { sidebarWidth } from "../../components/layout/UserSidebar";
import UserTopbar from "../../components/layout/UserTopbar";

export default function ServiceDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const service = {
    id,
    title: "AC Repair",
    category: "Repair",
    description:
      "Professional AC repair and maintenance service for homes and small offices. Includes quick diagnosis, gas check, filter cleaning, and common issue fixing with reliable support.",
    price: "₹800",
    credits: "75 Credits",
    provider: "Rohit Sharma",
    rating: "4.8",
    location: "Shimla, Himachal Pradesh",
    availability: "Tomorrow, 10:00 AM - 6:00 PM",
    experience: "5+ years experience",
  };

  const reviews = [
    {
      name: "Neha",
      text: "Very professional and quick service. My AC started working perfectly again.",
      rating: "5.0",
    },
    {
      name: "Aman",
      text: "On time and polite. Explained the issue clearly before fixing it.",
      rating: "4.7",
    },
    {
      name: "Riya",
      text: "Good experience overall and fair pricing.",
      rating: "4.8",
    },
  ];

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
        <UserTopbar title="Service Details" />

        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: "32px",
                bgcolor: "rgba(255,255,255,0.74)",
                border: "1px solid #EEE6F5",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  width: 82,
                  height: 82,
                  borderRadius: "24px",
                  bgcolor: "#DDECF8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#5B5A85",
                  mb: 2.5,
                }}
              >
                <BuildRoundedIcon sx={{ fontSize: 38 }} />
              </Box>

              <Typography
                sx={{
                  fontSize: { xs: "2rem", md: "2.8rem" },
                  fontWeight: 900,
                  color: "#201B2E",
                  mb: 1.2,
                  lineHeight: 1.08,
                }}
              >
                {service.title}
              </Typography>

              <Stack direction="row" spacing={1.2} flexWrap="wrap" useFlexGap sx={{ mb: 2.5 }}>
                <Chip label={service.category} sx={{ bgcolor: "#F3ECF6", fontWeight: 700 }} />
                <Chip label={service.price} sx={{ bgcolor: "#FFF3E8", fontWeight: 700 }} />
                <Chip label={service.credits} sx={{ bgcolor: "#E9F5EC", fontWeight: 700 }} />
              </Stack>

              <Typography
                sx={{
                  color: "#697487",
                  lineHeight: 1.9,
                  fontSize: "1.02rem",
                  mb: 3,
                }}
              >
                {service.description}
              </Typography>

              <Grid container spacing={2.2}>
                <Grid item xs={12} sm={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.2,
                      borderRadius: "22px",
                      bgcolor: "#F9F7FC",
                      border: "1px solid #EEE6F5",
                    }}
                  >
                    <Typography sx={{ color: "#8A839C", mb: 0.6 }}>Availability</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CalendarMonthRoundedIcon sx={{ color: "#8A7FA7" }} />
                      <Typography sx={{ fontWeight: 700, color: "#322B49" }}>
                        {service.availability}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.2,
                      borderRadius: "22px",
                      bgcolor: "#F9F7FC",
                      border: "1px solid #EEE6F5",
                    }}
                  >
                    <Typography sx={{ color: "#8A839C", mb: 0.6 }}>Location</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LocationOnRoundedIcon sx={{ color: "#8A7FA7" }} />
                      <Typography sx={{ fontWeight: 700, color: "#322B49" }}>
                        {service.location}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.2,
                      borderRadius: "22px",
                      bgcolor: "#F9F7FC",
                      border: "1px solid #EEE6F5",
                    }}
                  >
                    <Typography sx={{ color: "#8A839C", mb: 0.6 }}>Provider Rating</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <StarRoundedIcon sx={{ color: "#F5B301" }} />
                      <Typography sx={{ fontWeight: 700, color: "#322B49" }}>
                        {service.rating} / 5.0
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.2,
                      borderRadius: "22px",
                      bgcolor: "#F9F7FC",
                      border: "1px solid #EEE6F5",
                    }}
                  >
                    <Typography sx={{ color: "#8A839C", mb: 0.6 }}>Experience</Typography>
                    <Typography sx={{ fontWeight: 700, color: "#322B49" }}>
                      {service.experience}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: "32px",
                bgcolor: "rgba(255,255,255,0.74)",
                border: "1px solid #EEE6F5",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.6rem",
                  fontWeight: 900,
                  color: "#231E34",
                  mb: 2.5,
                }}
              >
                Reviews
              </Typography>

              <Stack spacing={2}>
                {reviews.map((review, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      p: 2.4,
                      borderRadius: "22px",
                      bgcolor: "#F9F7FC",
                      border: "1px solid #EEE6F5",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 1,
                        alignItems: "center",
                        mb: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography sx={{ fontWeight: 800, color: "#3D3757" }}>
                        {review.name}
                      </Typography>
                      <Chip
                        icon={<StarRoundedIcon sx={{ color: "#F5B301 !important" }} />}
                        label={review.rating}
                        sx={{ bgcolor: "#FFF7D6", fontWeight: 700 }}
                      />
                    </Box>
                    <Typography sx={{ color: "#6B6881", lineHeight: 1.8 }}>
                      {review.text}
                    </Typography>
                  </Paper>
                ))}
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
                position: { lg: "sticky" },
                top: { lg: 24 },
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 900,
                  color: "#231E34",
                  mb: 2,
                }}
              >
                Provider Info
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2.5 }}>
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: "#D9C3F3",
                    color: "#5B4E75",
                    fontWeight: 800,
                    fontSize: "1.4rem",
                  }}
                >
                  {service.provider.charAt(0)}
                </Avatar>

                <Box>
                  <Typography sx={{ fontWeight: 800, color: "#2D2A45", fontSize: "1.1rem" }}>
                    {service.provider}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.7, mt: 0.4 }}>
                    <VerifiedRoundedIcon sx={{ color: "#33A852", fontSize: 18 }} />
                    <Typography sx={{ color: "#6F6887", fontSize: "0.95rem" }}>
                      Verified Provider
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Paper
                elevation={0}
                sx={{
                  p: 2.2,
                  borderRadius: "22px",
                  bgcolor: "#F8F6FB",
                  border: "1px solid #EEE6F5",
                  mb: 2.2,
                }}
              >
                <Typography sx={{ color: "#8A839C", mb: 0.7 }}>Service Charges</Typography>
                <Typography sx={{ fontWeight: 800, fontSize: "1.25rem", color: "#3D3757" }}>
                  {service.price}
                </Typography>
                <Typography sx={{ color: "#6E6A83", mt: 0.4 }}>
                  or {service.credits}
                </Typography>
              </Paper>

              <Button
                fullWidth
                variant="contained"
                endIcon={<ArrowForwardRoundedIcon />}
                onClick={() => navigate("/book-service")}
                sx={{
                  bgcolor: "#8D6FE8",
                  color: "#fff",
                  textTransform: "none",
                  borderRadius: "18px",
                  py: 1.4,
                  fontWeight: 800,
                  boxShadow: "none",
                  mb: 1.5,
                  "&:hover": {
                    bgcolor: "#7C5FE0",
                  },
                }}
              >
                Book Now
              </Button>

              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate("/chat")}
                sx={{
                  borderColor: "#D7CEE8",
                  color: "#514A67",
                  textTransform: "none",
                  borderRadius: "18px",
                  py: 1.3,
                  fontWeight: 700,
                  bgcolor: "#fff",
                }}
              >
                Message Provider
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
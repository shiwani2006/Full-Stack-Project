import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  Chip,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CleaningServicesRoundedIcon from "@mui/icons-material/CleaningServicesRounded";
import ElectricalServicesRoundedIcon from "@mui/icons-material/ElectricalServicesRounded";
import PlumbingRoundedIcon from "@mui/icons-material/PlumbingRounded";
import HandymanRoundedIcon from "@mui/icons-material/HandymanRounded";
import LocalLaundryServiceRoundedIcon from "@mui/icons-material/LocalLaundryServiceRounded";
import GrassRoundedIcon from "@mui/icons-material/GrassRounded";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import ProviderSidebar, {
  providerSidebarWidth,
} from "../../components/layout/ProviderSidebar";
import ProviderTopbar from "../../components/layout/ProviderTopbar";
import logo from "../../assets/LOGO.png";
import { useNavigate } from "react-router-dom";

export default function ProviderServices() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Cleaning",
    "Repair",
    "Outdoor",
    "Beauty",
    "Maintenance",
    "Home Help",
  ];

  const services = [
    {
      title: "Home Cleaning",
      category: "Cleaning",
      credits: "20 credits / hour",
      status: "Active",
      rating: "4.9",
      subtitle: "Deep cleaning for rooms, kitchen, and bathroom spaces.",
      bg: "linear-gradient(135deg, #EFE5FF 0%, #E8DCFF 100%)",
      icon: <CleaningServicesRoundedIcon sx={{ color: "#6B4FD3", fontSize: 24 }} />,
    },
    {
      title: "AC Repair",
      category: "Repair",
      credits: "10 credits / hour",
      status: "Popular",
      rating: "4.8",
      subtitle: "Cooling issue fixing, gas check, and servicing support.",
      bg: "linear-gradient(135deg, #EAF4FF 0%, #DFECFF 100%)",
      icon: <BuildRoundedIcon sx={{ color: "#4F79C8", fontSize: 24 }} />,
    },
    {
      title: "Electrician Service",
      category: "Repair",
      credits: "15 credits / hour",
      status: "Active",
      rating: "4.7",
      subtitle: "Fan fitting, switch repair, and wiring assistance.",
      bg: "linear-gradient(135deg, #FFF4E8 0%, #FFE9D2 100%)",
      icon: <ElectricalServicesRoundedIcon sx={{ color: "#C78637", fontSize: 24 }} />,
    },
    {
      title: "Plumber Help",
      category: "Repair",
      credits: "12 credits / hour",
      status: "Active",
      rating: "4.6",
      subtitle: "Tap leakage, sink issues, and bathroom fitting work.",
      bg: "linear-gradient(135deg, #EAF2FF 0%, #EDF4FF 100%)",
      icon: <PlumbingRoundedIcon sx={{ color: "#5F79D4", fontSize: 24 }} />,
    },
    {
      title: "Gardening Help",
      category: "Outdoor",
      credits: "8 credits / hour",
      status: "Active",
      rating: "4.7",
      subtitle: "Plant care, trimming, watering, and garden maintenance.",
      bg: "linear-gradient(135deg, #ECF8F0 0%, #E0F4E6 100%)",
      icon: <GrassRoundedIcon sx={{ color: "#4E9660", fontSize: 24 }} />,
    },
    {
      title: "Appliance Repair",
      category: "Maintenance",
      credits: "18 credits / hour",
      status: "Popular",
      rating: "4.5",
      subtitle: "Repair support for mixer, microwave, and washing machine.",
      bg: "linear-gradient(135deg, #F4EAFF 0%, #F1E4FF 100%)",
      icon: <HandymanRoundedIcon sx={{ color: "#7A57E6", fontSize: 24 }} />,
    },
    {
      title: "Salon At Home",
      category: "Beauty",
      credits: "25 credits / hour",
      status: "Active",
      rating: "4.9",
      subtitle: "Home beauty services, grooming, and self-care sessions.",
      bg: "linear-gradient(135deg, #FDECF3 0%, #FFE3F0 100%)",
      icon: <SpaRoundedIcon sx={{ color: "#D8649A", fontSize: 24 }} />,
    },
    {
      title: "Laundry Service",
      category: "Cleaning",
      credits: "14 credits / hour",
      status: "Active",
      rating: "4.4",
      subtitle: "Washing, folding, and simple household laundry support.",
      bg: "linear-gradient(135deg, #EEF5FF 0%, #E3EEFF 100%)",
      icon: <LocalLaundryServiceRoundedIcon sx={{ color: "#5980D9", fontSize: 24 }} />,
    },
    {
      title: "Painting Work",
      category: "Home Help",
      credits: "16 credits / hour",
      status: "Active",
      rating: "4.3",
      subtitle: "Interior touch-up painting and wall refresh services.",
      bg: "linear-gradient(135deg, #FFF0F6 0%, #FFE6F0 100%)",
      icon: <BuildRoundedIcon sx={{ color: "#D66B99", fontSize: 24 }} />,
    },
    {
      title: "Pest Control",
      category: "Maintenance",
      credits: "17 credits / hour",
      status: "Popular",
      rating: "4.6",
      subtitle: "Basic pest treatment and hygiene-focused home support.",
      bg: "linear-gradient(135deg, #F5EEFF 0%, #ECE1FF 100%)",
      icon: <BuildRoundedIcon sx={{ color: "#7A57E6", fontSize: 24 }} />,
    },
    {
      title: "Water Tank Cleaning",
      category: "Cleaning",
      credits: "13 credits / hour",
      status: "Active",
      rating: "4.5",
      subtitle: "Water tank hygiene cleaning and safe maintenance work.",
      bg: "linear-gradient(135deg, #E9FBFF 0%, #DEF4FF 100%)",
      icon: <CleaningServicesRoundedIcon sx={{ color: "#4A9AC1", fontSize: 24 }} />,
    },
    {
      title: "Carpenter Work",
      category: "Home Help",
      credits: "19 credits / hour",
      status: "Active",
      rating: "4.7",
      subtitle: "Furniture fixing, shelves, and wood adjustment tasks.",
      bg: "linear-gradient(135deg, #FFF4EF 0%, #FFE7DE 100%)",
      icon: <HandymanRoundedIcon sx={{ color: "#B8734D", fontSize: 24 }} />,
    },
  ];

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const q = search.toLowerCase();

      const matchesSearch =
        service.title.toLowerCase().includes(q) ||
        service.category.toLowerCase().includes(q) ||
        service.subtitle.toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === "All" || service.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

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
          <ProviderTopbar title="My Services" />

          {/* COMPACT TOP SECTION */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.4, md: 3 },
              mb: 3,
              borderRadius: "28px",
              bgcolor: "rgba(255,255,255,0.84)",
              border: "1px solid #EEE6F5",
              boxShadow: "0 12px 28px rgba(160,130,190,0.06)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", lg: "center" },
                flexDirection: { xs: "column", lg: "row" },
                gap: 2,
                mb: 2.2,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: "1.6rem", md: "2rem" },
                    fontWeight: 900,
                    color: "#4E416D",
                    lineHeight: 1.1,
                  }}
                >
                  Provider Services
                </Typography>
                <Typography
                  sx={{
                    color: "#7B7390",
                    mt: 0.6,
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                  }}
                >
                  Manage, edit, and showcase all your service listings
                </Typography>
              </Box>

              <Stack direction="row" spacing={1.2} useFlexGap flexWrap="wrap">
                <Button
                  onClick={() => navigate("/provider/create")}
                  variant="contained"
                  startIcon={<AddCircleRoundedIcon />}
                  sx={{
                    bgcolor: "#6F63F6",
                    textTransform: "none",
                    borderRadius: "16px",
                    px: 2.5,
                    py: 1.1,
                    fontWeight: 800,
                    fontSize: "0.92rem",
                    boxShadow: "0 12px 24px rgba(111,99,246,0.16)",
                    "&:hover": {
                      bgcolor: "#6054EE",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.25s ease",
                  }}
                >
                  Create Service
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<VisibilityRoundedIcon />}
                  sx={{
                    borderColor: "#D7CEE8",
                    color: "#514A67",
                    textTransform: "none",
                    borderRadius: "16px",
                    px: 2.5,
                    py: 1.1,
                    fontWeight: 700,
                    fontSize: "0.92rem",
                    bgcolor: "#fff",
                    "&:hover": {
                      bgcolor: "#F8F4FF",
                      borderColor: "#BFAFE8",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.25s ease",
                  }}
                >
                  View Public Listings
                </Button>
              </Stack>
            </Box>

            <TextField
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search home cleaning, AC repair, gardening, laundry..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon sx={{ color: "#7E76A4" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "18px",
                  bgcolor: "#fff",
                  minHeight: 54,
                },
              }}
            />

            <Stack direction="row" spacing={1.1} useFlexGap flexWrap="wrap">
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onClick={() => setSelectedCategory(category)}
                  sx={{
                    px: 0.6,
                    py: 2.1,
                    borderRadius: "999px",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    border: "1px solid #E0D4F6",
                    bgcolor: selectedCategory === category ? "#8D6FE8" : "#fff",
                    color: selectedCategory === category ? "#fff" : "#5D5670",
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor:
                        selectedCategory === category ? "#7D60E3" : "#F8F3FF",
                    },
                    transition: "all 0.2s ease",
                  }}
                />
              ))}

              <Button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                variant="outlined"
                sx={{
                  borderColor: "#D7CEE8",
                  color: "#514A67",
                  textTransform: "none",
                  borderRadius: "999px",
                  px: 2,
                  py: 0.9,
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  bgcolor: "#fff",
                  "&:hover": {
                    bgcolor: "#F8F4FF",
                    borderColor: "#BFAFE8",
                  },
                }}
              >
                Reset
              </Button>
            </Stack>
          </Paper>

          {/* SERVICES */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.2, md: 2.8 },
              borderRadius: "28px",
              bgcolor: "rgba(255,255,255,0.84)",
              border: "1px solid #EEE6F5",
              boxShadow: "0 12px 28px rgba(160,130,190,0.06)",
            }}
          >
            <Box sx={{ mb: 2.5 }}>
              <Typography
                sx={{
                  fontSize: { xs: "1.45rem", md: "1.75rem" },
                  fontWeight: 900,
                  color: "#4E416D",
                  lineHeight: 1.1,
                }}
              >
                My Services
              </Typography>

              <Typography
                sx={{
                  color: "#7B7390",
                  mt: 0.7,
                  fontSize: "0.92rem",
                }}
              >
                {filteredServices.length} service{filteredServices.length !== 1 ? "s" : ""} found
              </Typography>
            </Box>

            <Grid container spacing={2.2} alignItems="stretch">
              {filteredServices.map((service, index) => (
                <Grid item xs={12} sm={6} xl={4} key={index} sx={{ display: "flex" }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.2,
                      borderRadius: "24px",
                      background: service.bg,
                      border: "1px solid #E9E1F3",
                      boxShadow: "0 10px 20px rgba(160,130,190,0.04)",
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      minHeight: 300,
                      transition: "all 0.28s ease",
                      cursor: "pointer",
                      "&:hover": {
                        transform: "translateY(-6px) scale(1.01)",
                        boxShadow: "0 18px 34px rgba(120,90,160,0.12)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 1.2,
                        mb: 1.8,
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
                          flexShrink: 0,
                        }}
                      >
                        {service.icon}
                      </Box>

                      <Stack
                        direction="row"
                        spacing={0.8}
                        flexWrap="wrap"
                        useFlexGap
                        justifyContent="flex-end"
                      >
                        <Chip
                          icon={<StarRoundedIcon sx={{ color: "#B9852D !important", fontSize: 16 }} />}
                          label={service.rating}
                          size="small"
                          sx={{
                            bgcolor: "rgba(255,255,255,0.72)",
                            color: "#4E4B61",
                            fontWeight: 700,
                            fontSize: "0.75rem",
                          }}
                        />

                        <Chip
                          label={service.status}
                          size="small"
                          sx={{
                            bgcolor: "rgba(255,255,255,0.72)",
                            color: "#4E4B61",
                            fontWeight: 700,
                            fontSize: "0.75rem",
                          }}
                        />
                      </Stack>
                    </Box>

                    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontSize: "1.08rem",
                          fontWeight: 900,
                          color: "#2E2A45",
                          lineHeight: 1.3,
                          mb: 0.6,
                        }}
                      >
                        {service.title}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#6F6A84",
                          fontSize: "0.87rem",
                          mb: 1,
                          fontWeight: 700,
                        }}
                      >
                        {service.category}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#746F87",
                          fontSize: "0.87rem",
                          lineHeight: 1.7,
                          mb: 1.5,
                          flex: 1,
                        }}
                      >
                        {service.subtitle}
                      </Typography>

                      <Chip
                        label={service.credits}
                        size="small"
                        sx={{
                          alignSelf: "flex-start",
                          bgcolor: "rgba(255,255,255,0.78)",
                          color: "#4F4A61",
                          fontWeight: 700,
                          fontSize: "0.74rem",
                        }}
                      />
                    </Box>

                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<EditRoundedIcon sx={{ fontSize: 18 }} />}
                        sx={{
                          borderRadius: "14px",
                          py: 0.95,
                          textTransform: "none",
                          fontWeight: 700,
                          fontSize: "0.86rem",
                          borderColor: "#6C8EF5",
                          color: "#2370D8",
                          bgcolor: "rgba(255,255,255,0.30)",
                          "&:hover": {
                            borderColor: "#5B7FF0",
                            bgcolor: "rgba(255,255,255,0.48)",
                          },
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<VisibilityRoundedIcon sx={{ fontSize: 18 }} />}
                        sx={{
                          borderRadius: "14px",
                          py: 0.95,
                          textTransform: "none",
                          fontWeight: 700,
                          fontSize: "0.86rem",
                          bgcolor: "#8D6FE8",
                          boxShadow: "none",
                          "&:hover": {
                            bgcolor: "#7C5FE0",
                          },
                        }}
                      >
                        View
                      </Button>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
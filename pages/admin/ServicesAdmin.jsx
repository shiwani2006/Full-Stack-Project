import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Stack,
  Chip,
  Button,
} from "@mui/material";
import DashboardLayout from "../../components/layout/DashboardLayout";

export default function ServicesAdmin() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = () => {
    const savedServices =
      JSON.parse(localStorage.getItem("services")) || [
        {
          id: 1,
          title: "Kitchen Cleaning",
          provider: "Rohit Sharma",
          category: "Cleaning",
          status: "Pending",
        },
        {
          id: 2,
          title: "Animal Care",
          provider: "Priya Thakur",
          category: "Animal Care",
          status: "Approved",
        },
        {
          id: 3,
          title: "Repair Service",
          provider: "Aman Sood",
          category: "Repair",
          status: "Review",
        },
      ];

    setServices(savedServices);
  };

  const updateStatus = (id, newStatus) => {
    const updated = services.map((service) =>
      service.id === id
        ? { ...service, status: newStatus }
        : service
    );

    setServices(updated);

    localStorage.setItem(
      "services",
      JSON.stringify(updated)
    );
  };

  return (
    <DashboardLayout>
      <Box
        sx={{
          p: 3,
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #fdf4ff 0%, #f8fafc 40%, #ecfeff 100%)",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 5,
            border: "1px solid #E9D5FF",
            mb: 3,
            background:
              "linear-gradient(135deg, #ede9fe, #fae8ff, #ecfeff)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ color: "#4C1D95" }}
          >
            Services Admin
          </Typography>

          <Typography
            sx={{
              color: "#6B7280",
              mt: 1,
            }}
          >
            Review, approve, and manage service listings.
          </Typography>
        </Paper>

        <Grid container spacing={3}>
          {services.map((service) => (
            <Grid
              item
              xs={12}
              md={6}
              key={service.id}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 5,
                  border: "1px solid #E5E7EB",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow:
                      "0 12px 24px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={700}
                >
                  {service.title}
                </Typography>

                <Typography
                  sx={{
                    color: "#6B7280",
                    mt: 0.5,
                  }}
                >
                  Provider:{" "}
                  {service.provider || "Unknown"}
                </Typography>

                <Typography
                  sx={{
                    color: "#6B7280",
                    mb: 2,
                  }}
                >
                  Category:{" "}
                  {service.category || "General"}
                </Typography>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="wrap"
                  gap={2}
                >
                  <Chip
                    label={service.status}
                    sx={{
                      backgroundColor:
                        service.status === "Approved"
                          ? "#DCFCE7"
                          : service.status === "Pending"
                          ? "#FEF3C7"
                          : "#DBEAFE",
                      fontWeight: 700,
                    }}
                  />

                  <Stack
                    direction="row"
                    spacing={1}
                  >
                    <Button
                      variant="contained"
                      onClick={() =>
                        updateStatus(
                          service.id,
                          "Approved"
                        )
                      }
                      sx={{
                        textTransform: "none",
                        borderRadius: 3,
                        backgroundColor:
                          "#A78BFA",
                      }}
                    >
                      Approve
                    </Button>

                    <Button
                      variant="outlined"
                      onClick={() =>
                        updateStatus(
                          service.id,
                          "Rejected"
                        )
                      }
                      sx={{
                        textTransform: "none",
                        borderRadius: 3,
                        borderColor:
                          "#FCA5A5",
                        color: "#DC2626",

                        "&:hover": {
                          backgroundColor:
                            "#FEF2F2",
                        },
                      }}
                    >
                      Reject
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
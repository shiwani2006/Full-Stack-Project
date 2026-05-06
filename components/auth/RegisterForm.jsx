import React, { useState } from "react";
import { registerUser } from "../../services/authService";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  InputAdornment,
} from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/LOGO.png";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await registerUser({ name, email, password, role: "user" });
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 700);
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 4,
        bgcolor: "#F8F5FC",
        backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(233,213,255,0.90) 0, transparent 20%),
          radial-gradient(circle at 90% 10%, rgba(219,234,254,0.90) 0, transparent 22%),
          radial-gradient(circle at 80% 85%, rgba(220,252,231,0.75) 0, transparent 20%),
          radial-gradient(circle at 15% 80%, rgba(254,205,211,0.70) 0, transparent 18%)
        `,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 540,
          p: { xs: 3, md: 4 },
          borderRadius: "34px",
          bgcolor: "rgba(255,255,255,0.80)",
          backdropFilter: "blur(18px)",
          border: "1px solid #EEE6F5",
          boxShadow: "0 18px 40px rgba(140,110,190,0.10)",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Box
            component="img"
            src={logo}
            alt="SkillSwap Logo"
            sx={{
              width: 90,
              height: 90,
              objectFit: "contain",
              mb: 1.5,
            }}
          />

          <Box
            sx={{
              width: 74,
              height: 74,
              borderRadius: "22px",
              mx: "auto",
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#E9DFFC",
              color: "#6B4FD3",
            }}
          >
            <HowToRegRoundedIcon sx={{ fontSize: 36 }} />
          </Box>

          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "2.45rem" },
              fontWeight: 900,
              color: "#54486E",
              mb: 1,
            }}
          >
            Create Account
          </Typography>

          <Typography
            sx={{
              color: "#7A7291",
              lineHeight: 1.8,
              maxWidth: 420,
              mx: "auto",
              mb: 3,
            }}
          >
            Join SkillSwap and start exchanging skills in your neighbourhood.
          </Typography>
        </Box>

        <form onSubmit={handleRegister}>
          <Stack spacing={2.2}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonRoundedIcon sx={{ color: "#8B7EA6" }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailRoundedIcon sx={{ color: "#8B7EA6" }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRoundedIcon sx={{ color: "#8B7EA6" }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRoundedIcon sx={{ color: "#8B7EA6" }} />
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Typography sx={{ color: "#D14343", fontWeight: 600 }}>
                {error}
              </Typography>
            )}

            {success && (
              <Typography sx={{ color: "#2E9B4F", fontWeight: 600 }}>
                {success}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 1,
                py: 1.5,
                borderRadius: "18px",
                bgcolor: "#8D6FE8",
                textTransform: "none",
                fontWeight: 800,
                fontSize: "1rem",
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "#7C5FE0",
                },
              }}
            >
              Create Account
            </Button>
          </Stack>
        </form>

        <Typography
          sx={{
            textAlign: "center",
            mt: 3,
            color: "#6F6887",
          }}
        >
          Already have an account?{" "}
          <Box
            component={Link}
            to="/login"
            sx={{
              color: "#6B4FD3",
              fontWeight: 800,
              textDecoration: "none",
            }}
          >
            Login
          </Box>
        </Typography>
      </Paper>
    </Box>
  );
}
import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  InputAdornment,
} from "@mui/material";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/LOGO.png";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const { email, password } = formData;

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      const res = await loginUser({ email, password });
      const loggedInUser = res.data.user;
      const token = res.data.token;

      localStorage.setItem("token", token);
      login(loggedInUser);
      navigate("/user/dashboard", { replace: true });
    } catch (err) {
      setError("Invalid email or password.");
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
          maxWidth: 520,
          p: { xs: 3, md: 4 },
          borderRadius: "34px",
          bgcolor: "rgba(255,255,255,0.82)",
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
            <LoginRoundedIcon sx={{ fontSize: 36 }} />
          </Box>

          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "2.45rem" },
              fontWeight: 900,
              color: "#54486E",
              mb: 1,
            }}
          >
            Welcome Back
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
            Login and continue to your dashboard.
          </Typography>
        </Box>

        <form onSubmit={handleLogin}>
          <Stack spacing={2.2}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
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
              autoComplete="current-password"
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
              Login
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
          Don&apos;t have an account?{" "}
          <Box
            component={Link}
            to="/register"
            sx={{
              color: "#6B4FD3",
              fontWeight: 800,
              textDecoration: "none",
            }}
          >
            Register
          </Box>
        </Typography>
      </Paper>
    </Box>
  );
}
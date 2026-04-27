import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";

import logo from "../../assets/LOGO.png";
import heroImage from "../../assets/homepage.png";
import aboutImage from "../../assets/about.png";

export default function Home() {
  const navigate = useNavigate();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const whyUseSkillSwap = [
    {
      icon: <GroupsRoundedIcon sx={{ fontSize: 28 }} />,
      title: "Community Connection",
      text: "Meet and help people around you while building trust in your neighbourhood.",
      bg: "#F3E8FF",
    },
    {
      icon: <CurrencyRupeeRoundedIcon sx={{ fontSize: 28 }} />,
      title: "Save Money",
      text: "Exchange useful services without depending only on cash payments.",
      bg: "#EAF2FF",
    },
    {
      icon: <AccessTimeFilledRoundedIcon sx={{ fontSize: 28 }} />,
      title: "Value Your Time",
      text: "Every hour you give becomes a credit you can use later for help you need.",
      bg: "#FDECF3",
    },
  ];

  const steps = [
    {
      icon: <PersonAddRoundedIcon sx={{ fontSize: 28 }} />,
      title: "Create Account",
      text: "Sign up as a user or provider and join your local SkillSwap network.",
      bg: "#F6E9FF",
    },
    {
      icon: <HandshakeRoundedIcon sx={{ fontSize: 28 }} />,
      title: "Exchange Skills",
      text: "Offer your time, earn credits, and use them for other local services.",
      bg: "#E8F0FF",
    },
    {
      icon: <SavingsRoundedIcon sx={{ fontSize: 28 }} />,
      title: "Grow Together",
      text: "Help your community, save money, and build stronger local support.",
      bg: "#FDECF3",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F8F5FC",
        backgroundImage: `
          radial-gradient(circle at 0% 100%, rgba(224,236,255,0.95) 0, transparent 25%),
          radial-gradient(circle at 100% 0%, rgba(255,214,231,0.85) 0, transparent 25%),
          radial-gradient(circle at 0% 0%, rgba(234,216,255,0.95) 0, transparent 20%)
        `,
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 3 }, py: 2 }}>
        {/* NAVBAR */}
        <Paper
          elevation={0}
          sx={{
            px: { xs: 2, md: 4 },
            py: 2,
            borderRadius: "32px",
            bgcolor: "rgba(255,255,255,0.76)",
            backdropFilter: "blur(18px)",
            border: "1px solid #ECE3F7",
            boxShadow: "0 10px 30px rgba(160,130,190,0.08)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 54,
                  height: 54,
                  borderRadius: "18px",
                  overflow: "hidden",
                  background: "linear-gradient(135deg,#9C63FF,#FF7EA7)",
                  boxShadow: "0 10px 22px rgba(156,99,255,0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  src={logo}
                  alt="SkillSwap"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              <Typography
                sx={{
                  fontSize: { xs: "1.9rem", md: "2.15rem" },
                  fontWeight: 900,
                  color: "#5A4387",
                  letterSpacing: "-0.8px",
                }}
              >
                SkillSwap
              </Typography>
            </Box>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => scrollTo("explore")}
                sx={{
                  color: "#6E5F8D",
                  textTransform: "none",
                  fontSize: "0.95rem",
                  px: 2,
                  borderRadius: "14px",
                }}
              >
                Explore
              </Button>

              <Button
                onClick={() => scrollTo("about")}
                sx={{
                  color: "#6E5F8D",
                  textTransform: "none",
                  fontSize: "0.95rem",
                  px: 2,
                  borderRadius: "14px",
                }}
              >
                About
              </Button>

              <Button
                onClick={() => scrollTo("why-use")}
                sx={{
                  color: "#6E5F8D",
                  textTransform: "none",
                  fontSize: "0.95rem",
                  px: 2,
                  borderRadius: "14px",
                }}
              >
                Why SkillSwap
              </Button>

              <Button
                onClick={() => scrollTo("how-it-works")}
                sx={{
                  color: "#6E5F8D",
                  textTransform: "none",
                  fontSize: "0.95rem",
                  px: 2,
                  borderRadius: "14px",
                }}
              >
                How It Works
              </Button>

              <Button
                onClick={() => scrollTo("contact")}
                sx={{
                  color: "#6E5F8D",
                  textTransform: "none",
                  fontSize: "0.95rem",
                  px: 2,
                  borderRadius: "14px",
                }}
              >
                Contact
              </Button>
            </Stack>

            <Stack direction="row" spacing={1.5}>
              <Button
                onClick={() => navigate("/login")}
                variant="outlined"
                sx={{
                  borderRadius: "20px",
                  px: 3,
                  py: 1.1,
                  textTransform: "none",
                  borderColor: "#D9CBEA",
                  color: "#6E5F8D",
                  fontWeight: 700,
                  bgcolor: "rgba(255,255,255,0.65)",
                }}
              >
                Login
              </Button>

              <Button
                onClick={() => navigate("/register")}
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  px: 3.2,
                  py: 1.1,
                  textTransform: "none",
                  fontWeight: 800,
                  background: "linear-gradient(90deg,#9C63FF,#FF7EA7)",
                  boxShadow: "none",
                }}
              >
                Get started
              </Button>
            </Stack>
          </Box>
        </Paper>

        {/* HERO */}
        <Box
          id="explore"
          sx={{
            mt: { xs: 5, md: 6 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: { xs: 4, md: 5 },
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: { xs: "2.8rem", sm: "3.5rem", md: "4.6rem" },
                fontWeight: 900,
                color: "#583A86",
                lineHeight: 1.02,
                letterSpacing: "-1.6px",
                maxWidth: "720px",
              }}
            >
              Exchange Skills,
              <br />
              Build Community
            </Typography>

            <Typography
              sx={{
                mt: 2.5,
                color: "#6E6186",
                fontSize: { xs: "1rem", md: "1.12rem" },
                lineHeight: 1.85,
                maxWidth: 620,
              }}
            >
              Spend an hour sharing your skills, earn credits, and exchange them
              for services right in your own neighborhood. No cash needed. Ever.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mt: 4, maxWidth: 540 }}
            >
              <Button
                onClick={() => navigate("/register")}
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  background: "linear-gradient(90deg,#9C63FF,#FF7EA7)",
                  color: "#fff",
                  borderRadius: "25px",
                  px: 4,
                  py: 1.7,
                  textTransform: "none",
                  fontWeight: 800,
                  fontSize: "0.98rem",
                  boxShadow: "0 14px 30px rgba(156,99,255,0.18)",
                }}
              >
                Join Now
              </Button>

              <Button
                onClick={() => navigate("/services")}
                variant="outlined"
                sx={{
                  borderRadius: "25px",
                  px: 4,
                  py: 1.7,
                  textTransform: "none",
                  borderColor: "#D9CBEA",
                  color: "#6E5F8D",
                  fontWeight: 700,
                  bgcolor: "rgba(255,255,255,0.55)",
                }}
              >
                Explore Services
              </Button>
            </Stack>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: "38px",
              bgcolor: "rgba(255,255,255,0.72)",
              border: "1px solid #EEE6F5",
              boxShadow: "0 16px 40px rgba(170,140,200,0.10)",
            }}
          >
            <Box
              sx={{
                position: "relative",
                borderRadius: "28px",
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={heroImage}
                alt="SkillSwap community"
                sx={{
                  width: "100%",
                  display: "block",
                  borderRadius: "28px",
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  top: 18,
                  left: 18,
                  right: 18,
                  display: "flex",
                  justifyContent: "center",
                  gap: 1.2,
                  flexWrap: "wrap",
                }}
              >
                {["+1 Credit", "+1 Credit", "+1 Credit"].map((item, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: "999px",
                      bgcolor: "rgba(255,255,255,0.88)",
                      border: "1px solid #EEE2F7",
                      color: "#796293",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    {item}
                  </Paper>
                ))}
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* ABOUT */}
        <Box id="about" sx={{ mt: { xs: 7, md: 9 } }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: { xs: 4, md: 6 },
              alignItems: "center",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: "35px",
                bgcolor: "rgba(255,255,255,0.72)",
                border: "1px solid #EEE6F5",
                boxShadow: "0 16px 40px rgba(170,140,200,0.10)",
              }}
            >
              <Box
                component="img"
                src={aboutImage}
                alt="About SkillSwap"
                sx={{
                  width: "100%",
                  borderRadius: "25px",
                  display: "block",
                }}
              />
            </Paper>

            <Box>
              <Typography
                sx={{
                  fontSize: { xs: "2.1rem", md: "2.9rem" },
                  fontWeight: 900,
                  color: "#583A86",
                  mb: 2,
                }}
              >
                About SkillSwap
              </Typography>

              <Typography
                sx={{
                  color: "#6E6186",
                  fontSize: "1rem",
                  lineHeight: 1.9,
                  mb: 2,
                }}
              >
                SkillSwap is a neighbourhood platform where people exchange skills
                using time as value instead of money. If you teach, help, repair,
                or support someone for an hour, you earn credits that you can use
                when you need help too.
              </Typography>

              <Typography
                sx={{
                  color: "#6E6186",
                  fontSize: "0.98rem",
                  lineHeight: 1.9,
                  mb: 3,
                }}
              >
                It’s simple, affordable, and community-driven. SkillSwap makes
                daily services more accessible while helping people connect,
                contribute, and grow together.
              </Typography>

              <Button
                startIcon={<AutoAwesomeRoundedIcon />}
                sx={{
                  background: "linear-gradient(90deg,#9C63FF,#FF7EA7)",
                  color: "#fff",
                  borderRadius: "25px",
                  px: 4,
                  py: 1.35,
                  textTransform: "none",
                  fontWeight: 800,
                  boxShadow: "none",
                }}
              >
                Learn More
              </Button>
            </Box>
          </Box>
        </Box>

        {/* WHY USE SKILLSWAP */}
        <Box id="why-use" sx={{ mt: { xs: 7, md: 9 } }}>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: { xs: "1.9rem", md: "2.7rem" },
              fontWeight: 900,
              color: "#583A86",
              mb: 1.2,
            }}
          >
            Why Use SkillSwap
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              color: "#776C8D",
              maxWidth: 760,
              mx: "auto",
              lineHeight: 1.8,
              fontSize: "0.98rem",
              mb: 4,
            }}
          >
            SkillSwap helps people save money, share value, and strengthen local
            communities through meaningful skill exchange.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {whyUseSkillSwap.map((item, index) => (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  flex: 1,
                  p: 3,
                  borderRadius: "26px",
                  bgcolor: "rgba(255,255,255,0.78)",
                  border: "1px solid #EEE6F5",
                  minHeight: 250,
                  boxShadow: "0 10px 24px rgba(160,130,190,0.06)",
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "20px",
                    bgcolor: item.bg,
                    color: "#6A4FA2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  {item.icon}
                </Box>

                <Typography
                  sx={{
                    fontSize: "1.22rem",
                    fontWeight: 800,
                    color: "#4D3B72",
                    mb: 1,
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    color: "#776C8D",
                    lineHeight: 1.8,
                    fontSize: "0.95rem",
                  }}
                >
                  {item.text}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>

        {/* HOW IT WORKS */}
        <Box id="how-it-works" sx={{ mt: { xs: 7, md: 9 } }}>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: { xs: "1.9rem", md: "2.7rem" },
              fontWeight: 900,
              color: "#583A86",
              mb: 1.2,
            }}
          >
            How It Works
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              color: "#776C8D",
              maxWidth: 760,
              mx: "auto",
              lineHeight: 1.8,
              fontSize: "0.98rem",
              mb: 4,
            }}
          >
            SkillSwap turns everyday skills into a powerful local support system
            through simple and easy steps.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {steps.map((item, index) => (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  flex: 1,
                  p: 3,
                  borderRadius: "26px",
                  bgcolor: "rgba(255,255,255,0.78)",
                  border: "1px solid #EEE6F5",
                  minHeight: 250,
                  boxShadow: "0 10px 24px rgba(160,130,190,0.06)",
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "20px",
                    bgcolor: item.bg,
                    color: "#6A4FA2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  {item.icon}
                </Box>

                <Typography
                  sx={{
                    fontSize: "1.22rem",
                    fontWeight: 800,
                    color: "#4D3B72",
                    mb: 1,
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    color: "#776C8D",
                    lineHeight: 1.8,
                    fontSize: "0.95rem",
                  }}
                >
                  {item.text}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>

        {/* CONTACT */}
        <Box id="contact" sx={{ mt: { xs: 7, md: 9 } }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: "34px",
              bgcolor: "rgba(255,255,255,0.78)",
              border: "1px solid #EEE6F5",
              boxShadow: "0 12px 28px rgba(160,130,190,0.06)",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" },
                gap: 4,
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: "1.9rem", md: "2.6rem" },
                    fontWeight: 900,
                    color: "#583A86",
                    mb: 1.2,
                  }}
                >
                  Contact Us
                </Typography>

                <Typography
                  sx={{
                    color: "#776C8D",
                    lineHeight: 1.8,
                    fontSize: "1rem",
                    mb: 2.5,
                    maxWidth: 620,
                  }}
                >
                  Have questions, feedback, or want to know more about SkillSwap?
                  Reach out and we’ll be happy to help you.
                </Typography>

                <Stack spacing={1.4}>
                  <Typography sx={{ color: "#6E6186", fontSize: "1rem" }}>
                    <b>Email:</b> shiwani.dhalari@gmail.com
                  </Typography>

                  <Typography sx={{ color: "#6E6186", fontSize: "1rem" }}>
                    <b>Contact:</b> +91 98765 43210
                  </Typography>
                </Stack>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "flex-start", md: "center" },
                }}
              >
                <Button
                  startIcon={<MailOutlineRoundedIcon />}
                  sx={{
                    background: "linear-gradient(90deg,#9C63FF,#FF7EA7)",
                    color: "#fff",
                    borderRadius: "24px",
                    px: 4,
                    py: 2,
                    textTransform: "none",
                    fontWeight: 800,
                    fontSize: "1rem",
                    minWidth: 220,
                    boxShadow: "0 14px 30px rgba(156,99,255,0.16)",
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* FOOTER */}
        <Box
          sx={{
            mt: 5,
            pb: 2,
            textAlign: "center",
          }}
        >
          <Typography sx={{ color: "#887B9E", fontSize: "0.95rem" }}>
            © 2026 SkillSwap. Built with community, trust, and shared skills.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
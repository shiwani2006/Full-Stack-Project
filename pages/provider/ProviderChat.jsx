import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  InputBase,
  Stack,
  Chip,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ProviderSidebar, {
  providerSidebarWidth,
} from "../../components/layout/ProviderSidebar";
import ProviderTopbar from "../../components/layout/ProviderTopbar";
import logo from "../../assets/LOGO.png";

const providerAI = (msg) => {
  const text = msg.toLowerCase();

  if (/price|pricing|rate|charges/.test(text)) {
    return `💰 Suggested Pricing:

• Home Cleaning → ₹400–₹650
• Deep Cleaning → ₹700–₹1200
• Plumbing → ₹500–₹800
• AC Repair → ₹700–₹950

AI Tip: Keep normal pricing on weekdays and premium pricing on weekends.`;
  }

  if (/reply|respond|message/.test(text)) {
    return `✍️ Suggested Reply:

"Hello! Thank you for reaching out. Yes, I’m available and happy to help. Please share your preferred time and address details."`;
  }

  if (/demand|peak|forecast|booking/.test(text)) {
    return `📈 Booking Forecast:

• Peak time: 6 PM – 9 PM
• Weekend demand: High
• Most requested service: Cleaning
• Best action: Open extra slots on Saturday and Sunday.`;
  }

  if (/complaint|issue|problem/.test(text)) {
    return `🛟 Complaint Summary:

Common issues:
• Late arrival
• Slow response
• Service quality concern

AI Advice:
Send ETA updates before reaching the customer.`;
  }

  if (/upsell|offer|extra/.test(text)) {
    return `🚀 Upsell Suggestion:

Offer add-ons:
• Deep Cleaning +₹200
• Emergency Service +₹300
• Monthly package discount

Expected result: Better earnings and repeat customers.`;
  }

  return `🤖 Provider Copilot can help with:

• Generate professional replies
• Suggested pricing
• Peak demand prediction
• Complaint analysis
• Upsell recommendations
• Revenue insights`;
};

export default function ProviderChat() {
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "provider",
      text:
        "Hello 👋 I'm Provider Copilot.\nAsk me about pricing, replies, demand forecast, complaints, upsell ideas, or revenue insights.",
      time: "Now",
    },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;

    const userText = message.trim();

    const userMsg = {
      id: Date.now(),
      type: "user",
      text: userText,
      time: "Now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setMessage("");

    setTimeout(() => {
      const aiMsg = {
        id: Date.now() + 1,
        type: "provider",
        text: providerAI(userText),
        time: "Now",
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 500);
  };

  const quickAsk = (text) => {
    setMessage(text);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background:
          "linear-gradient(135deg, #fff7fb 0%, #f4edff 45%, #eef7ff 100%)",
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
          alt="logo"
          sx={{
            position: "absolute",
            right: 40,
            bottom: 40,
            width: 320,
            opacity: 0.04,
            pointerEvents: "none",
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <ProviderTopbar title="Provider Copilot" />

          <Paper
            elevation={0}
            sx={{
              p: 2.7,
              mb: 2.5,
              borderRadius: "32px",
              border: "1px solid rgba(234,226,243,0.95)",
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(18px)",
              boxShadow: "0 24px 60px rgba(121,89,172,0.12)",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Avatar
                sx={{
                  width: 54,
                  height: 54,
                  background: "linear-gradient(135deg, #9B6BFF, #FF8FC7)",
                  color: "#fff",
                }}
              >
                <AutoAwesomeRoundedIcon />
              </Avatar>

              <Box>
                <Typography
                  sx={{
                    fontSize: "2rem",
                    fontWeight: 950,
                    color: "#3D2A63",
                    lineHeight: 1.1,
                  }}
                >
                  Provider AI Assistant
                </Typography>

                <Typography sx={{ color: "#8A7AA7", mt: 0.6 }}>
                  Smart pricing • replies • demand forecast • complaint insights
                </Typography>
              </Box>
            </Stack>
          </Paper>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "360px minmax(0,1fr)" },
              gap: 3,
            }}
          >
            {/* LEFT PANEL */}
            <Paper
              elevation={0}
              sx={{
                minHeight: 680,
                borderRadius: "34px",
                border: "1px solid rgba(234,226,243,0.95)",
                background: "rgba(255,255,255,0.74)",
                backdropFilter: "blur(18px)",
                p: 2.4,
                boxShadow: "0 24px 60px rgba(121,89,172,0.12)",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.45rem",
                  fontWeight: 950,
                  color: "#3D2A63",
                  mb: 2,
                }}
              >
                Conversations
              </Typography>

              <Paper
                elevation={0}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 1.8,
                  py: 1.25,
                  mb: 2.2,
                  borderRadius: "20px",
                  background: "#fff",
                  border: "1px solid #E7DFF0",
                }}
              >
                <SearchRoundedIcon sx={{ color: "#9B8BB7", fontSize: 21 }} />
                <InputBase
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search AI chat..."
                  sx={{ flex: 1, color: "#4E416D" }}
                />
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: "26px",
                  background:
                    "linear-gradient(135deg, #F3E8FF 0%, #EAF4FF 100%)",
                  border: "1px solid #E2D3FF",
                  boxShadow: "0 18px 38px rgba(126,87,194,0.14)",
                }}
              >
                <Stack direction="row" spacing={1.5}>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      background: "linear-gradient(135deg, #9B6BFF, #FF8FC7)",
                      color: "#fff",
                      fontSize: "1.4rem",
                    }}
                  >
                    🤖
                  </Avatar>

                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontWeight: 950,
                        color: "#2F2442",
                        fontSize: "1rem",
                      }}
                    >
                      Provider Copilot
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: ".85rem",
                        color: "#7B4CFF",
                        fontWeight: 800,
                      }}
                    >
                      AI Assistant
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.8,
                        fontSize: ".9rem",
                        color: "#7C7193",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {messages[messages.length - 1]?.text}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Paper>

            {/* RIGHT CHAT PANEL */}
            <Paper
              elevation={0}
              sx={{
                minHeight: 680,
                borderRadius: "34px",
                border: "1px solid rgba(234,226,243,0.95)",
                background: "rgba(255,255,255,0.74)",
                backdropFilter: "blur(18px)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                boxShadow: "0 24px 60px rgba(121,89,172,0.12)",
              }}
            >
              {/* HEADER */}
              <Box
                sx={{
                  px: 3,
                  py: 2.2,
                  borderBottom: "1px solid #EEE6F5",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background:
                    "linear-gradient(135deg, rgba(243,232,255,0.72), rgba(234,244,255,0.68))",
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1.7}>
                  <Avatar
                    sx={{
                      width: 58,
                      height: 58,
                      background: "linear-gradient(135deg, #9B6BFF, #FF8FC7)",
                      color: "#fff",
                      fontSize: "1.5rem",
                    }}
                  >
                    🤖
                  </Avatar>

                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 950,
                        color: "#2F2442",
                        fontSize: "1.25rem",
                      }}
                    >
                      Provider Copilot
                    </Typography>

                    <Typography sx={{ color: "#8A7AA7", fontSize: ".92rem" }}>
                      AI Assistant • Online
                    </Typography>
                  </Box>
                </Stack>

                <Chip
                  label="AI Online"
                  sx={{
                    background: "#EFE4FF",
                    color: "#7B4CFF",
                    fontWeight: 900,
                    px: 1,
                  }}
                />
              </Box>

              {/* QUICK CHIPS */}
              <Box sx={{ px: 3, py: 2, borderBottom: "1px solid #EEE6F5" }}>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {[
                    "Generate Reply",
                    "Suggested Pricing",
                    "Peak Demand",
                    "Complaint Summary",
                    "Upsell Tip",
                    "Booking Forecast",
                  ].map((item) => (
                    <Chip
                      key={item}
                      label={item}
                      onClick={() => quickAsk(item)}
                      sx={{
                        background: "#F3E8FF",
                        color: "#6B4FD3",
                        fontWeight: 800,
                        cursor: "pointer",
                        borderRadius: "999px",
                        "&:hover": {
                          background: "#E9D7FF",
                        },
                      }}
                    />
                  ))}
                </Stack>
              </Box>

              {/* MESSAGES */}
              <Box
                sx={{
                  flex: 1,
                  px: 3,
                  py: 2.5,
                  overflowY: "auto",
                  background:
                    "radial-gradient(circle at top left, rgba(255,230,245,0.75), transparent 34%), radial-gradient(circle at bottom right, rgba(229,219,255,0.75), transparent 36%)",
                }}
              >
                <Stack spacing={1.8}>
                  {messages.map((msg) => (
                    <Box
                      key={msg.id}
                      sx={{
                        display: "flex",
                        justifyContent:
                          msg.type === "user" ? "flex-end" : "flex-start",
                      }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          maxWidth: 520,
                          borderRadius:
                            msg.type === "user"
                              ? "24px 24px 8px 24px"
                              : "24px 24px 24px 8px",

                          background:
                            msg.type === "provider"
                              ? "linear-gradient(135deg, #F3E8FF 0%, #EAF4FF 100%)"
                              : "linear-gradient(135deg, #9B6BFF 0%, #FF8FC7 100%)",

                          color: msg.type === "provider" ? "#3D2A63" : "#fff",

                          border:
                            msg.type === "provider"
                              ? "1px solid #E2D3FF"
                              : "none",

                          boxShadow:
                            msg.type === "provider"
                              ? "0 14px 32px rgba(126,87,194,0.12)"
                              : "0 16px 36px rgba(155,107,255,0.28)",
                        }}
                      >
                        <Typography
                          sx={{
                            lineHeight: 1.7,
                            fontSize: ".98rem",
                            whiteSpace: "pre-line",
                            fontWeight: 650,
                          }}
                        >
                          {msg.text}
                        </Typography>

                        <Typography
                          sx={{
                            mt: 0.8,
                            fontSize: ".75rem",
                            opacity: 0.75,
                            textAlign:
                              msg.type === "provider" ? "left" : "right",
                          }}
                        >
                          {msg.time}
                        </Typography>
                      </Paper>
                    </Box>
                  ))}

                  <div ref={messagesEndRef}></div>
                </Stack>
              </Box>

              {/* INPUT */}
              <Box
                sx={{
                  p: 2.3,
                  borderTop: "1px solid #EEE6F5",
                  background: "rgba(255,255,255,0.92)",
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Paper
                    elevation={0}
                    sx={{
                      flex: 1,
                      px: 2,
                      py: 1.35,
                      borderRadius: "20px",
                      border: "1px solid #D8D2E6",
                      background: "#fff",
                    }}
                  >
                    <InputBase
                      fullWidth
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ask Provider Copilot..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSend();
                      }}
                    />
                  </Paper>

                  <Button
                    onClick={handleSend}
                    variant="contained"
                    endIcon={<SendRoundedIcon />}
                    sx={{
                      background: "linear-gradient(135deg, #9B6BFF, #FF8FC7)",
                      color: "#fff",
                      textTransform: "none",
                      borderRadius: "20px",
                      px: 3,
                      py: 1.45,
                      fontWeight: 950,
                      boxShadow: "0 16px 34px rgba(155,107,255,0.24)",
                    }}
                  >
                    Send
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

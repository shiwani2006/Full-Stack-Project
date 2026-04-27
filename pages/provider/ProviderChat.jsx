import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  InputBase,
  Chip,
  Badge,
  Stack,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import ProviderSidebar, {
  providerSidebarWidth,
} from "../../components/layout/ProviderSidebar";
import ProviderTopbar from "../../components/layout/ProviderTopbar";
import logo from "../../assets/LOGO.png";

export default function ProviderChat() {
  const [search, setSearch] = useState("");
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [message, setMessage] = useState("");

  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Shiwani",
      msg: "Can you confirm timing?",
      active: true,
      online: true,
      unread: 2,
      service: "Home Cleaning",
      avatar: "S",
      bg: "linear-gradient(135deg, #F3E8FF 0%, #F7EEFF 100%)",
      messages: [
        {
          id: 1,
          type: "user",
          text: "Hello, is this service available tomorrow?",
          time: "10:14 AM",
        },
        {
          id: 2,
          type: "provider",
          text: "Yes, tomorrow at 10 AM is available.",
          time: "10:16 AM",
        },
      ],
    },
    {
      id: 2,
      name: "Riya",
      msg: "Is your service available today?",
      active: false,
      online: false,
      unread: 1,
      service: "Gardening Help",
      avatar: "R",
      bg: "linear-gradient(135deg, #EAF4FF 0%, #F1F8FF 100%)",
      messages: [
        {
          id: 1,
          type: "user",
          text: "Is your gardening service available today?",
          time: "9:20 AM",
        },
      ],
    },
    {
      id: 3,
      name: "Aman",
      msg: "Thank you for the service.",
      active: false,
      online: false,
      unread: 0,
      service: "AC Repair",
      avatar: "A",
      bg: "linear-gradient(135deg, #FFF1F7 0%, #FFF7FB 100%)",
      messages: [
        {
          id: 1,
          type: "user",
          text: "Thank you for the service.",
          time: "Yesterday",
        },
      ],
    },
  ]);

  const filteredConversations = useMemo(() => {
    const q = search.toLowerCase();
    return conversations.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.msg.toLowerCase().includes(q) ||
        item.service.toLowerCase().includes(q)
    );
  }, [search, conversations]);

  const selectedChat =
    conversations.find((item) => item.id === selectedChatId) || conversations[0];

  const handleSelectChat = (id) => {
    setSelectedChatId(id);
    setConversations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, unread: 0, active: true } : { ...item, active: false }
      )
    );
  };

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: "provider",
      text: message,
      time: "Now",
    };

    setConversations((prev) =>
      prev.map((item) =>
        item.id === selectedChatId
          ? {
              ...item,
              msg: message,
              messages: [...item.messages, newMessage],
            }
          : item
      )
    );

    setMessage("");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
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
          overflow: "hidden",
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
          <ProviderTopbar title="Provider Chat" />

          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 2.5 },
              mb: 2.5,
              borderRadius: "28px",
              border: "1px solid #EAE2F3",
              bgcolor: "rgba(255,255,255,0.78)",
              boxShadow: "0 14px 28px rgba(160,130,190,0.06)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "center" },
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
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
                  Client Conversations
                </Typography>
                <Typography
                  sx={{
                    color: "#7B7390",
                    mt: 0.7,
                    fontSize: "0.95rem",
                  }}
                >
                  Reply quickly and manage your customer chats in one place
                </Typography>
              </Box>

              <Chip
                label={`${conversations.reduce((acc, cur) => acc + cur.unread, 0)} unread messages`}
                sx={{
                  bgcolor: "#F3E8FF",
                  color: "#6B4FD3",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                }}
              />
            </Box>
          </Paper>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "360px minmax(0, 1fr)" },
              gap: 3,
            }}
          >
            {/* LEFT CONVERSATION PANEL */}
            <Paper
              elevation={0}
              sx={{
                minHeight: 680,
                borderRadius: "30px",
                border: "1px solid #EAE2F3",
                bgcolor: "rgba(255,255,255,0.78)",
                p: 2.4,
                boxShadow: "0 14px 28px rgba(160,130,190,0.06)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: 900,
                  color: "#4A456C",
                  mb: 2,
                }}
              >
                User Messages
              </Typography>

              <Paper
                elevation={0}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 1.8,
                  py: 1.2,
                  mb: 2.2,
                  borderRadius: "18px",
                  bgcolor: "#fff",
                  border: "1px solid #E7DFF0",
                }}
              >
                <SearchRoundedIcon sx={{ color: "#8E88A3", fontSize: 20 }} />
                <InputBase
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search chats..."
                  sx={{
                    flex: 1,
                    fontSize: "0.95rem",
                    "& input::placeholder": {
                      opacity: 1,
                      color: "#A09AAC",
                    },
                  }}
                />
              </Paper>

              <Stack spacing={1.5} sx={{ flex: 1, overflowY: "auto", pr: 0.5 }}>
                {filteredConversations.map((item) => (
                  <Paper
                    key={item.id}
                    elevation={0}
                    onClick={() => handleSelectChat(item.id)}
                    sx={{
                      p: 1.8,
                      borderRadius: "22px",
                      bgcolor: item.active ? item.bg : "#FAF8FD",
                      border: item.active
                        ? "1px solid #E5D5FF"
                        : "1px solid #EEE6F5",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 10px 22px rgba(160,130,190,0.08)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1.4,
                      }}
                    >
                      <Badge
                        overlap="circular"
                        variant={item.online ? "dot" : undefined}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        sx={{
                          "& .MuiBadge-dot": {
                            bgcolor: "#6FD49A",
                            width: 11,
                            height: 11,
                            borderRadius: "50%",
                            border: "2px solid white",
                          },
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 50,
                            height: 50,
                            bgcolor: "#D9C3F3",
                            color: "#5B4E75",
                            fontWeight: 800,
                          }}
                        >
                          {item.avatar}
                        </Avatar>
                      </Badge>

                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            gap: 1,
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 800,
                              color: "#4C4975",
                              fontSize: "0.98rem",
                            }}
                          >
                            {item.name}
                          </Typography>

                          {item.unread > 0 && (
                            <Box
                              sx={{
                                minWidth: 24,
                                height: 24,
                                px: 0.8,
                                borderRadius: "999px",
                                bgcolor: "#8D6FE8",
                                color: "#fff",
                                fontSize: "0.75rem",
                                fontWeight: 800,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {item.unread}
                            </Box>
                          )}
                        </Box>

                        <Typography
                          sx={{
                            color: "#7A7494",
                            mt: 0.35,
                            fontSize: "0.83rem",
                            fontWeight: 700,
                          }}
                        >
                          {item.service}
                        </Typography>

                        <Typography
                          sx={{
                            color: "#847D97",
                            mt: 0.7,
                            fontSize: "0.9rem",
                            lineHeight: 1.5,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.msg}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </Paper>

            {/* RIGHT CHAT PANEL */}
            <Paper
              elevation={0}
              sx={{
                minHeight: 680,
                p: 0,
                borderRadius: "30px",
                border: "1px solid #EAE2F3",
                bgcolor: "rgba(255,255,255,0.78)",
                boxShadow: "0 14px 28px rgba(160,130,190,0.06)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* CHAT HEADER */}
              <Box
                sx={{
                  px: 3,
                  py: 2.2,
                  borderBottom: "1px solid #EEE6F5",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 2,
                  background:
                    "linear-gradient(135deg, rgba(243,232,255,0.45) 0%, rgba(234,244,255,0.38) 100%)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.6 }}>
                  <Badge
                    overlap="circular"
                    variant={selectedChat?.online ? "dot" : undefined}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    sx={{
                      "& .MuiBadge-dot": {
                        bgcolor: "#6FD49A",
                        width: 11,
                        height: 11,
                        borderRadius: "50%",
                        border: "2px solid white",
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 56,
                        height: 56,
                        bgcolor: "#D9C3F3",
                        color: "#5B4E75",
                        fontWeight: 800,
                        fontSize: "1.2rem",
                      }}
                    >
                      {selectedChat?.avatar}
                    </Avatar>
                  </Badge>

                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 900,
                        color: "#4A456C",
                        fontSize: "1.08rem",
                      }}
                    >
                      {selectedChat?.name}
                    </Typography>

                    <Typography sx={{ color: "#7C7596", fontSize: "0.9rem", mt: 0.3 }}>
                      {selectedChat?.online ? "Online now" : "Offline"} • {selectedChat?.service}
                    </Typography>
                  </Box>
                </Box>

                <Stack direction="row" spacing={1.2}>
                  <Button
                    variant="outlined"
                    sx={{
                      minWidth: 0,
                      width: 42,
                      height: 42,
                      borderRadius: "14px",
                      borderColor: "#D7CEE8",
                      color: "#6E6685",
                      bgcolor: "#fff",
                    }}
                  >
                    <CallRoundedIcon fontSize="small" />
                  </Button>

                  <Button
                    variant="outlined"
                    sx={{
                      minWidth: 0,
                      width: 42,
                      height: 42,
                      borderRadius: "14px",
                      borderColor: "#D7CEE8",
                      color: "#6E6685",
                      bgcolor: "#fff",
                    }}
                  >
                    <VideocamRoundedIcon fontSize="small" />
                  </Button>

                  <Button
                    variant="outlined"
                    sx={{
                      minWidth: 0,
                      width: 42,
                      height: 42,
                      borderRadius: "14px",
                      borderColor: "#D7CEE8",
                      color: "#6E6685",
                      bgcolor: "#fff",
                    }}
                  >
                    <MoreHorizRoundedIcon fontSize="small" />
                  </Button>
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
                    "linear-gradient(180deg, rgba(248,245,252,0.65) 0%, rgba(255,255,255,0.35) 100%)",
                }}
              >
                <Stack spacing={1.6}>
                  {selectedChat?.messages.map((item) => (
                    <Box
                      key={item.id}
                      sx={{
                        display: "flex",
                        justifyContent:
                          item.type === "provider" ? "flex-end" : "flex-start",
                      }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          maxWidth: 360,
                          borderRadius: "22px",
                          bgcolor:
                            item.type === "provider" ? "#DCC8F1" : "#F4EAF1",
                          color: "#4D4A76",
                          border:
                            item.type === "provider"
                              ? "1px solid #D0B9EA"
                              : "1px solid #EADDE8",
                          boxShadow: "0 8px 16px rgba(160,130,190,0.05)",
                        }}
                      >
                        <Typography sx={{ lineHeight: 1.7, fontSize: "0.96rem" }}>
                          {item.text}
                        </Typography>
                        <Typography
                          sx={{
                            mt: 0.8,
                            fontSize: "0.75rem",
                            color: "#7B7494",
                            textAlign: item.type === "provider" ? "right" : "left",
                          }}
                        >
                          {item.time}
                        </Typography>
                      </Paper>
                    </Box>
                  ))}
                </Stack>
              </Box>

              {/* INPUT BAR */}
              <Box
                sx={{
                  p: 2.3,
                  borderTop: "1px solid #EEE6F5",
                  background: "rgba(255,255,255,0.92)",
                }}
              >
                <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                  <Paper
                    elevation={0}
                    sx={{
                      flex: 1,
                      px: 2,
                      py: 1.25,
                      borderRadius: "18px",
                      border: "1px solid #D8D2E6",
                      bgcolor: "#fff",
                    }}
                  >
                    <InputBase
                      fullWidth
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSend();
                      }}
                      sx={{
                        fontSize: "0.98rem",
                        "& input::placeholder": {
                          opacity: 1,
                          color: "#A09AAC",
                        },
                      }}
                    />
                  </Paper>

                  <Button
                    onClick={handleSend}
                    variant="contained"
                    endIcon={<SendRoundedIcon />}
                    sx={{
                      bgcolor: "#C7AEDF",
                      color: "#fff",
                      textTransform: "none",
                      borderRadius: "18px",
                      px: 2.8,
                      py: 1.35,
                      fontWeight: 800,
                      boxShadow: "0 12px 24px rgba(183,150,216,0.18)",
                      "&:hover": {
                        bgcolor: "#B896D8",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.25s ease",
                    }}
                  >
                    Send
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
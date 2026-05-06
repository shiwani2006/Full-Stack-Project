import React, { useEffect, useMemo, useState } from "react";
import {
  Box, Typography, Paper, Grid, Stack, Chip, Button,
  TextField, InputAdornment, Avatar, Dialog, DialogTitle,
  DialogContent, DialogActions,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import ProviderSidebar, { providerSidebarWidth } from "../../components/layout/ProviderSidebar";
import ProviderTopbar from "../../components/layout/ProviderTopbar";
import axiosInstance from "../../services/axiosInstance";
import { getAllServiceRequests, submitOffer } from "../../services/serviceRequestService";
import logo from "../../assets/LOGO.png";

const getStatusStyle = (status) => {
  if (status === "completed" || status === "fulfilled") return { bg: "#E7F7EA", color: "#297A43" };
  if (status === "confirmed" || status === "open") return { bg: "#EAF1FF", color: "#4B6FC9" };
  if (status === "cancelled") return { bg: "#FFE5E5", color: "#D00000" };
  return { bg: "#FAF0D8", color: "#A57517" };
};

const getBg = (index) => {
  const bgs = [
    "linear-gradient(135deg, #efe5ff 0%, #e8dcff 100%)",
    "linear-gradient(135deg, #e8fff4 0%, #def5ea 100%)",
    "linear-gradient(135deg, #e7f3ff 0%, #dcecff 100%)",
    "linear-gradient(135deg, #fff1d9 0%, #fde9bf 100%)",
    "linear-gradient(135deg, #ffe8f3 0%, #f9ddeb 100%)",
  ];
  return bgs[index % bgs.length];
};

function BookingsTab() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    axiosInstance.get("/bookings/my")
      .then((res) => {
        const all = res.data.bookings || [];
        const currentUser = JSON.parse(localStorage.getItem("user")) || {};
        setBookings(all.filter((b) => b.providerId === currentUser.id));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axiosInstance.patch(`/bookings/${id}/status`, { status });
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    } catch (err) { console.error(err); }
  };

  const filters = ["All", "pending", "confirmed", "completed", "cancelled"];
  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const matchStatus = statusFilter === "All" || b.status === statusFilter;
      const q = search.toLowerCase();
      return matchStatus && ((b.service?.title || "").toLowerCase().includes(q) || (b.requester?.name || "").toLowerCase().includes(q));
    });
  }, [bookings, statusFilter, search]);

  const counts = {
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
  };

  return (
    <>
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {[
          { label: "Pending", value: counts.pending, bg: "linear-gradient(135deg,#FFF5E9 0%,#FFEACC 100%)", color: "#C78637" },
          { label: "Confirmed", value: counts.confirmed, bg: "linear-gradient(135deg,#EAF4FF 0%,#DFECFF 100%)", color: "#4F79C8" },
          { label: "Completed", value: counts.completed, bg: "linear-gradient(135deg,#ECFAEE 0%,#E1F5E5 100%)", color: "#4E9660" },
        ].map((item) => (
          <Grid item xs={12} sm={4} key={item.label}>
            <Paper elevation={0} sx={{ p: 2.6, borderRadius: "26px", background: item.bg, border: "1px solid #EDE3F7" }}>
              <Typography sx={{ color: "#7A7391", fontSize: "0.95rem", mb: 0.6 }}>{item.label}</Typography>
              <Typography sx={{ fontSize: "2.4rem", fontWeight: 900, color: item.color, lineHeight: 1 }}>{item.value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper elevation={0} sx={{ p: 2.5, mb: 3, borderRadius: "28px", bgcolor: "rgba(255,255,255,0.84)", border: "1px solid #EEE6F5" }}>
        <TextField fullWidth value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by service name or user name..."
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchRoundedIcon sx={{ color: "#8C7FA4" }} /></InputAdornment> }}
          sx={{ mb: 2, "& .MuiOutlinedInput-root": { borderRadius: "18px", bgcolor: "#fff" } }}
        />
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {filters.map((f) => (
            <Chip key={f} label={f === "All" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)} onClick={() => setStatusFilter(f)}
              sx={{ px: 0.6, py: 2, borderRadius: "999px", fontWeight: 700, border: "1px solid #E0D4F6", bgcolor: statusFilter === f ? "#8D6FE8" : "#fff", color: statusFilter === f ? "#fff" : "#5D5670", cursor: "pointer" }}
            />
          ))}
        </Stack>
      </Paper>

      <Paper elevation={0} sx={{ p: { xs: 2.4, md: 3 }, borderRadius: "30px", bgcolor: "rgba(255,255,255,0.84)", border: "1px solid #EEE6F5" }}>
        <Typography sx={{ fontSize: "1.5rem", fontWeight: 900, color: "#4E416D", mb: 0.6 }}>{filtered.length} request{filtered.length !== 1 ? "s" : ""} found</Typography>
        <Typography sx={{ color: "#7B7390", fontSize: "0.95rem", mb: 3 }}>Showing {statusFilter === "All" ? "all" : statusFilter} booking requests</Typography>

        {loading ? <Typography sx={{ color: "#8A839C", textAlign: "center", py: 4 }}>Loading...</Typography>
          : filtered.length === 0 ? (
            <Paper elevation={0} sx={{ p: 4, borderRadius: "22px", bgcolor: "#FAF8FD", border: "1px solid #EEE6F5", textAlign: "center" }}>
              <Typography sx={{ color: "#7B7390" }}>No requests found.</Typography>
            </Paper>
          ) : (
            <Stack spacing={2}>
              {filtered.map((booking, index) => {
                const ss = getStatusStyle(booking.status);
                return (
                  <Paper key={booking.id} elevation={0} sx={{ p: 2.5, borderRadius: "24px", background: getBg(index), border: "1px solid rgba(255,255,255,0.82)" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2, mb: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.8 }}>
                        <Avatar sx={{ width: 52, height: 52, bgcolor: "rgba(255,255,255,0.82)", color: "#554379", fontWeight: 800, fontSize: "1.2rem", borderRadius: "16px" }}>
                          {(booking.service?.title || "S").charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography sx={{ fontWeight: 900, color: "#1b1838", fontSize: "1.1rem" }}>{booking.service?.title || "Service"}</Typography>
                          <Stack direction="row" spacing={1.2} alignItems="center" mt={0.5}>
                            <PersonRoundedIcon sx={{ fontSize: 15, color: "#746a90" }} />
                            <Typography sx={{ color: "#746a90", fontSize: "0.9rem" }}>Requested by {booking.requester?.name || "User"}</Typography>
                          </Stack>
                        </Box>
                      </Box>
                      <Chip label={booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        sx={{ bgcolor: ss.bg, color: ss.color, fontWeight: 700, borderRadius: "999px" }} />
                    </Box>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 2 }} flexWrap="wrap">
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                        <CalendarMonthRoundedIcon sx={{ fontSize: 16, color: "#7C7593" }} />
                        <Typography sx={{ color: "#7C7593", fontSize: "0.9rem" }}>
                          {booking.scheduledAt ? new Date(booking.scheduledAt).toLocaleDateString() : new Date(booking.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                        <AccessTimeRoundedIcon sx={{ fontSize: 16, color: "#7C7593" }} />
                        <Typography sx={{ color: "#7C7593", fontSize: "0.9rem" }}>{booking.paymentMethod}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                        <CurrencyRupeeRoundedIcon sx={{ fontSize: 16, color: "#7C7593" }} />
                        <Typography sx={{ color: "#7C7593", fontSize: "0.9rem" }}>
                          {booking.paymentMethod === "credits" ? `${booking.creditAmount} credits`
                            : booking.paymentMethod === "hybrid" ? `${booking.cashAmount} + ${booking.creditAmount} cr`
                            : `${booking.cashAmount}`}
                        </Typography>
                      </Box>
                    </Stack>

                    {booking.status === "pending" && (
                      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
                        <Button variant="contained" onClick={() => updateStatus(booking.id, "confirmed")}
                          sx={{ textTransform: "none", borderRadius: "14px", px: 2.5, py: 1, fontWeight: 700, bgcolor: "#8D6FE8", boxShadow: "none" }}>Accept</Button>
                        <Button variant="outlined" onClick={() => updateStatus(booking.id, "cancelled")}
                          sx={{ textTransform: "none", borderRadius: "14px", px: 2.5, py: 1, fontWeight: 700, borderColor: "#E3CDD3", color: "#9A5D6A", bgcolor: "#fff" }}>Decline</Button>
                      </Stack>
                    )}
                    {booking.status === "confirmed" && (
                      <Button variant="contained" startIcon={<TaskAltRoundedIcon />} onClick={() => updateStatus(booking.id, "completed")}
                        sx={{ textTransform: "none", borderRadius: "14px", px: 2.5, py: 1, fontWeight: 700, bgcolor: "#4E9660", boxShadow: "none" }}>Mark as Completed</Button>
                    )}
                  </Paper>
                );
              })}
            </Stack>
          )}
      </Paper>
    </>
  );
}

function UserRequestsTab() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [offerDialog, setOfferDialog] = useState(null);
  const [offerForm, setOfferForm] = useState({ message: "", proposedCash: "", proposedCredits: "" });
  const [submitting, setSubmitting] = useState(false);
  const categories = ["All", "Cleaning", "Repair", "Home Help", "Outdoor", "Beauty", "Maintenance", "Other"];
  const currentUserId = (JSON.parse(localStorage.getItem("user")) || {}).id;

  const fetchRequests = () => {
    setLoading(true);
    getAllServiceRequests({ status: "open" })
      .then((res) => setRequests(res.data.serviceRequests || []))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchRequests(); }, []);

  const filtered = useMemo(() => {
    return requests.filter((r) => {
      const matchCat = categoryFilter === "All" || r.category === categoryFilter;
      const q = search.toLowerCase();
      return matchCat && (r.title.toLowerCase().includes(q) || (r.requester?.name || "").toLowerCase().includes(q) || (r.description || "").toLowerCase().includes(q));
    });
  }, [requests, search, categoryFilter]);

  const handleSendOffer = async () => {
    if (!offerDialog) return;
    setSubmitting(true);
    try {
      await submitOffer(offerDialog.requestId, {
        message: offerForm.message,
        proposedCash: offerForm.proposedCash || undefined,
        proposedCredits: offerForm.proposedCredits || undefined,
      });
      setOfferDialog(null);
      setOfferForm({ message: "", proposedCash: "", proposedCredits: "" });
      fetchRequests();
    } catch (e) {
      alert(e?.response?.data?.error || "Failed to send offer.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Paper elevation={0} sx={{ p: 2.5, mb: 3, borderRadius: "28px", bgcolor: "rgba(255,255,255,0.84)", border: "1px solid #EEE6F5" }}>
        <TextField fullWidth value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, description or user name..."
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchRoundedIcon sx={{ color: "#8C7FA4" }} /></InputAdornment> }}
          sx={{ mb: 2, "& .MuiOutlinedInput-root": { borderRadius: "18px", bgcolor: "#fff" } }}
        />
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {categories.map((c) => (
            <Chip key={c} label={c} onClick={() => setCategoryFilter(c)}
              sx={{ px: 0.6, py: 2, borderRadius: "999px", fontWeight: 700, border: "1px solid #E0D4F6", bgcolor: categoryFilter === c ? "#8D6FE8" : "#fff", color: categoryFilter === c ? "#fff" : "#5D5670", cursor: "pointer" }}
            />
          ))}
        </Stack>
      </Paper>

      <Paper elevation={0} sx={{ p: { xs: 2.4, md: 3 }, borderRadius: "30px", bgcolor: "rgba(255,255,255,0.84)", border: "1px solid #EEE6F5" }}>
        <Typography sx={{ fontSize: "1.5rem", fontWeight: 900, color: "#4E416D", mb: 0.6 }}>{filtered.length} open request{filtered.length !== 1 ? "s" : ""}</Typography>
        <Typography sx={{ color: "#7B7390", fontSize: "0.95rem", mb: 3 }}>Users waiting for providers to offer on these</Typography>

        {loading ? <Typography sx={{ color: "#8A839C", textAlign: "center", py: 4 }}>Loading...</Typography>
          : filtered.length === 0 ? (
            <Paper elevation={0} sx={{ p: 4, borderRadius: "22px", bgcolor: "#FAF8FD", border: "1px solid #EEE6F5", textAlign: "center" }}>
              <Typography sx={{ color: "#7B7390" }}>No open requests found.</Typography>
            </Paper>
          ) : (
            <Stack spacing={2}>
              {filtered.map((req, index) => {
                const alreadyOffered = req.offers?.some(o => o.providerId === currentUserId);
                return (
                  <Paper key={req.id} elevation={0} sx={{ p: 2.5, borderRadius: "24px", background: getBg(index), border: "1px solid rgba(255,255,255,0.82)" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2, mb: 1.5 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.8 }}>
                        <Avatar sx={{ width: 52, height: 52, bgcolor: "rgba(255,255,255,0.82)", color: "#554379", fontWeight: 800, fontSize: "1.2rem", borderRadius: "16px" }}>
                          {(req.title || "R").charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography sx={{ fontWeight: 900, color: "#1b1838", fontSize: "1.1rem" }}>{req.title}</Typography>
                          <Stack direction="row" spacing={1.2} alignItems="center" mt={0.5}>
                            <PersonRoundedIcon sx={{ fontSize: 15, color: "#746a90" }} />
                            <Typography sx={{ color: "#746a90", fontSize: "0.9rem" }}>Posted by {req.requester?.name || "User"}</Typography>
                          </Stack>
                        </Box>
                      </Box>
                      <Stack direction="row" spacing={1} alignItems="center">
                        {req.category && <Chip label={req.category} size="small" sx={{ bgcolor: "#EEE6F5", color: "#5D4A7E", fontWeight: 700, borderRadius: "999px" }} />}
                        <Chip label="Open" sx={{ bgcolor: "#EAF1FF", color: "#4B6FC9", fontWeight: 700, borderRadius: "999px" }} />
                      </Stack>
                    </Box>

                    <Typography sx={{ color: "#626b85", fontSize: "0.95rem", lineHeight: 1.8, mb: 1.5 }}>{req.description}</Typography>

                    <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                      {req.budgetCash && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                          <CurrencyRupeeRoundedIcon sx={{ fontSize: 15, color: "#7C7593" }} />
                          <Typography sx={{ color: "#7C7593", fontSize: "0.88rem" }}>Budget {req.budgetCash}</Typography>
                        </Box>
                      )}
                      {req.budgetCredits && <Typography sx={{ color: "#7C7593", fontSize: "0.88rem" }}>or {req.budgetCredits} credits</Typography>}
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                        <CalendarMonthRoundedIcon sx={{ fontSize: 15, color: "#7C7593" }} />
                        <Typography sx={{ color: "#7C7593", fontSize: "0.88rem" }}>{new Date(req.createdAt).toLocaleDateString()}</Typography>
                      </Box>
                      <Typography sx={{ color: "#8D6FE8", fontSize: "0.88rem", fontWeight: 700 }}>
                        {req.offers?.length || 0} offer{req.offers?.length !== 1 ? "s" : ""} so far
                      </Typography>
                    </Stack>

                    {alreadyOffered ? (
                      <Chip icon={<TaskAltRoundedIcon />} label="Offer sent" sx={{ bgcolor: "#E7F7EA", color: "#297A43", fontWeight: 700, borderRadius: "999px" }} />
                    ) : (
                      <Button variant="contained" startIcon={<HandshakeRoundedIcon />}
                        onClick={() => setOfferDialog({ requestId: req.id, title: req.title })}
                        sx={{ textTransform: "none", borderRadius: "14px", px: 2.5, py: 1, fontWeight: 700, bgcolor: "#8D6FE8", boxShadow: "none", "&:hover": { bgcolor: "#7C5FE0" } }}>
                        Send Offer
                      </Button>
                    )}
                  </Paper>
                );
              })}
            </Stack>
          )}
      </Paper>

      <Dialog open={!!offerDialog} onClose={() => setOfferDialog(null)} PaperProps={{ sx: { borderRadius: "24px", p: 1 } }}>
        <DialogTitle sx={{ fontWeight: 900, color: "#2D2342" }}>
          Send an offer
          <Typography sx={{ fontSize: "0.9rem", color: "#7B7390", mt: 0.5 }}>{offerDialog?.title}</Typography>
        </DialogTitle>
        <DialogContent>
          <TextField fullWidth multiline rows={3} label="Message to user"
            placeholder="Describe what you can offer and when you are available..."
            value={offerForm.message} onChange={(e) => setOfferForm({ ...offerForm, message: e.target.value })}
            sx={{ mb: 2, mt: 1, "& .MuiOutlinedInput-root": { borderRadius: "16px" } }}
          />
          <Stack direction="row" spacing={2}>
            <TextField label="Your price (cash)" type="number" placeholder="500"
              value={offerForm.proposedCash} onChange={(e) => setOfferForm({ ...offerForm, proposedCash: e.target.value })}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "16px" } }}
            />
            <TextField label="Credits" type="number" placeholder="10"
              value={offerForm.proposedCredits} onChange={(e) => setOfferForm({ ...offerForm, proposedCredits: e.target.value })}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "16px" } }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setOfferDialog(null)} sx={{ textTransform: "none", color: "#7B7390" }}>Cancel</Button>
          <Button variant="contained" onClick={handleSendOffer} disabled={submitting}
            sx={{ textTransform: "none", borderRadius: "12px", px: 3, fontWeight: 700, bgcolor: "#8D6FE8", boxShadow: "none" }}>
            {submitting ? "Sending..." : "Send Offer"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default function ProviderBrowseRequests() {
  const [activeTab, setActiveTab] = useState("bookings");

  const tabStyle = (name) => ({
    textTransform: "none", borderRadius: "999px", px: 3, py: 1.2, fontWeight: 700, fontSize: "0.95rem",
    bgcolor: activeTab === name ? "#8D6FE8" : "rgba(255,255,255,0.84)",
    color: activeTab === name ? "#fff" : "#5D5670",
    border: "1px solid", borderColor: activeTab === name ? "#8D6FE8" : "#E0D4F6",
    boxShadow: "none",
    "&:hover": { bgcolor: activeTab === name ? "#7C5FE0" : "#F5F0FF" },
  });

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F8F5FC",
      backgroundImage: `radial-gradient(circle at 0% 100%, rgba(224,236,255,0.82) 0, transparent 22%),
        radial-gradient(circle at 100% 0%, rgba(255,214,231,0.72) 0, transparent 20%)` }}>
      <ProviderSidebar />
      <Box sx={{ ml: `${providerSidebarWidth}px`, flex: 1, p: { xs: 2, md: 3 }, position: "relative", overflowY: "auto", minHeight: "100vh" }}>
        <Box component="img" src={logo} alt="" sx={{ position: "absolute", right: 30, bottom: 30, width: 300, opacity: 0.035, pointerEvents: "none", zIndex: 0 }} />
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <ProviderTopbar title="Browse Requests" />
          <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, mb: 3, borderRadius: "32px", bgcolor: "rgba(255,255,255,0.82)", border: "1px solid #EEE6F5", boxShadow: "0 16px 34px rgba(160,130,190,0.08)" }}>
            <Typography sx={{ fontSize: { xs: "2rem", md: "2.8rem" }, fontWeight: 900, color: "#2D2342", lineHeight: 1.05, mb: 1 }}>
              Requests & Opportunities
            </Typography>
            <Typography sx={{ color: "#756C8C", fontSize: "1rem", lineHeight: 1.8 }}>
              Manage your incoming booking requests, or browse what users need and send them an offer directly.
            </Typography>
          </Paper>

          <Stack direction="row" spacing={1.5} sx={{ mb: 3 }}>
            <Button variant="contained" sx={tabStyle("bookings")} onClick={() => setActiveTab("bookings")}>
              📅 Booking Requests
            </Button>
            <Button variant="contained" sx={tabStyle("userRequests")} onClick={() => setActiveTab("userRequests")}>
              🔍 Browse User Requests
            </Button>
          </Stack>

          {activeTab === "bookings" && <BookingsTab />}
          {activeTab === "userRequests" && <UserRequestsTab />}
        </Box>
      </Box>
    </Box>
  );
}

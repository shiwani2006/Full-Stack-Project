import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  postServiceRequest,
  getMyServiceRequests,
  cancelServiceRequest,
  acceptOffer,
} from "../../services/serviceRequestService";

const categories = ["Cleaning", "Repair", "Home Help", "Outdoor", "Beauty", "Maintenance", "Other"];

const getBg = (i) => {
  const bgs = [
    "linear-gradient(135deg, #efe5ff 0%, #e8dcff 100%)",
    "linear-gradient(135deg, #e8fff4 0%, #def5ea 100%)",
    "linear-gradient(135deg, #e7f3ff 0%, #dcecff 100%)",
    "linear-gradient(135deg, #fff1d9 0%, #fde9bf 100%)",
    "linear-gradient(135deg, #ffe8f3 0%, #f9ddeb 100%)",
  ];
  return bgs[i % bgs.length];
};

const statusStyle = (s) => {
  if (s === "open") return { bg: "#E7F7EA", color: "#297A43" };
  if (s === "fulfilled") return { bg: "#EAF1FF", color: "#4B6FC9" };
  return { bg: "#FFE5E5", color: "#D00000" };
};

export default function UserRequests() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user")) || {};
  const initial = currentUser?.name?.charAt(0)?.toUpperCase() || "U";

  const [tab, setTab] = useState("browse"); // browse | post
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    budgetCash: "",
    budgetCredits: "",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchMyRequests = () => {
    setLoading(true);
    getMyServiceRequests()
      .then((res) => setMyRequests(res.data.serviceRequests || []))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const handleSubmit = async () => {
    if (!form.title || !form.description) {
      setErrorMsg("Title and description are required.");
      return;
    }
    setSubmitting(true);
    setErrorMsg("");
    try {
      await postServiceRequest(form);
      setSuccessMsg("Request posted! Providers can now see and offer on it.");
      setForm({ title: "", description: "", category: "", budgetCash: "", budgetCredits: "" });
      fetchMyRequests();
      setTab("browse");
    } catch (e) {
      setErrorMsg("Failed to post request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this request?")) return;
    try {
      await cancelServiceRequest(id);
      fetchMyRequests();
    } catch (e) {
      console.error(e);
    }
  };

  const handleAcceptOffer = async (offerId) => {
    if (!window.confirm("Accept this offer? Other offers will be rejected.")) return;
    try {
      await acceptOffer(offerId);
      fetchMyRequests();
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={s.page}>
      <div style={s.blob1} /><div style={s.blob2} /><div style={s.blob3} />
      <div style={s.container}>
        {/* Sidebar */}
        <aside style={s.sidebar}>
          <div>
            <div style={s.brandCard}>
              <div style={s.logoIcon}>S</div>
              <div>
                <h2 style={s.logoText}>SkillSwap</h2>
                <p style={s.logoSub}>time as value</p>
              </div>
            </div>
            <div style={s.userCard}>
              <div style={s.userAvatar}>{initial}</div>
              <div>
                <h4 style={s.userName}>{currentUser.name || "User"}</h4>
                <p style={s.userEmail}>{currentUser.email}</p>
              </div>
            </div>
            <nav style={s.nav}>
              <Link to="/user/dashboard" style={s.navItem}><span style={s.navIcon}>🏠</span>Dashboard</Link>
              <Link to="/user/profile" style={s.navItem}><span style={s.navIcon}>👤</span>Profile</Link>
              <Link to="/user/services" style={s.navItem}><span style={s.navIcon}>🛍️</span>Browse Services</Link>
              <Link to="/user/requests" style={{ ...s.navItem, ...s.activeNavItem }}><span style={s.navIcon}>📋</span>My Requests</Link>
              <Link to="/user/bookings" style={s.navItem}><span style={s.navIcon}>📅</span>Bookings</Link>
              <Link to="/user/wallet" style={s.navItem}><span style={s.navIcon}>💳</span>Wallet</Link>
              <Link to="/user/chat" style={s.navItem}><span style={s.navIcon}>💬</span>Chat</Link>
            </nav>
          </div>
          <button style={s.logoutBtn} onClick={handleLogout}>Logout</button>
        </aside>

        {/* Main */}
        <main style={s.main}>
          {/* Header */}
          <div style={s.navbar}>
            <div>
              <p style={s.navbarSub}>Need something done?</p>
              <h1 style={s.navbarTitle}>My Service Requests</h1>
            </div>
            <div style={s.navbarChips}>
              <div style={s.chip}>{myRequests.filter(r => r.status === "open").length} open</div>
            </div>
          </div>

          {/* Tabs */}
          <div style={s.tabs}>
            <button
              style={{ ...s.tabBtn, ...(tab === "browse" ? s.activeTab : {}) }}
              onClick={() => setTab("browse")}
            >My Requests</button>
            <button
              style={{ ...s.tabBtn, ...(tab === "post" ? s.activeTab : {}) }}
              onClick={() => setTab("post")}
            >+ Post a Request</button>
          </div>

          {/* POST FORM */}
          {tab === "post" && (
            <div style={s.formCard}>
              <h2 style={s.formTitle}>What do you need help with?</h2>
              <p style={s.formSub}>Describe the job — providers will send you offers.</p>

              {successMsg && <div style={s.successBox}>{successMsg}</div>}
              {errorMsg && <div style={s.errorBox}>{errorMsg}</div>}

              <label style={s.label}>Title *</label>
              <input
                style={s.input}
                placeholder="e.g. Need a plumber to fix leaking pipe"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
              />

              <label style={s.label}>Description *</label>
              <textarea
                style={{ ...s.input, minHeight: 100, resize: "vertical" }}
                placeholder="Describe the work, location, timing preferences, any special requirements..."
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
              />

              <label style={s.label}>Category</label>
              <select
                style={s.input}
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
              >
                <option value="">Select a category</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>

              <div style={s.row}>
                <div style={{ flex: 1 }}>
                  <label style={s.label}>Budget (Cash ₹)</label>
                  <input
                    style={s.input}
                    type="number"
                    placeholder="e.g. 500"
                    value={form.budgetCash}
                    onChange={e => setForm({ ...form, budgetCash: e.target.value })}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={s.label}>Budget (Credits)</label>
                  <input
                    style={s.input}
                    type="number"
                    placeholder="e.g. 10"
                    value={form.budgetCredits}
                    onChange={e => setForm({ ...form, budgetCredits: e.target.value })}
                  />
                </div>
              </div>

              <button
                style={{ ...s.submitBtn, opacity: submitting ? 0.7 : 1 }}
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Posting..." : "Post Request"}
              </button>
            </div>
          )}

          {/* MY REQUESTS LIST */}
          {tab === "browse" && (
            <div>
              {loading ? (
                <p style={{ color: "#8d83a7" }}>Loading your requests...</p>
              ) : myRequests.length === 0 ? (
                <div style={s.emptyCard}>
                  <p style={{ fontSize: 40 }}>📋</p>
                  <p style={{ color: "#7B7390", fontWeight: 700 }}>No requests yet</p>
                  <button style={s.submitBtn} onClick={() => setTab("post")}>Post your first request</button>
                </div>
              ) : (
                <div style={s.requestsGrid}>
                  {myRequests.map((req, i) => {
                    const ss = statusStyle(req.status);
                    return (
                      <div key={req.id} style={{ ...s.reqCard, background: getBg(i) }}>
                        <div style={s.cardHeader}>
                          <div>
                            <h3 style={s.reqTitle}>{req.title}</h3>
                            {req.category && <span style={s.pill}>{req.category}</span>}
                          </div>
                          <span style={{ ...s.statusBadge, background: ss.bg, color: ss.color }}>
                            {req.status}
                          </span>
                        </div>

                        <p style={s.reqDesc}>{req.description}</p>

                        <div style={s.metaRow}>
                          {req.budgetCash && <span style={s.metaPill}>₹{req.budgetCash}</span>}
                          {req.budgetCredits && <span style={s.metaPill}>{req.budgetCredits} cr</span>}
                          <span style={s.metaPill}>
                            {req.offers?.length || 0} offer{req.offers?.length !== 1 ? "s" : ""}
                          </span>
                          <span style={s.metaPill}>{new Date(req.createdAt).toLocaleDateString()}</span>
                        </div>

                        {/* Offers section */}
                        {req.offers?.length > 0 && (
                          <div style={s.offersSection}>
                            <p style={s.offersHeading}>Offers from providers</p>
                            {req.offers.map(offer => (
                              <div key={offer.id} style={s.offerRow}>
                                <div style={s.offerAvatar}>
                                  {(offer.provider?.name || "P").charAt(0).toUpperCase()}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <p style={s.offerName}>{offer.provider?.name || "Provider"}</p>
                                  {offer.message && <p style={s.offerMsg}>{offer.message}</p>}
                                  <div style={s.offerPrices}>
                                    {offer.proposedCash && <span style={s.metaPill}>₹{offer.proposedCash}</span>}
                                    {offer.proposedCredits && <span style={s.metaPill}>{offer.proposedCredits} cr</span>}
                                  </div>
                                </div>
                                {req.status === "open" && offer.status === "pending" && (
                                  <button
                                    style={s.acceptBtn}
                                    onClick={() => handleAcceptOffer(offer.id)}
                                  >
                                    Accept
                                  </button>
                                )}
                                {offer.status === "accepted" && (
                                  <span style={{ ...s.statusBadge, background: "#E7F7EA", color: "#297A43" }}>Accepted</span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {req.status === "open" && (
                          <button style={s.cancelBtn} onClick={() => handleCancel(req.id)}>
                            Cancel Request
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", background: "linear-gradient(135deg, #faf7ff 0%, #f4efff 48%, #fdf4fb 78%, #eef5ff 100%)", fontFamily: "'Poppins','Segoe UI',sans-serif", position: "relative", overflowX: "hidden", padding: "18px" },
  blob1: { position: "absolute", top: "-80px", right: "-70px", width: "260px", height: "260px", borderRadius: "50%", background: "rgba(181,145,255,0.16)", filter: "blur(85px)" },
  blob2: { position: "absolute", bottom: "60px", left: "-70px", width: "240px", height: "240px", borderRadius: "50%", background: "rgba(255,190,225,0.14)", filter: "blur(80px)" },
  blob3: { position: "absolute", top: "300px", left: "48%", width: "190px", height: "190px", borderRadius: "50%", background: "rgba(140,190,255,0.12)", filter: "blur(85px)" },
  container: { position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "260px minmax(0,1fr)", gap: "20px", maxWidth: "1800px", margin: "0 auto", alignItems: "start" },
  sidebar: { position: "sticky", top: "18px", height: "calc(100vh - 36px)", background: "rgba(255,255,255,0.62)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.78)", borderRadius: "28px", padding: "18px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 16px 38px rgba(122,95,188,0.08)" },
  brandCard: { display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" },
  logoIcon: { width: "62px", height: "62px", borderRadius: "20px", background: "linear-gradient(135deg,#8f6bff 0%,#c79cff 100%)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", fontWeight: "800", flexShrink: 0 },
  logoText: { margin: 0, fontSize: "28px", fontWeight: "800", color: "#7d4cff", lineHeight: 1.1 },
  logoSub: { margin: "6px 0 0 0", color: "#9b8bb5", fontSize: "13px" },
  userCard: { display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "22px", background: "linear-gradient(135deg,#f7edff 0%,#fdebf5 100%)", marginBottom: "18px", border: "1px solid rgba(230,213,248,0.9)" },
  userAvatar: { width: "52px", height: "52px", borderRadius: "16px", background: "linear-gradient(135deg,#8f6bff 0%,#c79cff 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "800", fontSize: "18px", flexShrink: 0 },
  userName: { margin: 0, fontSize: "16px", color: "#3f2d5c", fontWeight: "700" },
  userEmail: { margin: "5px 0 0 0", fontSize: "12px", color: "#8d7da9" },
  nav: { display: "flex", flexDirection: "column", gap: "12px" },
  navItem: { textDecoration: "none", color: "#5e517d", fontSize: "16px", fontWeight: "600", padding: "16px", borderRadius: "18px", background: "rgba(255,255,255,0.78)", border: "1px solid rgba(225,214,245,0.9)", display: "flex", alignItems: "center", gap: "12px" },
  activeNavItem: { color: "#7b4cff", background: "linear-gradient(135deg,#efe4ff 0%,#e7d8ff 100%)", boxShadow: "0 10px 22px rgba(143,107,255,0.12)" },
  navIcon: { fontSize: "18px", width: "22px", textAlign: "center", flexShrink: 0 },
  logoutBtn: { border: "none", background: "linear-gradient(135deg,#ff98bf 0%,#ffb4cf 100%)", color: "#fff", borderRadius: "16px", padding: "14px 16px", fontWeight: "700", cursor: "pointer" },
  main: { minWidth: 0 },
  navbar: { background: "rgba(255,255,255,0.68)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.82)", borderRadius: "28px", padding: "24px 26px", boxShadow: "0 16px 35px rgba(124,96,190,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "18px", marginBottom: "18px" },
  navbarSub: { margin: 0, color: "#988db1", fontSize: "14px", fontWeight: "600" },
  navbarTitle: { margin: "8px 0 0 0", color: "#181638", fontSize: "34px", fontWeight: "900", lineHeight: "1.12" },
  navbarChips: { display: "flex", gap: "10px" },
  chip: { padding: "12px 16px", borderRadius: "999px", background: "linear-gradient(135deg,#f2e9ff 0%,#ffeaf4 100%)", color: "#6a4a99", fontWeight: "700", fontSize: "14px", border: "1px solid rgba(220,205,246,0.8)" },
  tabs: { display: "flex", gap: "12px", marginBottom: "18px" },
  tabBtn: { border: "1px solid #e0d2f8", background: "#fff", color: "#654b8d", borderRadius: "999px", padding: "12px 24px", fontWeight: "700", cursor: "pointer", fontSize: "15px" },
  activeTab: { background: "linear-gradient(135deg,#8f6bff 0%,#b58cff 100%)", color: "#fff", border: "1px solid transparent" },
  formCard: { background: "rgba(255,255,255,0.84)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.82)", borderRadius: "28px", padding: "28px", boxShadow: "0 16px 35px rgba(124,96,190,0.08)" },
  formTitle: { margin: 0, fontSize: "26px", fontWeight: "900", color: "#1b1838" },
  formSub: { margin: "8px 0 24px 0", color: "#746a90", fontSize: "14px" },
  label: { display: "block", fontSize: "14px", fontWeight: "700", color: "#4a3d6a", marginBottom: "6px", marginTop: "16px" },
  input: { width: "100%", boxSizing: "border-box", padding: "14px 16px", borderRadius: "16px", border: "1px solid #e0d2f8", fontSize: "15px", fontFamily: "inherit", color: "#3a2f52", outline: "none", background: "#fff" },
  row: { display: "flex", gap: "16px" },
  submitBtn: { marginTop: "22px", border: "none", background: "linear-gradient(135deg,#8f6bff 0%,#b58cff 100%)", color: "#fff", borderRadius: "16px", padding: "14px 28px", fontWeight: "700", cursor: "pointer", fontSize: "16px", boxShadow: "0 12px 22px rgba(143,107,255,0.18)" },
  successBox: { background: "#E7F7EA", color: "#297A43", padding: "12px 16px", borderRadius: "14px", fontWeight: "600", marginBottom: "16px" },
  errorBox: { background: "#FFE5E5", color: "#D00000", padding: "12px 16px", borderRadius: "14px", fontWeight: "600", marginBottom: "16px" },
  requestsGrid: { display: "flex", flexDirection: "column", gap: "18px" },
  reqCard: { borderRadius: "26px", padding: "22px", border: "1px solid rgba(255,255,255,0.82)", boxShadow: "0 12px 28px rgba(124,96,190,0.07)" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "10px" },
  reqTitle: { margin: 0, fontSize: "20px", fontWeight: "800", color: "#1b1838" },
  pill: { display: "inline-block", marginTop: "6px", padding: "5px 12px", borderRadius: "999px", background: "rgba(255,255,255,0.8)", color: "#654b8d", fontSize: "12px", fontWeight: "700" },
  statusBadge: { padding: "6px 14px", borderRadius: "999px", fontWeight: "700", fontSize: "13px", whiteSpace: "nowrap" },
  reqDesc: { margin: "0 0 12px 0", fontSize: "14px", lineHeight: "1.8", color: "#626b85" },
  metaRow: { display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "14px" },
  metaPill: { padding: "6px 12px", borderRadius: "999px", background: "rgba(255,255,255,0.8)", color: "#654b8d", fontSize: "12px", fontWeight: "700" },
  offersSection: { borderTop: "1px solid rgba(255,255,255,0.8)", paddingTop: "14px", marginTop: "4px" },
  offersHeading: { margin: "0 0 10px 0", fontSize: "14px", fontWeight: "800", color: "#4a3d6a" },
  offerRow: { display: "flex", alignItems: "flex-start", gap: "12px", padding: "12px", borderRadius: "18px", background: "rgba(255,255,255,0.7)", marginBottom: "8px" },
  offerAvatar: { width: "38px", height: "38px", borderRadius: "12px", background: "linear-gradient(135deg,#8f6bff,#c79cff)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "16px", flexShrink: 0 },
  offerName: { margin: 0, fontWeight: "700", color: "#2d2342", fontSize: "14px" },
  offerMsg: { margin: "4px 0 6px 0", color: "#746a90", fontSize: "13px" },
  offerPrices: { display: "flex", gap: "8px" },
  acceptBtn: { border: "none", background: "linear-gradient(135deg,#8f6bff,#b58cff)", color: "#fff", borderRadius: "12px", padding: "8px 16px", fontWeight: "700", cursor: "pointer", fontSize: "13px", flexShrink: 0 },
  cancelBtn: { marginTop: "12px", border: "1px solid #f0c0c0", background: "transparent", color: "#9A5D6A", borderRadius: "14px", padding: "10px 18px", fontWeight: "700", cursor: "pointer", fontSize: "14px" },
  emptyCard: { background: "rgba(255,255,255,0.8)", borderRadius: "26px", padding: "48px", textAlign: "center", border: "1px solid rgba(255,255,255,0.82)" },
};

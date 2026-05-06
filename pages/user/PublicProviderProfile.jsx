import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

export default function PublicProviderProfile() {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user")) || {};
  const initial = currentUser?.name?.charAt(0)?.toUpperCase() || "U";

  const [provider, setProvider] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get(`/users/${providerId}`)
      .then((res) => setProvider(res.data.user))
      .catch(() => {});
    axiosInstance.get(`/services?providerId=${providerId}`)
      .then((res) => setServices(res.data.services || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [providerId]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getBg = (i) => {
    const bgs = [
      "linear-gradient(135deg,#efe5ff 0%,#e8dcff 100%)",
      "linear-gradient(135deg,#e8fff4 0%,#def5ea 100%)",
      "linear-gradient(135deg,#e7f3ff 0%,#dcecff 100%)",
      "linear-gradient(135deg,#fff1d9 0%,#fde9bf 100%)",
      "linear-gradient(135deg,#ffe8f3 0%,#f9ddeb 100%)",
    ];
    return bgs[i % bgs.length];
  };

  if (loading) return (
    <div style={s.page}><p style={{ color: "#8d83a7", padding: 40 }}>Loading...</p></div>
  );

  return (
    <div style={s.page}>
      <div style={s.blob1} /><div style={s.blob2} /><div style={s.blob3} />
      <div style={s.container}>
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
              <Link to="/user/services" style={{ ...s.navItem, ...s.activeNavItem }}><span style={s.navIcon}>🛍️</span>Browse Services</Link>
              <Link to="/user/requests" style={s.navItem}><span style={s.navIcon}>📋</span>My Requests</Link>
              <Link to="/user/bookings" style={s.navItem}><span style={s.navIcon}>📅</span>Bookings</Link>
              <Link to="/user/wallet" style={s.navItem}><span style={s.navIcon}>💳</span>Wallet</Link>
              <Link to="/user/chat" style={s.navItem}><span style={s.navIcon}>💬</span>Chat</Link>
            </nav>
          </div>
          <button style={s.logoutBtn} onClick={handleLogout}>Logout</button>
        </aside>

        <main style={s.main}>
          <button style={s.backBtn} onClick={() => navigate(-1)}>← Back</button>

          {!provider ? (
            <div style={s.emptyCard}><p style={{ fontSize: 40 }}>😕</p><p style={{ color: "#7B7390", fontWeight: 700 }}>Provider not found</p></div>
          ) : (
            <div style={s.profileLayout}>
              <div style={s.leftCard}>
                <div style={s.coverBanner} />
                <div style={s.avatarWrap}>
                  {provider.profileImage
                    ? <img src={provider.profileImage} alt={provider.name} style={s.avatarImg} />
                    : <div style={s.avatarFallback}>{(provider.name || "P").charAt(0).toUpperCase()}</div>
                  }
                </div>
                <div style={s.leftCardBody}>
                  <h2 style={s.providerName}>{provider.name}</h2>
                  <p style={s.providerEmail}>{provider.email}</p>
                  <div style={s.badgeRow}>
                    <span style={s.badge}>⭐ Trust: {provider.trustScore || 100}/100</span>
                    <span style={s.badge}>Provider</span>
                  </div>
                  <div style={s.statGrid}>
                    <div style={s.statCard}>
                      <p style={s.statLabel}>Credits</p>
                      <p style={s.statValue}>{provider.creditBalance || 0}</p>
                    </div>
                    <div style={s.statCard}>
                      <p style={s.statLabel}>Services</p>
                      <p style={s.statValue}>{services.length}</p>
                    </div>
                  </div>
                  <div style={s.infoBox}>
                    <p style={s.infoLabel}>Member Since</p>
                    <p style={s.infoValue}>{provider.createdAt ? new Date(provider.createdAt).toLocaleDateString() : "N/A"}</p>
                  </div>
                </div>
              </div>

              <div style={s.rightCard}>
                <h2 style={s.sectionTitle}>Services by {provider.name}</h2>
                <p style={s.sectionSub}>{services.length} service{services.length !== 1 ? "s" : ""} listed</p>
                {services.length === 0 ? (
                  <div style={s.emptyCard}><p style={{ fontSize: 36 }}>📭</p><p style={{ color: "#7B7390" }}>No services listed yet</p></div>
                ) : (
                  <div style={s.servicesGrid}>
                    {services.map((svc, i) => (
                      <div key={svc.id} style={{ ...s.svcCard, background: getBg(i) }}>
                        <h3 style={s.svcTitle}>{svc.title}</h3>
                        {svc.category && <span style={s.pill}>{svc.category}</span>}
                        <p style={s.svcDesc}>{svc.description}</p>
                        <div style={s.svcMeta}>
                          {svc.cashRate && <span style={s.metaPill}>₹{svc.cashRate}</span>}
                          {svc.creditRate && <span style={s.metaPill}>{svc.creditRate} credits</span>}
                          {svc.tags?.map((t, ti) => <span key={ti} style={s.metaPill}>{t}</span>)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", background: "linear-gradient(135deg,#faf7ff 0%,#f4efff 48%,#fdf4fb 78%,#eef5ff 100%)", fontFamily: "'Poppins','Segoe UI',sans-serif", position: "relative", overflowX: "hidden", padding: "18px" },
  blob1: { position: "absolute", top: "-80px", right: "-70px", width: "260px", height: "260px", borderRadius: "50%", background: "rgba(181,145,255,0.16)", filter: "blur(85px)" },
  blob2: { position: "absolute", bottom: "60px", left: "-70px", width: "240px", height: "240px", borderRadius: "50%", background: "rgba(255,190,225,0.14)", filter: "blur(80px)" },
  blob3: { position: "absolute", top: "300px", left: "48%", width: "190px", height: "190px", borderRadius: "50%", background: "rgba(140,190,255,0.12)", filter: "blur(85px)" },
  container: { position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "260px minmax(0,1fr)", gap: "20px", maxWidth: "1800px", margin: "0 auto", alignItems: "start" },
  sidebar: { position: "sticky", top: "18px", height: "calc(100vh - 36px)", background: "rgba(255,255,255,0.62)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.78)", borderRadius: "28px", padding: "18px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 16px 38px rgba(122,95,188,0.08)", overflowY: "auto" },
  brandCard: { display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" },
  logoIcon: { width: "62px", height: "62px", borderRadius: "20px", background: "linear-gradient(135deg,#8f6bff 0%,#c79cff 100%)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", fontWeight: "800", flexShrink: 0 },
  logoText: { margin: 0, fontSize: "28px", fontWeight: "800", color: "#7d4cff", lineHeight: 1.1 },
  logoSub: { margin: "6px 0 0 0", color: "#9b8bb5", fontSize: "13px" },
  userCard: { display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "22px", background: "linear-gradient(135deg,#f7edff 0%,#fdebf5 100%)", marginBottom: "18px", border: "1px solid rgba(230,213,248,0.9)" },
  userAvatar: { width: "52px", height: "52px", borderRadius: "16px", background: "linear-gradient(135deg,#8f6bff 0%,#c79cff 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "800", fontSize: "18px", flexShrink: 0 },
  userName: { margin: 0, fontSize: "16px", color: "#3f2d5c", fontWeight: "700" },
  userEmail: { margin: "5px 0 0 0", fontSize: "12px", color: "#8d7da9" },
  nav: { display: "flex", flexDirection: "column", gap: "10px" },
  navItem: { textDecoration: "none", color: "#5e517d", fontSize: "14px", fontWeight: "600", padding: "13px 14px", borderRadius: "18px", background: "rgba(255,255,255,0.78)", border: "1px solid rgba(225,214,245,0.9)", display: "flex", alignItems: "center", gap: "10px" },
  activeNavItem: { color: "#7b4cff", background: "linear-gradient(135deg,#efe4ff 0%,#e7d8ff 100%)" },
  navIcon: { fontSize: "16px", width: "20px", textAlign: "center", flexShrink: 0 },
  logoutBtn: { border: "none", background: "linear-gradient(135deg,#ff98bf 0%,#ffb4cf 100%)", color: "#fff", borderRadius: "16px", padding: "14px 16px", fontWeight: "700", cursor: "pointer", marginTop: "12px" },
  main: { minWidth: 0 },
  backBtn: { border: "none", background: "rgba(255,255,255,0.9)", borderRadius: "14px", padding: "12px 22px", fontWeight: "700", color: "#7B4CFF", cursor: "pointer", fontSize: "14px", boxShadow: "0 4px 14px rgba(124,96,190,0.1)", marginBottom: "20px", display: "inline-block" },
  profileLayout: { display: "grid", gridTemplateColumns: "300px minmax(0,1fr)", gap: "20px", alignItems: "start" },
  leftCard: { background: "rgba(255,255,255,0.84)", borderRadius: "28px", border: "1px solid rgba(255,255,255,0.82)", boxShadow: "0 16px 35px rgba(124,96,190,0.08)", overflow: "hidden" },
  coverBanner: { height: "100px", background: "linear-gradient(135deg,#D7C3FF 0%,#FFD6EB 50%,#DCEBFF 100%)" },
  avatarWrap: { margin: "-50px auto 0", width: "100px", height: "100px", borderRadius: "50%", overflow: "hidden", border: "4px solid #fff", boxShadow: "0 8px 20px rgba(124,96,190,0.15)" },
  avatarImg: { width: "100%", height: "100%", objectFit: "cover" },
  avatarFallback: { width: "100%", height: "100%", background: "linear-gradient(135deg,#8f6bff,#c79cff)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "800", fontSize: "36px" },
  leftCardBody: { padding: "16px 20px 24px", textAlign: "center" },
  providerName: { margin: "0 0 4px 0", fontSize: "22px", fontWeight: "900", color: "#1b1838" },
  providerEmail: { margin: "0 0 14px 0", fontSize: "13px", color: "#8d7da9" },
  badgeRow: { display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap", marginBottom: "16px" },
  badge: { padding: "6px 14px", borderRadius: "999px", background: "#f0e8ff", color: "#654b8d", fontWeight: "700", fontSize: "12px" },
  statGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" },
  statCard: { background: "linear-gradient(135deg,#f7edff,#fdf4fb)", borderRadius: "16px", padding: "12px", border: "1px solid rgba(230,213,248,0.9)" },
  statLabel: { margin: 0, fontSize: "11px", color: "#9b8bb5", fontWeight: "600" },
  statValue: { margin: "4px 0 0 0", fontSize: "20px", fontWeight: "900", color: "#3f2d5c" },
  infoBox: { background: "#faf8fd", borderRadius: "16px", padding: "12px 16px", border: "1px solid #eee6f5", textAlign: "left" },
  infoLabel: { margin: 0, fontSize: "11px", color: "#9b8bb5", fontWeight: "600" },
  infoValue: { margin: "4px 0 0 0", fontSize: "14px", fontWeight: "700", color: "#3f2d5c" },
  rightCard: { background: "rgba(255,255,255,0.84)", borderRadius: "28px", padding: "28px", border: "1px solid rgba(255,255,255,0.82)", boxShadow: "0 16px 35px rgba(124,96,190,0.08)" },
  sectionTitle: { margin: "0 0 6px 0", fontSize: "26px", fontWeight: "900", color: "#1b1838" },
  sectionSub: { margin: "0 0 20px 0", fontSize: "14px", color: "#8d7da9" },
  servicesGrid: { display: "flex", flexDirection: "column", gap: "14px" },
  svcCard: { borderRadius: "20px", padding: "20px", border: "1px solid rgba(255,255,255,0.82)" },
  svcTitle: { margin: "0 0 6px 0", fontSize: "18px", fontWeight: "800", color: "#1b1838" },
  pill: { display: "inline-block", padding: "4px 12px", borderRadius: "999px", background: "rgba(255,255,255,0.8)", color: "#654b8d", fontSize: "12px", fontWeight: "700", marginBottom: "10px" },
  svcDesc: { margin: "0 0 12px 0", fontSize: "14px", color: "#626b85", lineHeight: 1.7 },
  svcMeta: { display: "flex", gap: "8px", flexWrap: "wrap" },
  metaPill: { padding: "5px 12px", borderRadius: "999px", background: "rgba(255,255,255,0.8)", color: "#654b8d", fontSize: "12px", fontWeight: "700" },
  emptyCard: { background: "rgba(255,255,255,0.8)", borderRadius: "20px", padding: "40px", textAlign: "center" },
};

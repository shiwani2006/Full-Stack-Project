import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

const Services = () => {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user")) || {
    name: "User",
    email: "user@example.com",
    role: "user",
    profileImage: "",
    creditBalance: 0,
  };

  const initial = currentUser?.name?.charAt(0)?.toUpperCase() || "U";

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ["All","Cleaning","Repair","Home Help","Outdoor","Beauty","Maintenance"];

  useEffect(() => {
    axiosInstance.get("/services")
      .then((res) => setServices(res.data.services || []))
      .catch((err) => console.error("Failed to fetch services", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesCategory = selectedCategory === "All" || service.category === selectedCategory;
      const q = search.toLowerCase();
      const matchesSearch =
        service.title.toLowerCase().includes(q) ||
        (service.provider?.name || "").toLowerCase().includes(q) ||
        (service.category || "").toLowerCase().includes(q) ||
        service.tags?.some((tag) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory, services]);

  const getBg = (index) => {
    const bgs = [
      "linear-gradient(135deg, #efe5ff 0%, #e8dcff 100%)",
      "linear-gradient(135deg, #e8fff4 0%, #def5ea 100%)",
      "linear-gradient(135deg, #e7f3ff 0%, #dcecff 100%)",
      "linear-gradient(135deg, #fff1d9 0%, #fde9bf 100%)",
      "linear-gradient(135deg, #eef1ff 0%, #e2e7ff 100%)",
      "linear-gradient(135deg, #ffe8f3 0%, #f9ddeb 100%)",
    ];
    return bgs[index % bgs.length];
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleBookNow = async (service) => {
    try {
      await axiosInstance.post("/bookings", {
        serviceId: service.id,
        paymentMethod: service.cashRate ? "cash" : "credits",
        cashAmount: service.cashRate || 0,
        creditAmount: service.creditRate || 0,
      });
      navigate("/user/bookings");
    } catch (err) {
      console.error("Booking failed", err);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.blob1}></div>
      <div style={styles.blob2}></div>
      <div style={styles.blob3}></div>

      <div style={styles.container}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <div>
            <div style={styles.brandCard}>
              <div style={styles.logoIcon}>S</div>
              <div>
                <h2 style={styles.logoText}>SkillSwap</h2>
                <p style={styles.logoSub}>time as value</p>
              </div>
            </div>

            <div style={styles.userCard}>
              <div style={styles.userAvatar}>
                {currentUser.profileImage ? (
                  <img src={currentUser.profileImage} alt="User" style={styles.userAvatarImg} />
                ) : (initial)}
              </div>
              <div style={styles.userInfo}>
                <h4 style={styles.userName}>{currentUser.name || "User"}</h4>
                <p style={styles.userEmail}>{currentUser.email || "user@gmail.com"}</p>
              </div>
            </div>

            <nav style={styles.nav}>
              <Link to="/user/dashboard" style={styles.navItem}>
                <span style={styles.navIcon}>🏠</span>Dashboard
              </Link>
              <Link to="/user/profile" style={styles.navItem}>
                <span style={styles.navIcon}>👤</span>Profile
              </Link>
              <Link to="/user/services" style={{ ...styles.navItem, ...styles.activeNavItem }}>
                <span style={styles.navIcon}>🛍️</span>Browse Services
              </Link>
              {/* My Requests nav link */}
              <Link to="/user/requests" style={styles.navItem}>
                <span style={styles.navIcon}>📋</span>My Requests
              </Link>
              <Link to="/user/bookings" style={styles.navItem}>
                <span style={styles.navIcon}>📅</span>Bookings
              </Link>
              <Link to="/user/wallet" style={styles.navItem}>
                <span style={styles.navIcon}>💳</span>Wallet
              </Link>
              <Link to="/user/chat" style={styles.navItem}>
                <span style={styles.navIcon}>💬</span>Chat
              </Link>
            </nav>
          </div>

          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </aside>

        {/* Main */}
        <main style={styles.main}>
          <div style={styles.navbar}>
            <div>
              <p style={styles.navbarSub}>Trusted nearby home services</p>
              <h1 style={styles.navbarTitle}>Find what your home needs</h1>
            </div>
            <div style={styles.navbarChips}>
              <div style={styles.chip}>{services.length}+ services</div>
              <div style={styles.chip}>4.8 rating</div>
            </div>
          </div>

          <div style={styles.searchPanel}>
            <div style={styles.searchBox}>
              <span style={styles.searchIcon}>🔎</span>
              <input
                type="text"
                placeholder="Search cleaning, AC repair, gardening, plumber..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={styles.searchInput}
              />
            </div>
            <div style={styles.categoryWrap}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    ...styles.categoryBtn,
                    ...(selectedCategory === cat ? styles.activeCategoryBtn : {}),
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.headingRow}>
            <div>
              <h2 style={styles.sectionTitle}>Available Services</h2>
              <p style={styles.sectionSub}>{filteredServices.length} services found for your search</p>
            </div>
            <button style={styles.resetBtn} onClick={() => { setSearch(""); setSelectedCategory("All"); }}>
              Reset
            </button>
          </div>

          <section style={styles.servicesGrid}>
            {loading ? (
              <p style={{ color: "#8d83a7" }}>Loading services...</p>
            ) : filteredServices.length === 0 ? (
              <p style={{ color: "#8d83a7" }}>No services found.</p>
            ) : (
              filteredServices.map((service, index) => (
                <div key={service.id} style={{ ...styles.serviceCard, background: getBg(index) }}>
                  <div style={styles.cardTop}>
                    <div style={styles.iconWrap}>🛠️</div>
                    <div style={styles.ratingBadge}>
                      ⭐ {service.creditRate ? `${service.creditRate} cr` : `₹${service.cashRate}`}
                    </div>
                  </div>

                  <h3 style={styles.serviceTitle}>{service.title}</h3>
                  <p style={styles.providerText}>by {service.provider?.name || "Provider"}</p>

                  <div style={styles.metaWrap}>
                    {service.category && <span style={styles.metaPill}>{service.category}</span>}
                    {service.tags?.slice(0, 2).map((tag, i) => (
                      <span key={i} style={styles.metaPill}>{tag}</span>
                    ))}
                  </div>

                  <p style={styles.serviceDesc}>{service.description}</p>

                  <div style={styles.cardFooter}>
                    <div>
                      <p style={styles.priceLabel}>Price</p>
                      <h4 style={styles.priceValue}>
                        {service.cashRate ? `₹${service.cashRate}` : ""}
                        {service.cashRate && service.creditRate ? " / " : ""}
                        {service.creditRate ? `${service.creditRate} credits` : ""}
                      </h4>
                    </div>

                    {/* View Profile + Book Now */}
                    <div style={styles.btnGroup}>
                      {service.provider?.id && (
                        <button
                          style={styles.profileBtn}
                          onClick={() => navigate(`/provider/${service.provider.id}/profile`)}
                        >
                          View Profile
                        </button>
                      )}
                      <button style={styles.bookBtn} onClick={() => handleBookNow(service)}>
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

const styles = {
  page: { minHeight: "100vh", background: "linear-gradient(135deg, #faf7ff 0%, #f4efff 48%, #fdf4fb 78%, #eef5ff 100%)", fontFamily: "'Poppins', 'Segoe UI', sans-serif", position: "relative", overflowX: "hidden", padding: "18px" },
  blob1: { position: "absolute", top: "-80px", right: "-70px", width: "260px", height: "260px", borderRadius: "50%", background: "rgba(181,145,255,0.16)", filter: "blur(85px)" },
  blob2: { position: "absolute", bottom: "60px", left: "-70px", width: "240px", height: "240px", borderRadius: "50%", background: "rgba(255,190,225,0.14)", filter: "blur(80px)" },
  blob3: { position: "absolute", top: "300px", left: "48%", width: "190px", height: "190px", borderRadius: "50%", background: "rgba(140,190,255,0.12)", filter: "blur(85px)" },
  container: { position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "260px minmax(0, 1fr)", gap: "20px", maxWidth: "1800px", margin: "0 auto", alignItems: "start" },
  sidebar: { position: "sticky", top: "18px", height: "calc(100vh - 36px)", background: "rgba(255,255,255,0.62)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.78)", borderRadius: "28px", padding: "18px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 16px 38px rgba(122, 95, 188, 0.08)", overflowY: "auto" },
  brandCard: { display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" },
  logoIcon: { width: "62px", height: "62px", borderRadius: "20px", background: "linear-gradient(135deg, #8f6bff 0%, #c79cff 100%)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", fontWeight: "800", flexShrink: 0 },
  logoText: { margin: 0, fontSize: "28px", fontWeight: "800", color: "#7d4cff", lineHeight: 1.1 },
  logoSub: { margin: "6px 0 0 0", color: "#9b8bb5", fontSize: "13px" },
  userCard: { display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "22px", background: "linear-gradient(135deg, #f7edff 0%, #fdebf5 100%)", marginBottom: "18px", border: "1px solid rgba(230, 213, 248, 0.9)" },
  userAvatar: { width: "52px", height: "52px", borderRadius: "16px", background: "linear-gradient(135deg, #8f6bff 0%, #c79cff 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "800", fontSize: "18px", overflow: "hidden", flexShrink: 0 },
  userAvatarImg: { width: "100%", height: "100%", objectFit: "cover" },
  userInfo: { minWidth: 0 },
  userName: { margin: 0, fontSize: "16px", color: "#3f2d5c", fontWeight: "700", lineHeight: 1.2 },
  userEmail: { margin: "5px 0 0 0", fontSize: "12px", color: "#8d7da9", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  nav: { display: "flex", flexDirection: "column", gap: "10px" },
  navItem: { textDecoration: "none", color: "#5e517d", fontSize: "14px", fontWeight: "600", padding: "13px 14px", borderRadius: "18px", background: "rgba(255,255,255,0.78)", border: "1px solid rgba(225,214,245,0.9)", display: "flex", alignItems: "center", gap: "10px" },
  activeNavItem: { color: "#7b4cff", background: "linear-gradient(135deg, #efe4ff 0%, #e7d8ff 100%)", boxShadow: "0 10px 22px rgba(143,107,255,0.12)" },
  navIcon: { fontSize: "16px", width: "20px", textAlign: "center", flexShrink: 0 },
  logoutBtn: { border: "none", background: "linear-gradient(135deg, #ff98bf 0%, #ffb4cf 100%)", color: "#fff", borderRadius: "16px", padding: "14px 16px", fontWeight: "700", cursor: "pointer", marginTop: "12px" },
  main: { minWidth: 0, width: "100%" },
  navbar: { background: "rgba(255,255,255,0.68)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.82)", borderRadius: "28px", padding: "24px 26px", boxShadow: "0 16px 35px rgba(124,96,190,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "18px", flexWrap: "wrap", marginBottom: "18px" },
  navbarSub: { margin: 0, color: "#988db1", fontSize: "14px", fontWeight: "600" },
  navbarTitle: { margin: "8px 0 0 0", color: "#181638", fontSize: "34px", lineHeight: "1.12", fontWeight: "900" },
  navbarChips: { display: "flex", gap: "10px", flexWrap: "wrap" },
  chip: { padding: "12px 16px", borderRadius: "999px", background: "linear-gradient(135deg, #f2e9ff 0%, #ffeaf4 100%)", color: "#6a4a99", fontWeight: "700", fontSize: "14px", border: "1px solid rgba(220,205,246,0.8)" },
  searchPanel: { background: "rgba(255,255,255,0.68)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.82)", borderRadius: "26px", padding: "18px", boxShadow: "0 16px 35px rgba(124,96,190,0.08)", marginBottom: "18px" },
  searchBox: { display: "flex", alignItems: "center", gap: "12px", background: "#fff", border: "1px solid #e7dcfb", borderRadius: "18px", padding: "14px 16px", marginBottom: "16px" },
  searchIcon: { fontSize: "18px", flexShrink: 0 },
  searchInput: { border: "none", outline: "none", width: "100%", fontSize: "15px", color: "#3a2f52", background: "transparent", fontFamily: "'Poppins', 'Segoe UI', sans-serif" },
  categoryWrap: { display: "flex", gap: "10px", flexWrap: "wrap" },
  categoryBtn: { border: "1px solid #e0d2f8", background: "#fff", color: "#654b8d", borderRadius: "999px", padding: "10px 16px", fontWeight: "700", cursor: "pointer", fontSize: "13px" },
  activeCategoryBtn: { background: "linear-gradient(135deg, #8f6bff 0%, #b58cff 100%)", color: "#fff", border: "1px solid transparent" },
  headingRow: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap", marginBottom: "16px" },
  sectionTitle: { margin: 0, fontSize: "28px", color: "#181638", fontWeight: "900" },
  sectionSub: { margin: "6px 0 0 0", color: "#8d83a7", fontSize: "14px" },
  resetBtn: { border: "1px solid #dccdf6", background: "#fff", color: "#5f4288", borderRadius: "14px", padding: "12px 16px", fontWeight: "700", cursor: "pointer" },
  servicesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", width: "100%" },
  serviceCard: { borderRadius: "28px", padding: "22px", border: "1px solid rgba(255,255,255,0.82)", boxShadow: "0 18px 32px rgba(124,96,190,0.08)", minHeight: "345px", display: "flex", flexDirection: "column" },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" },
  iconWrap: { width: "58px", height: "58px", borderRadius: "18px", background: "rgba(255,255,255,0.8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" },
  ratingBadge: { padding: "8px 12px", borderRadius: "999px", background: "rgba(255,255,255,0.86)", color: "#554379", fontWeight: "700", fontSize: "13px" },
  serviceTitle: { margin: 0, fontSize: "22px", color: "#1b1838", fontWeight: "800", lineHeight: "1.25" },
  providerText: { margin: "8px 0 0 0", color: "#746a90", fontSize: "14px" },
  metaWrap: { display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "14px" },
  metaPill: { padding: "8px 12px", borderRadius: "999px", background: "rgba(255,255,255,0.8)", color: "#654b8d", fontSize: "12px", fontWeight: "700" },
  serviceDesc: { margin: "16px 0 0 0", fontSize: "14px", lineHeight: "1.8", color: "#626b85", flex: 1 },
  cardFooter: { marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "12px", flexWrap: "wrap" },
  priceLabel: { margin: 0, fontSize: "12px", color: "#8d83a7", fontWeight: "600" },
  priceValue: { margin: "6px 0 0 0", fontSize: "18px", color: "#221e43", fontWeight: "800" },
  btnGroup: { display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" },
  profileBtn: { border: "1px solid #dccdf6", background: "rgba(255,255,255,0.9)", color: "#7b4cff", borderRadius: "14px", padding: "11px 16px", fontWeight: "700", cursor: "pointer", fontSize: "13px" },
  bookBtn: { border: "none", background: "linear-gradient(135deg, #8f6bff 0%, #b58cff 100%)", color: "#fff", borderRadius: "16px", padding: "13px 18px", fontWeight: "700", cursor: "pointer", boxShadow: "0 12px 22px rgba(143,107,255,0.18)", fontSize: "13px" },
};

export default Services;

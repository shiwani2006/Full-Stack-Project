import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

const Bookings = () => {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user")) || {
    name: "User",
    email: "user@example.com",
    role: "user",
    profileImage: "",
    creditBalance: 0,
  };

  const initial = currentUser?.name?.charAt(0)?.toUpperCase() || "U";

  const [statusFilter, setStatusFilter] = useState("All");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get("/bookings/my")
      .then((res) => setBookings(res.data.bookings || []))
      .catch((err) => console.error("Failed to fetch bookings", err))
      .finally(() => setLoading(false));
  }, []);

  const getStatusLabel = (status) => {
    if (status === "pending") return "Pending";
    if (status === "confirmed") return "Upcoming";
    if (status === "completed") return "Completed";
    if (status === "cancelled") return "Cancelled";
    return status;
  };

  const getStatusStyle = (status) => {
    if (status === "confirmed") return { background: "#efe4ff", color: "#7c4dff" };
    if (status === "pending") return { background: "#fff1d8", color: "#bf7a00" };
    if (status === "completed") return { background: "#e3f6ea", color: "#1f8a4d" };
    return { background: "#ffe5e5", color: "#d00000" };
  };

  const getBg = (status) => {
    if (status === "confirmed") return "linear-gradient(135deg, #efe5ff 0%, #e8dcff 100%)";
    if (status === "pending") return "linear-gradient(135deg, #fff1d9 0%, #fde9bf 100%)";
    if (status === "completed") return "linear-gradient(135deg, #e8fff4 0%, #def5ea 100%)";
    return "linear-gradient(135deg, #ffe5e5 0%, #ffd9d9 100%)";
  };

  const filteredBookings = useMemo(() => {
    if (statusFilter === "All") return bookings;
    return bookings.filter((b) => getStatusLabel(b.status) === statusFilter);
  }, [statusFilter, bookings]);

  const countUpcoming = bookings.filter((b) => b.status === "confirmed").length;
  const countPending = bookings.filter((b) => b.status === "pending").length;
  const countCompleted = bookings.filter((b) => b.status === "completed").length;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handlePayNow = async (booking) => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      // Create Razorpay order
      const orderRes = await axiosInstance.post("/payments/create-order", {
        amount: booking.cashAmount,
      });

      const { orderId, amount, currency } = orderRes.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: "SkillSwap",
        description: `Payment for ${booking.service?.title || "Service"}`,
        order_id: orderId,
        handler: async (response) => {
          try {
            await axiosInstance.post("/payments/verify", {
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              userId: user.id,
              amount: booking.cashAmount,
              bookingId: booking.id,
            });
            // Refresh bookings after payment
            const res = await axiosInstance.get("/bookings/my");
            setBookings(res.data.bookings || []);
          } catch (err) {
            console.error("Payment verification failed", err);
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },
        theme: {
          color: "#8D6FE8",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Payment failed", err);
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
              <Link to="/user/services" style={styles.navItem}>
                <span style={styles.navIcon}>🛍️</span>Browse Services
              </Link>
              <Link to="/user/bookings" style={{ ...styles.navItem, ...styles.activeNavItem }}>
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
              <p style={styles.navbarSub}>Track and manage your service schedule</p>
              <h1 style={styles.navbarTitle}>My Bookings</h1>
            </div>
            <div style={styles.navbarRight}>
              <button style={styles.topBtn} onClick={() => navigate("/user/dashboard")}>
                Dashboard
              </button>
              <button style={styles.topBtn} onClick={() => navigate("/user/profile")}>
                Profile
              </button>
            </div>
          </div>

          <section style={styles.summaryGrid}>
            <div style={{ ...styles.summaryCard, background: "linear-gradient(135deg, #efe5ff 0%, #e8dcff 100%)" }}>
              <div style={styles.summaryIcon}>📅</div>
              <p style={styles.summaryLabel}>Upcoming</p>
              <h3 style={styles.summaryValue}>{countUpcoming}</h3>
            </div>
            <div style={{ ...styles.summaryCard, background: "linear-gradient(135deg, #fff1d9 0%, #fde9bf 100%)" }}>
              <div style={styles.summaryIcon}>⏳</div>
              <p style={styles.summaryLabel}>Pending</p>
              <h3 style={styles.summaryValue}>{countPending}</h3>
            </div>
            <div style={{ ...styles.summaryCard, background: "linear-gradient(135deg, #e8fff4 0%, #def5ea 100%)" }}>
              <div style={styles.summaryIcon}>✅</div>
              <p style={styles.summaryLabel}>Completed</p>
              <h3 style={styles.summaryValue}>{countCompleted}</h3>
            </div>
          </section>

          <section style={styles.filterPanel}>
            <div>
              <h2 style={styles.sectionTitle}>Booking History</h2>
              <p style={styles.sectionSub}>Your booked services in a clean layout</p>
            </div>
            <div style={styles.filterBtns}>
              {["All", "Upcoming", "Pending", "Completed"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  style={{
                    ...styles.filterBtn,
                    ...(statusFilter === status ? styles.activeFilterBtn : {}),
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          </section>

          <section style={styles.bookingsList}>
            {loading ? (
              <p style={{ color: "#8d83a7", textAlign: "center" }}>Loading bookings...</p>
            ) : filteredBookings.length === 0 ? (
              <p style={{ color: "#8d83a7", textAlign: "center" }}>No bookings found.</p>
            ) : (
              filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  style={{ ...styles.bookingRowCard, background: getBg(booking.status) }}
                >
                  {/* Service Box */}
                  <div style={styles.serviceBox}>
                    <div style={styles.bookingIconWrap}>📋</div>
                    <div style={styles.serviceTextWrap}>
                      <h3 style={styles.bookingTitle}>
                        {booking.service?.title || "Service"}
                      </h3>
                      <p style={styles.bookingProvider}>
                        Provider: {booking.provider?.name || "Unknown"}
                      </p>
                    </div>
                  </div>

                  {/* Schedule Box */}
                  <div style={styles.subBox}>
                    <p style={styles.subBoxLabel}>Schedule</p>
                    <div style={styles.subPillWrap}>
                      <span style={styles.metaPill}>
                        {booking.scheduledAt
                          ? new Date(booking.scheduledAt).toLocaleDateString()
                          : new Date(booking.createdAt).toLocaleDateString()}
                      </span>
                      <span style={styles.metaPill}>{booking.paymentMethod}</span>
                    </div>
                  </div>

                  {/* Status Box */}
                  <div style={styles.subBoxSmall}>
                    <p style={styles.subBoxLabel}>Status</p>
                    <div style={{ ...styles.statusBadge, ...getStatusStyle(booking.status) }}>
                      {getStatusLabel(booking.status)}
                    </div>
                  </div>

                  {/* Cost Box */}
                  <div style={styles.subBoxSmall}>
                    <p style={styles.subBoxLabel}>Cost</p>
                    <h4 style={styles.costValue}>
                      {booking.paymentMethod === "credits"
                        ? `${booking.creditAmount} Credits`
                        : booking.paymentMethod === "hybrid"
                        ? `₹${booking.cashAmount} + ${booking.creditAmount} Cr`
                        : `₹${booking.cashAmount}`}
                    </h4>
                  </div>

                  {/* Action Box */}
                  <div style={styles.actionBox}>
                    <button style={styles.viewBtn}>View</button>

                    {/* Show Pay Now only for completed cash bookings */}
                    {booking.status === "completed" &&
                      booking.paymentMethod === "cash" && (
                        <button
                          style={styles.payBtn}
                          onClick={() => handlePayNow(booking)}
                        >
                          Pay Now 💳
                        </button>
                      )}

                    {/* Show Chat for non-completed bookings */}
                    {booking.status !== "completed" && (
                      <button
                        style={styles.chatBtn}
                        onClick={() => navigate("/user/chat")}
                      >
                        Chat
                      </button>
                    )}
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
  sidebar: { position: "sticky", top: "18px", height: "calc(100vh - 36px)", background: "rgba(255,255,255,0.62)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.78)", borderRadius: "28px", padding: "18px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 16px 38px rgba(122, 95, 188, 0.08)" },
  brandCard: { display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" },
  logoIcon: { width: "62px", height: "62px", borderRadius: "20px", background: "linear-gradient(135deg, #8f6bff 0%, #c79cff 100%)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", fontWeight: "800", boxShadow: "0 14px 28px rgba(143,107,255,0.22)", flexShrink: 0 },
  logoText: { margin: 0, fontSize: "28px", fontWeight: "800", color: "#7d4cff", lineHeight: 1.1 },
  logoSub: { margin: "6px 0 0 0", color: "#9b8bb5", fontSize: "13px" },
  userCard: { display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "22px", background: "linear-gradient(135deg, #f7edff 0%, #fdebf5 100%)", marginBottom: "18px", border: "1px solid rgba(230, 213, 248, 0.9)" },
  userAvatar: { width: "52px", height: "52px", borderRadius: "16px", background: "linear-gradient(135deg, #8f6bff 0%, #c79cff 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "800", fontSize: "18px", overflow: "hidden", flexShrink: 0 },
  userAvatarImg: { width: "100%", height: "100%", objectFit: "cover" },
  userInfo: { minWidth: 0 },
  userName: { margin: 0, fontSize: "16px", color: "#3f2d5c", fontWeight: "700", lineHeight: 1.2 },
  userEmail: { margin: "5px 0 0 0", fontSize: "12px", color: "#8d7da9", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  nav: { display: "flex", flexDirection: "column", gap: "12px" },
  navItem: { textDecoration: "none", color: "#5e517d", fontSize: "16px", fontWeight: "600", padding: "16px 16px", borderRadius: "18px", background: "rgba(255,255,255,0.78)", border: "1px solid rgba(225,214,245,0.9)", display: "flex", alignItems: "center", gap: "12px" },
  activeNavItem: { color: "#7b4cff", background: "linear-gradient(135deg, #efe4ff 0%, #e7d8ff 100%)", boxShadow: "0 10px 22px rgba(143,107,255,0.12)" },
  navIcon: { fontSize: "18px", width: "22px", textAlign: "center", flexShrink: 0 },
  logoutBtn: { border: "none", background: "linear-gradient(135deg, #ff98bf 0%, #ffb4cf 100%)", color: "#fff", borderRadius: "16px", padding: "14px 16px", fontWeight: "700", cursor: "pointer", boxShadow: "0 12px 22px rgba(255,146,187,0.16)" },
  main: { minWidth: 0, width: "100%" },
  navbar: { background: "rgba(255,255,255,0.68)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.82)", borderRadius: "28px", padding: "24px 26px", boxShadow: "0 16px 35px rgba(124,96,190,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "18px", flexWrap: "wrap", marginBottom: "18px" },
  navbarSub: { margin: 0, color: "#988db1", fontSize: "14px", fontWeight: "600" },
  navbarTitle: { margin: "8px 0 0 0", color: "#181638", fontSize: "34px", lineHeight: "1.12", fontWeight: "900" },
  navbarRight: { display: "flex", gap: "10px", flexWrap: "wrap" },
  topBtn: { border: "1px solid #dccdf6", background: "#fff", color: "#5f4288", borderRadius: "14px", padding: "12px 16px", fontWeight: "700", cursor: "pointer" },
  summaryGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "18px", marginBottom: "18px" },
  summaryCard: { borderRadius: "28px", padding: "22px", border: "1px solid rgba(255,255,255,0.82)", boxShadow: "0 16px 32px rgba(124,96,190,0.08)", minHeight: "150px" },
  summaryIcon: { width: "58px", height: "58px", borderRadius: "18px", background: "rgba(255,255,255,0.8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", marginBottom: "16px" },
  summaryLabel: { margin: 0, fontSize: "15px", color: "#7b6c98", fontWeight: "600" },
  summaryValue: { margin: "10px 0 0 0", fontSize: "40px", color: "#1d1a3f", fontWeight: "900", lineHeight: 1 },
  filterPanel: { background: "rgba(255,255,255,0.68)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.82)", borderRadius: "26px", padding: "20px 22px", boxShadow: "0 16px 35px rgba(124,96,190,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap", marginBottom: "18px" },
  sectionTitle: { margin: 0, fontSize: "28px", color: "#181638", fontWeight: "900" },
  sectionSub: { margin: "6px 0 0 0", color: "#8d83a7", fontSize: "14px" },
  filterBtns: { display: "flex", gap: "10px", flexWrap: "wrap" },
  filterBtn: { border: "1px solid #e0d2f8", background: "#fff", color: "#654b8d", borderRadius: "999px", padding: "10px 16px", fontWeight: "700", cursor: "pointer" },
  activeFilterBtn: { background: "linear-gradient(135deg, #8f6bff 0%, #b58cff 100%)", color: "#fff", border: "1px solid transparent" },
  bookingsList: { display: "grid", gap: "18px" },
  bookingRowCard: { borderRadius: "28px", padding: "18px", border: "1px solid rgba(255,255,255,0.82)", boxShadow: "0 16px 32px rgba(124,96,190,0.08)", display: "grid", gridTemplateColumns: "1.4fr 1.25fr 0.7fr 0.7fr 0.9fr", gap: "14px", alignItems: "stretch" },
  serviceBox: { background: "rgba(255,255,255,0.38)", borderRadius: "22px", padding: "16px", display: "flex", alignItems: "center", gap: "14px" },
  bookingIconWrap: { width: "58px", height: "58px", borderRadius: "18px", background: "rgba(255,255,255,0.82)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", flexShrink: 0 },
  serviceTextWrap: { minWidth: 0 },
  bookingTitle: { margin: 0, fontSize: "22px", color: "#1b1838", fontWeight: "800", lineHeight: "1.2" },
  bookingProvider: { margin: "8px 0 0 0", color: "#746a90", fontSize: "14px" },
  subBox: { background: "rgba(255,255,255,0.38)", borderRadius: "22px", padding: "16px", display: "flex", flexDirection: "column", justifyContent: "center" },
  subBoxSmall: { background: "rgba(255,255,255,0.38)", borderRadius: "22px", padding: "16px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" },
  subBoxLabel: { margin: 0, fontSize: "12px", color: "#8c81a6", fontWeight: "600", marginBottom: "10px" },
  subPillWrap: { display: "flex", gap: "10px", flexWrap: "wrap" },
  metaPill: { padding: "8px 12px", borderRadius: "999px", background: "rgba(255,255,255,0.82)", color: "#654b8d", fontSize: "12px", fontWeight: "700" },
  statusBadge: { padding: "10px 14px", borderRadius: "999px", fontWeight: "800", fontSize: "13px" },
  costValue: { margin: 0, fontSize: "20px", color: "#221e43", fontWeight: "800" },
  actionBox: { background: "rgba(255,255,255,0.38)", borderRadius: "22px", padding: "16px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", flexWrap: "wrap" },
  viewBtn: { border: "1px solid #dccdf6", background: "#fff", color: "#5f4288", borderRadius: "14px", padding: "12px 16px", fontWeight: "700", cursor: "pointer" },
  chatBtn: { border: "none", background: "linear-gradient(135deg, #8f6bff 0%, #b58cff 100%)", color: "#fff", borderRadius: "14px", padding: "12px 16px", fontWeight: "700", cursor: "pointer", boxShadow: "0 12px 22px rgba(143,107,255,0.18)" },
  payBtn: { border: "none", background: "linear-gradient(135deg, #00b09b 0%, #96c93d 100%)", color: "#fff", borderRadius: "14px", padding: "12px 16px", fontWeight: "700", cursor: "pointer", boxShadow: "0 12px 22px rgba(0,176,155,0.25)" },
};

export default Bookings;
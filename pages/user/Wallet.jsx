import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

const Wallet = () => {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user")) || {
    name: "User",
    email: "user@example.com",
    role: "user",
    profileImage: "",
    creditBalance: 0,
  };

  const initial = currentUser?.name?.charAt(0)?.toUpperCase() || "U";

  const [wallet, setWallet] = useState({ creditBalance: 0, cashBalance: 0, trustScore: 100 });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const [walletRes, txRes] = await Promise.all([
          axiosInstance.get("/wallet"),
          axiosInstance.get("/wallet/transactions"),
        ]);
        setWallet(walletRes.data);
        setTransactions(txRes.data.transactions || []);
      } catch (err) {
        console.error("Failed to fetch wallet", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWallet();
  }, []);

  const spentCredits = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const earnedCredits = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const getBg = (index) => {
    const bgs = [
      "linear-gradient(135deg, #efe5ff 0%, #e8dcff 100%)",
      "linear-gradient(135deg, #e8fff4 0%, #def5ea 100%)",
      "linear-gradient(135deg, #e7f3ff 0%, #dcecff 100%)",
      "linear-gradient(135deg, #fff1d9 0%, #fde9bf 100%)",
      "linear-gradient(135deg, #ffe6f3 0%, #ffd9eb 100%)",
    ];
    return bgs[index % bgs.length];
  };

  const getTypeStyle = (amount) => {
    if (amount > 0) return { background: "#e3f6ea", color: "#1f8a4d" };
    return { background: "#ffe7ef", color: "#d14d72" };
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
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
              <Link to="/user/bookings" style={styles.navItem}>
                <span style={styles.navIcon}>📅</span>Bookings
              </Link>
              <Link to="/user/wallet" style={{ ...styles.navItem, ...styles.activeNavItem }}>
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
              <p style={styles.navbarSub}>Track your credits and payments</p>
              <h1 style={styles.navbarTitle}>My Wallet</h1>
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

          <section style={styles.walletTopGrid}>
            <div style={styles.balanceCard}>
              <p style={styles.balanceLabel}>Available Balance</p>
              <h2 style={styles.balanceValue}>
                {loading ? "..." : `${wallet.creditBalance} Credits`}
              </h2>
              {wallet.cashBalance > 0 && (
                <p style={{ ...styles.balanceSub, marginTop: "6px" }}>
                  + ₹{wallet.cashBalance} cash balance
                </p>
              )}
              <p style={styles.balanceSub}>
                Use your credits to book trusted home services nearby.
              </p>
              <div style={styles.balanceActions}>
                <button style={styles.primaryBtn}>Add Credits</button>
                <button style={styles.secondaryBtn}>Transaction Rules</button>
              </div>
            </div>

            <div style={styles.summaryGrid}>
              <div style={{ ...styles.summaryCard, background: "linear-gradient(135deg, #efe5ff 0%, #e8dcff 100%)" }}>
                <div style={styles.summaryIcon}>💜</div>
                <p style={styles.summaryLabel}>Current Credits</p>
                <h3 style={styles.summaryValue}>{loading ? "..." : wallet.creditBalance}</h3>
              </div>
              <div style={{ ...styles.summaryCard, background: "linear-gradient(135deg, #ffe6f3 0%, #ffd9eb 100%)" }}>
                <div style={styles.summaryIcon}>📤</div>
                <p style={styles.summaryLabel}>Spent</p>
                <h3 style={styles.summaryValue}>{loading ? "..." : spentCredits}</h3>
              </div>
              <div style={{ ...styles.summaryCard, background: "linear-gradient(135deg, #e8fff4 0%, #def5ea 100%)" }}>
                <div style={styles.summaryIcon}>📥</div>
                <p style={styles.summaryLabel}>Earned</p>
                <h3 style={styles.summaryValue}>{loading ? "..." : earnedCredits}</h3>
              </div>
            </div>
          </section>

          <section style={styles.historyPanel}>
            <div style={styles.historyHeader}>
              <div>
                <h2 style={styles.sectionTitle}>Transaction History</h2>
                <p style={styles.sectionSub}>
                  All your credit usage, earnings, and refunds in one place
                </p>
              </div>
              <button style={styles.filterBtn}>Recent First</button>
            </div>

            <div style={styles.transactionsList}>
              {loading ? (
                <p style={{ color: "#8d83a7", textAlign: "center" }}>Loading transactions...</p>
              ) : transactions.length === 0 ? (
                <p style={{ color: "#8d83a7", textAlign: "center" }}>No transactions yet.</p>
              ) : (
                transactions.map((item, index) => (
                  <div
                    key={item.id}
                    style={{ ...styles.transactionRow, background: getBg(index) }}
                  >
                    <div style={styles.transactionServiceBox}>
                      <div style={styles.transactionIcon}>
                        {item.amount > 0 ? "📥" : "📤"}
                      </div>
                      <div>
                        <h3 style={styles.transactionTitle}>{item.type}</h3>
                        <p style={styles.transactionProvider}>
                          Booking: {item.bookingId ? item.bookingId.slice(0, 8) + "..." : "N/A"}
                        </p>
                      </div>
                    </div>

                    <div style={styles.subBox}>
                      <p style={styles.subBoxLabel}>Date</p>
                      <div style={styles.metaPill}>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div style={styles.subBoxSmall}>
                      <p style={styles.subBoxLabel}>Type</p>
                      <div style={{ ...styles.typeBadge, ...getTypeStyle(item.amount) }}>
                        {item.amount > 0 ? "Credit" : "Debit"}
                      </div>
                    </div>

                    <div style={styles.subBoxSmall}>
                      <p style={styles.subBoxLabel}>Amount</p>
                      <h4 style={{
                        ...styles.amountValue,
                        color: item.amount > 0 ? "#1f8a4d" : "#d14d72"
                      }}>
                        {item.amount > 0 ? "+" : ""}{item.amount} Credits
                      </h4>
                    </div>

                    <div style={styles.subBoxSmall}>
                      <p style={styles.subBoxLabel}>Status</p>
                      <div style={styles.metaPill}>{item.type}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
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
  walletTopGrid: { display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "18px", marginBottom: "18px" },
  balanceCard: { background: "linear-gradient(135deg, #f7edff 0%, #fcecf5 100%)", border: "1px solid rgba(255,255,255,0.82)", borderRadius: "28px", padding: "24px", boxShadow: "0 16px 32px rgba(124,96,190,0.08)" },
  balanceLabel: { margin: 0, fontSize: "15px", color: "#8a7ca6", fontWeight: "600" },
  balanceValue: { margin: "10px 0 0 0", fontSize: "42px", color: "#1d1a3f", fontWeight: "900", lineHeight: 1.1 },
  balanceSub: { margin: "12px 0 0 0", fontSize: "15px", color: "#72688f", lineHeight: "1.8", maxWidth: "520px" },
  balanceActions: { display: "flex", gap: "12px", marginTop: "22px", flexWrap: "wrap" },
  primaryBtn: { border: "none", background: "linear-gradient(135deg, #8f6bff 0%, #b58cff 100%)", color: "#fff", borderRadius: "16px", padding: "13px 18px", fontWeight: "700", cursor: "pointer", boxShadow: "0 12px 22px rgba(143,107,255,0.18)" },
  secondaryBtn: { border: "1px solid #dccdf6", background: "#fff", color: "#5f4288", borderRadius: "16px", padding: "13px 18px", fontWeight: "700", cursor: "pointer" },
  summaryGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" },
  summaryCard: { borderRadius: "24px", padding: "20px", border: "1px solid rgba(255,255,255,0.82)", boxShadow: "0 16px 32px rgba(124,96,190,0.08)", minHeight: "160px" },
  summaryIcon: { width: "56px", height: "56px", borderRadius: "18px", background: "rgba(255,255,255,0.8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", marginBottom: "14px" },
  summaryLabel: { margin: 0, fontSize: "14px", color: "#7b6c98", fontWeight: "600" },
  summaryValue: { margin: "10px 0 0 0", fontSize: "34px", color: "#1d1a3f", fontWeight: "900", lineHeight: 1 },
  historyPanel: { background: "rgba(255,255,255,0.68)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.82)", borderRadius: "26px", padding: "20px 22px", boxShadow: "0 16px 35px rgba(124,96,190,0.08)" },
  historyHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap", marginBottom: "18px" },
  sectionTitle: { margin: 0, fontSize: "28px", color: "#181638", fontWeight: "900" },
  sectionSub: { margin: "6px 0 0 0", color: "#8d83a7", fontSize: "14px" },
  filterBtn: { border: "1px solid #dccdf6", background: "#fff", color: "#5f4288", borderRadius: "14px", padding: "12px 16px", fontWeight: "700", cursor: "pointer" },
  transactionsList: { display: "grid", gap: "18px" },
  transactionRow: { borderRadius: "24px", padding: "18px", border: "1px solid rgba(255,255,255,0.82)", boxShadow: "0 16px 32px rgba(124,96,190,0.08)", display: "grid", gridTemplateColumns: "1.3fr 0.8fr 0.7fr 0.7fr 0.7fr", gap: "14px", alignItems: "stretch" },
  transactionServiceBox: { background: "rgba(255,255,255,0.38)", borderRadius: "22px", padding: "16px", display: "flex", alignItems: "center", gap: "14px" },
  transactionIcon: { width: "58px", height: "58px", borderRadius: "18px", background: "rgba(255,255,255,0.82)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", flexShrink: 0 },
  transactionTitle: { margin: 0, fontSize: "20px", color: "#1b1838", fontWeight: "800", lineHeight: "1.2" },
  transactionProvider: { margin: "8px 0 0 0", color: "#746a90", fontSize: "14px" },
  subBox: { background: "rgba(255,255,255,0.38)", borderRadius: "22px", padding: "16px", display: "flex", flexDirection: "column", justifyContent: "center" },
  subBoxSmall: { background: "rgba(255,255,255,0.38)", borderRadius: "22px", padding: "16px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" },
  subBoxLabel: { margin: 0, fontSize: "12px", color: "#8c81a6", fontWeight: "600", marginBottom: "10px" },
  metaPill: { padding: "8px 12px", borderRadius: "999px", background: "rgba(255,255,255,0.82)", color: "#654b8d", fontSize: "12px", fontWeight: "700", display: "inline-flex", alignItems: "center" },
  typeBadge: { padding: "10px 14px", borderRadius: "999px", fontWeight: "800", fontSize: "13px" },
  amountValue: { margin: 0, fontSize: "20px", fontWeight: "800" },
};

export default Wallet;
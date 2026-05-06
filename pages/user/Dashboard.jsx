import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const profileMenuRef = useRef(null);
  const notificationRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem("user")) || {
    name: "User",
    email: "user@example.com",
    role: "user",
    profileImage: "",
    creditBalance: 0,
  };

  const userName = currentUser?.name || "User";
  const userEmail = currentUser?.email || "user@gmail.com";
  const userRole = currentUser?.role || "User";
  const userImage = currentUser?.profileImage || "";
  const initial = userName?.charAt(0)?.toUpperCase() || "U";

  const [notifications, setNotifications] = useState([
    { id: 1, text: "Your AC repair booking was confirmed.", time: "2 min ago", unread: true },
    { id: 2, text: "Riya replied to your home cleaning request.", time: "12 min ago", unread: true },
    { id: 3, text: "2 credits were added to your wallet.", time: "1 hour ago", unread: true },
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map((item) => ({ ...item, unread: false })));
  };

  const handleNotificationClick = () => {
    setShowNotifications((prev) => !prev);
    setShowProfileMenu(false);
  };

  const handleProfileMenuClick = () => {
    setShowProfileMenu((prev) => !prev);
    setShowNotifications(false);
  };

  const stats = [
    { title: "Available Credits", value: currentUser?.creditBalance || 0, subtitle: "Use them to book services", icon: "⏱️", bg: "linear-gradient(135deg, #efe5ff 0%, #e7d8ff 100%)" },
    { title: "Active Bookings", value: 5, subtitle: "Current scheduled services", icon: "📋", bg: "linear-gradient(135deg, #e7f3ff 0%, #dcecff 100%)" },
    { title: "Unread Chats", value: 3, subtitle: "New provider replies", icon: "💬", bg: "linear-gradient(135deg, #ffe8f3 0%, #f8ddea 100%)" },
    { title: "Saved Services", value: 8, subtitle: "Your favourite listings", icon: "💖", bg: "linear-gradient(135deg, #fff1d9 0%, #fde9be 100%)" },
  ];

  const bookings = [
    { service: "Home Cleaning", provider: "Riya", date: "24 Apr", status: "Upcoming" },
    { service: "AC Repair", provider: "Rahul", date: "25 Apr", status: "Pending" },
    { service: "Gardening Help", provider: "Karan", date: "26 Apr", status: "Confirmed" },
  ];

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
      <div style={styles.blob4}></div>

      <div style={styles.layout}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <div>
            <div style={styles.logoWrap}>
              <div style={styles.logoIcon}>S</div>
              <div>
                <h2 style={styles.logoText}>SkillSwap</h2>
                <p style={styles.logoSub}>time as value</p>
              </div>
            </div>

            <div style={styles.userMiniCard}>
              <div style={styles.userMiniAvatar}>
                {userImage ? (
                  <img src={userImage} alt="User" style={styles.userMiniAvatarImg} />
                ) : (initial)}
              </div>
              <div style={styles.userMiniInfo}>
                <h4 style={styles.userMiniName}>{userName}</h4>
                <p style={styles.userMiniRole}>{userRole} Account</p>
              </div>
            </div>

            <nav style={styles.nav}>
              <Link to="/user/dashboard" style={{ ...styles.navItem, ...styles.activeNav }}>
                <span style={styles.navEmoji}>🏠</span>Dashboard
              </Link>
              <Link to="/user/profile" style={styles.navItem}>
                <span style={styles.navEmoji}>👤</span>Profile
              </Link>
              <Link to="/user/services" style={styles.navItem}>
                <span style={styles.navEmoji}>🛍️</span>Browse Services
              </Link>
              <Link to="/user/bookings" style={styles.navItem}>
                <span style={styles.navEmoji}>🗓️</span>Bookings
              </Link>
              <Link to="/user/wallet" style={styles.navItem}>
                <span style={styles.navEmoji}>💳</span>Wallet
              </Link>
              <Link to="/user/chat" style={styles.navItem}>
                <span style={styles.navEmoji}>💬</span>Chat
              </Link>
            </nav>
          </div>

          <div style={styles.sidebarBottom}>
            <div style={styles.sidebarBottomCard}>
              <p style={styles.sidebarBottomText}>
                Explore trusted local providers, manage bookings, and stay connected with your community.
              </p>
              <button style={styles.sidebarBtn} onClick={() => navigate("/user/services")}>
                Explore now
              </button>
            </div>
            <button
              style={{
                marginTop: "12px",
                width: "100%",
                border: "none",
                borderRadius: "14px",
                padding: "14px",
                background: "linear-gradient(135deg, #8f6bff 0%, #b68cff 100%)",
                color: "#fff",
                fontWeight: "700",
                cursor: "pointer",
                fontSize: "15px",
              }}
              onClick={() => navigate("/provider/dashboard")}
            >
              🔄 Switch to Provider
            </button>
            <button
              style={{
                marginTop: "10px",
                width: "100%",
                border: "none",
                borderRadius: "14px",
                padding: "14px",
                background: "linear-gradient(135deg, #ff98bf 0%, #ffb4cf 100%)",
                color: "#fff",
                fontWeight: "700",
                cursor: "pointer",
                fontSize: "15px",
              }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </aside>

        {/* Main */}
        <main style={styles.main}>
          <div style={styles.topbar}>
            <div style={styles.topbarLeft}>
              <p style={styles.topbarSub}>Welcome back ✨</p>
              <h1 style={styles.topbarTitle}>Hi, {userName}</h1>
            </div>

            <div style={styles.topbarRight}>
              {/* Notification Bell */}
              <div style={styles.notificationWrap} ref={notificationRef}>
                <button style={styles.notificationBell} onClick={handleNotificationClick}>
                  🔔
                  {unreadCount > 0 && (
                    <span style={styles.notificationCount}>{unreadCount}</span>
                  )}
                </button>

                {showNotifications && (
                  <div style={styles.notificationDropdown}>
                    <div style={styles.notificationDropdownHeader}>
                      <div>
                        <h4 style={styles.notificationTitle}>Notifications</h4>
                        <p style={styles.notificationSub}>
                          {unreadCount} unread update{unreadCount !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <button style={styles.markReadBtn} onClick={markAllNotificationsRead}>
                        Mark all read
                      </button>
                    </div>
                    <div style={styles.notificationList}>
                      {notifications.map((item) => (
                        <div key={item.id} style={styles.notificationRow}>
                          <div style={{ ...styles.notificationDot, opacity: item.unread ? 1 : 0.2 }}></div>
                          <div style={styles.notificationContent}>
                            <p style={styles.notificationText}>{item.text}</p>
                            <span style={styles.notificationTime}>{item.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div style={styles.topbarBtns}>
                <button style={styles.topBtn} onClick={() => navigate("/user/dashboard")}>Dashboard</button>
                <button style={styles.topBtn} onClick={() => navigate("/user/profile")}>Profile</button>
              </div>

              {/* Profile Menu */}
              <div style={styles.profileMenuWrap} ref={profileMenuRef}>
                <button style={styles.topProfileCard} onClick={handleProfileMenuClick}>
                  <div style={styles.topProfileAvatarOuter}>
                    <div style={styles.topProfileAvatar}>
                      {userImage ? (
                        <img src={userImage} alt="User" style={styles.topProfileAvatarImg} />
                      ) : (initial)}
                    </div>
                  </div>
                  <div style={styles.topProfileInfo}>
                    <h4 style={styles.topProfileName}>{userName}</h4>
                    <p style={styles.topProfileEmail}>{userEmail}</p>
                  </div>
                  <span style={styles.dropdownArrow}>▾</span>
                </button>

                {showProfileMenu && (
                  <div style={styles.profileDropdown}>
                    <button style={styles.dropdownItem} onClick={() => navigate("/user/profile")}>
                      View Profile
                    </button>
                    <button style={styles.dropdownItem} onClick={() => navigate("/user/wallet")}>
                      Wallet
                    </button>
                    <button style={styles.dropdownItem} onClick={() => navigate("/provider/dashboard")}>
                      🔄 Switch to Provider
                    </button>
                    <button style={styles.dropdownLogout} onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Hero */}
          <section style={styles.hero}>
            <div style={styles.heroLeft}>
              <div style={styles.badge}>Your skill-based community platform</div>
              <h2 style={styles.heroTitle}>
                Welcome to <span style={styles.highlight}>SkillSwap</span>
              </h2>
              <p style={styles.heroText}>
                Discover nearby services, book trusted providers, manage your wallet, and connect with people around you using time and skills as value.
              </p>

              <div style={styles.heroBtns}>
                <button style={styles.primaryBtn} onClick={() => navigate("/user/services")}>
                  Explore Services →
                </button>
                <button style={styles.secondaryBtn} onClick={() => navigate("/user/bookings")}>
                  View Bookings
                </button>
              </div>

              <div style={styles.floatingBadges}>
                <span style={styles.floatBadge}>Home Cleaning</span>
                <span style={styles.floatBadge}>AC Repair</span>
                <span style={styles.floatBadge}>Gardening</span>
                <span style={styles.floatBadge}>Salon at Home</span>
              </div>

              <div style={styles.smallStats}>
                <div style={styles.smallCard}>
                  <h4 style={styles.smallNum}>120+</h4>
                  <p style={styles.smallLabel}>Services</p>
                </div>
                <div style={styles.smallCard}>
                  <h4 style={styles.smallNum}>48+</h4>
                  <p style={styles.smallLabel}>Providers</p>
                </div>
                <div style={styles.smallCard}>
                  <h4 style={styles.smallNum}>4.9</h4>
                  <p style={styles.smallLabel}>Avg Rating</p>
                </div>
              </div>
            </div>

            <div style={styles.heroRight}>
              <div style={styles.heroWidget}>
                <div style={styles.widgetTop}>
                  <div style={styles.widgetIcon}>💜</div>
                  <div>
                    <p style={styles.widgetSub}>SkillSwap Match</p>
                    <h4 style={styles.widgetTitle}>Perfect for your vibe</h4>
                  </div>
                </div>

                <div style={styles.progressCard}>
                  <div style={styles.progressRow}>
                    <span>Profile completion</span>
                    <span>82%</span>
                  </div>
                  <div style={styles.progressBar}>
                    <div style={styles.progressFill}></div>
                  </div>
                </div>

                <div style={styles.providerCard}>
                  <div style={styles.providerIcon}>🧹</div>
                  <div>
                    <h4 style={styles.providerTitle}>Home Cleaning</h4>
                    <p style={styles.providerText}>3 credits / visit</p>
                  </div>
                </div>

                <div style={styles.providerCard}>
                  <div style={styles.providerIcon}>❄️</div>
                  <div>
                    <h4 style={styles.providerTitle}>AC Repair</h4>
                    <p style={styles.providerText}>Nearby provider</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section style={styles.statsGrid}>
            {stats.map((item, index) => (
              <div key={index} style={{ ...styles.statCard, background: item.bg }}>
                <div style={styles.statGlow}></div>
                <div style={styles.statIcon}>{item.icon}</div>
                <h4 style={styles.statTitle}>{item.title}</h4>
                <h2 style={styles.statValue}>{item.value}</h2>
                <p style={styles.statText}>{item.subtitle}</p>
              </div>
            ))}
          </section>

          {/* Bottom Panels */}
          <section style={styles.bottomGrid}>
            <div style={styles.panel}>
              <div style={styles.panelHeader}>
                <h3 style={styles.panelTitle}>Quick Actions</h3>
                <span style={styles.panelBadge}>Fast access</span>
              </div>

              <div style={styles.quickGrid}>
                <button style={styles.quickCardPurple} onClick={() => navigate("/user/services")}>
                  <span style={styles.quickEmoji}>🔍</span>
                  <div>
                    <h4 style={styles.quickTitleLight}>Browse Services</h4>
                    <p style={styles.quickTextLight}>Find trusted providers around you</p>
                  </div>
                </button>

                <button style={styles.quickCardBlue} onClick={() => navigate("/user/bookings")}>
                  <span style={styles.quickEmoji}>📅</span>
                  <div>
                    <h4 style={styles.quickTitleDark}>My Bookings</h4>
                    <p style={styles.quickTextDark}>Check upcoming and completed services</p>
                  </div>
                </button>

                <button style={styles.quickCardPink} onClick={() => navigate("/user/wallet")}>
                  <span style={styles.quickEmoji}>👛</span>
                  <div>
                    <h4 style={styles.quickTitleDark}>Wallet</h4>
                    <p style={styles.quickTextDark}>Manage credits and transaction history</p>
                  </div>
                </button>
              </div>
            </div>

            <div style={styles.panel}>
              <div style={styles.panelHeader}>
                <h3 style={styles.panelTitle}>Recent Bookings</h3>
                <button style={styles.seeAllBtn} onClick={() => navigate("/user/bookings")}>
                  See all
                </button>
              </div>

              <div style={styles.bookingList}>
                {bookings.map((item, index) => (
                  <div key={index} style={styles.bookingItem}>
                    <div style={styles.bookingLeft}>
                      <div style={styles.bookingAvatar}>{item.service.charAt(0)}</div>
                      <div>
                        <h4 style={styles.bookingService}>{item.service}</h4>
                        <p style={styles.bookingProvider}>Provider: {item.provider}</p>
                      </div>
                    </div>
                    <div style={styles.bookingRight}>
                      <span style={styles.bookingDate}>{item.date}</span>
                      <span
                        style={{
                          ...styles.statusBadge,
                          background: item.status === "Upcoming" ? "#efe4ff" : item.status === "Pending" ? "#fff1d8" : "#e3f6ea",
                          color: item.status === "Upcoming" ? "#7c4dff" : item.status === "Pending" ? "#bf7a00" : "#1f8a4d",
                        }}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

const styles = {
  page: { minHeight: "100vh", background: "linear-gradient(135deg, #faf6ff 0%, #f5efff 35%, #f8f1fb 65%, #eef5ff 100%)", fontFamily: "'Poppins', 'Segoe UI', sans-serif", position: "relative", overflowX: "hidden", padding: "18px" },
  blob1: { position: "absolute", top: "-80px", right: "-60px", width: "280px", height: "280px", borderRadius: "50%", background: "rgba(180, 149, 255, 0.18)", filter: "blur(80px)" },
  blob2: { position: "absolute", left: "-80px", bottom: "120px", width: "260px", height: "260px", borderRadius: "50%", background: "rgba(255, 182, 222, 0.18)", filter: "blur(80px)" },
  blob3: { position: "absolute", top: "300px", left: "45%", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(128, 177, 255, 0.14)", filter: "blur(75px)" },
  blob4: { position: "absolute", top: "120px", left: "60%", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(255, 220, 235, 0.18)", filter: "blur(55px)" },
  layout: { position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "260px minmax(0, 1fr)", gap: "20px", maxWidth: "1800px", margin: "0 auto", alignItems: "start" },
  sidebar: { position: "sticky", top: "18px", height: "calc(100vh - 36px)", background: "rgba(255,255,255,0.62)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.78)", borderRadius: "28px", padding: "18px", boxShadow: "0 16px 38px rgba(122, 95, 188, 0.08)", display: "flex", flexDirection: "column", justifyContent: "space-between" },
  logoWrap: { display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" },
  logoIcon: { width: "62px", height: "62px", borderRadius: "20px", background: "linear-gradient(135deg, #8f6bff 0%, #c79cff 100%)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", fontWeight: "800", boxShadow: "0 14px 28px rgba(143,107,255,0.22)", flexShrink: 0 },
  logoText: { margin: 0, fontSize: "28px", fontWeight: "800", color: "#7d4cff", lineHeight: 1.1 },
  logoSub: { margin: "6px 0 0 0", color: "#9b8bb5", fontSize: "13px" },
  userMiniCard: { display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "22px", background: "linear-gradient(135deg, #f7edff 0%, #fdebf5 100%)", marginBottom: "18px", border: "1px solid rgba(230, 213, 248, 0.9)" },
  userMiniAvatar: { width: "52px", height: "52px", borderRadius: "16px", background: "linear-gradient(135deg, #8f6bff 0%, #c79cff 100%)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "18px", overflow: "hidden", flexShrink: 0 },
  userMiniAvatarImg: { width: "100%", height: "100%", objectFit: "cover" },
  userMiniInfo: { minWidth: 0 },
  userMiniName: { margin: 0, fontSize: "16px", color: "#3f2d5c", fontWeight: "700", lineHeight: 1.2 },
  userMiniRole: { margin: "5px 0 0 0", color: "#8d7da9", fontSize: "12px" },
  nav: { display: "flex", flexDirection: "column", gap: "12px" },
  navItem: { textDecoration: "none", color: "#5e517d", fontSize: "16px", fontWeight: "600", padding: "16px 16px", borderRadius: "18px", background: "rgba(255,255,255,0.78)", border: "1px solid rgba(225,214,245,0.9)", display: "flex", alignItems: "center", gap: "12px" },
  activeNav: { color: "#7b4cff", background: "linear-gradient(135deg, #efe4ff 0%, #e7d8ff 100%)", boxShadow: "0 10px 22px rgba(143,107,255,0.12)" },
  navEmoji: { fontSize: "18px", width: "22px", textAlign: "center", flexShrink: 0 },
  sidebarBottom: { marginTop: "18px", display: "flex", flexDirection: "column", gap: "0px" },
  sidebarBottomCard: { padding: "18px", borderRadius: "24px", background: "linear-gradient(135deg, #f5ecff 0%, #ffeaf5 100%)" },
  sidebarBottomText: { margin: 0, color: "#735f93", fontSize: "14px", lineHeight: "1.7" },
  sidebarBtn: { marginTop: "14px", width: "100%", border: "none", borderRadius: "14px", padding: "12px 14px", background: "linear-gradient(135deg, #8f6bff 0%, #b68cff 100%)", color: "#fff", fontWeight: "700", cursor: "pointer" },
  main: { minWidth: 0, width: "100%" },
  topbar: { background: "rgba(255,255,255,0.68)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.82)", borderRadius: "28px", padding: "22px 24px", boxShadow: "0 16px 35px rgba(124,96,190,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "18px", flexWrap: "wrap", marginBottom: "18px" },
  topbarLeft: { minWidth: 0 },
  topbarSub: { margin: 0, color: "#9a8db4", fontSize: "14px", fontWeight: "600" },
  topbarTitle: { margin: "8px 0 0 0", color: "#5d378d", fontSize: "36px", fontWeight: "800", lineHeight: 1.1 },
  topbarRight: { display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", position: "relative" },
  notificationWrap: { position: "relative" },
  notificationBell: { position: "relative", width: "52px", height: "52px", borderRadius: "16px", background: "linear-gradient(135deg, #f4ebff 0%, #ffeaf4 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", border: "1px solid rgba(223, 210, 246, 0.9)", cursor: "pointer" },
  notificationCount: { position: "absolute", top: "-5px", right: "-3px", minWidth: "22px", height: "22px", borderRadius: "999px", background: "#ff8fba", color: "#fff", fontSize: "11px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 6px" },
  notificationDropdown: { position: "absolute", top: "64px", right: 0, width: "320px", background: "rgba(255,255,255,0.96)", backdropFilter: "blur(18px)", border: "1px solid rgba(230, 213, 248, 0.9)", borderRadius: "20px", boxShadow: "0 16px 35px rgba(124,96,190,0.12)", padding: "14px", zIndex: 30 },
  notificationDropdownHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "12px" },
  notificationTitle: { margin: 0, color: "#3a2959", fontSize: "16px", fontWeight: "800" },
  notificationSub: { margin: "4px 0 0 0", color: "#8d7da9", fontSize: "12px" },
  markReadBtn: { border: "1px solid #dccdf6", background: "#fff", color: "#6a4a99", borderRadius: "12px", padding: "8px 10px", fontWeight: "700", fontSize: "12px", cursor: "pointer" },
  notificationList: { display: "grid", gap: "10px" },
  notificationRow: { display: "flex", gap: "10px", padding: "10px", borderRadius: "14px", background: "linear-gradient(135deg, #fcfaff 0%, #f5efff 100%)", border: "1px solid rgba(233, 226, 247, 0.8)" },
  notificationDot: { width: "10px", height: "10px", borderRadius: "50%", background: "#8f6bff", marginTop: "6px", flexShrink: 0 },
  notificationContent: { minWidth: 0 },
  notificationText: { margin: 0, fontSize: "13px", color: "#5c5079", lineHeight: "1.5" },
  notificationTime: { display: "inline-block", marginTop: "6px", fontSize: "11px", color: "#9a8db4" },
  topbarBtns: { display: "flex", gap: "10px", flexWrap: "wrap" },
  topBtn: { border: "1px solid #dccdf6", background: "#fff", color: "#5f4288", borderRadius: "14px", padding: "12px 16px", fontWeight: "700", cursor: "pointer" },
  profileMenuWrap: { position: "relative" },
  topProfileCard: { border: "1px solid rgba(230, 213, 248, 0.9)", display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderRadius: "20px", background: "linear-gradient(135deg, #f7edff 0%, #fdebf5 100%)", minWidth: "240px", cursor: "pointer" },
  topProfileAvatarOuter: { padding: "3px", borderRadius: "18px", background: "linear-gradient(135deg, #8f6bff 0%, #ffb1d0 100%)", boxShadow: "0 0 0 4px rgba(143, 107, 255, 0.08)" },
  topProfileAvatar: { width: "46px", height: "46px", borderRadius: "15px", background: "#fff", color: "#7b4cff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "18px", overflow: "hidden" },
  topProfileAvatarImg: { width: "100%", height: "100%", objectFit: "cover" },
  topProfileInfo: { minWidth: 0, flex: 1, textAlign: "left" },
  topProfileName: { margin: 0, fontSize: "15px", color: "#3f2d5c", fontWeight: "700", lineHeight: 1.2 },
  topProfileEmail: { margin: "4px 0 0 0", fontSize: "12px", color: "#8d7da9", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  dropdownArrow: { color: "#7d69a2", fontSize: "14px", flexShrink: 0 },
  profileDropdown: { position: "absolute", top: "72px", right: 0, width: "220px", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(18px)", border: "1px solid rgba(230, 213, 248, 0.9)", borderRadius: "18px", boxShadow: "0 16px 35px rgba(124,96,190,0.12)", padding: "10px", display: "grid", gap: "8px", zIndex: 20 },
  dropdownItem: { border: "none", background: "#fff", borderRadius: "12px", padding: "12px 14px", textAlign: "left", color: "#5f4288", fontWeight: "700", cursor: "pointer" },
  dropdownLogout: { border: "none", background: "linear-gradient(135deg, #ff92bb 0%, #ffb1ce 100%)", color: "#fff", borderRadius: "12px", padding: "12px 14px", textAlign: "left", fontWeight: "700", cursor: "pointer" },
  hero: { display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "20px", background: "rgba(255,255,255,0.68)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.82)", borderRadius: "30px", padding: "26px", marginBottom: "18px", boxShadow: "0 16px 35px rgba(124,96,190,0.08)" },
  heroLeft: { display: "flex", flexDirection: "column", justifyContent: "center" },
  badge: { alignSelf: "flex-start", padding: "10px 16px", borderRadius: "999px", background: "linear-gradient(135deg, #efe6ff 0%, #ffeaf3 100%)", color: "#7c4cff", fontSize: "13px", fontWeight: "700", marginBottom: "18px" },
  heroTitle: { margin: 0, fontSize: "64px", lineHeight: "1.02", color: "#1e1637", fontWeight: "900", letterSpacing: "-1.4px" },
  highlight: { color: "#7d4cff" },
  heroText: { margin: "16px 0 0 0", fontSize: "18px", lineHeight: "1.9", color: "#6f768e", maxWidth: "780px" },
  heroBtns: { display: "flex", gap: "16px", marginTop: "26px", flexWrap: "wrap" },
  primaryBtn: { border: "none", borderRadius: "18px", padding: "16px 28px", background: "linear-gradient(135deg, #8f6bff 0%, #b58cff 100%)", color: "#fff", fontSize: "17px", fontWeight: "800", cursor: "pointer", boxShadow: "0 14px 28px rgba(143, 107, 255, 0.2)" },
  secondaryBtn: { border: "1px solid #dccdf6", borderRadius: "18px", padding: "16px 28px", background: "#fff", color: "#4d3a71", fontSize: "17px", fontWeight: "700", cursor: "pointer" },
  floatingBadges: { display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "18px" },
  floatBadge: { padding: "9px 14px", borderRadius: "999px", background: "rgba(255,255,255,0.82)", border: "1px solid rgba(223, 210, 246, 0.7)", color: "#735f93", fontSize: "13px", fontWeight: "700" },
  smallStats: { display: "flex", gap: "14px", marginTop: "24px", flexWrap: "wrap" },
  smallCard: { minWidth: "140px", padding: "16px 18px", borderRadius: "20px", background: "rgba(255,255,255,0.82)", border: "1px solid rgba(220, 205, 246, 0.7)" },
  smallNum: { margin: 0, fontSize: "20px", color: "#3d2c5f", fontWeight: "800" },
  smallLabel: { margin: "6px 0 0 0", color: "#8f81aa", fontSize: "14px" },
  heroRight: { display: "flex", alignItems: "stretch" },
  heroWidget: { width: "100%", borderRadius: "28px", padding: "22px", background: "linear-gradient(135deg, #f1e9ff 0%, #e7f2ff 55%, #ffeaf4 100%)" },
  widgetTop: { display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" },
  widgetIcon: { width: "56px", height: "56px", borderRadius: "18px", background: "rgba(255,255,255,0.75)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" },
  widgetSub: { margin: 0, fontSize: "13px", color: "#907fae", fontWeight: "600" },
  widgetTitle: { margin: "4px 0 0 0", color: "#372651", fontSize: "22px", fontWeight: "800" },
  progressCard: { background: "rgba(255,255,255,0.78)", padding: "16px", borderRadius: "18px", marginBottom: "16px" },
  progressRow: { display: "flex", justifyContent: "space-between", color: "#5f537a", fontSize: "14px", fontWeight: "700", marginBottom: "10px" },
  progressBar: { width: "100%", height: "12px", borderRadius: "999px", background: "#e8dbff", overflow: "hidden" },
  progressFill: { width: "82%", height: "100%", background: "linear-gradient(135deg, #8f6bff 0%, #d497ff 100%)", borderRadius: "999px" },
  providerCard: { display: "flex", alignItems: "center", gap: "12px", padding: "14px", background: "rgba(255,255,255,0.78)", borderRadius: "18px", marginBottom: "12px" },
  providerIcon: { width: "46px", height: "46px", borderRadius: "14px", background: "linear-gradient(135deg, #f7eefe 0%, #ffe9f4 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" },
  providerTitle: { margin: 0, fontSize: "17px", color: "#362551", fontWeight: "800" },
  providerText: { margin: "4px 0 0 0", fontSize: "13px", color: "#8e7fa9" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "18px", marginBottom: "18px" },
  statCard: { position: "relative", overflow: "hidden", borderRadius: "28px", padding: "24px", border: "1px solid rgba(255,255,255,0.7)", boxShadow: "0 14px 30px rgba(123, 97, 190, 0.06)" },
  statGlow: { position: "absolute", top: "-30px", right: "-10px", width: "100px", height: "100px", borderRadius: "50%", background: "rgba(255,255,255,0.28)", filter: "blur(20px)" },
  statIcon: { position: "relative", zIndex: 1, width: "60px", height: "60px", borderRadius: "18px", background: "rgba(255,255,255,0.72)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "25px", marginBottom: "18px" },
  statTitle: { position: "relative", zIndex: 1, margin: 0, fontSize: "18px", color: "#40506d", fontWeight: "700" },
  statValue: { position: "relative", zIndex: 1, margin: "12px 0 8px 0", fontSize: "52px", lineHeight: 1, color: "#1d2859", fontWeight: "900" },
  statText: { position: "relative", zIndex: 1, margin: 0, fontSize: "15px", color: "#6f7992" },
  bottomGrid: { display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "20px" },
  panel: { background: "rgba(255,255,255,0.68)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.82)", borderRadius: "28px", padding: "24px", boxShadow: "0 16px 35px rgba(124,96,190,0.08)" },
  panelHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "14px", marginBottom: "18px", flexWrap: "wrap" },
  panelTitle: { margin: 0, color: "#35244f", fontSize: "24px", fontWeight: "800" },
  panelBadge: { padding: "8px 12px", borderRadius: "999px", background: "#f1e7ff", color: "#7c4cff", fontSize: "12px", fontWeight: "800" },
  quickGrid: { display: "grid", gap: "14px" },
  quickCardPurple: { border: "none", borderRadius: "22px", padding: "18px", background: "linear-gradient(135deg, #8f6bff 0%, #b78dff 100%)", display: "flex", alignItems: "center", gap: "14px", textAlign: "left", cursor: "pointer" },
  quickCardBlue: { border: "none", borderRadius: "22px", padding: "18px", background: "linear-gradient(135deg, #e4f2ff 0%, #d3e9ff 100%)", display: "flex", alignItems: "center", gap: "14px", textAlign: "left", cursor: "pointer" },
  quickCardPink: { border: "none", borderRadius: "22px", padding: "18px", background: "linear-gradient(135deg, #ffe7f3 0%, #f7dceb 100%)", display: "flex", alignItems: "center", gap: "14px", textAlign: "left", cursor: "pointer" },
  quickEmoji: { width: "56px", height: "56px", borderRadius: "18px", background: "rgba(255,255,255,0.45)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", flexShrink: 0 },
  quickTitleLight: { margin: 0, color: "#fff", fontSize: "18px", fontWeight: "800" },
  quickTextLight: { margin: "5px 0 0 0", color: "rgba(255,255,255,0.9)", fontSize: "14px", lineHeight: "1.6" },
  quickTitleDark: { margin: 0, color: "#34405f", fontSize: "18px", fontWeight: "800" },
  quickTextDark: { margin: "5px 0 0 0", color: "#6f7890", fontSize: "14px", lineHeight: "1.6" },
  seeAllBtn: { border: "1px solid #dccdf6", background: "#fff", color: "#5d4189", borderRadius: "14px", padding: "10px 14px", fontWeight: "700", cursor: "pointer" },
  bookingList: { display: "grid", gap: "14px" },
  bookingItem: { padding: "16px", borderRadius: "20px", background: "linear-gradient(135deg, #fcfaff 0%, #f5f0ff 100%)", border: "1px solid rgba(223, 210, 246, 0.8)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" },
  bookingLeft: { display: "flex", alignItems: "center", gap: "12px" },
  bookingAvatar: { width: "48px", height: "48px", borderRadius: "16px", background: "linear-gradient(135deg, #8f6bff 0%, #c79cff 100%)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "18px" },
  bookingService: { margin: 0, color: "#342450", fontSize: "17px", fontWeight: "800" },
  bookingProvider: { margin: "4px 0 0 0", color: "#7d7196", fontSize: "14px" },
  bookingRight: { display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" },
  bookingDate: { color: "#665b80", fontSize: "14px", fontWeight: "700" },
  statusBadge: { padding: "8px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: "800" },
};

export default Dashboard;

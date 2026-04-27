import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();

  const currentUser =
    JSON.parse(localStorage.getItem("currentUser")) ||
    JSON.parse(localStorage.getItem("loggedInUser")) ||
    JSON.parse(sessionStorage.getItem("currentUser")) || {
      name: "Shivii",
      email: "shiviidhalari@gmail.com",
      role: "User",
      profileImage: "",
      credits: 12,
    };

  const initial = currentUser?.name?.charAt(0)?.toUpperCase() || "U";

  const chatList = [
    {
      id: 1,
      name: "Riya",
      service: "Home Cleaning",
      avatar: "🧹",
      lastMessage: "I can come tomorrow at 10 AM.",
      time: "10:24 AM",
      unread: 2,
      online: true,
      bg: "linear-gradient(135deg, #efe5ff 0%, #e8dcff 100%)",
      messages: [
        { sender: "provider", text: "Hi, I saw your home cleaning request.", time: "10:10 AM" },
        { sender: "user", text: "Yes, I need cleaning for kitchen and living room.", time: "10:12 AM" },
        { sender: "provider", text: "I can come tomorrow at 10 AM.", time: "10:24 AM" },
      ],
    },
    {
      id: 2,
      name: "Rahul",
      service: "AC Repair",
      avatar: "❄️",
      lastMessage: "Please share your address once.",
      time: "09:40 AM",
      unread: 1,
      online: false,
      bg: "linear-gradient(135deg, #e7f3ff 0%, #dcecff 100%)",
      messages: [
        { sender: "provider", text: "Hello, is the AC not cooling?", time: "09:20 AM" },
        { sender: "user", text: "Yes, it's cooling very slowly.", time: "09:27 AM" },
        { sender: "provider", text: "Please share your address once.", time: "09:40 AM" },
      ],
    },
    {
      id: 3,
      name: "Karan",
      service: "Gardening Help",
      avatar: "🌿",
      lastMessage: "I have completed the trimming work.",
      time: "Yesterday",
      unread: 0,
      online: true,
      bg: "linear-gradient(135deg, #e8fff4 0%, #def5ea 100%)",
      messages: [
        { sender: "user", text: "Please trim the plants near the gate too.", time: "Yesterday, 4:10 PM" },
        { sender: "provider", text: "Sure, I'll do that.", time: "Yesterday, 4:18 PM" },
        { sender: "provider", text: "I have completed the trimming work.", time: "Yesterday, 5:03 PM" },
      ],
    },
    {
      id: 4,
      name: "Vikas",
      service: "Plumber Help",
      avatar: "🚿",
      lastMessage: "Tap leakage issue is fixed now.",
      time: "Yesterday",
      unread: 0,
      online: false,
      bg: "linear-gradient(135deg, #eef1ff 0%, #e2e7ff 100%)",
      messages: [
        { sender: "provider", text: "I checked the tap connection.", time: "Yesterday, 12:15 PM" },
        { sender: "provider", text: "Tap leakage issue is fixed now.", time: "Yesterday, 12:42 PM" },
      ],
    },
  ];

  const [selectedChatId, setSelectedChatId] = useState(chatList[0].id);
  const [messageText, setMessageText] = useState("");

  const selectedChat =
    useMemo(
      () => chatList.find((chat) => chat.id === selectedChatId) || chatList[0],
      [selectedChatId]
    ) || chatList[0];

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("loggedInUser");
    sessionStorage.removeItem("currentUser");
    navigate("/login");
  };

  const handleSend = () => {
    if (!messageText.trim()) return;
    alert(`Message sent: ${messageText}`);
    setMessageText("");
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
                  <img
                    src={currentUser.profileImage}
                    alt="User"
                    style={styles.userAvatarImg}
                  />
                ) : (
                  initial
                )}
              </div>

              <div style={styles.userInfo}>
                <h4 style={styles.userName}>{currentUser.name || "User"}</h4>
                <p style={styles.userEmail}>{currentUser.email || "user@gmail.com"}</p>
              </div>
            </div>

            <nav style={styles.nav}>
              <Link to="/user/dashboard" style={styles.navItem}>
                <span style={styles.navIcon}>🏠</span>
                Dashboard
              </Link>

              <Link to="/user/profile" style={styles.navItem}>
                <span style={styles.navIcon}>👤</span>
                Profile
              </Link>

              <Link to="/user/services" style={styles.navItem}>
                <span style={styles.navIcon}>🛍️</span>
                Browse Services
              </Link>

              <Link to="/user/bookings" style={styles.navItem}>
                <span style={styles.navIcon}>📅</span>
                Bookings
              </Link>

              <Link to="/user/wallet" style={styles.navItem}>
                <span style={styles.navIcon}>💳</span>
                Wallet
              </Link>

              <Link
                to="/user/chat"
                style={{ ...styles.navItem, ...styles.activeNavItem }}
              >
                <span style={styles.navIcon}>💬</span>
                Chat
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
              <p style={styles.navbarSub}>Stay connected with service providers</p>
              <h1 style={styles.navbarTitle}>My Chats</h1>
            </div>

            <div style={styles.navbarRight}>
              <button
                style={styles.topBtn}
                onClick={() => navigate("/user/dashboard")}
              >
                Dashboard
              </button>
              <button
                style={styles.topBtn}
                onClick={() => navigate("/user/profile")}
              >
                Profile
              </button>
            </div>
          </div>

          <div style={styles.chatLayout}>
            {/* Chat List */}
            <section style={styles.chatListPanel}>
              <div style={styles.panelHeader}>
                <div>
                  <h2 style={styles.panelTitle}>Conversations</h2>
                  <p style={styles.panelSub}>Talk to your booked service providers</p>
                </div>
                <div style={styles.countBadge}>{chatList.length}</div>
              </div>

              <div style={styles.chatList}>
                {chatList.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedChatId(chat.id)}
                    style={{
                      ...styles.chatCard,
                      background: chat.bg,
                      ...(selectedChatId === chat.id ? styles.activeChatCard : {}),
                    }}
                  >
                    <div style={styles.chatAvatarWrap}>
                      <div style={styles.chatAvatar}>{chat.avatar}</div>
                      {chat.online && <span style={styles.onlineDot}></span>}
                    </div>

                    <div style={styles.chatInfo}>
                      <div style={styles.chatInfoTop}>
                        <h4 style={styles.chatName}>{chat.name}</h4>
                        <span style={styles.chatTime}>{chat.time}</span>
                      </div>
                      <p style={styles.chatService}>{chat.service}</p>
                      <p style={styles.chatPreview}>{chat.lastMessage}</p>
                    </div>

                    {chat.unread > 0 && (
                      <div style={styles.unreadBadge}>{chat.unread}</div>
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* Chat Window */}
            <section style={styles.chatWindow}>
              <div style={styles.chatHeader}>
                <div style={styles.chatHeaderLeft}>
                  <div style={styles.selectedAvatar}>{selectedChat.avatar}</div>
                  <div>
                    <h3 style={styles.selectedName}>{selectedChat.name}</h3>
                    <p style={styles.selectedService}>{selectedChat.service}</p>
                  </div>
                </div>

                <div style={styles.headerStatus}>
                  {selectedChat.online ? "Online" : "Offline"}
                </div>
              </div>

              <div style={styles.messagesArea}>
                {selectedChat.messages.map((msg, index) => (
                  <div
                    key={index}
                    style={{
                      ...styles.messageRow,
                      justifyContent:
                        msg.sender === "user" ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      style={{
                        ...styles.messageBubble,
                        ...(msg.sender === "user"
                          ? styles.userBubble
                          : styles.providerBubble),
                      }}
                    >
                      <p style={styles.messageText}>{msg.text}</p>
                      <span style={styles.messageTime}>{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={styles.inputBar}>
                <input
                  type="text"
                  placeholder="Type your message here..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  style={styles.messageInput}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                />
                <button style={styles.sendBtn} onClick={handleSend}>
                  Send
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #faf7ff 0%, #f4efff 48%, #fdf4fb 78%, #eef5ff 100%)",
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
    position: "relative",
    overflowX: "hidden",
    padding: "18px",
  },

  blob1: {
    position: "absolute",
    top: "-80px",
    right: "-70px",
    width: "260px",
    height: "260px",
    borderRadius: "50%",
    background: "rgba(181,145,255,0.16)",
    filter: "blur(85px)",
  },

  blob2: {
    position: "absolute",
    bottom: "60px",
    left: "-70px",
    width: "240px",
    height: "240px",
    borderRadius: "50%",
    background: "rgba(255,190,225,0.14)",
    filter: "blur(80px)",
  },

  blob3: {
    position: "absolute",
    top: "300px",
    left: "48%",
    width: "190px",
    height: "190px",
    borderRadius: "50%",
    background: "rgba(140,190,255,0.12)",
    filter: "blur(85px)",
  },

  container: {
    position: "relative",
    zIndex: 2,
    display: "grid",
    gridTemplateColumns: "260px minmax(0, 1fr)",
    gap: "20px",
    maxWidth: "1800px",
    margin: "0 auto",
    alignItems: "start",
  },

  sidebar: {
    position: "sticky",
    top: "18px",
    height: "calc(100vh - 36px)",
    background: "rgba(255,255,255,0.62)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.78)",
    borderRadius: "28px",
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "0 16px 38px rgba(122, 95, 188, 0.08)",
  },

  brandCard: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "16px",
  },

  logoIcon: {
    width: "62px",
    height: "62px",
    borderRadius: "20px",
    background: "linear-gradient(135deg, #8f6bff 0%, #c79cff 100%)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    fontWeight: "800",
    boxShadow: "0 14px 28px rgba(143,107,255,0.22)",
    flexShrink: 0,
  },

  logoText: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "800",
    color: "#7d4cff",
    lineHeight: 1.1,
  },

  logoSub: {
    margin: "6px 0 0 0",
    color: "#9b8bb5",
    fontSize: "13px",
  },

  userCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    borderRadius: "22px",
    background: "linear-gradient(135deg, #f7edff 0%, #fdebf5 100%)",
    marginBottom: "18px",
    border: "1px solid rgba(230, 213, 248, 0.9)",
  },

  userAvatar: {
    width: "52px",
    height: "52px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #8f6bff 0%, #c79cff 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "800",
    fontSize: "18px",
    overflow: "hidden",
    flexShrink: 0,
  },

  userAvatarImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  userInfo: {
    minWidth: 0,
  },

  userName: {
    margin: 0,
    fontSize: "16px",
    color: "#3f2d5c",
    fontWeight: "700",
    lineHeight: 1.2,
  },

  userEmail: {
    margin: "5px 0 0 0",
    fontSize: "12px",
    color: "#8d7da9",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  navItem: {
    textDecoration: "none",
    color: "#5e517d",
    fontSize: "16px",
    fontWeight: "600",
    padding: "16px 16px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.78)",
    border: "1px solid rgba(225,214,245,0.9)",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  activeNavItem: {
    color: "#7b4cff",
    background: "linear-gradient(135deg, #efe4ff 0%, #e7d8ff 100%)",
    boxShadow: "0 10px 22px rgba(143,107,255,0.12)",
  },

  navIcon: {
    fontSize: "18px",
    width: "22px",
    textAlign: "center",
    flexShrink: 0,
  },

  logoutBtn: {
    border: "none",
    background: "linear-gradient(135deg, #ff98bf 0%, #ffb4cf 100%)",
    color: "#fff",
    borderRadius: "16px",
    padding: "14px 16px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 12px 22px rgba(255,146,187,0.16)",
  },

  main: {
    minWidth: 0,
    width: "100%",
  },

  navbar: {
    background: "rgba(255,255,255,0.68)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.82)",
    borderRadius: "28px",
    padding: "24px 26px",
    boxShadow: "0 16px 35px rgba(124,96,190,0.08)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "18px",
    flexWrap: "wrap",
    marginBottom: "18px",
  },

  navbarSub: {
    margin: 0,
    color: "#988db1",
    fontSize: "14px",
    fontWeight: "600",
  },

  navbarTitle: {
    margin: "8px 0 0 0",
    color: "#181638",
    fontSize: "34px",
    lineHeight: "1.12",
    fontWeight: "900",
  },

  navbarRight: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  topBtn: {
    border: "1px solid #dccdf6",
    background: "#fff",
    color: "#5f4288",
    borderRadius: "14px",
    padding: "12px 16px",
    fontWeight: "700",
    cursor: "pointer",
  },

  chatLayout: {
    display: "grid",
    gridTemplateColumns: "360px minmax(0, 1fr)",
    gap: "18px",
    minHeight: "72vh",
  },

  chatListPanel: {
    background: "rgba(255,255,255,0.68)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.82)",
    borderRadius: "26px",
    padding: "18px",
    boxShadow: "0 16px 35px rgba(124,96,190,0.08)",
    display: "flex",
    flexDirection: "column",
  },

  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: "16px",
  },

  panelTitle: {
    margin: 0,
    fontSize: "24px",
    color: "#181638",
    fontWeight: "900",
  },

  panelSub: {
    margin: "6px 0 0 0",
    color: "#8d83a7",
    fontSize: "13px",
  },

  countBadge: {
    minWidth: "40px",
    height: "40px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #efe4ff 0%, #e7d8ff 100%)",
    color: "#7b4cff",
    fontWeight: "800",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  chatList: {
    display: "grid",
    gap: "12px",
    overflowY: "auto",
    paddingRight: "4px",
  },

  chatCard: {
    border: "1px solid rgba(255,255,255,0.82)",
    borderRadius: "22px",
    padding: "14px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    textAlign: "left",
    boxShadow: "0 10px 24px rgba(124,96,190,0.06)",
  },

  activeChatCard: {
    outline: "2px solid rgba(143,107,255,0.28)",
    transform: "translateY(-1px)",
  },

  chatAvatarWrap: {
    position: "relative",
    flexShrink: 0,
  },

  chatAvatar: {
    width: "56px",
    height: "56px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.82)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
  },

  onlineDot: {
    position: "absolute",
    right: "-2px",
    bottom: "-2px",
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    background: "#35c76f",
    border: "2px solid white",
  },

  chatInfo: {
    minWidth: 0,
    flex: 1,
  },

  chatInfoTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
  },

  chatName: {
    margin: 0,
    fontSize: "16px",
    color: "#1b1838",
    fontWeight: "800",
  },

  chatTime: {
    fontSize: "11px",
    color: "#8d83a7",
    flexShrink: 0,
  },

  chatService: {
    margin: "4px 0 0 0",
    fontSize: "12px",
    color: "#7c6ea0",
    fontWeight: "700",
  },

  chatPreview: {
    margin: "6px 0 0 0",
    fontSize: "13px",
    color: "#6d738d",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  unreadBadge: {
    minWidth: "26px",
    height: "26px",
    borderRadius: "999px",
    background: "linear-gradient(135deg, #8f6bff 0%, #b58cff 100%)",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "800",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  chatWindow: {
    background: "rgba(255,255,255,0.68)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.82)",
    borderRadius: "26px",
    boxShadow: "0 16px 35px rgba(124,96,190,0.08)",
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    overflow: "hidden",
    minHeight: "72vh",
  },

  chatHeader: {
    padding: "18px 20px",
    borderBottom: "1px solid rgba(225,214,245,0.85)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "14px",
    flexWrap: "wrap",
  },

  chatHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  selectedAvatar: {
    width: "58px",
    height: "58px",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #f2e9ff 0%, #ffeaf4 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
  },

  selectedName: {
    margin: 0,
    fontSize: "20px",
    color: "#1b1838",
    fontWeight: "800",
  },

  selectedService: {
    margin: "6px 0 0 0",
    fontSize: "13px",
    color: "#8d83a7",
  },

  headerStatus: {
    padding: "10px 14px",
    borderRadius: "999px",
    background: "linear-gradient(135deg, #efe4ff 0%, #e7d8ff 100%)",
    color: "#7b4cff",
    fontWeight: "800",
    fontSize: "13px",
  },

  messagesArea: {
    padding: "20px",
    overflowY: "auto",
    display: "grid",
    gap: "14px",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(245,239,255,0.3) 100%)",
  },

  messageRow: {
    display: "flex",
    width: "100%",
  },

  messageBubble: {
    maxWidth: "70%",
    borderRadius: "20px",
    padding: "14px 16px",
    boxShadow: "0 10px 22px rgba(124,96,190,0.08)",
  },

  providerBubble: {
    background: "rgba(255,255,255,0.92)",
    color: "#43345f",
    borderTopLeftRadius: "8px",
  },

  userBubble: {
    background: "linear-gradient(135deg, #8f6bff 0%, #b58cff 100%)",
    color: "#fff",
    borderTopRightRadius: "8px",
  },

  messageText: {
    margin: 0,
    fontSize: "14px",
    lineHeight: "1.7",
  },

  messageTime: {
    display: "block",
    marginTop: "8px",
    fontSize: "11px",
    opacity: 0.8,
  },

  inputBar: {
    padding: "16px 18px",
    borderTop: "1px solid rgba(225,214,245,0.85)",
    display: "flex",
    gap: "12px",
    background: "rgba(255,255,255,0.75)",
  },

  messageInput: {
    flex: 1,
    border: "1px solid #ddd0f5",
    borderRadius: "16px",
    padding: "14px 16px",
    fontSize: "14px",
    outline: "none",
    background: "#fff",
    color: "#3a2f52",
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
  },

  sendBtn: {
    border: "none",
    background: "linear-gradient(135deg, #8f6bff 0%, #b58cff 100%)",
    color: "#fff",
    borderRadius: "16px",
    padding: "14px 20px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 12px 22px rgba(143,107,255,0.18)",
  },
};

export default Chat;
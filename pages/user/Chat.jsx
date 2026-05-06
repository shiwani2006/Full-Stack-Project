import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BASE_CHAT_STORAGE_KEY = "skillSwapUserAiChatMessages";
const BASE_CLOSED_CHAT_KEY = "skillSwapAiChatClosed";
const BASE_FEEDBACK_KEY = "skillSwapAiFeedbackDone";

const COPILOT_ID = 999;

const providers = [
  {
    name: "CleanNest Premium",
    service: "Home Cleaning",
    phone: "+91 9876543210",
    email: "cleannest@gmail.com",
    rating: "4.8",
    price: "₹450",
    available: "Today • 2 PM",
    specialty: "Deep cleaning, kitchen cleaning, room cleaning",
  },
  {
    name: "Vikas Plumbing",
    service: "Plumber",
    phone: "+91 9876543213",
    email: "vikas.plumber@gmail.com",
    rating: "4.7",
    price: "₹350",
    available: "Today • 7 PM",
    specialty: "Tap leakage, sink blockage, pipe repair",
  },
  {
    name: "Rahul AC Care",
    service: "AC Repair",
    phone: "+91 9876543211",
    email: "rahul.acrepair@gmail.com",
    rating: "4.6",
    price: "₹500",
    available: "Today • 5:30 PM",
    specialty: "Cooling issue, gas refill, servicing",
  },
  {
    name: "BrightFix Electrician",
    service: "Electrician",
    phone: "+91 9876543214",
    email: "brightfix@gmail.com",
    rating: "4.9",
    price: "₹300",
    available: "Tomorrow • 11 AM",
    specialty: "Switch, wiring, fan, light repair",
  },
];

const Chat = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem("user")) || {
    name: "User",
    email: "",
    role: "user",
    profileImage: "",
  };

  const userKey =
    currentUser?.email || currentUser?.id || currentUser?.name || "guest";

  const CHAT_STORAGE_KEY = `${BASE_CHAT_STORAGE_KEY}_${userKey}`;
  const CLOSED_CHAT_KEY = `${BASE_CLOSED_CHAT_KEY}_${userKey}`;
  const FEEDBACK_KEY = `${BASE_FEEDBACK_KEY}_${userKey}`;

  const initial = currentUser?.name?.charAt(0)?.toUpperCase() || "U";

  const chatList = [
    {
      id: COPILOT_ID,
      name: "Society Copilot",
      service: "AI Assistant",
      avatar: "🤖",
      lastMessage: "Ask me for booking or provider contact",
      time: "Now",
      bg: "linear-gradient(135deg, #efe5ff 0%, #e8dcff 100%)",
      messages: [
        {
          sender: "provider",
          text:
            "Hello 👋 I’m Society Copilot.\nTell me what service you need. I can suggest providers, share phone/email, and help you book.",
          time: "Now",
          actions: [
            "Need home cleaning",
            "Need plumber",
            "Need electrician",
            "Need AC repair",
          ],
        },
      ],
    },
  ];

  const [selectedChatId, setSelectedChatId] = useState(COPILOT_ID);
  const [messageText, setMessageText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState("");
  const [lastProvider, setLastProvider] = useState(null);

  const [dynamicMessages, setDynamicMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [closedChats, setClosedChats] = useState(() => {
    try {
      const saved = localStorage.getItem(CLOSED_CHAT_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [feedbackDone, setFeedbackDone] = useState(() => {
    try {
      const saved = localStorage.getItem(FEEDBACK_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const resetAiChat = () => {
    localStorage.removeItem(CHAT_STORAGE_KEY);
    localStorage.removeItem(CLOSED_CHAT_KEY);
    localStorage.removeItem(FEEDBACK_KEY);

    setDynamicMessages({});
    setClosedChats({});
    setFeedbackDone({});
    setLastProvider(null);
    setMessageText("");
    setFeedbackText("");
    setFeedbackRating(5);
  };

  useEffect(() => {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(dynamicMessages));
  }, [dynamicMessages, CHAT_STORAGE_KEY]);

  useEffect(() => {
    localStorage.setItem(CLOSED_CHAT_KEY, JSON.stringify(closedChats));
  }, [closedChats, CLOSED_CHAT_KEY]);

  useEffect(() => {
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedbackDone));
  }, [feedbackDone, FEEDBACK_KEY]);

  const selectedChat = useMemo(
    () => chatList.find((chat) => chat.id === selectedChatId) || chatList[0],
    [selectedChatId]
  );

  const allMessages = [
    ...selectedChat.messages,
    ...(dynamicMessages[selectedChatId] || []),
  ];

  const isCurrentChatClosed = Boolean(closedChats[selectedChatId]);
  const isFeedbackDone = Boolean(feedbackDone[selectedChatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [dynamicMessages, selectedChatId, aiTyping, closedChats, feedbackDone]);

  const getCurrentTime = () =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const addMessageToChat = (chatId, msg) => {
    setDynamicMessages((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), msg],
    }));
  };

  const findProvider = (query) => {
    const q = query.toLowerCase();

    if (q.includes("clean") || q.includes("home cleaning")) {
      return providers.find((p) => p.service === "Home Cleaning");
    }

    if (q.includes("plumber") || q.includes("tap") || q.includes("pipe")) {
      return providers.find((p) => p.service === "Plumber");
    }

    if (q.includes("electrician") || q.includes("light") || q.includes("fan")) {
      return providers.find((p) => p.service === "Electrician");
    }

    if (q.includes("ac") || q.includes("cooling")) {
      return providers.find((p) => p.service === "AC Repair");
    }

    return providers.find((p) => q.includes(p.name.toLowerCase()));
  };

  const handleAiReply = (query, chatId) => {
    const lowerQuery = query.toLowerCase();

    const foundProvider = findProvider(query);
    const matchedProvider = foundProvider || lastProvider;

    const wantsContact =
      lowerQuery.includes("number") ||
      lowerQuery.includes("phone") ||
      lowerQuery.includes("email") ||
      lowerQuery.includes("contact") ||
      lowerQuery.includes("details") ||
      lowerQuery.includes("personal") ||
      lowerQuery.includes("yes") ||
      lowerQuery.includes("share");

    const wantsBooking =
      lowerQuery.includes("book") ||
      lowerQuery.includes("confirm") ||
      lowerQuery.includes("booking") ||
      lowerQuery.includes("done") ||
      lowerQuery.includes("proceed");

    if (foundProvider) {
      setLastProvider(foundProvider);
    }

    if (matchedProvider && wantsBooking) {
      addMessageToChat(chatId, {
        sender: "provider",
        text: `Booking confirmed ✅

Provider: ${matchedProvider.name}
Service: ${matchedProvider.service}

📞 Phone: ${matchedProvider.phone}
📧 Email: ${matchedProvider.email}

⭐ Rating: ${matchedProvider.rating}
💰 Price: ${matchedProvider.price}
🕒 Time: ${matchedProvider.available}
🛠️ Specialty: ${matchedProvider.specialty}

Now please share your feedback for Society Copilot.`,
        time: getCurrentTime(),
      });

      setClosedChats((prev) => ({
        ...prev,
        [chatId]: true,
      }));

      setLastProvider(matchedProvider);
      return;
    }

    if (matchedProvider && wantsContact) {
      addMessageToChat(chatId, {
        sender: "provider",
        text: `Sure ✅ Here are the provider contact details:

Provider: ${matchedProvider.name}
Service: ${matchedProvider.service}

📞 Phone: ${matchedProvider.phone}
📧 Email: ${matchedProvider.email}

⭐ Rating: ${matchedProvider.rating}
💰 Price: ${matchedProvider.price}
🕒 Available: ${matchedProvider.available}
🛠️ Specialty: ${matchedProvider.specialty}

Type "book this provider" if you want me to confirm booking.`,
        time: getCurrentTime(),
      });

      setLastProvider(matchedProvider);
      return;
    }

    if (matchedProvider) {
      addMessageToChat(chatId, {
        sender: "provider",
        text: `I found a provider for you ✅

Provider: ${matchedProvider.name}
Service: ${matchedProvider.service}
Rating: ${matchedProvider.rating}
Price: ${matchedProvider.price}
Available: ${matchedProvider.available}
Specialty: ${matchedProvider.specialty}

Do you want phone/email or should I book this provider?`,
        time: getCurrentTime(),
      });

      setLastProvider(matchedProvider);
      return;
    }

    addMessageToChat(chatId, {
      sender: "provider",
      text: `Please tell me which service you need:

• Home Cleaning
• Plumber
• Electrician
• AC Repair

Example: "Give me phone number of home cleaning provider".`,
      time: getCurrentTime(),
      actions: [
        "Need home cleaning",
        "Need plumber",
        "Need electrician",
        "Need AC repair",
      ],
    });
  };

  const handleSend = () => {
    if (!messageText.trim() || isSending || isCurrentChatClosed) return;

    const query = messageText.trim();
    const chatId = selectedChatId;

    addMessageToChat(chatId, {
      sender: "user",
      text: query,
      time: getCurrentTime(),
    });

    setMessageText("");
    setIsSending(true);
    setAiTyping(true);

    setTimeout(() => {
      handleAiReply(query, chatId);
      setAiTyping(false);
      setIsSending(false);
    }, 600);
  };

  const submitFeedback = () => {
    const chatId = selectedChatId;

    addMessageToChat(chatId, {
      sender: "user",
      text: `Feedback submitted: ${feedbackRating}/5 ⭐ ${feedbackText}`,
      time: getCurrentTime(),
    });

    addMessageToChat(chatId, {
      sender: "provider",
      text: "Thank you for your feedback 💜 This conversation is now closed.",
      time: getCurrentTime(),
    });

    setFeedbackDone((prev) => ({
      ...prev,
      [chatId]: true,
    }));

    setFeedbackText("");
    setFeedbackRating(5);
  };

  return (
    <div style={styles.page}>
      <div style={styles.blob1}></div>
      <div style={styles.blob2}></div>
      <div style={styles.blob3}></div>

      <div style={styles.container}>
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
                <h4 style={styles.userName}>{currentUser.name}</h4>
                <p style={styles.userEmail}>{currentUser.email}</p>
              </div>
            </div>

            <nav style={styles.nav}>
              <Link to="/user/dashboard" style={styles.navItem}>
                🏠 Dashboard
              </Link>
              <Link to="/user/profile" style={styles.navItem}>
                👤 Profile
              </Link>
              <Link to="/user/services" style={styles.navItem}>
                🛍️ Browse Services
              </Link>
              <Link to="/user/bookings" style={styles.navItem}>
                📅 Bookings
              </Link>
              <Link to="/user/wallet" style={styles.navItem}>
                💳 Wallet
              </Link>
              <Link
                to="/user/chat"
                style={{ ...styles.navItem, ...styles.activeNavItem }}
              >
                💬 AI Chat
              </Link>
            </nav>
          </div>

          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </aside>

        <main style={styles.main}>
          <div style={styles.navbar}>
            <div>
              <p style={styles.navbarSub}>AI booking assistant</p>
              <h1 style={styles.navbarTitle}>Society Copilot</h1>
            </div>
          </div>

          <div style={styles.chatLayout}>
            <section style={styles.chatListPanel}>
              <div style={styles.panelHeader}>
                <div>
                  <h2 style={styles.panelTitle}>Conversations</h2>
                  <p style={styles.panelSub}>Only AI chat</p>
                </div>
                <div style={styles.countBadge}>1</div>
              </div>

              <div style={styles.chatList}>
                {chatList.map((chat) => {
                  const savedMessages = dynamicMessages[chat.id] || [];
                  const lastSaved = savedMessages[savedMessages.length - 1];

                  return (
                    <button
                      key={chat.id}
                      onClick={() => setSelectedChatId(chat.id)}
                      style={{
                        ...styles.chatCard,
                        background: chat.bg,
                        ...(selectedChatId === chat.id
                          ? styles.activeChatCard
                          : {}),
                      }}
                    >
                      <div style={styles.chatAvatarWrap}>
                        <div style={styles.chatAvatar}>{chat.avatar}</div>
                        <span style={styles.onlineDot}></span>
                      </div>

                      <div style={styles.chatInfo}>
                        <div style={styles.chatInfoTop}>
                          <h4 style={styles.chatName}>{chat.name}</h4>
                          <span style={styles.chatTime}>
                            {lastSaved?.time || chat.time}
                          </span>
                        </div>

                        <p style={styles.chatService}>{chat.service}</p>

                        <p style={styles.chatPreview}>
                          {isCurrentChatClosed
                            ? "Booking completed"
                            : lastSaved?.text || chat.lastMessage}
                        </p>
                      </div>

                      {isCurrentChatClosed && (
                        <div style={styles.closedBadge}>Done</div>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            <section style={styles.chatWindow}>
              <div style={styles.chatHeader}>
                <div style={styles.chatHeaderLeft}>
                  <div style={styles.selectedAvatar}>
                    {selectedChat.avatar}
                  </div>
                  <div>
                    <h3 style={styles.selectedName}>{selectedChat.name}</h3>
                    <p style={styles.selectedService}>
                      {selectedChat.service}
                    </p>
                  </div>
                </div>

                <div style={styles.headerActions}>
                  <div style={styles.headerStatus}>
                    {isCurrentChatClosed ? "Closed" : "AI Online"}
                  </div>

                  {isFeedbackDone && (
                    <button style={styles.newChatBtn} onClick={resetAiChat}>
                      New AI Chat
                    </button>
                  )}
                </div>
              </div>

              <div style={styles.messagesArea}>
                {allMessages.map((msg, index) => (
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
                      <p
                        style={{
                          ...styles.messageText,
                          whiteSpace: "pre-line",
                        }}
                      >
                        {msg.text}
                      </p>

                      {msg.actions?.length > 0 && !isCurrentChatClosed && (
                        <div style={styles.actionWrap}>
                          {msg.actions.map((action, i) => (
                            <button
                              key={i}
                              style={styles.actionChip}
                              onClick={() => setMessageText(action)}
                            >
                              {action}
                            </button>
                          ))}
                        </div>
                      )}

                      <span style={styles.messageTime}>{msg.time}</span>
                    </div>
                  </div>
                ))}

                {aiTyping && (
                  <div style={styles.messageRow}>
                    <div style={styles.typingBubble}>
                      Society Copilot is typing...
                    </div>
                  </div>
                )}

                {isCurrentChatClosed && !isFeedbackDone && (
                  <div style={styles.feedbackBox}>
                    <h3 style={styles.feedbackTitle}>Rate Society Copilot</h3>
                    <p style={styles.feedbackSub}>
                      Booking is done. Please share quick feedback.
                    </p>

                    <select
                      value={feedbackRating}
                      onChange={(e) =>
                        setFeedbackRating(Number(e.target.value))
                      }
                      style={styles.feedbackSelect}
                    >
                      <option value={5}>5 ⭐ Excellent</option>
                      <option value={4}>4 ⭐ Good</option>
                      <option value={3}>3 ⭐ Average</option>
                      <option value={2}>2 ⭐ Poor</option>
                      <option value={1}>1 ⭐ Bad</option>
                    </select>

                    <textarea
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      style={styles.feedbackTextarea}
                      placeholder="Write feedback..."
                    />

                    <button style={styles.feedbackBtn} onClick={submitFeedback}>
                      Submit Feedback
                    </button>
                  </div>
                )}

                <div ref={messagesEndRef}></div>
              </div>

              <div style={styles.inputBar}>
                <input
                  type="text"
                  placeholder={
                    isCurrentChatClosed
                      ? isFeedbackDone
                        ? "Conversation closed. Click New AI Chat to start again."
                        : "Booking confirmed. Please submit feedback."
                      : "Ask for service, phone number, email, or booking..."
                  }
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  style={{
                    ...styles.messageInput,
                    ...(isCurrentChatClosed ? styles.disabledInput : {}),
                  }}
                  disabled={isCurrentChatClosed}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />

                <button
                  style={{
                    ...styles.sendBtn,
                    ...(isCurrentChatClosed ? styles.disabledBtn : {}),
                  }}
                  onClick={handleSend}
                  disabled={isSending || isCurrentChatClosed}
                >
                  {isSending ? "Sending..." : "Send"}
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
      "linear-gradient(135deg, #fff7fb 0%, #f4edff 45%, #eef7ff 100%)",
    position: "relative",
    overflowX: "hidden",
    overflowY: "auto",
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
    color: "#302348",
  },
  blob1: {
    position: "absolute",
    width: "330px",
    height: "330px",
    borderRadius: "50%",
    background: "rgba(196, 159, 255, 0.35)",
    top: "-100px",
    left: "-90px",
    filter: "blur(18px)",
  },
  blob2: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "rgba(255, 180, 215, 0.35)",
    right: "-80px",
    top: "110px",
    filter: "blur(22px)",
  },
  blob3: {
    position: "absolute",
    width: "260px",
    height: "260px",
    borderRadius: "50%",
    background: "rgba(171, 224, 255, 0.35)",
    bottom: "-90px",
    left: "48%",
    filter: "blur(22px)",
  },
  container: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    minHeight: "100vh",
    padding: "22px",
    gap: "22px",
    alignItems: "stretch",
    boxSizing: "border-box",
  },
  sidebar: {
    width: "285px",
    borderRadius: "34px",
    background: "rgba(255,255,255,0.72)",
    backdropFilter: "blur(22px)",
    border: "1px solid rgba(255,255,255,0.9)",
    boxShadow: "0 24px 60px rgba(121, 89, 172, 0.18)",
    padding: "22px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexShrink: 0,
    boxSizing: "border-box",
  },
  brandCard: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "16px",
    borderRadius: "26px",
    background: "linear-gradient(135deg, #f6efff, #ffffff)",
    boxShadow: "0 14px 34px rgba(129, 93, 199, 0.13)",
    marginBottom: "18px",
  },
  logoIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "18px",
    display: "grid",
    placeItems: "center",
    background: "linear-gradient(135deg, #9b6bff, #ff8fc7)",
    color: "#fff",
    fontWeight: "900",
    fontSize: "22px",
  },
  logoText: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "900",
    color: "#3d2a63",
  },
  logoSub: {
    margin: "3px 0 0",
    fontSize: "12px",
    color: "#9b86bd",
    fontWeight: "700",
  },
  userCard: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
    padding: "14px",
    borderRadius: "24px",
    background: "rgba(255,255,255,0.72)",
    border: "1px solid rgba(225,211,255,0.75)",
    marginBottom: "20px",
  },
  userAvatar: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #ff9acb, #9f77ff)",
    color: "#fff",
    display: "grid",
    placeItems: "center",
    fontWeight: "900",
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
    fontSize: "14px",
    fontWeight: "900",
    color: "#382158",
  },
  userEmail: {
    margin: "4px 0 0",
    fontSize: "11px",
    color: "#9a8aac",
    maxWidth: "165px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  navItem: {
    textDecoration: "none",
    padding: "13px 15px",
    borderRadius: "18px",
    color: "#746385",
    fontWeight: "800",
    fontSize: "14px",
    background: "rgba(255,255,255,0.5)",
  },
  activeNavItem: {
    background: "linear-gradient(135deg, #9b6bff, #ff91c8)",
    color: "#fff",
    boxShadow: "0 14px 28px rgba(155,107,255,0.28)",
  },
  logoutBtn: {
    border: "none",
    padding: "14px",
    borderRadius: "20px",
    background: "linear-gradient(135deg, #2f2442, #6a4da3)",
    color: "#fff",
    fontWeight: "900",
    cursor: "pointer",
  },
  main: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
  },
  navbar: {
    minHeight: "92px",
    borderRadius: "32px",
    background: "rgba(255,255,255,0.66)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.88)",
    boxShadow: "0 18px 45px rgba(125, 91, 180, 0.13)",
    padding: "0 28px",
    display: "flex",
    alignItems: "center",
    marginBottom: "22px",
    flexShrink: 0,
    boxSizing: "border-box",
  },
  navbarSub: {
    margin: 0,
    color: "#9b86bd",
    fontSize: "13px",
    fontWeight: "800",
  },
  navbarTitle: {
    margin: "5px 0 0",
    color: "#2f204d",
    fontSize: "31px",
    fontWeight: "950",
  },
  chatLayout: {
    display: "grid",
    gridTemplateColumns: "360px 1fr",
    gap: "22px",
    height: "calc(100vh - 158px)",
    minHeight: 0,
  },
  chatListPanel: {
    borderRadius: "34px",
    background: "rgba(255,255,255,0.72)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.9)",
    boxShadow: "0 22px 55px rgba(126, 87, 194, 0.14)",
    padding: "20px",
    overflow: "hidden",
    minHeight: 0,
    boxSizing: "border-box",
  },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },
  panelTitle: {
    margin: 0,
    fontSize: "21px",
    fontWeight: "950",
    color: "#352255",
  },
  panelSub: {
    margin: "4px 0 0",
    fontSize: "12px",
    color: "#9c89b4",
    fontWeight: "700",
  },
  countBadge: {
    width: "38px",
    height: "38px",
    borderRadius: "15px",
    background: "#f1e8ff",
    color: "#8055e8",
    display: "grid",
    placeItems: "center",
    fontWeight: "900",
  },
  chatList: {
    display: "flex",
    flexDirection: "column",
    gap: "13px",
    height: "calc(100% - 62px)",
    overflowY: "auto",
    paddingRight: "4px",
  },
  chatCard: {
    width: "100%",
    border: "1px solid rgba(255,255,255,0.8)",
    borderRadius: "25px",
    padding: "14px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    textAlign: "left",
    position: "relative",
    boxShadow: "0 12px 26px rgba(105, 73, 158, 0.09)",
  },
  activeChatCard: {
    transform: "translateY(-2px)",
    outline: "3px solid rgba(155,107,255,0.25)",
  },
  chatAvatarWrap: {
    position: "relative",
    flexShrink: 0,
  },
  chatAvatar: {
    width: "48px",
    height: "48px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.75)",
    display: "grid",
    placeItems: "center",
    fontSize: "22px",
  },
  onlineDot: {
    position: "absolute",
    right: "-2px",
    bottom: "2px",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#30d982",
    border: "2px solid #fff",
  },
  chatInfo: {
    flex: 1,
    minWidth: 0,
  },
  chatInfoTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: "8px",
  },
  chatName: {
    margin: 0,
    fontSize: "15px",
    color: "#33204f",
    fontWeight: "950",
  },
  chatTime: {
    fontSize: "10px",
    color: "#9a88ac",
    fontWeight: "800",
    whiteSpace: "nowrap",
  },
  chatService: {
    margin: "3px 0",
    fontSize: "11px",
    color: "#8758dc",
    fontWeight: "850",
  },
  chatPreview: {
    margin: 0,
    fontSize: "12px",
    color: "#796b88",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  closedBadge: {
    position: "absolute",
    right: "12px",
    bottom: "10px",
    fontSize: "10px",
    padding: "4px 8px",
    borderRadius: "999px",
    background: "#ffffffb8",
    color: "#7654c8",
    fontWeight: "900",
  },
  chatWindow: {
    borderRadius: "34px",
    background: "rgba(255,255,255,0.72)",
    backdropFilter: "blur(22px)",
    border: "1px solid rgba(255,255,255,0.92)",
    boxShadow: "0 22px 55px rgba(126, 87, 194, 0.14)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
  },
  chatHeader: {
    padding: "18px 22px",
    borderBottom: "1px solid rgba(220,205,245,0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(246,239,255,0.82))",
    flexShrink: 0,
  },
  chatHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
  },
  selectedAvatar: {
    width: "52px",
    height: "52px",
    borderRadius: "20px",
    background: "linear-gradient(135deg, #f7eaff, #ffffff)",
    display: "grid",
    placeItems: "center",
    fontSize: "24px",
  },
  selectedName: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "950",
    color: "#30204d",
  },
  selectedService: {
    margin: "4px 0 0",
    fontSize: "12px",
    color: "#9a86b7",
    fontWeight: "750",
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  headerStatus: {
    padding: "9px 14px",
    borderRadius: "999px",
    background: "#efe7ff",
    color: "#7c4fe6",
    fontSize: "12px",
    fontWeight: "900",
    whiteSpace: "nowrap",
  },
  newChatBtn: {
    border: "none",
    borderRadius: "999px",
    padding: "9px 14px",
    background: "linear-gradient(135deg, #9b6bff, #ff8fc7)",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "900",
    cursor: "pointer",
    boxShadow: "0 10px 22px rgba(155,107,255,0.22)",
    whiteSpace: "nowrap",
  },
  messagesArea: {
    flex: 1,
    padding: "24px",
    overflowY: "auto",
    minHeight: 0,
    background:
      "radial-gradient(circle at top left, rgba(255,230,245,0.9), transparent 34%), radial-gradient(circle at bottom right, rgba(229,219,255,0.95), transparent 36%)",
  },
  messageRow: {
    display: "flex",
    marginBottom: "15px",
  },
  messageBubble: {
    maxWidth: "68%",
    padding: "13px 15px",
    borderRadius: "22px",
    position: "relative",
    boxShadow: "0 14px 28px rgba(103, 76, 153, 0.1)",
  },
  userBubble: {
    background: "linear-gradient(135deg, #9b6bff, #ff8fc7)",
    color: "#fff",
    borderBottomRightRadius: "7px",
  },
  providerBubble: {
    background: "rgba(255,255,255,0.92)",
    color: "#443456",
    borderBottomLeftRadius: "7px",
    border: "1px solid rgba(235,226,249,0.9)",
  },
  messageText: {
    margin: 0,
    fontSize: "14px",
    lineHeight: "1.55",
    fontWeight: "600",
  },
  messageTime: {
    display: "block",
    marginTop: "8px",
    fontSize: "10px",
    opacity: 0.72,
    fontWeight: "800",
    textAlign: "right",
  },
  actionWrap: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginTop: "12px",
  },
  actionChip: {
    border: "none",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "#efe4ff",
    color: "#7b4cff",
    fontWeight: "900",
    cursor: "pointer",
  },
  typingBubble: {
    width: "fit-content",
    background: "#fff",
    padding: "12px 16px",
    borderRadius: "18px",
    color: "#7c6ea0",
    fontSize: "13px",
    fontWeight: "800",
    boxShadow: "0 10px 22px rgba(124,96,190,0.08)",
  },
  feedbackBox: {
    maxWidth: "420px",
    margin: "20px auto",
    padding: "22px",
    borderRadius: "28px",
    background: "rgba(255,255,255,0.86)",
    border: "1px solid rgba(230,215,255,0.95)",
    boxShadow: "0 18px 40px rgba(126,87,194,0.16)",
  },
  feedbackTitle: {
    margin: 0,
    color: "#33204f",
    fontWeight: "950",
    fontSize: "20px",
  },
  feedbackSub: {
    margin: "6px 0 14px",
    color: "#9a86b7",
    fontSize: "13px",
    fontWeight: "700",
  },
  feedbackSelect: {
    width: "100%",
    border: "1px solid #e3d4ff",
    borderRadius: "16px",
    padding: "12px",
    outline: "none",
    color: "#4b3470",
    fontWeight: "800",
    marginBottom: "12px",
    background: "#fff",
  },
  feedbackTextarea: {
    width: "100%",
    minHeight: "90px",
    border: "1px solid #e3d4ff",
    borderRadius: "16px",
    padding: "12px",
    outline: "none",
    resize: "none",
    color: "#4b3470",
    fontWeight: "700",
    boxSizing: "border-box",
    marginBottom: "12px",
  },
  feedbackBtn: {
    width: "100%",
    border: "none",
    borderRadius: "16px",
    padding: "13px",
    background: "linear-gradient(135deg, #9b6bff, #ff8fc7)",
    color: "#fff",
    fontWeight: "950",
    cursor: "pointer",
  },
  inputBar: {
    padding: "18px",
    display: "flex",
    gap: "12px",
    borderTop: "1px solid rgba(220,205,245,0.8)",
    background: "rgba(255,255,255,0.86)",
    flexShrink: 0,
  },
  messageInput: {
    flex: 1,
    border: "1px solid #e5d8ff",
    borderRadius: "19px",
    padding: "14px 16px",
    outline: "none",
    fontSize: "14px",
    color: "#41295f",
    fontWeight: "700",
    background: "#fff",
  },
  disabledInput: {
    background: "#f0edf5",
    color: "#9e93aa",
    cursor: "not-allowed",
  },
  sendBtn: {
    border: "none",
    borderRadius: "19px",
    padding: "0 24px",
    background: "linear-gradient(135deg, #9b6bff, #ff8fc7)",
    color: "#fff",
    fontWeight: "950",
    cursor: "pointer",
  },
  disabledBtn: {
    opacity: 0.55,
    cursor: "not-allowed",
    boxShadow: "none",
  },
};

export default Chat;
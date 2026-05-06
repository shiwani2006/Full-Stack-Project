import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const defaultUser = {
    name: "User",
    email: "user@example.com",
    role: "user",
    phone: "",
    city: "",
    bio: "I love exploring useful local services around my area.",
    profileImage: "",
    creditBalance: 0,
  };

  const getStoredUser = () => {
    return JSON.parse(localStorage.getItem("user")) || defaultUser;
  };

  const [userData, setUserData] = useState(getStoredUser());
  const [formData, setFormData] = useState(getStoredUser());
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch fresh profile from backend
    axiosInstance.get("/users/me")
      .then((res) => {
        const freshUser = res.data.user;
        localStorage.setItem("user", JSON.stringify(freshUser));
        setUserData(freshUser);
        setFormData(freshUser);
      })
      .catch(() => {
        // fallback to localStorage if API fails
        const latestUser = getStoredUser();
        setUserData(latestUser);
        setFormData(latestUser);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    setUserData(updated);
  };

  const handleChoosePhoto = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload only PNG, JPG, JPEG, or WEBP image.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = { ...formData, profileImage: reader.result };
      setFormData(updated);
      setUserData(updated);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    const updated = { ...formData, profileImage: "" };
    setFormData(updated);
    setUserData(updated);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = async () => {
    try {
      const res = await axiosInstance.patch("/users/me", {
        name: formData.name,
        profileImage: formData.profileImage,
      });
      const updatedUser = res.data.user;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUserData(updatedUser);
      setIsEditing(false);
      alert("Profile saved successfully");
    } catch (err) {
      alert("Failed to save profile. Please try again.");
    }
  };

  const handleCancel = () => {
    const latestUser = getStoredUser();
    setFormData(latestUser);
    setUserData(latestUser);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const initial = userData?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div style={styles.page}>
      <div style={styles.bgBlob1}></div>
      <div style={styles.bgBlob2}></div>
      <div style={styles.bgBlob3}></div>

      <div style={styles.layout}>
        <aside style={styles.sidebar}>
          <div>
            <div style={styles.logoWrap}>
              <div style={styles.logoIcon}>S</div>
              <div>
                <h2 style={styles.logoText}>SkillSwap</h2>
                <p style={styles.logoSub}>time as value</p>
              </div>
            </div>

            <div style={styles.sideUserCard}>
              <div style={styles.sideUserAvatar}>
                {userData.profileImage ? (
                  <img
                    src={userData.profileImage}
                    alt="User"
                    style={styles.sideUserAvatarImg}
                  />
                ) : (
                  initial
                )}
              </div>
              <div>
                <h4 style={styles.sideUserName}>{userData.name || "User"}</h4>
                <p style={styles.sideUserEmail}>{userData.email || "user@gmail.com"}</p>
              </div>
            </div>

            <nav style={styles.nav}>
              <Link to="/user/dashboard" style={styles.navItem}>
                <span style={styles.navIcon}>🏠</span>
                Dashboard
              </Link>

              <Link to="/user/profile" style={{ ...styles.navItem, ...styles.activeNavItem }}>
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

              <Link to="/user/chat" style={styles.navItem}>
                <span style={styles.navIcon}>💬</span>
                Chat
              </Link>
            </nav>
          </div>

          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </aside>

        <main style={styles.main}>
          <div style={styles.topbar}>
            <div>
              <p style={styles.topbarSub}>Manage your pastel profile</p>
              <h1 style={styles.topbarTitle}>Hi, {userData.name || "User"}</h1>
            </div>

            <div style={styles.topbarBtns}>
              <button style={styles.topBtn} onClick={() => navigate("/user/dashboard")}>
                Dashboard
              </button>
              <button style={{ ...styles.topBtn, ...styles.topBtnActive }}>
                Profile
              </button>
            </div>
          </div>

          <div style={styles.profileGrid}>
            <section style={styles.leftCard}>
              <div style={styles.banner}></div>

              <div style={styles.avatarSection}>
                <div style={styles.avatarWrapper}>
                  {userData.profileImage ? (
                    <img
                      src={userData.profileImage}
                      alt="Profile"
                      style={styles.avatarImage}
                    />
                  ) : (
                    <div style={styles.avatarFallback}>{initial}</div>
                  )}

                  <button
                    type="button"
                    style={styles.cameraBtn}
                    onClick={handleChoosePhoto}
                    title="Change profile photo"
                  >
                    📷
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handlePhotoChange}
                  style={{ display: "none" }}
                />

                <h2 style={styles.profileName}>{userData.name || "User Name"}</h2>
                <p style={styles.profileEmail}>{userData.email || "user@gmail.com"}</p>

                <div style={styles.accountBadge}>{userData.role || "User"} Account</div>

                <div style={styles.photoButtons}>
                  <button style={styles.changePhotoBtn} onClick={handleChoosePhoto}>
                    Change Photo
                  </button>
                  <button style={styles.removePhotoBtn} onClick={handleRemovePhoto}>
                    Remove
                  </button>
                </div>
              </div>

              <div style={styles.miniStatsGrid}>
                <div style={styles.miniStatCard}>
                  <p style={styles.miniStatLabel}>Credits</p>
                  <h4 style={styles.miniStatValue}>{userData.creditBalance || 0}</h4>
                </div>
                <div style={styles.miniStatCard}>
                  <p style={styles.miniStatLabel}>City</p>
                  <h4 style={styles.miniStatValue}>{userData.city || "N/A"}</h4>
                </div>
              </div>

              <div style={styles.infoList}>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Phone</span>
                  <span style={styles.infoValue}>{userData.phone || "Not added"}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Role</span>
                  <span style={styles.infoValue}>{userData.role || "User"}</span>
                </div>
              </div>
            </section>

            <section style={styles.rightCard}>
              <div style={styles.rightHeader}>
                <div>
                  <p style={styles.rightHeaderSub}>Personal Information</p>
                  <h2 style={styles.rightHeaderTitle}>Profile Details</h2>
                </div>

                {!isEditing ? (
                  <button style={styles.editBtn} onClick={() => setIsEditing(true)}>
                    ✏️ Edit Profile
                  </button>
                ) : (
                  <div style={styles.editActionsTop}>
                    <button style={styles.smallCancelBtn} onClick={handleCancel}>
                      Cancel
                    </button>
                    <button style={styles.smallSaveBtn} onClick={handleSave}>
                      Save
                    </button>
                  </div>
                )}
              </div>

              {!isEditing ? (
                <div style={styles.detailsView}>
                  <div style={styles.detailBlock}>
                    <p style={styles.detailLabel}>Full Name</p>
                    <h4 style={styles.detailValue}>{userData.name || "Not added"}</h4>
                  </div>

                  <div style={styles.detailBlock}>
                    <p style={styles.detailLabel}>Email</p>
                    <h4 style={styles.detailValue}>{userData.email || "Not added"}</h4>
                  </div>

                  <div style={styles.detailBlock}>
                    <p style={styles.detailLabel}>Role</p>
                    <h4 style={styles.detailValue}>{userData.role || "User"}</h4>
                  </div>

                  <div style={styles.detailBlock}>
                    <p style={styles.detailLabel}>Phone</p>
                    <h4 style={styles.detailValue}>{userData.phone || "Not added"}</h4>
                  </div>

                  <div style={styles.detailBlock}>
                    <p style={styles.detailLabel}>City</p>
                    <h4 style={styles.detailValue}>{userData.city || "Not added"}</h4>
                  </div>

                  <div style={styles.detailBlock}>
                    <p style={styles.detailLabel}>Bio</p>
                    <p style={styles.bioText}>
                      {userData.bio || "No bio added yet."}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={styles.formGrid}>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name || ""}
                        onChange={handleInputChange}
                        style={styles.input}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email || ""}
                        onChange={handleInputChange}
                        style={styles.input}
                        placeholder="Enter your email"
                        disabled
                      />
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone || ""}
                        onChange={handleInputChange}
                        style={styles.input}
                        placeholder="Enter phone number"
                      />
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city || ""}
                        onChange={handleInputChange}
                        style={styles.input}
                        placeholder="Enter your city"
                      />
                    </div>

                    <div style={{ ...styles.inputGroup, gridColumn: "1 / -1" }}>
                      <label style={styles.label}>Bio</label>
                      <textarea
                        name="bio"
                        value={formData.bio || ""}
                        onChange={handleInputChange}
                        style={styles.textarea}
                        placeholder="Write something about yourself"
                      />
                    </div>
                  </div>

                  <div style={styles.livePreviewBox}>
                    <p style={styles.livePreviewTitle}>Live Preview</p>
                    <p style={styles.livePreviewText}>
                      {userData.bio || "Your bio preview will appear here."}
                    </p>
                  </div>

                  <div style={styles.bottomActionRow}>
                    <button style={styles.cancelBtn} onClick={handleCancel}>
                      Cancel
                    </button>
                    <button style={styles.saveBtn} onClick={handleSave}>
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

const styles = {
  page: { minHeight: "100vh", background: "linear-gradient(135deg, #faf7ff 0%, #f7f1ff 35%, #fdf5fb 65%, #eef5ff 100%)", fontFamily: "'Poppins', 'Segoe UI', sans-serif", position: "relative", overflowX: "hidden" },
  bgBlob1: { position: "absolute", top: "-80px", right: "-60px", width: "280px", height: "280px", borderRadius: "50%", background: "rgba(181, 145, 255, 0.16)", filter: "blur(80px)" },
  bgBlob2: { position: "absolute", left: "-80px", bottom: "100px", width: "240px", height: "240px", borderRadius: "50%", background: "rgba(255, 190, 225, 0.16)", filter: "blur(80px)" },
  bgBlob3: { position: "absolute", top: "260px", left: "45%", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(140, 190, 255, 0.12)", filter: "blur(80px)" },
  layout: { display: "flex", gap: "24px", alignItems: "flex-start", padding: "24px", position: "relative", zIndex: 2 },
  sidebar: { width: "300px", minWidth: "300px", height: "calc(100vh - 48px)", position: "sticky", top: "24px", background: "rgba(255,255,255,0.58)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.65)", borderRadius: "30px", padding: "24px 18px", boxShadow: "0 18px 40px rgba(124, 96, 190, 0.08)", display: "flex", flexDirection: "column", justifyContent: "space-between" },
  logoWrap: { display: "flex", alignItems: "center", gap: "14px", marginBottom: "22px" },
  logoIcon: { width: "54px", height: "54px", borderRadius: "18px", background: "linear-gradient(135deg, #8f6bff 0%, #c79cff 100%)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", fontWeight: "800", boxShadow: "0 14px 28px rgba(143, 107, 255, 0.22)" },
  logoText: { margin: 0, fontSize: "30px", fontWeight: "800", color: "#7d4cff" },
  logoSub: { margin: "4px 0 0 0", color: "#9b8bb5", fontSize: "13px" },
  sideUserCard: { display: "flex", alignItems: "center", gap: "12px", padding: "14px", borderRadius: "22px", background: "linear-gradient(135deg, #f4ecff 0%, #fdebf5 100%)", marginBottom: "18px", boxShadow: "0 10px 20px rgba(143, 107, 255, 0.08)" },
  sideUserAvatar: { width: "48px", height: "48px", borderRadius: "16px", background: "linear-gradient(135deg, #8f6bff 0%, #c79cff 100%)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "18px", overflow: "hidden", flexShrink: 0 },
  sideUserAvatarImg: { width: "100%", height: "100%", objectFit: "cover" },
  sideUserName: { margin: 0, fontSize: "16px", color: "#3f2d5c", fontWeight: "700" },
  sideUserEmail: { margin: "4px 0 0 0", fontSize: "12px", color: "#8d7da9", wordBreak: "break-word" },
  nav: { display: "flex", flexDirection: "column", gap: "14px" },
  navItem: { textDecoration: "none", color: "#5e517d", fontSize: "17px", fontWeight: "600", padding: "18px 20px", borderRadius: "20px", background: "rgba(255,255,255,0.7)", border: "1px solid rgba(220, 209, 244, 0.7)", display: "flex", alignItems: "center", gap: "12px" },
  activeNavItem: { color: "#7b4cff", background: "linear-gradient(135deg, #efe4ff 0%, #e7d8ff 100%)", boxShadow: "0 10px 24px rgba(143, 107, 255, 0.12)" },
  navIcon: { fontSize: "18px" },
  logoutBtn: { border: "none", background: "linear-gradient(135deg, #ff95bd 0%, #ffb4cf 100%)", color: "#fff", borderRadius: "16px", padding: "14px 18px", fontWeight: "700", cursor: "pointer", boxShadow: "0 12px 24px rgba(255, 146, 187, 0.16)" },
  main: { flex: 1, minWidth: 0 },
  topbar: { background: "rgba(255,255,255,0.65)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.7)", borderRadius: "28px", padding: "22px 26px", boxShadow: "0 16px 35px rgba(124, 96, 190, 0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px", marginBottom: "24px", flexWrap: "wrap" },
  topbarSub: { margin: 0, color: "#9a8db4", fontSize: "14px", fontWeight: "600" },
  topbarTitle: { margin: "6px 0 0 0", color: "#5d378d", fontSize: "36px", fontWeight: "800" },
  topbarBtns: { display: "flex", gap: "12px", flexWrap: "wrap" },
  topBtn: { border: "1px solid #dccdf6", background: "#fff", color: "#5f4288", borderRadius: "14px", padding: "10px 16px", fontWeight: "700", cursor: "pointer" },
  topBtnActive: { background: "linear-gradient(135deg, #efe4ff 0%, #e7d8ff 100%)", color: "#7b4cff" },
  profileGrid: { display: "grid", gridTemplateColumns: "390px 1fr", gap: "24px" },
  leftCard: { background: "rgba(255,255,255,0.68)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.75)", borderRadius: "32px", overflow: "hidden", boxShadow: "0 16px 35px rgba(124, 96, 190, 0.08)", height: "fit-content" },
  banner: { height: "130px", background: "linear-gradient(135deg, #ccb0ff 0%, #ffd9eb 50%, #cfe6ff 100%)" },
  avatarSection: { marginTop: "-58px", padding: "0 24px 24px", textAlign: "center" },
  avatarWrapper: { width: "140px", height: "140px", margin: "0 auto", position: "relative" },
  avatarImage: { width: "140px", height: "140px", borderRadius: "36px", objectFit: "cover", border: "5px solid rgba(255,255,255,0.95)", background: "#fff", boxShadow: "0 18px 35px rgba(143, 107, 255, 0.18)" },
  avatarFallback: { width: "140px", height: "140px", borderRadius: "36px", background: "linear-gradient(135deg, #8f6bff 0%, #c79cff 100%)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "50px", fontWeight: "800", border: "5px solid rgba(255,255,255,0.95)", boxShadow: "0 18px 35px rgba(143, 107, 255, 0.18)" },
  cameraBtn: { position: "absolute", right: "-2px", bottom: "8px", width: "42px", height: "42px", borderRadius: "50%", border: "3px solid #fff", background: "linear-gradient(135deg, #8f6bff 0%, #b58cff 100%)", color: "#fff", cursor: "pointer", fontSize: "16px", boxShadow: "0 12px 24px rgba(143, 107, 255, 0.22)" },
  profileName: { margin: "18px 0 8px 0", fontSize: "30px", color: "#35244f", fontWeight: "800" },
  profileEmail: { margin: 0, color: "#8a7da5", fontSize: "15px" },
  accountBadge: { margin: "16px auto 20px", display: "inline-block", padding: "10px 16px", borderRadius: "999px", background: "linear-gradient(135deg, #efe5ff 0%, #ffe9f3 100%)", color: "#7c4cff", fontWeight: "700", fontSize: "14px", boxShadow: "0 10px 20px rgba(143, 107, 255, 0.08)" },
  photoButtons: { display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginBottom: "20px" },
  changePhotoBtn: { border: "none", background: "linear-gradient(135deg, #8f6bff 0%, #b58cff 100%)", color: "#fff", borderRadius: "14px", padding: "12px 18px", fontWeight: "700", cursor: "pointer", boxShadow: "0 14px 28px rgba(143, 107, 255, 0.16)" },
  removePhotoBtn: { border: "1px solid #dccdf6", background: "#fff", color: "#5f4288", borderRadius: "14px", padding: "12px 18px", fontWeight: "700", cursor: "pointer" },
  miniStatsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", padding: "0 24px 18px" },
  miniStatCard: { padding: "16px", borderRadius: "20px", background: "linear-gradient(135deg, #f7f0ff 0%, #fff1f8 100%)", border: "1px solid rgba(224, 210, 247, 0.75)", textAlign: "left" },
  miniStatLabel: { margin: 0, fontSize: "13px", color: "#8a7ca6", fontWeight: "600" },
  miniStatValue: { margin: "8px 0 0 0", fontSize: "22px", color: "#362551", fontWeight: "800" },
  infoList: { display: "grid", gap: "12px", padding: "0 24px 24px" },
  infoRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderRadius: "18px", background: "rgba(255,255,255,0.78)", border: "1px solid rgba(223, 210, 246, 0.7)" },
  infoLabel: { color: "#7c7096", fontSize: "14px", fontWeight: "600" },
  infoValue: { color: "#35244f", fontSize: "14px", fontWeight: "700" },
  rightCard: { background: "rgba(255,255,255,0.68)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.75)", borderRadius: "32px", padding: "28px", boxShadow: "0 16px 35px rgba(124, 96, 190, 0.08)" },
  rightHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", flexWrap: "wrap", marginBottom: "24px" },
  rightHeaderSub: { margin: 0, color: "#9a8db4", fontSize: "13px", fontWeight: "600" },
  rightHeaderTitle: { margin: "8px 0 0 0", fontSize: "34px", color: "#171533", fontWeight: "900", letterSpacing: "-0.5px" },
  editBtn: { border: "none", background: "linear-gradient(135deg, #8f6bff 0%, #b58cff 100%)", color: "#fff", borderRadius: "16px", padding: "14px 20px", fontWeight: "700", cursor: "pointer", boxShadow: "0 14px 28px rgba(143, 107, 255, 0.16)" },
  editActionsTop: { display: "flex", gap: "10px", flexWrap: "wrap" },
  smallCancelBtn: { border: "1px solid #dccdf6", background: "#fff", color: "#5f4288", borderRadius: "14px", padding: "12px 16px", fontWeight: "700", cursor: "pointer" },
  smallSaveBtn: { border: "none", background: "linear-gradient(135deg, #8f6bff 0%, #b58cff 100%)", color: "#fff", borderRadius: "14px", padding: "12px 16px", fontWeight: "700", cursor: "pointer" },
  detailsView: { display: "grid", gap: "20px" },
  detailBlock: { paddingBottom: "4px" },
  detailLabel: { margin: 0, fontSize: "15px", color: "#8d83a7", fontWeight: "500" },
  detailValue: { margin: "8px 0 0 0", fontSize: "18px", color: "#151532", fontWeight: "800", wordBreak: "break-word" },
  bioText: { margin: "10px 0 0 0", fontSize: "16px", lineHeight: "1.8", color: "#616a84" },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" },
  inputGroup: { display: "flex", flexDirection: "column" },
  label: { marginBottom: "8px", color: "#5b4f77", fontSize: "14px", fontWeight: "700" },
  input: { border: "1px solid #ddd0f5", borderRadius: "16px", padding: "15px 16px", fontSize: "15px", outline: "none", background: "rgba(255,255,255,0.92)", color: "#3a2f52" },
  textarea: { minHeight: "150px", border: "1px solid #ddd0f5", borderRadius: "16px", padding: "15px 16px", fontSize: "15px", outline: "none", resize: "none", background: "rgba(255,255,255,0.92)", color: "#3a2f52", fontFamily: "'Poppins', 'Segoe UI', sans-serif" },
  livePreviewBox: { marginTop: "22px", padding: "18px", borderRadius: "20px", background: "linear-gradient(135deg, #f7f0ff 0%, #fff1f8 100%)", border: "1px solid rgba(224, 210, 247, 0.75)" },
  livePreviewTitle: { margin: 0, color: "#5a4d78", fontSize: "15px", fontWeight: "700" },
  livePreviewText: { margin: "8px 0 0 0", color: "#7c7096", fontSize: "14px", lineHeight: "1.7" },
  bottomActionRow: { display: "flex", justifyContent: "flex-end", gap: "14px", marginTop: "24px", flexWrap: "wrap" },
  cancelBtn: { border: "1px solid #dccdf6", background: "#fff", color: "#5f4288", borderRadius: "14px", padding: "12px 18px", fontWeight: "700", cursor: "pointer" },
  saveBtn: { border: "none", background: "linear-gradient(135deg, #8f6bff 0%, #b58cff 100%)", color: "#fff", borderRadius: "14px", padding: "12px 20px", fontWeight: "700", cursor: "pointer", boxShadow: "0 14px 28px rgba(143, 107, 255, 0.18)" },
};

export default Profile;

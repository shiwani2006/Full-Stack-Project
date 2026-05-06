import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const sidebarWidth = 280;
export const userSidebarWidth = 280;

const baseStyle = {
  display: "block",
  padding: "14px 16px",
  borderRadius: "16px",
  textDecoration: "none",
  fontWeight: 700,
  marginBottom: "10px",
};

export default function UserSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{
        width: sidebarWidth,
        minHeight: "100vh",
        background: "rgba(255,255,255,0.78)",
        borderRight: "1px solid #efe9ff",
        padding: "24px 18px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div
          style={{
            fontSize: "28px",
            fontWeight: 800,
            color: "#6c4ccf",
            marginBottom: "24px",
          }}
        >
          SkillSwap
        </div>

        <NavLink
          to="/user/dashboard"
          style={({ isActive }) => ({
            ...baseStyle,
            background: isActive ? "#f3ecff" : "transparent",
            color: "#5e44b1",
          })}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/user/profile"
          style={({ isActive }) => ({
            ...baseStyle,
            background: isActive ? "#f3ecff" : "transparent",
            color: "#5e44b1",
          })}
        >
          Profile
        </NavLink>

        <NavLink
          to="/user/services"
          style={({ isActive }) => ({
            ...baseStyle,
            background: isActive ? "#f3ecff" : "transparent",
            color: "#5e44b1",
          })}
        >
          Browse Services
        </NavLink>

        <NavLink
          to="/user/bookings"
          style={({ isActive }) => ({
            ...baseStyle,
            background: isActive ? "#f3ecff" : "transparent",
            color: "#5e44b1",
          })}
        >
          Bookings
        </NavLink>

        <NavLink
          to="/user/wallet"
          style={({ isActive }) => ({
            ...baseStyle,
            background: isActive ? "#f3ecff" : "transparent",
            color: "#5e44b1",
          })}
        >
          Wallet
        </NavLink>

        <NavLink
          to="/user/chat"
          style={({ isActive }) => ({
            ...baseStyle,
            background: isActive ? "#f3ecff" : "transparent",
            color: "#5e44b1",
          })}
        >
          Chat
        </NavLink>
      </div>
      <button
  onClick={() => navigate("/provider/dashboard")}
  style={{
    border: "none",
    background: "linear-gradient(135deg, #8f6bff 0%, #b58cff 100%)",
    color: "#fff",
    borderRadius: "16px",
    padding: "14px 16px",
    fontWeight: 700,
    cursor: "pointer",
    width: "100%",
    fontSize: "15px",
    marginBottom: "10px",
  }}
>
  🔄 Switch to Provider
</button>
      <button
        onClick={handleLogout}
        style={{
          border: "none",
          background: "linear-gradient(135deg, #ff98bf 0%, #ffb4cf 100%)",
          color: "#fff",
          borderRadius: "16px",
          padding: "14px 16px",
          fontWeight: 700,
          cursor: "pointer",
          width: "100%",
          fontSize: "15px",
        }}
      >
        Logout
      </button>
    </div>
  );
}
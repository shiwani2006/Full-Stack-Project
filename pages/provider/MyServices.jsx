import React from "react";
import ProviderSidebar, { providerSidebarWidth } from "../../components/layout/ProviderSidebar";

export default function MyServices() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8f5ff" }}>
      
      <ProviderSidebar />

      <div
        style={{
          width: `calc(100% - ${providerSidebarWidth}px)`,
          padding: "30px",
        }}
      >
        <div style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "20px",
        }}>
          <h1 style={{ color: "#6c4ccf" }}>My Services</h1>
          <p>All your services will appear here.</p>
        </div>
      </div>
    </div>
  );
}
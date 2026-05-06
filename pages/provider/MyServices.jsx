import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProviderSidebar, { providerSidebarWidth } from "../../components/layout/ProviderSidebar";
import ProviderTopbar from "../../components/layout/ProviderTopbar";
import axiosInstance from "../../services/axiosInstance";

export default function MyServices() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user")) || {};

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser.id) return;
    axiosInstance.get(`/services?providerId=${currentUser.id}`)
      .then((res) => setServices(res.data.services || []))
      .catch((err) => console.error("Failed to fetch services", err))
      .finally(() => setLoading(false));
  }, []);

  const getBg = (index) => {
    const bgs = [
      "linear-gradient(135deg, #efe5ff 0%, #e8dcff 100%)",
      "linear-gradient(135deg, #e8fff4 0%, #def5ea 100%)",
      "linear-gradient(135deg, #e7f3ff 0%, #dcecff 100%)",
      "linear-gradient(135deg, #fff1d9 0%, #fde9bf 100%)",
      "linear-gradient(135deg, #ffe8f3 0%, #f9ddeb 100%)",
    ];
    return bgs[index % bgs.length];
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8f5ff" }}>
      <ProviderSidebar />

     <div style={{ marginLeft: `${providerSidebarWidth}px`, width: `calc(100% - ${providerSidebarWidth}px)`, padding: "30px" }}>
        <ProviderTopbar title="My Services" />

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "28px", fontWeight: 900, color: "#1b1838" }}>My Services</h2>
            <p style={{ margin: "6px 0 0 0", color: "#8d83a7", fontSize: "14px" }}>
              {services.length} service{services.length !== 1 ? "s" : ""} listed
            </p>
          </div>
          <button
            onClick={() => navigate("/provider/create-service")}
            style={{
              border: "none",
              background: "linear-gradient(135deg, #8f6bff 0%, #b58cff 100%)",
              color: "#fff",
              borderRadius: "16px",
              padding: "14px 20px",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: "15px",
              boxShadow: "0 12px 22px rgba(143,107,255,0.18)",
            }}
          >
            + Add New Service
          </button>
        </div>

        {/* Services Grid */}
        {loading ? (
          <p style={{ color: "#8d83a7", textAlign: "center", marginTop: "40px" }}>Loading services...</p>
        ) : services.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "60px" }}>
            <p style={{ fontSize: "18px", color: "#8d83a7" }}>You haven't added any services yet.</p>
            <button
              onClick={() => navigate("/provider/create-service")}
              style={{ marginTop: "16px", border: "none", background: "linear-gradient(135deg, #8f6bff 0%, #b58cff 100%)", color: "#fff", borderRadius: "16px", padding: "14px 24px", fontWeight: 700, cursor: "pointer", fontSize: "15px" }}
            >
              Add Your First Service
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {services.map((service, index) => (
              <div
                key={service.id}
                style={{
                  background: getBg(index),
                  borderRadius: "28px",
                  padding: "22px",
                  border: "1px solid rgba(255,255,255,0.82)",
                  boxShadow: "0 18px 32px rgba(124,96,190,0.08)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Card Top */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <div style={{ width: "54px", height: "54px", borderRadius: "18px", background: "rgba(255,255,255,0.8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px" }}>
                    🛠️
                  </div>
                  {service.category && (
                    <span style={{ padding: "8px 12px", borderRadius: "999px", background: "rgba(255,255,255,0.86)", color: "#554379", fontWeight: 700, fontSize: "12px" }}>
                      {service.category}
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <h3 style={{ margin: 0, fontSize: "20px", color: "#1b1838", fontWeight: 800 }}>
                  {service.title}
                </h3>
                <p style={{ margin: "8px 0 12px 0", fontSize: "14px", color: "#626b85", lineHeight: 1.7, flex: 1 }}>
                  {service.description}
                </p>

                {/* Tags */}
                {service.tags?.length > 0 && (
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
                    {service.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} style={{ padding: "6px 10px", borderRadius: "999px", background: "rgba(255,255,255,0.8)", color: "#654b8d", fontSize: "11px", fontWeight: 700 }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Pricing */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "auto" }}>
                  <div>
                    <p style={{ margin: 0, fontSize: "12px", color: "#8d83a7", fontWeight: 600 }}>Price</p>
                    <h4 style={{ margin: "4px 0 0 0", fontSize: "18px", color: "#221e43", fontWeight: 800 }}>
                      {service.cashRate ? `₹${service.cashRate}` : ""}
                      {service.cashRate && service.creditRate ? " / " : ""}
                      {service.creditRate ? `${service.creditRate} credits` : ""}
                    </h4>
                  </div>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      style={{ border: "1px solid #dccdf6", background: "#fff", color: "#5f4288", borderRadius: "12px", padding: "10px 14px", fontWeight: 700, cursor: "pointer", fontSize: "13px" }}
                    >
                      Edit
                    </button>
                    <button
                      style={{ border: "none", background: "linear-gradient(135deg, #8f6bff 0%, #b58cff 100%)", color: "#fff", borderRadius: "12px", padding: "10px 14px", fontWeight: 700, cursor: "pointer", fontSize: "13px" }}
                      onClick={() => navigate("/provider/bookings")}
                    >
                      Bookings
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

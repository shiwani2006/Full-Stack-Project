import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProviderRoute({ children }) {
  const { user } = useAuth();
  const currentUser = user || JSON.parse(localStorage.getItem("user"));

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../pages/auth/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/user/Dashboard";
import Profile from "../pages/user/Profile";
import Services from "../pages/user/Services";
import Bookings from "../pages/user/Bookings";
import Wallet from "../pages/user/Wallet";
import Chat from "../pages/user/Chat";
import UserRequests from "../pages/user/UserRequests";

import ProviderDashboard from "../pages/provider/ProviderDashboard";
import ProviderProfile from "../pages/provider/ProviderProfile";
import MyServices from "../pages/provider/MyServices";
import CreateService from "../pages/provider/CreateService";
import ProviderBookings from "../pages/provider/ProviderBookings";
import Earning from "../pages/provider/Earning";
import ProviderChat from "../pages/provider/ProviderChat";
import ProviderBrowseRequests from "../pages/provider/ProviderBrowseRequests";
import PublicProviderProfile from "../pages/user/PublicProviderProfile";

import ProtectedRoute from "./ProtectedRoute";
import ProviderRoute from "./ProviderRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/user/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/user/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/user/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
      <Route path="/user/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
      <Route path="/user/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
      <Route path="/user/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
      <Route path="/user/requests" element={<ProtectedRoute><UserRequests /></ProtectedRoute>} />
      <Route path="/provider/:providerId/profile" element={<ProtectedRoute><PublicProviderProfile /></ProtectedRoute>} />

      <Route path="/provider/dashboard" element={<ProviderRoute><ProviderDashboard /></ProviderRoute>} />
      <Route path="/provider/profile" element={<ProviderRoute><ProviderProfile /></ProviderRoute>} />
      <Route path="/provider/my-services" element={<ProviderRoute><MyServices /></ProviderRoute>} />
      <Route path="/provider/create-service" element={<ProviderRoute><CreateService /></ProviderRoute>} />
      <Route path="/provider/bookings" element={<ProviderRoute><ProviderBookings /></ProviderRoute>} />
      <Route path="/provider/earning" element={<ProviderRoute><Earning /></ProviderRoute>} />
      <Route path="/provider/chat" element={<ProviderRoute><ProviderChat /></ProviderRoute>} />
      <Route path="/provider/browse-requests" element={<ProviderRoute><ProviderBrowseRequests /></ProviderRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/auth/Home.jsx";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";

import Dashboard from "./pages/user/Dashboard";
import Services from "./pages/user/Services";
import ServiceDetails from "./pages/user/ServiceDetails";
import BookService from "./pages/user/BookService";
import Bookings from "./pages/user/Bookings";
import Wallet from "./pages/user/Wallet";
import Chat from "./pages/user/Chat";
import Profile from "./pages/user/Profile";

import ProviderDashboard from "./pages/provider/ProviderDashboard";
import ProviderProfile from "./pages/provider/ProviderProfile";
import MyServices from "./pages/provider/MyServices";
import CreateService from "./pages/provider/CreateService";
import ProviderBookings from "./pages/provider/ProviderBookings";
import Earning from "./pages/provider/Earnings";
import ProviderChat from "./pages/provider/ProviderChat";
import ProviderBrowseRequests from "./pages/provider/ProviderBrowseRequests";

import ProtectedRoute from "./routes/ProtectedRoute";
import UserRequests from "./pages/user/UserRequests";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      {/* USER ROUTES */}
      <Route path="/user/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/user/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/user/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
      <Route path="/user/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
      <Route path="/user/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
      <Route path="/user/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
      <Route path="/services/:id" element={<ProtectedRoute><ServiceDetails /></ProtectedRoute>} />
      <Route path="/book-service" element={<ProtectedRoute><BookService /></ProtectedRoute>} />

      {/* PROVIDER ROUTES */}
      <Route path="/provider/dashboard" element={<ProtectedRoute><ProviderDashboard /></ProtectedRoute>} />
      <Route path="/provider/profile" element={<ProtectedRoute><ProviderProfile /></ProtectedRoute>} />
      <Route path="/provider/my-services" element={<ProtectedRoute><MyServices /></ProtectedRoute>} />
      <Route path="/provider/create-service" element={<ProtectedRoute><CreateService /></ProtectedRoute>} />
      <Route path="/provider/bookings" element={<ProtectedRoute><ProviderBookings /></ProtectedRoute>} />
      <Route path="/provider/earning" element={<ProtectedRoute><Earning /></ProtectedRoute>} />
      <Route path="/provider/chat" element={<ProtectedRoute><ProviderChat /></ProtectedRoute>} />
      <Route path="/provider/browse-requests" element={<ProtectedRoute><ProviderBrowseRequests /></ProtectedRoute>} />
      <Route path="/user/requests" element={<ProtectedRoute><UserRequests /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

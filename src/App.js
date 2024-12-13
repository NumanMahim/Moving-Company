import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SignUp from "./pages/SignUp";

function App() {
  const [user, setUser] = useState(null); // Stores logged-in user details

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/"
          element={<Login setUser={setUser} />}
        />

        {/* Sign Up Route */}
        <Route
          path="/signup"
          element={<SignUp />}
        />

        {/* Redirect to Dashboards Based on Role */}
        <Route
          path="/dashboard"
          element={
            user?.role === "Admin" ? (
              <Navigate to="/admin-dashboard" />
            ) : user?.role === "Customer" ? (
              <Navigate to="/customer-dashboard" />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Admin Dashboard Route */}
        <Route
          path="/admin-dashboard"
          element={
            user?.role === "Admin" ? (
              <AdminDashboard user={user} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Customer Dashboard Route */}
        <Route
          path="/customer-dashboard"
          element={
            user?.role === "Customer" ? (
              <CustomerDashboard user={user} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

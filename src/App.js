import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SignUp from "./pages/SignUp";
import BookService from "./pages/BookService"; // Add this import
import TrackRequests from "./pages/TrackRequests";
import GetQuote from "./pages/GetQuote";
import CustomerFeedback from "./pages/CustomerFeedback";
import DefineAreas from "./pages/DefineAreas";
import ViewContacts from "./pages/ViewContacts";
import ManageBookings from "./pages/ManageBookings";
import CustomerInquiries from "./pages/CustomerInquiries";


function App() {
  const [user, setUser] = useState(null); // Stores logged-in user details

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Login setUser={setUser} />} />

        {/* Sign Up Route */}
        <Route path="/signup" element={<SignUp />} />

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

        {/* Book Service Route */}
        <Route
  path="/book-service"
  element={<BookService user={user} />}
/>

<Route
  path="/track-requests"
  element={<TrackRequests user={user} />}
/>
<Route
  path="/get-quote"
  element={<GetQuote user={user} />}
/>
<Route
  path="/feedback"
  element={<CustomerFeedback user={user} />}
/>
<Route
          path="/define-areas"
          element={
            user?.role === "Admin" ? (
              <DefineAreas />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
  path="/view-contacts"
  element={
    user?.role === "Admin" ? (
      <ViewContacts />
    ) : (
      <Navigate to="/" />
    )
  }
/>
<Route path="/manage-bookings" element={<ManageBookings />} />
<Route path="/customer-inquiries" element={<CustomerInquiries />} />

      </Routes>
    </Router>
  );
}

export default App;

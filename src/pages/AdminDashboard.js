import React from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <AdminHeader />
      <div className="admin-dashboard-container">
        <div className="hero-section">
          <h1 className="dashboard-title">Welcome to the Admin Dashboard</h1>
          <p className="dashboard-subtitle">Manage all operations seamlessly</p>
        </div>

        <div className="dashboard-grid">
          {/* Define Areas */}
          <div
            className="dashboard-card"
            onClick={() => navigate("/define-areas")}
          >
            <div className="card-icon">📍</div>
            <h3>Define Service Areas</h3>
            <p>Set areas where moving services are available.</p>
          </div>

          {/* View Contacts */}
          <div
            className="dashboard-card"
            onClick={() => navigate("/view-contacts")}
          >
            <div className="card-icon">📋</div>
            <h3>View Contacts</h3>
            <p>Manage all customer contact details.</p>
          </div>

          {/* Bookings Management */}
          <div
            className="dashboard-card"
            onClick={() => navigate("/manage-bookings")}
          >
            <div className="card-icon">📦</div>
            <h3>Manage Bookings</h3>
            <p>Track and oversee all service bookings.</p>
          </div>

          {/* Customer Inquiries */}
          <div
            className="dashboard-card"
            onClick={() => navigate("/customer-inquiries")}
          >
            <div className="card-icon">✉️</div>
            <h3>Customer Inquiries</h3>
            <p>Respond to customer inquiries and requests.</p>
          </div>

          {/* Reports */}
          <div
            className="dashboard-card"
            onClick={() => navigate("/view-reports")}
          >
            <div className="card-icon">📊</div>
            <h3>View Reports</h3>
            <p>Analyze business performance and metrics.</p>
          </div>
        </div>
      </div>
      <AdminFooter />
    </>
  );
};

export default AdminDashboard;

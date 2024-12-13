import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AdminHeader.css";

const AdminHeader = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <header className="admin-header">
      <div className="admin-header-container">
        <h1 className="admin-logo">Admin Panel</h1>
        <nav className="admin-nav">
          <Link to="/admin-dashboard">Home</Link>
          <Link to="/define-areas">Define Areas</Link>
          <Link to="/view-contacts">Contacts</Link>
          <Link to="/manage-bookings">Bookings</Link>
          <Link to="/view-reports">Reports</Link>
          <Link to="/">Logout</Link>
          
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here if needed
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">HR Portal</h1>
        <nav className="nav">
          {user?.role === "HR" && (
            <>
              <Link to="/hr-dashboard">Dashboard</Link>
              <Link to="/employee-list">Employees</Link>
              <Link to="/pending-leave-requests">Leave Requests</Link>
              <Link to="/scheduling">Scheduling</Link>
            </>
          )}
          {user?.role === "Employee" && (
            <>
              <Link to="/employee-dashboard">Dashboard</Link>
              <Link to="/apply-leave">Apply Leave</Link>
              <Link to="/profile">Profile</Link>
            </>
          )}
          {user && (
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HRDashboard.css";

const HRDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="hr-dashboard-container">
      <h1>HR Dashboard</h1>

      <div className="dashboard-grid">
        {/* Button: Employee List */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/employee-list")}
        >
          <div className="card-icon">👥</div>
          <h3>Employee List</h3>
          <p>View and manage the list of employees.</p>
        </div>

        {/* Button: Hire Employee */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/hire-employee")}
        >
          <div className="card-icon">➕</div>
          <h3>Hire Employee</h3>
          <p>Add new employees to the system.</p>
        </div>

        {/* Button: Delete Employee */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/delete-employee")}
        >
          <div className="card-icon">🗑️</div>
          <h3>Delete Employee</h3>
          <p>Remove employees from the system.</p>
        </div>

        {/* Button: Pending Leave Requests */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/pending-leave-requests")}
        >
          <div className="card-icon">📄</div>
          <h3>Pending Leave Requests</h3>
          <p>View and process leave requests.</p>
        </div>

        {/* Button: Scheduling */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/scheduling")}
        >
          <div className="card-icon">📅</div>
          <h3>Scheduling</h3>
          <p>Manage and assign schedules for employees.</p>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;

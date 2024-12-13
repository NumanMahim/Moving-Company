import React from "react";
import "../styles/Home.css"; // Custom styles for the Home page

const Home = ({ user }) => {
  return (
    <div className="home-container">
      <header className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand text-primary fw-bold" href="/">
            HR Portal
          </a>
          <div className="d-flex">
            <button className="btn btn-outline-primary me-2">Profile</button>
            <button className="btn btn-outline-danger">Logout</button>
          </div>
        </div>
      </header>

      <div className="content container mt-5">
        <h2 className="fw-bold text-center mb-4">Welcome, {user.email}!</h2>

        {user.role === "HR" ? (
          <div className="row">
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">Manage Employees</h5>
                  <p className="card-text">Add, update, or view employee details.</p>
                  <button className="btn btn-primary w-100">Go to Employee Management</button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">Leave Approvals</h5>
                  <p className="card-text">View and approve employee leave requests.</p>
                  <button className="btn btn-primary w-100">Manage Leave Requests</button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">Reports</h5>
                  <p className="card-text">Generate and view HR reports.</p>
                  <button className="btn btn-primary w-100">View Reports</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">My Profile</h5>
                  <p className="card-text">View and update your profile details.</p>
                  <button className="btn btn-primary w-100">Go to Profile</button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">Leave Requests</h5>
                  <p className="card-text">Apply for leave or check leave status.</p>
                  <button className="btn btn-primary w-100">Manage Leave</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

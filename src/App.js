import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import HRDashboard from "./pages/HRDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Profile from "./pages/Profile";
import ApplyLeave from "./pages/ApplyLeave";
import EmployeeList from "./pages/EmployeeList";
import SignUp from "./pages/SignUp";
import HireEmployee from "./pages/HireEmployee";
import DeleteEmployee from "./pages/DeleteEmployee";
import PendingLeaveRequests from "./pages/PendingLeaveRequests";
import Scheduling from "./pages/Scheduling";
import Header from "./pages/Header"; // Import Header
import Footer from "./pages/Footer"; // Import Footer
import MySchedule from "./pages/MySchedule";

const Layout = ({ user, children }) => (
  <>
    <Header user={user} />
    <main className="main-content">{children}</main>
    <Footer />
  </>
);

function App() {
  const [user, setUser] = useState(null); // Stores logged-in user details

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/"
          element={
            <Layout user={user}>
              <Login setUser={setUser} />
            </Layout>
          }
        />

        {/* Sign Up Route */}
        <Route
          path="/signup"
          element={
            <Layout user={user}>
              <SignUp />
            </Layout>
          }
        />

        {/* Redirect to Dashboards Based on Role */}
        <Route
          path="/dashboard"
          element={
            user?.role === "HR" ? (
              <Navigate to="/hr-dashboard" />
            ) : user?.role === "Employee" ? (
              <Navigate to="/employee-dashboard" />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* HR Dashboard Route */}
        <Route
          path="/hr-dashboard"
          element={
            user?.role === "HR" ? (
              <Layout user={user}>
                <HRDashboard user={user} />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Employee Dashboard Route */}
        <Route
          path="/employee-dashboard"
          element={
            user?.role === "Employee" ? (
              <Layout user={user}>
                <EmployeeDashboard user={user} />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Profile Route */}
        <Route
          path="/profile"
          element={
            user ? (
              <Layout user={user}>
                <Profile user={user} />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Apply Leave Route */}
        <Route
          path="/apply-leave"
          element={
            user?.role === "Employee" ? (
              <Layout user={user}>
                <ApplyLeave user={user} />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Employee List Route */}
        <Route
          path="/employee-list"
          element={
            user?.role === "HR" ? (
              <Layout user={user}>
                <EmployeeList user={user} />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Hire Employee Route */}
        <Route
          path="/hire-employee"
          element={
            user?.role === "HR" ? (
              <Layout user={user}>
                <HireEmployee user={user} />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Delete Employee Route */}
        <Route
          path="/delete-employee"
          element={
            user?.role === "HR" ? (
              <Layout user={user}>
                <DeleteEmployee user={user} />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Pending Leave Requests Route */}
        <Route
          path="/pending-leave-requests"
          element={
            user?.role === "HR" ? (
              <Layout user={user}>
                <PendingLeaveRequests user={user} />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Scheduling Route */}
        <Route
          path="/scheduling"
          element={
            user?.role === "HR" ? (
              <Layout user={user}>
                <Scheduling user={user} />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        {/* My Schedule Route */}
<Route
  path="/my-schedule"
  element={
    user?.role === "Employee" ? (
      <Layout user={user}>
        <MySchedule user={user} />
      </Layout>
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

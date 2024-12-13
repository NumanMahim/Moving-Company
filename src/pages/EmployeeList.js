import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import "../styles/EmployeeList.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [hrUsers, setHrUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const allUsers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const employeeList = allUsers.filter((user) => user.role === "Employee");
        const hrList = allUsers.filter((user) => user.role === "HR");

        setEmployees(employeeList);
        setHrUsers(hrList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="employee-list-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h1>Employee List</h1>

      {/* Employee Table */}
      <div className="employee-table">
        <h2>Employees</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Joining Date</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name || "N/A"}</td>
                <td>{employee.email || "N/A"}</td>
                <td>{employee.department || "N/A"}</td>
                <td>{employee.joiningDate || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* HR List */}
      <div className="hr-list">
        <h2>HR Panel</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {hrUsers.map((hr) => (
              <tr key={hr.id}>
                <td>{hr.name || "N/A"}</td>
                <td>{hr.email || "N/A"}</td>
                <td>{hr.department || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;

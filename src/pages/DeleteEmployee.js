import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import "../styles/DeleteEmployee.css";

const DeleteEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const employeeList = querySnapshot.docs
          .filter((doc) => doc.data().role === "Employee")
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        setEmployees(employeeList);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setEmployees((prev) => prev.filter((employee) => employee.id !== id));
      setMessage("Employee deleted successfully.");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting employee:", error);
      setMessage("Failed to delete employee. Please try again.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="delete-employee-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h1>Delete Employee</h1>

      {message && <p className="message">{message}</p>}

      <div className="employee-list">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name || "N/A"}</td>
                <td>{employee.email || "N/A"}</td>
                <td>{employee.department || "N/A"}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeleteEmployee;

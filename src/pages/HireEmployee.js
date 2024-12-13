import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import "../styles/HireEmployee.css";

const HireEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    joiningDate: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await addDoc(collection(db, "users"), {
        ...formData,
        role: "Employee",
        createdAt: new Date(),
      });
      setMessage("Employee added successfully!");
      setTimeout(() => navigate("/hr-dashboard"), 2000); // Redirect to HR Dashboard
    } catch (error) {
      console.error("Error adding employee:", error);
      setMessage("Failed to add employee. Please try again.");
    }
  };

  return (
    <div className="hire-employee-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h1>Hire Employee</h1>
      <form onSubmit={handleSubmit} className="hire-employee-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Joining Date</label>
          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
            required
          />
        </div>
        {message && <p className="message">{message}</p>}
        <button type="submit" className="btn">Add Employee</button>
      </form>
    </div>
  );
};

export default HireEmployee;

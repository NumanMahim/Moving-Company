import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css";

const SignUp = () => {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    serviceArea: "",
    movingDate: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setFormData({
      ...formData,
      serviceArea: "",
      movingDate: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        email: formData.email,
        role,
        serviceArea: role === "Customer" ? formData.serviceArea : null,
        movingDate: role === "Customer" ? formData.movingDate : null,
      });

      setMessage("Account created successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="signup-title">Sign Up</h1>
        <p className="signup-subtitle">Join the Packers & Movers Platform</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="role" className="form-label">Select Role</label>
            <select
              name="role"
              value={role}
              onChange={handleRoleChange}
              className="form-select"
              required
            >
              <option value="">-- Select Role --</option>
              <option value="Admin">Admin</option>
              <option value="Customer">Customer</option>
            </select>
          </div>

          {/* Common Fields */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="form-control"
              required
            />
          </div>

          {/* Role-Specific Fields */}
          {role === "Customer" && (
            <>
              <div className="form-group">
                <label htmlFor="serviceArea" className="form-label">Service Area</label>
                <input
                  type="text"
                  name="serviceArea"
                  value={formData.serviceArea}
                  onChange={handleChange}
                  placeholder="Enter your service area"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="movingDate" className="form-label">Moving Date</label>
                <input
                  type="date"
                  name="movingDate"
                  value={formData.movingDate}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </>
          )}

          {message && (
            <p
              className={`message ${
                message.startsWith("Error") ? "error" : "success"
              }`}
            >
              {message}
            </p>
          )}
          <button type="submit" className="btn btn-submit">Sign Up</button>
        </form>
        <p className="signup-link">
          Already have an account? <a href="/">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

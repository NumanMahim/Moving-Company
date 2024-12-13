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
    department: "",
    joiningDate: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setFormData({
      ...formData,
      department: "", // Reset role-specific fields
      joiningDate: "",
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
        department: role === "Employee" ? formData.department : null,
        joiningDate: role === "Employee" ? formData.joiningDate : null,
      });

      setMessage("Account created successfully!");
      setTimeout(() => navigate("/"), 2000); // Redirect to login after success
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box shadow">
        <h1 className="signup-title">Sign Up</h1>
        <p className="signup-subtitle">Join the HR Portal</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="role" className="form-label">Select Role</label>
            <select
              name="role"
              value={role}
              onChange={handleRoleChange}
              className="form-select"
              required
            >
              <option value="">-- Select Role --</option>
              <option value="HR">HR</option>
              <option value="Employee">Employee</option>
            </select>
          </div>

          {/* Common Fields */}
          <div className="form-group mb-3">
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
          <div className="form-group mb-3">
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
          <div className="form-group mb-3">
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
          {role === "Employee" && (
            <>
              <div className="form-group mb-3">
                <label htmlFor="department" className="form-label">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Enter your department"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="joiningDate" className="form-label">Joining Date</label>
                <input
                  type="date"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </>
          )}

          {message && (
            <p
              className={`text-center ${
                message.startsWith("Error") ? "text-danger" : "text-success"
              }`}
            >
              {message}
            </p>
          )}
          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <a href="/" className="text-decoration-none">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

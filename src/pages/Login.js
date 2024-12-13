import React, { useState } from "react";
import { auth, db } from "../firebase"; // Import Firebase auth and Firestore
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore methods
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Include CSS for styling

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser({ email: user.email, uid: user.uid, role: userData.role });

        // Redirect based on role
        if (userData.role === "HR") {
          navigate("/hr-dashboard");
        } else if (userData.role === "Employee") {
          navigate("/employee-dashboard");
        } else {
          setMessage("Unknown role. Please contact admin.");
        }
      } else {
        setMessage("User data not found. Please contact admin.");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box shadow">
        <h1 className="login-title">HR Portal</h1>
        <p className="login-subtitle">Streamline your HR processes effortlessly</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="form-control"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="form-control"
              required
            />
          </div>
          {message && (
            <p
              className={`text-center ${
                message.startsWith("Error") ? "text-danger" : "text-success"
              }`}
            >
              {message}
            </p>
          )}
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="text-center mt-3">
          Don’t have an account? <a href="/signup" className="text-decoration-none">Sign up here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Example: Reset user state and navigate to login
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">Packers & Movers</h1>
        <nav className="nav">
          <Link to="/customer-dashboard">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/services">Services</Link>
          <Link to="/">Logout</Link>
          
        </nav>
      </div>
    </header>
  );
};

export default Header;

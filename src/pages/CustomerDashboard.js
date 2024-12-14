import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/CustomerDashboard.css";


const CustomerDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="hero-section">
          <h1 className="hero-title">Welcome to Packers & Movers</h1>
          <p className="hero-subtitle">Your trusted partner for stress-free moving services.</p>
          <button className="hero-button" onClick={() => navigate("/book-service")}>
            Get Started
          </button>
        </div>

        <div className="features-section">
          <h2 className="features-title">Explore Our Services</h2>
          <div className="features-grid">
            <div className="feature-card" onClick={() => navigate("/book-service")}>
              <h3>Book a Service</h3>
              <p>Schedule your move with ease using our simple booking platform.</p>
            </div>
            <div className="feature-card" onClick={() => navigate("/track-requests")}>
              <h3>Track Requests</h3>
              <p>Stay updated on the status of your current and past bookings.</p>
            </div>
            <div className="feature-card" onClick={() => navigate("/get-quote")}>
              <h3>Get a Quote</h3>
              <p>Receive a custom quote tailored to your specific moving needs.</p>
            </div>
            <div className="feature-card" onClick={() => navigate("/feedback")}>
              <h3>Customer Feedback</h3>
              <p>Share your experience and help us improve our services.</p>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Ready to Move?</h2>
          <p>Contact us today and let’s get started!</p>
          <button className="cta-button" onClick={() => navigate("/contact")}>
            Contact Us
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CustomerDashboard;

import React, { useState } from "react";
import { db } from "../firebase"; // Import Firebase Firestore
import { doc, setDoc } from "firebase/firestore"; // Import Firestore methods
import Header from "./Header";
import Footer from "./Footer";
import "../styles/BookService.css";

const BookService = ({ user }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    serviceDate: "",
    additionalInfo: "",
  });
  const [message, setMessage] = useState("");

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
      // Ensure the user is authenticated
      if (!user?.uid) {
        throw new Error("User is not authenticated.");
      }

      // Save booking data to Firestore using the user's UID
      const bookingRef = doc(db, "bookings", user.uid); // Use the user's UID as the document ID
      await setDoc(bookingRef, {
        ...formData,
        createdAt: new Date().toISOString(),
      });

      setMessage("Your service has been booked successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        serviceDate: "",
        additionalInfo: "",
      });
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <Header />
      <div className="book-service-container">
        <h1 className="book-service-title">Book a Service</h1>
        <p className="book-service-subtitle">Fill out the form below to schedule your move.</p>
        <form onSubmit={handleSubmit} className="book-service-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Moving Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="serviceDate">Preferred Date</label>
            <input
              type="date"
              id="serviceDate"
              name="serviceDate"
              value={formData.serviceDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="additionalInfo">Additional Information</label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>
          {message && (
            <p
              className={`message ${
                message.startsWith("Error") ? "error-message" : "success-message"
              }`}
            >
              {message}
            </p>
          )}
          <button type="submit" className="submit-button">
            Book Service
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default BookService;

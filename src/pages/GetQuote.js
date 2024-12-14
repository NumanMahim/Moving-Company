import React, { useState } from "react";
import { db } from "../firebase"; // Import Firebase Firestore
import { collection, addDoc } from "firebase/firestore"; // Import Firestore methods
import Header from "./Header";
import Footer from "./Footer";
import "../styles/GetQuote.css";

const GetQuote = ({ user }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    movingFrom: "",
    movingTo: "",
    movingDate: "",
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

      // Save quote request data in the user's sub-collection
      const userQuotesRef = collection(db, `users/${user.uid}/quotes`);
      await addDoc(userQuotesRef, {
        ...formData,
        createdAt: new Date().toISOString(),
      });

      setMessage("Your quote request has been submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        movingFrom: "",
        movingTo: "",
        movingDate: "",
        additionalInfo: "",
      });
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <Header />
      <div className="get-quote-container">
        <h1 className="get-quote-title">Request a Quote</h1>
        <p className="get-quote-subtitle">
          Fill out the form below to receive a personalized moving service quote.
        </p>
        <form onSubmit={handleSubmit} className="get-quote-form">
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
            <label htmlFor="movingFrom">Moving From</label>
            <input
              type="text"
              id="movingFrom"
              name="movingFrom"
              value={formData.movingFrom}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="movingTo">Moving To</label>
            <input
              type="text"
              id="movingTo"
              name="movingTo"
              value={formData.movingTo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="movingDate">Preferred Moving Date</label>
            <input
              type="date"
              id="movingDate"
              name="movingDate"
              value={formData.movingDate}
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
            Request Quote
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default GetQuote;

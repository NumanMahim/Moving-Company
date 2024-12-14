import React, { useState } from "react";
import { db } from "../firebase"; // Import Firestore
import { doc, setDoc } from "firebase/firestore"; // Firestore methods
import Header from "./Header";
import Footer from "./Footer";
import "../styles/CustomerFeedback.css";

const CustomerFeedback = ({ user }) => {
  const [feedback, setFeedback] = useState({
    message: "",
    rating: "Excellent",
  });
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage("");

    try {
      // Ensure the user is authenticated
      if (!user?.uid) {
        throw new Error("User is not authenticated.");
      }

      // Save feedback to Firestore
      const feedbackRef = doc(
        db,
        `users/${user.uid}/feedbacks`,
        new Date().toISOString() // Use timestamp as document ID
      );
      await setDoc(feedbackRef, {
        ...feedback,
        createdAt: new Date().toISOString(),
      });

      setResponseMessage("Thank you for your feedback!");
      setFeedback({
        message: "",
        rating: "Excellent",
      });
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <Header />
      <div className="feedback-container">
        <h1 className="feedback-title">Customer Feedback</h1>
        <p className="feedback-subtitle">
          We value your feedback to improve our services.
        </p>
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label htmlFor="message">Your Feedback</label>
            <textarea
              id="message"
              name="message"
              value={feedback.message}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="rating">Rate Us</label>
            <select
              id="rating"
              name="rating"
              value={feedback.rating}
              onChange={handleChange}
              required
            >
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Average">Average</option>
              <option value="Poor">Poor</option>
            </select>
          </div>
          {responseMessage && (
            <p
              className={`response-message ${
                responseMessage.startsWith("Error")
                  ? "error-message"
                  : "success-message"
              }`}
            >
              {responseMessage}
            </p>
          )}
          <button type="submit" className="submit-button">
            Submit Feedback
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CustomerFeedback;

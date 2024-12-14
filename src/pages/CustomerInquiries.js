import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // Import Firestore
import { collectionGroup, getDocs } from "firebase/firestore"; // Use collectionGroup to fetch subcollections
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import "../styles/CustomerInquiries.css";

const CustomerInquiries = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        // Fetch all quotes from Firestore using collectionGroup
        const querySnapshot = await getDocs(collectionGroup(db, "quotes"));
        const fetchedQuotes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuotes(fetchedQuotes);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch customer inquiries.");
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <>
      <AdminHeader />
      <div className="customer-inquiries-container">
        <h1 className="customer-inquiries-title">Customer Inquiries</h1>
        {loading ? (
          <p className="loading-message">Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : quotes.length > 0 ? (
          <div className="inquiries-list">
            {quotes.map((quote) => (
              <div key={quote.id} className="inquiry-card">
                <p><strong>Name:</strong> {quote.name}</p>
                <p><strong>Email:</strong> {quote.email}</p>
                <p><strong>Moving From:</strong> {quote.serviceArea}</p>
                <p><strong>Moving Date:</strong> {quote.movingDate}</p>
                <p><strong>Additional Info:</strong> {quote.additionalInfo || "N/A"}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-inquiries-message">No customer inquiries found.</p>
        )}
      </div>
      <AdminFooter />
    </>
  );
};

export default CustomerInquiries;

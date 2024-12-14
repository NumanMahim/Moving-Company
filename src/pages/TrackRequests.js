import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/TrackRequests.css";

const TrackRequests = ({ user }) => {
  const [requests, setRequests] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      if (!user?.uid) {
        setError("User is not authenticated.");
        setLoading(false);
        return;
      }

      try {
        const userBookingRef = doc(db, "bookings", user.uid);
        const bookingSnap = await getDoc(userBookingRef);

        if (bookingSnap.exists()) {
          setRequests(bookingSnap.data());
        } else {
          setRequests(null);
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch booking requests.");
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  return (
    <>
      <Header />
      <div className="track-requests-container">
        <h1 className="track-requests-title">Track Your Requests</h1>
        {loading ? (
          <p className="loading-message">Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : requests ? (
          <div className="request-card">
            <h3>{requests.serviceDate}</h3>
            <p>
              <strong>Name:</strong> {requests.name}
            </p>
            <p>
              <strong>Phone:</strong> {requests.phone}
            </p>
            <p>
              <strong>Address:</strong> {requests.address}
            </p>
            <p>
              <strong>Additional Info:</strong> {requests.additionalInfo}
            </p>
          </div>
        ) : (
          <p className="no-requests-message">You have no booking requests.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default TrackRequests;

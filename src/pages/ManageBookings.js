import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // Import Firestore
import { collection, getDocs } from "firebase/firestore"; // Import Firestore methods
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import "../styles/ManageBookings.css";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "bookings")); // Fetch all bookings
        const fetchedBookings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(fetchedBookings);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch bookings.");
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <>
      <AdminHeader />
      <div className="manage-bookings-container">
        <h1 className="manage-bookings-title">Manage Bookings</h1>
        {loading ? (
          <p className="loading-message">Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : bookings.length > 0 ? (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <p><strong>Name:</strong> {booking.name}</p>
                <p><strong>Email:</strong> {booking.email}</p>
                <p><strong>Phone:</strong> {booking.phone}</p>
                <p><strong>Address:</strong> {booking.address}</p>
                <p><strong>Service Date:</strong> {booking.serviceDate}</p>
                <p><strong>Additional Info:</strong> {booking.additionalInfo}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-bookings-message">No bookings found.</p>
        )}
      </div>
      <AdminFooter />
    </>
  );
};

export default ManageBookings;

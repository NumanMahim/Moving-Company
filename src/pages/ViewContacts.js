import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // Import Firestore
import { collection, getDocs } from "firebase/firestore"; // Import Firestore methods
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import "../styles/ViewContacts.css";

const ViewContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users")); // Fetch all users
        const fetchedContacts = querySnapshot.docs.map((doc) => doc.data());
        setContacts(fetchedContacts);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch contact details.");
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <>
      <AdminHeader />
      <div className="view-contacts-container">
        <h1 className="view-contacts-title">View Contacts</h1>
        {loading ? (
          <p className="loading-message">Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : contacts.length > 0 ? (
          <div className="contacts-list">
            {contacts.map((contact, index) => (
              <div key={index} className="contact-card">
                <p>
                  <strong>Name:</strong> {contact.name || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {contact.email || "N/A"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-contacts-message">No contacts found.</p>
        )}
      </div>
      <AdminFooter />
    </>
  );
};

export default ViewContacts;

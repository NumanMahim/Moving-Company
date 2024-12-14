import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import "../styles/DefineAreas.css";

const DefineServiceAreas = () => {
  const [areaName, setAreaName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (!areaName.trim()) {
        throw new Error("Service area cannot be empty.");
      }

      await addDoc(collection(db, "service-areas"), {
        name: areaName,
        createdAt: new Date().toISOString(),
      });

      setMessage("Service area added successfully!");
      setAreaName(""); // Clear input
    } catch (error) {
      setMessage(`Failed to add the service area. Error: ${error.message}`);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="define-service-areas-container">
        <h1>Define Service Areas</h1>
        <form onSubmit={handleSubmit} className="define-service-areas-form">
          <input
            type="text"
            value={areaName}
            onChange={(e) => setAreaName(e.target.value)}
            placeholder="Enter service area"
            required
          />
          <button type="submit">Add Area</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
      <AdminFooter />
    </>
  );
};

export default DefineServiceAreas;
